// pages/about_page.js
const AboutPage = {
    render: async () => {
        return `
        <div style="
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('./images/5.jpg');
            background-attachment: fixed;
            background-position: center;
            background-size: cover;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;">
            <div class="text-center">
                <h1 class="display-4 fw-bold">教育，是用生命影響生命</h1>
                <p class="lead">Education is life impacting life.</p>
            </div>
        </div>

        <div class="container py-5">
            <div class="row mb-5">
                <div class="col-lg-6">
                    <h2 class="fw-bold mb-4" style="color: var(--yite-blue);">教學理念</h2>
                    <p class="lead text-muted">譯德補習班成立於 2010 年，秉持著「適性揚才」的教育精神...</p>
                    <p>我們堅持小班制教學，讓每一位學生都能被看見。透過數位化的學習歷程追蹤，我們能精準掌握學生的學習盲點，提供最即時的輔導。</p>
                </div>
                <div class="col-lg-6">
                    <img src="./images/3.jpg" class="img-fluid rounded shadow" alt="快樂學習">
                </div>
            </div>
        </div>
        `;
    }
};
export default AboutPage;