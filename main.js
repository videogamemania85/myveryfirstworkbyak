function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');
  const isDark = body.classList.toggle('dark');

  btn.textContent = isDark ? '라이트 모드' : '다크 모드';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 페이지 로드 시 저장된 테마 적용
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    document.addEventListener('DOMContentLoaded', function () {
      const btn = document.getElementById('theme-toggle');
      if (btn) btn.textContent = '라이트 모드';
    });
  }
})();
