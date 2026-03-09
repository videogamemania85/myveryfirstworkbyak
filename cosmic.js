// ===== 우주 배경 캔버스 애니메이션 =====
(function () {
  const canvas = document.getElementById('cosmic-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 별 생성
  const STAR_COUNT = 220;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight,
    r:       Math.random() * 1.5 + 0.3,
    alpha:   Math.random(),
    delta:   (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
    color:   ['#ffffff', '#c4b5fd', '#a5b4fc', '#f9a8d4'][Math.floor(Math.random() * 4)],
  }));

  // 유성 생성
  const METEOR_MAX = 3;
  const meteors = [];

  function spawnMeteor() {
    if (meteors.length >= METEOR_MAX) return;
    meteors.push({
      x:     Math.random() * canvas.width * 0.7,
      y:     Math.random() * canvas.height * 0.3,
      len:   Math.random() * 140 + 80,
      speed: Math.random() * 6 + 4,
      alpha: 1,
      angle: Math.PI / 5,
    });
  }
  setInterval(spawnMeteor, 2800);

  // 성운 원형
  const nebulae = [
    { x: 0.15, y: 0.2,  r: 0.28, c: 'rgba(109,40,217,' },
    { x: 0.82, y: 0.65, r: 0.25, c: 'rgba(30,58,138,'  },
    { x: 0.5,  y: 0.85, r: 0.22, c: 'rgba(157,23,77,'  },
    { x: 0.72, y: 0.15, r: 0.18, c: 'rgba(79,70,229,'  },
  ];

  function drawNebulae() {
    nebulae.forEach(n => {
      const grd = ctx.createRadialGradient(
        n.x * canvas.width, n.y * canvas.height, 0,
        n.x * canvas.width, n.y * canvas.height, n.r * Math.max(canvas.width, canvas.height)
      );
      grd.addColorStop(0,   n.c + '0.13)');
      grd.addColorStop(0.5, n.c + '0.06)');
      grd.addColorStop(1,   n.c + '0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 베이스 우주 배경
    const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const isDark = document.body.classList.contains('dark');
    if (isDark) {
      bg.addColorStop(0,   '#04040f');
      bg.addColorStop(0.5, '#090920');
      bg.addColorStop(1,   '#060612');
    } else {
      bg.addColorStop(0,   '#0d0d2b');
      bg.addColorStop(0.5, '#1a1040');
      bg.addColorStop(1,   '#0a0a20');
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawNebulae();

    // 별 그리기
    stars.forEach(s => {
      s.alpha += s.delta;
      if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;
      s.alpha = Math.max(0.05, Math.min(1, s.alpha));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha;
      ctx.fill();

      // 밝은 별 글로우
      if (s.r > 1.2) {
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        glow.addColorStop(0,   s.color.replace(')', ', 0.3)').replace('#', 'rgba('));
        glow.addColorStop(1,   'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1;

    // 유성 그리기
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      const dx = Math.cos(m.angle) * m.len;
      const dy = Math.sin(m.angle) * m.len;
      const grad = ctx.createLinearGradient(m.x, m.y, m.x - dx, m.y - dy);
      grad.addColorStop(0,   `rgba(255,255,255,${m.alpha})`);
      grad.addColorStop(0.3, `rgba(196,181,253,${m.alpha * 0.6})`);
      grad.addColorStop(1,   'transparent');

      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - dx, m.y - dy);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.alpha -= 0.016;

      if (m.alpha <= 0 || m.x > canvas.width || m.y > canvas.height) {
        meteors.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
