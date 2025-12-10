// components/header.js
const Header = {
    render: () => {
        return `
        <header>
            <div class="header-container">
                <a href="#/" class="navbar-brand">
                    <img src="./images/yite_logo.jpg" alt="譯德補習班" class="logo-img">
                </a>

                <div class="header-right d-none d-lg-flex">
                    <div class="search-row">
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control" placeholder="搜尋課程...">
                            <button class="btn btn-warning" type="button">搜尋</button>
                        </div>
                    </div>
                    <nav class="nav">
                        <a class="nav-link text-white" href="#/about">關於我們</a>
                        <a class="nav-link text-white" href="#/news">最新消息</a>
                        <a class="nav-link text-white" href="#/courses">熱門課程</a>
                        <a class="nav-link text-white" href="#/teachers">師資介紹</a>
                        <a class="nav-link text-white" href="#/contact">聯絡我們</a>
                    </nav>
                </div>

                <div class="mobile-menu-btn d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
                    ☰
                </div>
            </div>
        </header>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="mobileMenu" style="background-color: var(--yite-blue);">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title text-white">選單</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="搜尋...">
                    <button class="btn btn-warning">Go</button>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link text-white mobile-link" href="#/">首頁</a></li>
                    <li class="nav-item"><a class="nav-link text-white mobile-link" href="#/about">關於我們</a></li>
                    <li class="nav-item"><a class="nav-link text-white mobile-link" href="#/news">最新消息</a></li>
                    <li class="nav-item"><a class="nav-link text-white mobile-link" href="#/courses">熱門課程</a></li>
                    <li class="nav-item"><a class="nav-link text-white mobile-link" href="#/teachers">師資介紹</a></li>
                    <li class="nav-item"><a class="nav-link text-white mobile-link" href="#/contact">聯絡我們</a></li>
                </ul>
            </div>
        </div>
        `;
    },
    afterRender: () => {
        // 處理 Sticky 動畫 [cite: 59-61]
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        });

        // 手機版點擊連結後自動收合選單 [cite: 56]
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const offcanvasEl = document.getElementById('mobileMenu');
        const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                bsOffcanvas.hide(); // 強制關閉
            });
        });
    }
};

export default Header;