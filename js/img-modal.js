document.addEventListener('DOMContentLoaded', function() {
    // モーダルのHTMLを挿入
    const overlay = document.createElement('div');
    overlay.id = 'img-modal-overlay';
    const img = document.createElement('img');
    img.id = 'img-modal-img';
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    // 画像クリックで拡大
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('picture')) {
            img.src = e.target.src;
            overlay.style.display = 'flex';
        }
    });

    // オーバーレイクリックで閉じる
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });
});
