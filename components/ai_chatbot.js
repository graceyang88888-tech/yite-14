// components/ai_chatbot.js

// [重要] 請在此填入您的 Gemini API Key
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const AIChatbot = {
    render: () => {
        return `
        <div id="chatbot-trigger" class="chatbot-trigger">
            <img src="./images/ai_chatbot.png" alt="AI 客服" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <div id="chatbot-window" class="chatbot-window d-none">
            <div class="chatbot-header">
                <div class="d-flex align-items-center">
                    <span class="me-2">🤖</span>
                    <span class="fw-bold">譯德 AI 助教</span>
                </div>
                <button id="chatbot-close" class="btn-close btn-close-white btn-sm"></button>
            </div>

            <div id="chatbot-messages" class="chatbot-messages">
                <div class="message bot-message">
                    您好！我是譯德 AI 助教。請問有什麼關於課程或師資的問題我可以幫您嗎？
                </div>
            </div>

            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" class="form-control form-control-sm" placeholder="輸入問題...">
                <button id="chatbot-send" class="btn btn-warning btn-sm ms-2">
                    <span class="small fw-bold">送出</span>
                </button>
            </div>
        </div>
        `;
    },

    afterRender: () => {
        const trigger = document.getElementById('chatbot-trigger');
        const windowEl = document.getElementById('chatbot-window');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const inputEl = document.getElementById('chatbot-input');
        const messagesContainer = document.getElementById('chatbot-messages');

        // 1. 開關視窗邏輯
        trigger.addEventListener('click', () => {
            windowEl.classList.remove('d-none');
            trigger.classList.add('d-none'); // 打開時隱藏按鈕
        });

        closeBtn.addEventListener('click', () => {
            windowEl.classList.add('d-none');
            trigger.classList.remove('d-none'); // 關閉時顯示按鈕
        });

        // 2. 發送訊息邏輯
        const handleSend = async () => {
            const userText = inputEl.value.trim();
            if (!userText) return;

            // 顯示使用者訊息
            appendMessage(userText, 'user-message');
            inputEl.value = '';

            // 顯示 Loading
            const loadingId = appendMessage('正在思考中...', 'bot-message', true);

            try {
                // 呼叫 Gemini API 
                const reply = await callGeminiAPI(userText);

                // 移除 loading，顯示 AI 回覆
                removeMessage(loadingId);
                appendMessage(reply, 'bot-message');

            } catch (error) {
                removeMessage(loadingId);
                appendMessage("抱歉，目前 AI 連線忙碌中，請稍後再試。", 'bot-message');
                console.error(error);
            }
        };

        sendBtn.addEventListener('click', handleSend);
        inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // 輔助函數：新增訊息到介面
        function appendMessage(text, className, isLoading = false) {
            const div = document.createElement('div');
            div.className = `message ${className}`;
            div.innerText = text;
            if (isLoading) div.id = 'loading-msg';
            messagesContainer.appendChild(div);
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // 捲動到底部
            return div.id;
        }

        function removeMessage(id) {
            const el = document.getElementById(id || 'loading-msg');
            if (el) el.remove();
        }

        // 3. Gemini API 呼叫實作
        async function callGeminiAPI(prompt) {
            // 建構 Prompt，加入角色設定 (System Instruction 概念)
            const systemPrompt = "你現在是「譯德文理補習班」的 AI 客服助教。請用親切、專業的口吻回答家長或學生的問題。如果被問到不知道的事情，請建議他們致電 02-1234-5678 詢問行政櫃台。回答請簡潔有力，不要超過 150 字。";

            const payload = {
                contents: [{
                    parts: [{ text: systemPrompt + "\n\n使用者問：" + prompt }]
                }]
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            // 解析 Gemini 回傳的結構
            const aiText = data.candidates[0].content.parts[0].text;
            return aiText;
        }
    }
};

export default AIChatbot;