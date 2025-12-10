// components/sidebar.js

class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // 啟用 Shadow DOM 樣式隔離 [cite: 64]
    }

    // 監聽 page-type 屬性變化
    static get observedAttributes() {
        return ['page-type'];
    }

    // 當 HTML 屬性改變時觸發 (例如從首頁切換到師資頁)
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'page-type' && newValue) {
            this.loadCategories(newValue);
        }
    }

    async loadCategories(pageType) {
        const container = this.shadowRoot.querySelector('.filter-container');
        const titleEl = this.shadowRoot.querySelector('h3');

        // 1. 定義不同頁面的資料來源與篩選欄位對應表 [cite: 66-69]
        // teacher 頁面讀取 teachers.json 的 subject 欄位
        // courses 頁面讀取 courses.json 的 category 欄位
        // news 頁面讀取 news.json 的 category 欄位
        const configMap = {
            'teachers': {
                file: 'teachers.json',
                field: 'subject',   // 針對師資使用 subject
                title: '師資篩選'
            },
            'courses': {
                file: 'courses.json',
                field: 'category',  // 針對課程使用 category
                title: '課程分類'
            },
            'news': {
                file: 'news.json',
                field: 'category',  // 針對新聞使用 category
                title: '新聞類別'
            }
        };

        const config = configMap[pageType];

        // 若該頁面不需要側邊欄 (不在設定表中)，則清空並隱藏
        if (!config) {
            this.style.display = 'none';
            return;
        }

        // 更新標題
        if (titleEl) titleEl.textContent = config.title;
        if (container) container.innerHTML = '<p>載入中...</p>';

        try {
            // 2. 自動抓取對應的 JSON 資料 [cite: 5, 66]
            // 加上 ?v= 時間戳記避免 JSON 快取
            const response = await fetch(`./data/${config.file}?v=${new Date().getTime()}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            // 3. 提煉分類：使用 Set 自動過濾出重複的類別 
            // 例如 map 出所有 subject，再丟進 Set 去重
            const uniqueCategories = ['全部', ...new Set(data.map(item => item[config.field]))];

            // 4. 生成按鈕 HTML
            let buttonsHtml = '';
            uniqueCategories.forEach((cat, index) => {
                // 第一個按鈕 (全部) 預設為 active，其餘正常
                const activeClass = index === 0 ? 'active' : '';
                // 若是「全部」按鈕，data-cat 設為 'all'，否則設為類別名稱
                const dataCat = index === 0 ? 'all' : cat;

                buttonsHtml += `<button class="filter-btn ${activeClass}" data-cat="${dataCat}">${cat}</button>`;
            });

            if (container) {
                container.innerHTML = buttonsHtml;
                this.bindEvents(); // 重新綁定點擊事件
            }

        } catch (error) {
            console.error('Sidebar 資料載入失敗:', error);
            if (container) container.innerHTML = '<p>暫無分類</p>';
        }
    }

    bindEvents() {
        const buttons = this.shadowRoot.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // UI 更新：移除其他 active，當前按鈕加上 active
                buttons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // 5. 發送 Web Components 事件通訊 [cite: 71-72]
                // 告訴父頁面：「使用者點擊了這個分類」
                const category = e.target.dataset.cat;
                this.dispatchEvent(new CustomEvent('filter-change', {
                    detail: { category: category }, // 傳遞資料
                    bubbles: true,   // 允許冒泡
                    composed: true   // 重要：允許穿透 Shadow DOM
                }));
            });
        });
    }

    // 初始渲染 HTML 結構 (樣式與骨架)
    connectedCallback() {
        if (!this.shadowRoot.querySelector('style')) {
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                border-top: 5px solid #162B4E; /* 品牌藍色頂邊 */
                height: fit-content;
            }
            h3 {
                color: #162B4E;
                font-size: 1.2rem;
                margin-top: 0;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
            }
            .filter-container {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .filter-btn {
                display: block;
                width: 100%;
                padding: 10px 15px;
                background: transparent;
                border: 1px solid #e0e0e0;
                border-radius: 5px;
                text-align: left;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 1rem;
                color: #555;
            }
            .filter-btn:hover {
                background-color: #f8f9fa;
                border-color: #F2AC3E; /* 品牌金色 */
                color: #162B4E;
            }
            .filter-btn.active {
                background-color: #162B4E;
                color: #ffffff;
                border-color: #162B4E;
            }
        </style>
        <h3>分類篩選</h3>
        <div class="filter-container">
            </div>
        `;
    }
}

// 定義自定義標籤 <app-sidebar>
customElements.define('app-sidebar', Sidebar);