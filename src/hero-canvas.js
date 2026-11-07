// ============================================================
// hero-canvas.js — Animated cloud/star background for hero
// Falls back gracefully if WebGL unavailable
// ============================================================

export function initHeroCanvas(canvas) {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let W, H, animId;
  const particles = [];
  const clouds = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles.length = 0;
    clouds.length = 0;
    const count = Math.min(80, Math.floor(W * H / 8000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    // Cloud blobs
    for (let i = 0; i < 6; i++) {
      clouds.push({
        x: Math.random() * W, y: Math.random() * H * 0.7,
        rx: 120 + Math.random() * 160, ry: 40 + Math.random() * 60,
        a: 0.03 + Math.random() * 0.06,
        vx: (Math.random() - 0.5) * 0.15,
        hue: Math.random() > 0.6 ? 220 : 200,
      });
    }
  }

  function draw(ts) {
    ctx.clearRect(0, 0, W, H);

    // Cloud blobs
    clouds.forEach(c => {
      c.x += c.vx;
      if (c.x > W + c.rx) c.x = -c.rx;
      if (c.x < -c.rx) c.x = W + c.rx;
      ctx.save();
      const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.rx);
      grad.addColorStop(0, `hsla(${c.hue},80%,65%,${c.a})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.scale(1, c.ry / c.rx);
      ctx.beginPath();
      ctx.arc(c.x, c.y * (c.rx / c.ry), c.rx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Star particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.pulse += 0.04;
      if (p.y < 0) { p.y = H; p.x = Math.random() * W; }
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      const alpha = p.a * (0.5 + 0.5 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96,165,250,${alpha})`;
      ctx.fill();
    });

    // Connecting lines (subtle)
    ctx.strokeStyle = "rgba(59,130,246,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.globalAlpha = 1 - dist / 100;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    createParticles();
    draw(0);
  }

  const ro = new ResizeObserver(() => { resize(); createParticles(); });
  ro.observe(canvas.parentElement || document.body);

  start();

  // Pause when hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw(0);
  });
}

