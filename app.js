document.addEventListener('DOMContentLoaded', () => {
    // ---- Views Routing ----
    const loginView = document.getElementById('login-view');
    const appView = document.getElementById('app-view');

    // Login Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simple visual transition
            loginView.style.opacity = '0';
            setTimeout(() => {
                loginView.style.display = 'none';
                appView.style.display = 'flex';
                // Trigger reflow
                void appView.offsetWidth;
                appView.style.opacity = '1';
                appView.style.animation = 'fadeIn 0.5s ease front forwards';
            }, 300);
        });
    }

    // Logout Action
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            appView.style.display = 'none';
            loginView.style.display = 'block';
            loginView.style.opacity = '1';
        });
    }

    // ---- Pain Tracker Interaction ----
    const painBtns = document.querySelectorAll('.pain-btn');
    painBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            painBtns.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ---- Bottom Nav Interaction (Tab Switching Inside App) ----
    const navItems = document.querySelectorAll('.nav-item:not(#logout-btn)');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            if (!targetId) return;

            // 1. Update UI for tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // 2. Hide all contents
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active-content');
            });

            // 3. Show target content with animation
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                // Trigger reflow
                void targetContent.offsetWidth;
                targetContent.classList.add('active-content');
                targetContent.style.animation = 'fadeIn 0.4s ease front forwards';
            }
        });
    });

    // ---- Exercise Check Interaction ----
    const checkBtns = document.querySelectorAll('.check-btn');
    checkBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('checked');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('checked')) {
                icon.classList.remove('fa-regular', 'fa-circle');
                icon.classList.add('fa-solid', 'fa-circle-check');
            } else {
                icon.classList.remove('fa-solid', 'fa-circle-check');
                icon.classList.add('fa-regular', 'fa-circle');
            }
        });
    });
});

// CSS dynamically added for the transition
const style = document.createElement('style');
style.textContent = `
    .view { transition: opacity 0.3s ease; }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
