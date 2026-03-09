// ===== 테마 =====
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = '☀️';
  }
})();

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// ===== 모바일 메뉴 =====
document.getElementById('menu-btn').addEventListener('click', function () {
  document.getElementById('mobile-nav').classList.toggle('open');
});

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
}

// ===== 폼 AJAX 제출 =====
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');

    btn.disabled = true;
    btn.textContent = '전송 중...';
    status.className = '';
    status.textContent = '';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        status.className = 'success';
        status.textContent = '문의가 접수되었습니다. 빠르게 답변 드리겠습니다!';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.className = 'error';
      status.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    } finally {
      btn.disabled = false;
      btn.textContent = '문의 보내기';
    }
  });
});
