// 제휴 문의 폼 AJAX 제출
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
        status.textContent = '문의가 접수되었습니다. 감사합니다!';
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

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');
  const isDark = body.classList.toggle('dark');

  btn.textContent = isDark ? '라이트 모드' : '다크 모드';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 페이지 로드 시 저장된 테마 적용
// defer 스크립트는 DOM 파싱 완료 후 실행되므로 DOMContentLoaded 없이 바로 접근 가능
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = '라이트 모드';
  }
})();
