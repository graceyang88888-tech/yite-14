// pages/teacher_page.js
let allTeachers = [];

const TeacherPage = {
    render: async () => {
        return `
        <div class="container-fluid">
            <h2 class="mb-4 pb-2 border-bottom" style="color: var(--yite-blue);">師資團隊</h2>
            <div class="row g-4" id="teacher-list">
                <div class="text-center p-5">載入師資中...</div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const listContainer = document.getElementById('teacher-list');

        try {
            const res = await fetch('./data/teachers.json');
            allTeachers = await res.json();
            renderTeachers(allTeachers);
        } catch (e) {
            listContainer.innerHTML = `<p class="text-danger">無法載入資料</p>`;
        }

        function renderTeachers(teachers) {
            if (teachers.length === 0) {
                listContainer.innerHTML = '<p class="col-12 text-center">無符合資料。</p>';
                return;
            }
            listContainer.innerHTML = teachers.map(t => `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 border-0 shadow-sm text-center p-3">
                        <div class="mx-auto mt-3" style="width: 150px; height: 150px; overflow: hidden; border-radius: 50%;">
                            <img src="${t.image}" class="img-fluid" alt="${t.name}" style="object-fit: cover; height: 100%; width: 100%;">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title fw-bold mb-1">${t.name}</h5>
                            <p class="text-warning mb-3">${t.subject} 教師</p>
                            <p class="card-text text-muted small">${t.intro}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 綁定篩選
        document.addEventListener('filter-change', (e) => {
            const cat = e.detail.category;
            if (cat === 'all' || !cat) renderTeachers(allTeachers);
            else renderTeachers(allTeachers.filter(t => t.subject === cat)); // 師資用 subject 篩選
        });
    }
};
export default TeacherPage;