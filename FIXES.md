# 修正記録

## 1. コンソールエラーの修正

### `js/main.js` — fadeOut/fadeIn のメソッドエラー
- **問題**: `document.querySelector()` で取得したDOM要素に `.fadeOut()` / `.fadeIn()` を呼び出していた。これらはjQueryのメソッドのため、ネイティブDOM要素には存在せずスクロールのたびにエラーが発生していた
- **修正**: `elm.fadeOut()` → `$(elm).fadeOut()`、`elm.fadeIn()` → `$(elm).fadeIn()`

### `script.js` / `Hello_World.html` — 数字始まりのクラス名
- **問題**: `1in`〜`6in` のようなクラス名は CSS の仕様上無効（クラス名は数字で始められない）。jQueryのセレクタ `$('.1in')` 等が機能せず、Workセクションのモーダルが開かなかった
- **修正**: `1in`〜`6in` → `in-1`〜`in-6` に変更（script.js・Hello_World.html 両方）

---

## 2. CSS レイアウトの修正（stylesheet.css）

| 箇所 | 問題 | 修正内容 |
|---|---|---|
| `@font-face` | `.otf` ファイルに `format("woff2")` と誤記。フォントが読み込まれない | `format("opentype")` に修正 |
| `#header` | `height: 270px` と `height: 100px` が重複宣言。後者が優先されるが前者は無意味 | 有効な `100px` だけ残す |
| `#header .list` | `text-align: right` は flex コンテナ内の子要素の配置には無効 | 削除 |
| `#work ul` | `grid-column: 3/2` はグリッドアイテム（子要素）用のプロパティ。コンテナに書いても無効 | 削除 |
| `.top-wrapper` | `display: block` は div のデフォルト値のため冗長 | 削除 |
| `.top-wrapper h1` | `align-items: center` は flex/grid コンテナ以外には無効 | 削除 |
| `.mordal_wrapper img` | `gap: 0.1rem` は flex/grid コンテナ以外には無効 | 削除 |
| `#links img` | `top: auto` は `position` が指定されていない要素には無効 | 削除 |
| `#skill ul` | `list-style: none` はグローバルリセットで設定済みのため重複 | 削除 |
| `.mordal .mordal` | `padding: 50px 50px 50px 50px` は冗長な書き方 | `padding: 50px` に短縮 |

---

## 3. movieセクション iframe のレイアウト修正

- **問題**: `<iframe width="560" height="315">` とHTML属性でサイズを固定していたため、グリッドのセル幅（約475px）をはみ出しており中央に揃わなかった。HTML属性はCSSより優先されるため、CSS側でいくら制御しても効かなかった
- **修正**:
  - HTML の `width="560" height="315"` 属性をすべて削除
  - CSS に以下を追加し、セル幅に合わせて16:9を維持するよう変更

```css
#movie iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
}
```

---

## 4. ヘッダー・ヒーロー・デザイン刷新

### ハンバーガーメニュー化（`header.html` / `stylesheet.css` / `js/header.js`）
- ヘッダーをハンバーガーボタン＋左からスライドするドロワーナビに変更
- ボタンは `position: fixed; top: 20px; left: 20px` で常時表示、三本線のみ（背景なし）
- ドロワー開閉は `header.js` の fetch 注入後にイベントリスナーを設定

### ダークモード化（`stylesheet.css`）
- `body` を `background: #0a0a0a; color: #ddd` のダークベースに変更
- ハンバーガー線・ナビリンク・ボーダー・モーダルなど全体をダーク配色に統一

### CSS の分離（`stylesheet.css` / `indexpage/style.css`）
- index 専用スタイル（hero・about・news）を `indexpage/style.css` に切り出し
- `stylesheet.css` は共通（ハンバーガー・ナビ・games ページ用）として残す
- `index.html` の読み込み順を `stylesheet.css` → `indexpage/style.css` に修正

### ヒーローセクション（`index.html` / `indexpage/style.css` / `js/slider.js`）
- `img/topImage/` のスライダーを背景（`position: absolute; z-index: 0`）に配置
- `img/hero_white.png` をその上に重ねて表示（`position: relative; z-index: 1`）
- スライダーをスライド式 → フェード切り替え（`fade: true`）に変更

---

## 5. ファイル整理・リネーム・パス修正
> 2026-03-31 (AI作業)

### フォルダ構成の整理
- `indexpage/` フォルダを新規作成し、`css/style.css`（index専用スタイル）を移動

### ファイルリネーム（意味を明確化）

| 変更前 | 変更後 | 理由 |
|---|---|---|
| `css/stylesheet.css` | `css/common.css` | 全ページ共通スタイル |
| `css/Portfolio_style.css` | `css/portfolio-old.css` | 旧ポートフォリオページ用 |
| `css/style.css` | `indexpage/style.css` | index専用スタイル（移動） |
| `js/script.js` | `js/modal.js` | モーダル開閉処理 |
| `html/Portfolio.html` | `html/modal-game1.html` | ゲーム1モーダルフラグメント |
| `html/Portfolio_2.html` | `html/portfolio-old.html` | 旧ポートフォリオページ |
| `Illustration/illust_style.css` | `Illustration/style.css` | スタイルシート標準命名 |
| `Illustration/illustPage.html` | `Illustration/index.html` | セクションのトップページ |

### パス修正

| ファイル | 修正内容 |
|---|---|
| `index.html` | `css/common.css` の読み込みを追加 |
| `html/games.html` | `stylesheet.css` → `common.css`、`script.js` → `modal.js` |
| `html/header.html` | `stylesheet.css` → `common.css`、Illustrationリンク先を `Illustration/index.html` に修正 |
| `html/portfolio-old.html` | CSS・画像・ナビリンクの壊れたパスをすべて修正 |
| `Illustration/index.html` | `illust_style.css` → `style.css` |

---

## 6. header.js のパス問題修正
> 2026-03-31 (AI作業)

- **問題**: `header.js` が `fetch("header.html")` とハードコードしていたため、ルートの `index.html` から呼ぶと `html/header.html` が見つからずヘッダーが表示されなかった
- **修正**:
  - `header.js` を `HEADER_URL` 変数があればそれを使い、なければ `"header.html"` をデフォルトにするよう変更
  - `index.html` に `<script>const HEADER_URL = 'html/header.html';</script>` を追加
  - `html/games.html` はすでに `const HEADER_URL = 'header.html'` を定義済みのため変更不要

---

## 7. games.html をルートへ移動・ヘッダーナビのパス統一
> 2026-03-31 (AI作業)

- **問題**: `header.html` のリンクが `html/` フォルダ基準の相対パスだったため、ルートの `index.html` から注入するとリンクが壊れていた（`games.html` や `../index.html` が見つからない）
- **修正**:
  - `html/games.html` → `games.html`（ルートへ移動）
  - `games.html` 内のパスを `../css/`・`../js/`・`../img/` → `css/`・`js/`・`img/` に修正
  - `games.html` の `HEADER_URL` を `'header.html'` → `'html/header.html'` に修正
  - `html/header.html` 内のナビリンク・CSS・JS の `../` プレフィックスをすべて除去（常にルート基準で動作するため）

---

## 8. Illustration のルートページ化・モーダル分割
> 2026-03-31 (AI作業)

### Illustration をルートページ化
- `Illustration/index.html` → `illustration.html`（ルートへ移動）
- `Illustration/style.css` → `css/illustration.css`（CSS フォルダへ統合）
- `illustration.html` のパスを修正し `HEADER_URL = 'html/header.html'` を追加
- `html/header.html` の ILLUSTRATION リンクを `illustration.html` に更新

### games.html のモーダルを別ファイルに分割
- `html/modals/` フォルダを新規作成し、ゲームごとにモーダルHTMLを分離

| ファイル | 内容 |
|---|---|
| `html/modals/modal-tgke.html` | The Gun Knows Everything |
| `html/modals/modal-number-guess.html` | すうじあてげーむ |
| `html/modals/modal-binary-calc.html` | 二進数電卓 |
| `html/modals/modal-puyo-puzzle.html` | ぷよぷよ風パズルゲーム |
| `html/modals/modal-strategy.html` | にゃんこ大戦争風ストラテジーゲーム |

- `games.html` のモーダルHTML を `<div id="modals-container">` + `Promise.all` フェッチに置き換え
- `js/modal.js` を `.click()` → `$(document).on('click', ...)` のイベント委任方式に変更（非同期ロード対応）

---

## 9. 本名の削除
> 2026-03-31 (AI作業)

- `DENTAKU/Dentaku.html` — 本名表示を `Susan` に変更
- `games.html` — フッターの本名を `Susan` に変更
- `FIXES.md` — 本名の記載なしを確認済み

---

## 10. @import 順序エラーの修正・illustration 縦横比修正
> 2026-03-31 (AI作業)

- **`css/common.css`**: `@font-face` が `@import` より前にあったため `@import` が無視されていた → `@import` を先頭に移動
- **`css/illustration.css`**: `display: flex` のデフォルト `align-items: stretch` で画像が引き伸ばされていた → `align-items: flex-start` を追加

---

## 12. 弾幕モーダルの追加
> 2026-04-03 (AI作業)

- `html/modals/modal-danmaku.html` を新規作成
- IDが `game2_wrapper` と重複していたため `game6_wrapper` に修正
- `js/modal.js` に `.in-6` クリックで `#game6_wrapper` を開く処理を追加

---

## 13. ai_task.html の新規作成・整備
> 2026-04-03 (AI作業)

- `ai_task.html` を新規作成（タスクマネージャープロジェクトの紹介ページ）
- `app_task/ai_task.css` を専用CSSとして新規作成
- `<li><ul><li>` の不正なネスト構造を `<div class="container">` に修正（画像が小さくなる原因）
- `<style>` タグをテキスト表示に誤用していた箇所を `<small>` タグに修正

---

## 11. VHS.css のローカル化
> 2026-03-31 (AI作業)

- **問題**: `http://` のCDN参照がブラウザのMixed Contentポリシーでブロックされていた
- **修正**: ファイルを `css/vhs.min.css` としてローカル保存し参照を変更
- **その後**: 使用しないことになったため `css/vhs.min.css` を削除、`index.html` の参照も削除
