// router.js
// 定義路由對應表
const routes = {
    '/': { path: '/pages/home_page.js', componentName: 'HomePage', fullWidth: true },
    '/about': { path: '/pages/about_page.js', componentName: 'AboutPage', fullWidth: true }, // About 也是全版 [cite: 90]
    '/news': { path: '/pages/news_page.js', componentName: 'NewsPage', fullWidth: false },
    '/courses': { path: '/pages/course_page.js', componentName: 'CoursePage', fullWidth: false },
    '/teachers': { path: '/pages/teacher_page.js', componentName: 'TeacherPage', fullWidth: false },
    '/contact': { path: '/pages/contact_page.js', componentName: 'ContactPage', fullWidth: true } // Contact 全版 [cite: 102]
};

async function router() {
    // 取得當前 Hash (預設為 /)
    const path = location.hash.slice(1).toLowerCase() || '/';
    const route = routes[path] || routes['/']; // 若找不到則回首頁 (或可做 404)

    const viewContainer = document.getElementById('router-view');
    const layoutContainer = document.getElementById('main-layout');
    const sidebar = document.querySelector('app-sidebar');

    // 1. 處理佈局：判斷是否需要側邊欄 (fullWidth) [cite: 73]
    if (route.fullWidth) {
        layoutContainer.classList.add('full-width');
        sidebar.style.display = 'none'; // 隱藏側邊欄
    } else {
        layoutContainer.classList.remove('full-width');
        sidebar.style.display = 'block'; // 顯示側邊欄
        // 通知側邊欄現在是哪個頁面，以便更新篩選資料 [cite: 65]
        sidebar.setAttribute('page-type', path.replace('/', ''));
    }

    try {
        // 2. 動態匯入頁面模組 (Dynamic Import)
        // 加上 ?v=... 防止快取 [cite: 47]
        const module = await import(`${route.path}?v=${new Date().getTime()}`);

        // 3. 渲染頁面內容
        viewContainer.innerHTML = await module.default.render();

        // 4. 執行頁面初始化 (如綁定事件、Fetch 資料)
        if (module.default.afterRender) {
            await module.default.afterRender();
        }

        // 5. 頁面切換後滾動到頂部
        window.scrollTo(0, 0);

    } catch (error) {
        console.error('頁面載入失敗:', error);
        viewContainer.innerHTML = `<h2>404 - 頁面載入錯誤</h2>`;
    }
}

export default function initRouter() {
    // 監聽 Hash 變化與頁面載入
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
}