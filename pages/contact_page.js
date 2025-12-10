// pages/contact_page.js
const ContactPage = {
    render: async () => {
        return `
        <div class="container py-5">
            <h2 class="text-center mb-5 fw-bold" style="color: var(--yite-blue);">聯絡我們</h2>
            
            <div class="row">
                <div class="col-lg-5 mb-4">
                    <div class="card shadow-sm border-0 h-100">
                        <div class="card-body p-4">
                            <h4 class="mb-4">留訊息給我們</h4>
                            <form>
                                <div class="mb-3">
                                    <label class="form-label">姓名</label>
                                    <input type="text" class="form-control" placeholder="您的姓名">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">電話</label>
                                    <input type="tel" class="form-control" placeholder="聯絡電話">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">留言內容</label>
                                    <textarea class="form-control" rows="4"></textarea>
                                </div>
                                <button type="button" class="btn btn-warning w-100 fw-bold">送出訊息</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-lg-7">
                    <div class="ratio ratio-4x3 shadow rounded overflow-hidden">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.002746646738!2d121.513!3d25.047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAyJzQ5LjIiTiAxMjHCsDMwJzQ2LjgiRQ!5e0!3m2!1szh-TW!2stw!4v1625641234567!5m2!1szh-TW!2stw" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
};
export default ContactPage;