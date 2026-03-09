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

// ===== 카테고리 탭 필터 =====
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.cat-tab');
  const cards = document.querySelectorAll('#card-grid .card[data-category]');
  const featured = document.querySelector('.featured-card[data-category]');
  const noResults = document.getElementById('no-results');
  const adInfeed = document.getElementById('ad-infeed');

  function filterCards(filter) {
    let visibleCount = 0;

    // 피처드 카드 필터
    if (featured) {
      const match = filter === 'all' || featured.dataset.category === filter;
      featured.style.display = match ? '' : 'none';
    }

    // 그리드 카드 필터
    cards.forEach(function (card) {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    // 인피드 광고: 전체 보기일 때만 표시
    if (adInfeed) {
      adInfeed.style.display = filter === 'all' ? '' : 'none';
    }

    noResults.style.display = visibleCount === 0 && !(featured && featured.style.display !== 'none') ? 'block' : 'none';
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      filterCards(tab.dataset.filter);
    });
  });

  // 헤더 네비 카테고리 링크 클릭 시 탭 자동 활성화
  document.querySelectorAll('[data-cat]').forEach(function (link) {
    link.addEventListener('click', function () {
      const cat = link.dataset.cat;
      const matchTab = document.querySelector('.cat-tab[data-filter="' + cat + '"]');
      if (matchTab) {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        matchTab.classList.add('active');
        filterCards(cat);
      }
    });
  });
});

// ===== 뉴스레터 구독 =====
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const status = document.getElementById('newsletter-status');
    const email = document.getElementById('nl-email').value;

    // 이메일 형식 간단 검증
    if (!email.includes('@')) {
      status.textContent = '올바른 이메일 주소를 입력해 주세요.';
      return;
    }

    status.textContent = '✓ 구독 신청이 완료되었습니다! 다음 뉴스레터를 기대해 주세요.';
    form.reset();
  });
});

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
