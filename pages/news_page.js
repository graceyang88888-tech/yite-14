// pages/news_page.js
let allNews = [];

const NewsPage = {
    render: async () => {
        return `
        <div class="container-fluid">
            <h2 class="mb-4 pb-2 border-bottom" style="color: var(--yite-blue);">最新消息</h2>
            
            <div class="list-group list-group-flush" id="news-list">
                <div class="text-center p-5">載入消息中...</div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const listContainer = document.getElementById('news-list');

        // 1. 抓取資料
        try {
            const res = await fetch('./data/news.json?v=' + new Date().getTime());
            allNews = await res.json();
            renderNews(allNews);
        } catch (e) {
            listContainer.innerHTML = `<p class="text-danger">無法載入最新消息</p>`;
        }

        // 2. 渲染列表函數
        function renderNews(newsList) {
            if (newsList.length === 0) {
                listContainer.innerHTML = '<p class="text-center text-muted p-4">目前沒有相關消息。</p>';
                return;
            }

            // 依日期排序 (新的在上面)
            newsList.sort((a, b) => new Date(b.date) - new Date(a.date));

            listContainer.innerHTML = newsList.map(item => `
                <div class="list-group-item list-group-item-action py-4 border-bottom">
                    <div class="d-flex w-100 justify-content-between align-items-center mb-2">
                        <div>
                            <span class="badge rounded-pill bg-warning text-dark me-2">${item.category}</span>
                            <small class="text-muted">${item.date}</small>
                        </div>
                    </div>
                    <h5 class="mb-2 fw-bold" style="color: var(--yite-blue);">${item.title}</h5>
                    <p class="mb-2 text-secondary">${item.summary}</p>
                    <button class="btn btn-sm btn-link text-decoration-none p-0 read-more-btn" data-id="${item.id}">
                        閱讀更多 &rarr;
                    </button>
                </div>
            `).join('');

            // [TODO] 這裡未來可以綁定「閱讀更多」跳轉到 Article 詳細頁
        }

        // 3. 監聽 Sidebar 篩選事件 [cite: 92]
        document.addEventListener('filter-change', (e) => {
            const cat = e.detail.category;
            console.log('NewsPage 收到篩選:', cat);

            if (cat === 'all' || !cat) {
                renderNews(allNews);
            } else {
                renderNews(allNews.filter(n => n.category === cat));
            }
        });
    }
};
export default NewsPage;