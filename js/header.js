fetch(typeof HEADER_URL !== 'undefined' ? HEADER_URL : "header.html")
    .then((response) => response.text())
    .then((data) => {
        document.querySelector("#header").innerHTML = data;

        const hamburger = document.getElementById("hamburger");
        const overlay = document.getElementById("nav-overlay");
        const drawer = document.getElementById("nav-drawer");

        function openMenu() {
            hamburger.classList.add("is-open");
            overlay.classList.add("is-open");
            drawer.classList.add("is-open");
        }

        function closeMenu() {
            hamburger.classList.remove("is-open");
            overlay.classList.remove("is-open");
            drawer.classList.remove("is-open");
        }

        hamburger.addEventListener("click", () => {
            drawer.classList.contains("is-open") ? closeMenu() : openMenu();
        });

        overlay.addEventListener("click", closeMenu);
    });
