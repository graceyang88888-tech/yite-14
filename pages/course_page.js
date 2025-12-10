// pages/course_page.js
let allCourses = []; // 暫存資料供篩選用

const CoursePage = {
    render: async () => {
        return `
        <div class="container-fluid">
            <h2 class="mb-4 pb-2 border-bottom" style="color: var(--yite-blue);">熱門課程</h2>
            <div class="row g-4" id="course-list">
                <div class="text-center p-5">載入課程資料中...</div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const listContainer = document.getElementById('course-list');

        // 1. 抓取資料 [cite: 94-95]
        try {
            const res = await fetch('./data/courses.json');
            allCourses = await res.json();
            renderCourses(allCourses);
        } catch (e) {
            listContainer.innerHTML = `<p class="text-danger">無法載入課程資料</p>`;
        }

        // 2. 定義渲染函數
        function renderCourses(courses) {
            if (courses.length === 0) {
                listContainer.innerHTML = '<p class="col-12 text-center text-muted">沒有符合的課程。</p>';
                return;
            }
            listContainer.innerHTML = courses.map(c => `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm hover-effect">
                        <div style="height: 200px; overflow: hidden;">
                            <img src="${c.image}" class="card-img-top" style="object-fit: cover; height: 100%; width: 100%;" alt="${c.name}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <div class="mb-2">
                                <span class="badge bg-warning text-dark">${c.category}</span>
                            </div>
                            <h5 class="card-title fw-bold">${c.name}</h5>
                            <p class="card-text text-secondary flex-grow-1">${c.desc}</p>
                            <div class="mt-3 d-flex justify-content-between align-items-center">
                                <small class="text-muted"><i class="bi bi-person-fill"></i> ${c.teacher}</small>
                                <button class="btn btn-sm btn-outline-primary">課程詳情</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 3. 監聽 Sidebar 的篩選事件 [cite: 72]
        // 注意：事件是透過 bubbles: true 冒泡上來的，我們在 document 監聽即可
        const filterHandler = (e) => {
            const category = e.detail.category; // 從 CustomEvent 取得類別
            console.log('CoursePage 收到篩選請求:', category);

            if (category === 'all' || !category) {
                renderCourses(allCourses);
            } else {
                // 使用 filter 過濾資料
                const filtered = allCourses.filter(c => c.category === category);
                renderCourses(filtered);
            }
        };

        // 綁定事件
        document.addEventListener('filter-change', filterHandler);

        // [重要] 清理機制：這裡簡單處理，實際專案可能需要更嚴謹的 removeEventListener
        // 由於每次路由切換都會重新載入 JS，這裡暫時依賴新綁定。
    }
};
export default CoursePage;