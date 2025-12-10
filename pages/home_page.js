// pages/home_page.js
const HomePage = {
    render: async () => {
        return `
        <div class="hero-section" style="
            background: linear-gradient(rgba(22, 43, 78, 0.7), rgba(22, 43, 78, 0.5)), url('./images/1.jpg') no-repeat center center; 
            background-size: cover; 
            height: 80vh; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: #fff; 
            text-align: center;">
            <div class="container">
                <h1 class="display-3 fw-bold mb-4">譯德文理補習班</h1>
                <p class="lead mb-4 fs-3">引領卓越，成就未來 - 您的最佳學習夥伴</p>
                <a href="#/courses" class="btn btn-warning btn-lg px-5 py-3 fw-bold text-dark">查看課程</a>
            </div>
        </div>

        <section class="py-5 bg-light">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="text-primary fw-bold" style="color: var(--yite-blue) !important;">最新消息</h2>
                    <a href="#/news" class="btn btn-outline-primary btn-sm">看更多 ></a>
                </div>
                <div class="row" id="home-news-container">
                    <div class="text-center w-100">載入中...</div>
                </div>
            </div>
        </section>

        <section class="py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 mb-4 mb-md-0">
                         <img src="./images/3.jpg" class="img-fluid rounded shadow" alt="關於譯德">
                    </div>
                    <div class="col-md-6">
                        <h2 class="mb-4 fw-bold" style="color: var(--yite-blue);">關於我們</h2>
                        <p class="lead">譯德文理補習班致力於提供最優質的教育環境...</p>
                        <p>我們相信每個孩子都有無限的潛力。透過專業的師資團隊與數位化的教學輔助，我們不只教導知識，更培養孩子解決問題的能力。</p>
                        <a href="#/about" class="btn btn-primary mt-3">了解更多</a>
                    </div>
                </div>
            </div>
        </section>
        `;
    },
    afterRender: async () => {
        // Fetch 最新 3 筆新聞 [cite: 89]
        try {
            const response = await fetch('./data/news.json');
            const newsData = await response.json();
            const recentNews = newsData.slice(0, 3); // 只取前三筆

            const container = document.getElementById('home-news-container');
            container.innerHTML = recentNews.map(item => `
                <div class="col-md-4 mb-3">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                            <span class="badge bg-secondary mb-2">${item.category}</span>
                            <small class="text-muted d-block mb-2">${item.date}</small>
                            <h5 class="card-title text-truncate">${item.title}</h5>
                            <p class="card-text text-secondary small">${item.summary}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('新聞載入失敗:', error);
        }
    }
};
export default HomePage;