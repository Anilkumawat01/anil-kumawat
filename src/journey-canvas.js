// ============================================================
// journey-canvas.js — Pseudo-3D tunnel/path for skills journey
// Pure canvas 2D (no Three.js dependency) for maximum compat
// ============================================================

export function initJourneyCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let W, H, animId;
  const dots = [];
  let scrollProgress = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initDots();
  }

  function initDots() {
    dots.length = 0;
    for (let i = 0; i < 120; i++) {
      dots.push({
        x: Math.random() * 2 - 1, // -1 to 1 (normalized)
        y: Math.random() * 2 - 1,
        z: Math.random(),         // 0=far, 1=near
        speed: 0.001 + Math.random() * 0.002,
        hue: Math.random() > 0.5 ? 220 : 25,
        size: Math.random() * 2 + 0.5,
      });
    }
  }

  // Track scroll position of the journey wrapper
  function getScrollProgress() {
    const wrapper = document.getElementById("journeyWrapper");
    if (!wrapper) return 0;
    const rect = wrapper.getBoundingClientRect();
    const total = wrapper.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / total));
  }

  function draw() {
    scrollProgress = getScrollProgress();
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const speed = 0.003 + scrollProgress * 0.008;

    // Draw tunnel rings
    const rings = 12;
    for (let r = 0; r < rings; r++) {
      const t = (r / rings + scrollProgress * 0.4) % 1;
      const size = (1 - t) * Math.min(W, H) * 0.5;
      const alpha = t * 0.15;
      ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, size, size * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Moving road-like lines
    for (let i = -3; i <= 3; i++) {
      const spread = i * 80;
      const alpha = 0.08;
      ctx.strokeStyle = `rgba(249,115,22,${alpha})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([10, 20]);
      ctx.lineDashOffset = -(scrollProgress * 500) % 30;
      ctx.beginPath();
      ctx.moveTo(cx + spread * 0.1, cy - 50);
      ctx.lineTo(cx + spread, cy + H * 0.5);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Update & draw star dots
    dots.forEach(d => {
      d.z -= speed;
      if (d.z <= 0) {
        d.z = 1;
        d.x = Math.random() * 2 - 1;
        d.y = Math.random() * 2 - 1;
      }
      const perspective = 1 / (d.z + 0.1);
      const sx = cx + d.x * perspective * W * 0.4;
      const sy = cy + d.y * perspective * H * 0.3;
      const sr = d.size * perspective;
      const alpha = Math.min(1, (1 - d.z) * 1.5) * 0.6;

      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${d.hue},80%,70%,${alpha})`;
      ctx.fill();
    });

    // Center glow
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
    grad.addColorStop(0, "rgba(59,130,246,0.08)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    animId = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement || document.body);

  resize();
  draw();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
}

