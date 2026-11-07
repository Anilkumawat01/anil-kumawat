// ============================================================
// game.js — Cloud Journey Runner
// 3-lane pseudo-3D endless runner, 8 levels, Subway-Surfers style
// Pure canvas 2D — no external deps
// ============================================================

// Polyfill roundRect for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };
}

export function initGame({ onWin, onClose }) {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // ── Level definitions ─────────────────────────────────────
  const LEVELS = [
    {
      id: 1, name: "Curiosity & School",
      icon: "📚", bg: "#0a1628",
      fact: "10th grade — 87% at Jawahar Memorial. Curiosity ignited!",
      collectible: "📗", obstacle: "😴",
      obstacleName: "Distraction", theme: [59, 130, 246],
    },
    {
      id: 2, name: "Coding Begins",
      icon: "💻", bg: "#0d1f10",
      fact: "Learning C++, Java, Python — writing first programs!",
      collectible: "⚙️", obstacle: "🐛",
      obstacleName: "Bug", theme: [34, 197, 94],
    },
    {
      id: 3, name: "Networking",
      icon: "🌐", bg: "#120a28",
      fact: "IP, DNS, TCP/IP, Subnets — the internet decoded!",
      collectible: "🌐", obstacle: "🔌",
      obstacleName: "Downtime", theme: [139, 92, 246],
    },
    {
      id: 4, name: "Linux Power",
      icon: "🐧", bg: "#0a1a10",
      fact: "Terminal mastered. The cloud engineer's superpower!",
      collectible: "🐧", obstacle: "💥",
      obstacleName: "Crash", theme: [22, 163, 74],
    },
    {
      id: 5, name: "AWS Core",
      icon: "🟠", bg: "#1a0d08",
      fact: "EC2, S3, IAM, VPC — hands-on on AWS!",
      collectible: "🟠", obstacle: "⚠️",
      obstacleName: "Misconfig", theme: [249, 115, 22],
    },
    {
      id: 6, name: "Serverless & DevOps",
      icon: "⚡", bg: "#0a1420",
      fact: "Lambda, Docker, CI/CD, Amplify — ship faster!",
      collectible: "⚡", obstacle: "🚧",
      obstacleName: "Pipeline Fail", theme: [59, 130, 246],
    },
    {
      id: 7, name: "GreenCloud AI",
      icon: "🌱", bg: "#091a0a",
      fact: "My project: detecting idle cloud instances to cut carbon!",
      collectible: "🌱", obstacle: "🗑️",
      obstacleName: "Idle Instance", theme: [34, 197, 94],
    },
    {
      id: 8, name: "Cloud Engineer 🏆",
      icon: "🏆", bg: "#1a1000",
      fact: "HIRED! Turning curiosity into a cloud career!",
      collectible: "⭐", obstacle: "🚫",
      obstacleName: "Rejection", theme: [234, 179, 8],
    },
  ];

  const CHARACTER_STAGES = ["🧒", "📚", "🎓", "💻", "☁️", "🟠", "🏗️", "🏆"];
  const ORBS_PER_LEVEL = 5;
  const LANES = 3;
  const LANE_POSITIONS = [0.25, 0.5, 0.75]; // fractions of canvas width
  const GRAVITY = 0.6;
  const JUMP_VY = -14;

  // ── State ─────────────────────────────────────────────────
  let state = createInitialState();

  function createInitialState() {
    return {
      running: false, paused: false, over: false, won: false,
      score: 0, level: 0, lives: 3, orbsCollected: 0,
      player: { lane: 1, y: 0, vy: 0, jumping: false, sliding: false, slideTimer: 0 },
      obstacles: [], collectibles: [], particles: [],
      speed: 4, spawnTimer: 0, spawnInterval: 90,
      bgOffset: 0, groundY: 0,
      soundOn: false,
    };
  }

  // ── HUD refs ──────────────────────────────────────────────
  const scoreEl = document.getElementById("gameScore");
  const livesEl = document.getElementById("gameLives");
  const levelEl = document.getElementById("gameLevel");
  const levelBanner = document.getElementById("levelBanner");
  const levelBannerIcon = document.getElementById("levelBannerIcon");
  const levelBannerName = document.getElementById("levelBannerName");
  const levelBannerFact = document.getElementById("levelBannerFact");
  const pauseOverlay = document.getElementById("pauseOverlay");
  const gameoverOverlay = document.getElementById("gameoverOverlay");
  const winOverlay = document.getElementById("winOverlay");

  // ── Canvas sizing ─────────────────────────────────────────
  function resizeCanvas() {
    const wrap = canvas.parentElement;
    canvas.width = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
    state.groundY = canvas.height * 0.75;
  }

  const ro = new ResizeObserver(resizeCanvas);
  ro.observe(canvas.parentElement);
  resizeCanvas();

  // ── Input ─────────────────────────────────────────────────
  let touchStartX = 0, touchStartY = 0, touchStartT = 0;

  window.addEventListener("keydown", onKey);

  function onKey(e) {
    if (document.getElementById("gameModal").hasAttribute("hidden")) return;
    switch (e.key) {
      case "ArrowLeft":  case "a": case "A": moveLane(-1); e.preventDefault(); break;
      case "ArrowRight": case "d": case "D": moveLane(1);  e.preventDefault(); break;
      case "ArrowUp":   case "w": case "W": case " ": jump(); e.preventDefault(); break;
      case "ArrowDown": case "s": case "S": slide(); e.preventDefault(); break;
      case "p": case "P": togglePause(); break;
    }
  }

  canvas.addEventListener("touchstart", e => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX; touchStartY = t.clientY;
    touchStartT = Date.now();
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchend", e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    const dt = Date.now() - touchStartT;
    const THRESHOLD = 30;
    if (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD && dt < 300) {
      jump(); // tap = jump
    } else if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -THRESHOLD) moveLane(-1);
      else if (dx > THRESHOLD) moveLane(1);
    } else {
      if (dy < -THRESHOLD) jump();
      else if (dy > THRESHOLD) slide();
    }
    e.preventDefault();
  }, { passive: false });

  // On-screen buttons
  document.getElementById("ctrlLeft")?.addEventListener("click", () => moveLane(-1));
  document.getElementById("ctrlRight")?.addEventListener("click", () => moveLane(1));
  document.getElementById("ctrlJump")?.addEventListener("click", jump);
  document.getElementById("ctrlDown")?.addEventListener("click", slide);

  // Show mobile controls on touch devices
  if ("ontouchstart" in window) {
    const mob = document.querySelector(".game-controls-mobile");
    if (mob) mob.style.display = "flex";
  }

  function moveLane(dir) {
    if (!state.running || state.paused || state.over || state.won) return;
    state.player.lane = Math.max(0, Math.min(LANES - 1, state.player.lane + dir));
  }

  function jump() {
    if (!state.running || state.paused || state.over || state.won) return;
    if (!state.player.jumping) {
      state.player.vy = JUMP_VY;
      state.player.jumping = true;
    }
  }

  function slide() {
    if (!state.running || state.paused || state.over || state.won) return;
    state.player.sliding = true;
    state.player.slideTimer = 40;
  }

  // ── Game loop ─────────────────────────────────────────────
  let animId = null;
  let lastTs = 0;
  let frameCount = 0;

  // Auto-reduce quality on low-end
  const isLowEnd = navigator.hardwareConcurrency <= 2 || (navigator.deviceMemory && navigator.deviceMemory <= 2);
  const MAX_PARTICLES = isLowEnd ? 10 : 40;
  const CAP_FPS = isLowEnd ? 30 : 60;
  let fpsInterval = 1000 / CAP_FPS;
  let lastFpsTs = 0;

  function loop(ts) {
    animId = requestAnimationFrame(loop);
    if (!state.running || state.paused) return;

    // FPS cap
    const elapsed = ts - lastFpsTs;
    if (elapsed < fpsInterval) return;
    lastFpsTs = ts - (elapsed % fpsInterval);

    update();
    render();
  }

  function update() {
    frameCount++;
    state.bgOffset = (state.bgOffset + state.speed * 0.5) % canvas.height;

    // Player physics
    const p = state.player;
    p.y += p.vy;
    p.vy += GRAVITY;
    if (p.y >= 0) { p.y = 0; p.vy = 0; p.jumping = false; }
    if (p.slideTimer > 0) { p.slideTimer--; }
    else { p.sliding = false; }

    // Spawn obstacles & collectibles
    state.spawnTimer++;
    if (state.spawnTimer >= state.spawnInterval) {
      state.spawnTimer = 0;
      spawnObjects();
    }

    // Move objects
    const level = LEVELS[state.level];
    state.obstacles.forEach(o => {
      o.z -= state.speed * 0.04;
      if (o.z <= 0) o.dead = true;
    });
    state.collectibles.forEach(c => {
      c.z -= state.speed * 0.04;
      if (c.z <= 0) c.dead = true;
      c.bob += 0.1;
    });
    state.obstacles = state.obstacles.filter(o => !o.dead);
    state.collectibles = state.collectibles.filter(c => !c.dead);

    // Particles
    state.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life--; p.vy += 0.1; });
    state.particles = state.particles.filter(p => p.life > 0);

    // Collision detection
    const playerLaneX = laneX(p.lane);
    const pY = state.groundY + p.y;
    const pW = 30, pH = p.sliding ? 20 : 50;

    state.obstacles.forEach(o => {
      if (o.dead) return;
      const { sx, sy, sw, sh } = projectObject(o);
      if (Math.abs(sx - playerLaneX) < (pW + sw) * 0.4 && Math.abs(sy - pY) < (pH + sh) * 0.4) {
        o.dead = true;
        takeDamage();
        spawnParticles(sx, sy, "#ef4444", 10);
      }
    });

    state.collectibles.forEach(c => {
      if (c.dead) return;
      const { sx, sy, sw, sh } = projectObject(c);
      if (Math.abs(sx - playerLaneX) < (pW + sw) * 0.5 && Math.abs(sy - pY) < (pH + sh) * 0.5) {
        c.dead = true;
        collectOrb(sx, sy);
      }
    });

    // Score
    state.score += Math.floor(state.speed * 0.1);
    state.speed = 4 + state.level * 0.8 + frameCount * 0.0003;
    updateHUD();
  }

  function laneX(lane) {
    return LANE_POSITIONS[lane] * canvas.width;
  }

  function projectObject(o) {
    // Pseudo-3D projection: objects come from center horizon
    const perspective = 1 / (o.z + 0.1);
    const lx = LANE_POSITIONS[o.lane] * canvas.width;
    const sx = canvas.width / 2 + (lx - canvas.width / 2) * perspective;
    const sy = canvas.height * 0.3 + (state.groundY - canvas.height * 0.3) * (1 - o.z);
    const scale = perspective * 0.6;
    const sw = 30 * scale, sh = 30 * scale;
    return { sx, sy, sw, sh, scale };
  }

  function spawnObjects() {
    const occupiedLanes = new Set();
    // Obstacle (60% chance)
    if (Math.random() < 0.6) {
      const lane = Math.floor(Math.random() * LANES);
      occupiedLanes.add(lane);
      state.obstacles.push({ lane, z: 1, dead: false });
    }
    // Collectible (always at least 1 open lane)
    const freeLanes = [0, 1, 2].filter(l => !occupiedLanes.has(l));
    if (freeLanes.length) {
      const lane = freeLanes[Math.floor(Math.random() * freeLanes.length)];
      state.collectibles.push({ lane, z: 1, dead: false, bob: Math.random() * Math.PI * 2 });
    }
  }

  function takeDamage() {
    state.lives--;
    updateHUD();
    if (state.lives <= 0) gameOver();
  }

  function collectOrb(sx, sy) {
    state.orbsCollected++;
    state.score += 100;
    spawnParticles(sx, sy, "#fbbf24", 15);
    if (state.orbsCollected >= ORBS_PER_LEVEL) {
      state.orbsCollected = 0;
      nextLevel();
    }
  }

  function nextLevel() {
    if (state.level >= LEVELS.length - 1) {
      win();
      return;
    }
    state.level++;
    state.obstacles = [];
    state.collectibles = [];
    showLevelBanner();
    updateHUD();
  }

  function showLevelBanner() {
    const level = LEVELS[state.level];
    state.paused = true;
    levelBannerIcon.textContent = level.icon;
    levelBannerName.textContent = `Level ${level.id}: ${level.name}`;
    levelBannerFact.textContent = level.fact;
    levelBanner.removeAttribute("hidden");
    setTimeout(() => {
      levelBanner.setAttribute("hidden", "");
      state.paused = false;
    }, 2500);
  }

  function gameOver() {
    state.running = false; state.over = true;
    document.getElementById("finalLevel").textContent = state.level + 1;
    document.getElementById("finalScore").textContent = state.score;
    gameoverOverlay.removeAttribute("hidden");
  }

  function win() {
    state.running = false; state.won = true;
    document.getElementById("winScore").textContent = state.score;
    winOverlay.removeAttribute("hidden");
    startConfetti();
    if (onWin) onWin();
  }

  function spawnParticles(x, y, color, count) {
    if (state.particles.length > MAX_PARTICLES) return;
    for (let i = 0; i < count; i++) {
      state.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 1) * 6,
        color,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        r: 3 + Math.random() * 4,
      });
    }
  }

  // ── Render ────────────────────────────────────────────────
  function render() {
    const level = LEVELS[state.level];
    const W = canvas.width, H = canvas.height;
    const gY = state.groundY;

    ctx.clearRect(0, 0, W, H);

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    const [r, g, b] = level.theme;
    sky.addColorStop(0, level.bg);
    sky.addColorStop(0.5, `rgba(${r},${g},${b},0.15)`);
    sky.addColorStop(1, `rgba(${r},${g},${b},0.4)`);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Stars / bg particles
    if (!isLowEnd) drawBgDots(r, g, b);

    // Ground
    drawGround(gY, W, H, r, g, b);

    // Lane lines (perspective)
    drawLanes(gY, W, H, r, g, b);

    // Collectibles (behind player)
    state.collectibles.forEach(c => drawCollectible(c, level));

    // Obstacles (behind player)
    state.obstacles.forEach(o => drawObstacle(o, level));

    // Player
    drawPlayer(gY);

    // Particles
    state.particles.forEach(pt => {
      const alpha = pt.life / pt.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Orb progress bar
    drawOrbProgress(W);

    // Speed lines (foreground FX)
    if (!isLowEnd) drawSpeedLines(W, H, r, g, b);
  }

  function drawBgDots(r, g, b) {
    const W = canvas.width, H = canvas.height;
    for (let i = 0; i < 40; i++) {
      const x = (i * 73 + frameCount * 0.3) % W;
      const y = (i * 97 + Math.sin(i + frameCount * 0.01) * 10) % (state.groundY * 0.8);
      const alpha = 0.1 + Math.sin(i + frameCount * 0.05) * 0.08;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();
    }
  }

  function drawGround(gY, W, H, r, g, b) {
    // Ground plane
    const gGrad = ctx.createLinearGradient(0, gY, 0, H);
    gGrad.addColorStop(0, `rgba(${r},${g},${b},0.3)`);
    gGrad.addColorStop(1, `rgba(${r},${g},${b},0.05)`);
    ctx.fillStyle = gGrad;
    ctx.fillRect(0, gY, W, H - gY);

    // Ground line
    ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, gY); ctx.lineTo(W, gY);
    ctx.stroke();
  }

  function drawLanes(gY, W, H, r, g, b) {
    const horizon = H * 0.3;
    const cx = W / 2;
    // 4 dividing lines
    [-1.5, -0.5, 0.5, 1.5].forEach(factor => {
      const baseX = cx + factor * W * 0.25;
      ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([10, 15]);
      ctx.lineDashOffset = -(state.bgOffset % 25);
      ctx.beginPath();
      ctx.moveTo(cx + factor * 20, horizon);
      ctx.lineTo(baseX, H);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  function drawCollectible(c, level) {
    const { sx, sy, sw, sh, scale } = projectObject(c);
    if (sy < canvas.height * 0.3 || sy > canvas.height) return;
    const bobY = Math.sin(c.bob + frameCount * 0.1) * 5 * scale;
    ctx.font = `${Math.max(10, 24 * scale)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Glow
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 10 * scale;
    ctx.fillText(level.collectible, sx, sy + bobY - sh);
    ctx.shadowBlur = 0;
  }

  function drawObstacle(o, level) {
    const { sx, sy, sw, sh, scale } = projectObject(o);
    if (sy < canvas.height * 0.3 || sy > canvas.height) return;
    ctx.font = `${Math.max(10, 28 * scale)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 8 * scale;
    ctx.fillText(level.obstacle, sx, sy - sh * 0.5);
    // Label
    if (scale > 0.5) {
      ctx.font = `${Math.max(8, 10 * scale)}px Inter,sans-serif`;
      ctx.fillStyle = "rgba(239,68,68,0.8)";
      ctx.fillText(level.obstacleName, sx, sy + sh * 0.5);
    }
    ctx.shadowBlur = 0;
  }

  function drawPlayer(gY) {
    const p = state.player;
    const x = laneX(p.lane);
    const pY = gY + p.y;
    const stage = Math.min(state.level, CHARACTER_STAGES.length - 1);
    const pSize = p.sliding ? 24 : 40;
    const emojiY = p.sliding ? pY - 12 : pY - pSize;
    const skew = p.lane === 0 ? -0.1 : p.lane === 2 ? 0.1 : 0;

    ctx.save();
    ctx.translate(x, pY);
    ctx.transform(1, 0, skew, 1, 0, 0);
    ctx.translate(-x, -pY);

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(x, pY, 20, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Character emoji
    ctx.font = `${pSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.shadowColor = "rgba(59,130,246,0.6)";
    ctx.shadowBlur = 15;
    ctx.fillText(CHARACTER_STAGES[stage], x, emojiY + (p.sliding ? 20 : 40));
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawOrbProgress(W) {
    const pct = state.orbsCollected / ORBS_PER_LEVEL;
    const barW = Math.min(300, W * 0.5);
    const barX = (W - barW) / 2;
    const barY = 20;
    const barH = 8;

    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 4);
    ctx.fill();

    if (pct > 0) {
      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW * pct, barH, 4);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Orb count label
    ctx.font = "11px Inter,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.textAlign = "center";
    ctx.fillText(`${state.orbsCollected}/${ORBS_PER_LEVEL} orbs to advance`, W / 2, barY + 22);
  }

  function drawSpeedLines(W, H, r, g, b) {
    const count = Math.min(8, Math.floor(state.speed));
    for (let i = 0; i < count; i++) {
      const x = (i * (W / count) + (frameCount * state.speed * 2) % (W / count));
      const len = 20 + state.speed * 5;
      const y = state.groundY - 10 + Math.sin(i * 2.3) * 20;
      ctx.strokeStyle = `rgba(${r},${g},${b},0.08)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + len, y);
      ctx.stroke();
    }
  }

  function updateHUD() {
    scoreEl.textContent = `Score: ${state.score}`;
    livesEl.textContent = "❤️".repeat(Math.max(0, state.lives)) + "🖤".repeat(Math.max(0, 3 - state.lives));
    levelEl.textContent = `Level ${state.level + 1}: ${LEVELS[state.level].name}`;
  }

  // ── Confetti ──────────────────────────────────────────────
  let confettiPieces = [], confettiId = null;

  function startConfetti() {
    const cc = document.getElementById("confettiCanvas");
    if (!cc) return;
    cc.width = cc.parentElement.clientWidth;
    cc.height = cc.parentElement.clientHeight;
    const cctx = cc.getContext("2d");
    confettiPieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * cc.width, y: Math.random() * cc.height - cc.height,
      vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 3,
      color: ["#f97316","#3b82f6","#22c55e","#fbbf24","#ec4899"][Math.floor(Math.random() * 5)],
      r: 4 + Math.random() * 6, angle: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.2,
    }));
    function drawConfetti() {
      cctx.clearRect(0, 0, cc.width, cc.height);
      confettiPieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.angle += p.va;
        if (p.y > cc.height) { p.y = -10; p.x = Math.random() * cc.width; }
        cctx.save();
        cctx.translate(p.x, p.y); cctx.rotate(p.angle);
        cctx.fillStyle = p.color;
        cctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.5);
        cctx.restore();
      });
      confettiId = requestAnimationFrame(drawConfetti);
    }
    drawConfetti();
    setTimeout(() => {
      cancelAnimationFrame(confettiId);
      cctx.clearRect(0, 0, cc.width, cc.height);
    }, 6000);
  }

  // ── Public API ────────────────────────────────────────────
  function start() {
    state = createInitialState();
    state.running = true;
    frameCount = 0;
    // Hide overlays
    [pauseOverlay, gameoverOverlay, winOverlay, levelBanner].forEach(el => el?.setAttribute("hidden", ""));
    updateHUD();
    showLevelBanner();
    if (animId) cancelAnimationFrame(animId);
    animId = requestAnimationFrame(loop);
  }

  function pause() {
    if (!state.running) return;
    state.paused = true;
    pauseOverlay?.removeAttribute("hidden");
  }

  function resume() {
    state.paused = false;
    pauseOverlay?.setAttribute("hidden", "");
  }

  function togglePause() {
    if (state.paused) resume(); else pause();
  }

  function restart() {
    cancelAnimationFrame(animId);
    [pauseOverlay, gameoverOverlay, winOverlay].forEach(el => el?.setAttribute("hidden", ""));
    start();
  }

  function setSound(on) {
    state.soundOn = on;
  }

  // Auto-start
  start();

  return { pause, resume, togglePause, restart, setSound };
}

