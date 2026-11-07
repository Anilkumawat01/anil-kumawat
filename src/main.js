// ============================================================
// main.js — Anil Kumawat Cloud Portfolio
// Orchestrates: nav, hero, about, skills, projects, aws, contact, game
// ============================================================

import { CONFIG } from "./config.js";
import { initHeroCanvas } from "./hero-canvas.js";
import { initJourneyCanvas } from "./journey-canvas.js";
import { initOSIExperience } from "./osi-experience.js";

// ── Lite Mode ────────────────────────────────────────────────
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const webGLAvailable = (() => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch { return false; }
})();

// Low-end device heuristic
const isLowEnd = (() => {
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
  if (navigator.deviceMemory && navigator.deviceMemory <= 2) return true;
  return false;
})();

let liteMode = prefersReduced || !webGLAvailable || isLowEnd;

function applyLiteMode(on) {
  liteMode = on;
  document.body.classList.toggle("lite-mode", on);
  document.getElementById("liteLabel").textContent = on ? "Full" : "Lite";
  document.getElementById("liteIcon").textContent = on ? "✨" : "🌐";
}
applyLiteMode(liteMode);

document.getElementById("liteToggle").addEventListener("click", () => {
  applyLiteMode(!liteMode);
});

// ── Navbar scroll ────────────────────────────────────────────
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateNav() {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  // Active section highlighting
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// Hamburger
const hamburger = document.getElementById("hamburger");
const navLinksEl = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  const open = navLinksEl.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open);
});
// Close on nav link click (mobile)
navLinksEl.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinksEl.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// ── Resume Button ─────────────────────────────────────────────
if (CONFIG.resumePDF) {
  const btn = document.getElementById("resumeBtn");
  btn.href = CONFIG.resumePDF;
  btn.style.display = "";
}

// ── Hero Avatar ───────────────────────────────────────────────
if (CONFIG.photo) {
  document.getElementById("heroAvatar").innerHTML =
    `<img src="${CONFIG.photo}" alt="${CONFIG.name}" />`;
}

// ── Hero & Contact Social Icons (Crisp Brand SVGs) ────────────
const SOCIAL_ICONS = {
  linkedin: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.72.78-1.72 1.73s.77 1.72 1.72 1.72 1.73-.77 1.73-1.72-.78-1.73-1.73-1.73Z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/></svg>`,
  aws: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M18.73 13.56c-.22-.17-.53-.12-.69.11-1.39 1.95-3.56 3.12-5.97 3.12-3.1 0-5.83-1.89-6.93-4.8-.1-.26-.38-.4-.65-.3-.27.1-.41.38-.31.65 1.25 3.32 4.37 5.48 7.89 5.48 2.76 0 5.23-1.34 6.82-3.57.16-.23.11-.54-.16-.69zM19.98 12.01c-.13-.3-.47-.44-.77-.31l-1.35.58c-.3.13-.44.47-.31.77.1.24.34.38.59.38.06 0 .12-.01.18-.04l.73-.31c-.56 2.53-2.45 4.51-4.94 5.16-.31.08-.5.4-.42.71.07.28.32.47.6.47.04 0 .07 0 .11-.01 2.87-.75 5.04-3.03 5.68-5.95l.18.43c.09.21.3.34.52.34.07 0 .14-.02.2-.05.29-.12.42-.45.3-.74l-.69-1.38zm-11.2-5.6c-.32 0-.6.23-.65.55l-.75 4.54c-.05.33.17.63.5.68.03 0 .06.01.09.01.29 0 .54-.21.58-.51l.24-1.44h1.79l.24 1.44c.05.3.3.51.59.51.03 0 .06 0 .09-.01.33-.05.55-.35.5-.68l-.75-4.54c-.05-.32-.33-.55-.65-.55h-1.99zm.59 2.87l.4-2.4.4 2.4h-.8zm5.72-2.87c-.33 0-.6.27-.6.6v4.49c0 .33.27.6.6.6s.6-.27.6-.6v-4.49c0-.33-.27-.6-.6-.6zm3.32 0c-.33 0-.6.27-.6.6v2.79l-1.48-3.07c-.11-.2-.31-.32-.54-.32s-.43.12-.54.32l-1.48 3.07v-2.79c0-.33-.27-.6-.6-.6s-.6.27-.6.6v4.49c0 .33.27.6.6.6s.6-.27.6-.6v-1.84l1.19 2.47c.1.21.31.34.54.34s.44-.13.54-.34l1.19-2.47v1.84c0 .33.27.6.6.6s.6-.27.6-.6v-4.49c0-.33-.27-.6-.6-.6z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z"/></svg>`,
};

function renderHeroSocials() {
  const wrap = document.querySelector(".hero-socials");
  if (!wrap) return;
  wrap.innerHTML = "";
  Object.entries(CONFIG.socials).forEach(([key, s]) => {
    if (!s.url) return;
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = `social-icon-link social-${key}`;
    a.setAttribute("aria-label", s.label);
    a.title = s.label;
    a.innerHTML = SOCIAL_ICONS[key] || "🔗";
    wrap.appendChild(a);
  });
}
renderHeroSocials();

// ── About: Bio ────────────────────────────────────────────────
function renderAbout() {
  // Avatar
  if (CONFIG.photo) {
    document.getElementById("aboutAvatar").innerHTML =
      `<img src="${CONFIG.photo}" alt="${CONFIG.name}" />`;
  }
  // Bio lines
  const bioWrap = document.getElementById("aboutBio");
  CONFIG.bio.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line;
    bioWrap.appendChild(p);
  });

  // Quick facts
  const factsGrid = document.getElementById("quickFacts");
  CONFIG.quickFacts.forEach(f => {
    factsGrid.innerHTML += `
      <div class="fact-card">
        <div class="fact-icon">${f.icon}</div>
        <div>
          <div class="fact-label">${f.label}</div>
          <div class="fact-value">${f.value}</div>
        </div>
      </div>`;
  });

  // Education timeline
  const eduWrap = document.getElementById("eduTimeline");
  CONFIG.education.forEach(e => {
    eduWrap.innerHTML += `
      <div class="edu-card" role="listitem">
        <div class="edu-icon">${e.icon}</div>
        <div class="edu-level">${e.level}</div>
        <div class="edu-school">${e.school}</div>
        <div class="edu-board">${e.board}</div>
        <div class="edu-row">
          <span class="edu-year">📅 ${e.year}</span>
          ${e.score ? `<span class="edu-score">${e.score}</span>` : ""}
        </div>
      </div>`;
  });

  // Certifications
  const certsGrid = document.getElementById("certsGrid");
  CONFIG.certifications.forEach(c => {
    const el = document.createElement(c.link ? "a" : "div");
    el.className = "cert-card";
    if (c.link) { el.href = c.link; el.target = "_blank"; el.rel = "noopener noreferrer"; }
    el.innerHTML = `
      <div class="cert-badge">${c.badge ? `<img src="${c.badge}" alt="${c.title}" width="40">` : "🏅"}</div>
      <div class="cert-info">
        <div class="cert-title">${c.title}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-year">${c.year}</div>
        <div class="cert-detail">${c.detail}</div>
      </div>`;
    certsGrid.appendChild(el);
  });
}
renderAbout();

// ── Skills Journey Cards ──────────────────────────────────────
function renderJourneyCards() {
  const wrap = document.getElementById("journeyCards");
  const steps = document.getElementById("progressSteps");
  CONFIG.journeySteps.forEach((step, i) => {
    const div = document.createElement("div");
    div.className = "journey-step";
    div.id = `step-${i}`;
    div.innerHTML = `
      <div class="journey-card">
        <div class="journey-step-icon">${step.icon}</div>
        <div class="journey-step-body">
          <div class="journey-step-name">${step.name}</div>
          <div class="journey-step-fact">${step.fact}</div>
          <span class="level-pill ${step.level}">${step.level}</span>
        </div>
      </div>`;
    wrap.appendChild(div);
  });
  // Progress dots
  CONFIG.journeySteps.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "progress-dot";
    dot.style.cssText = `
      position:absolute; left:50%; transform:translateX(-50%);
      top:${(i / (CONFIG.journeySteps.length - 1)) * 100}%;
      width:8px; height:8px; border-radius:50%;
      background:rgba(59,130,246,0.3); transition:background 0.3s;
    `;
    dot.id = `dot-${i}`;
    steps.appendChild(dot);
  });
}
renderJourneyCards();

// IntersectionObserver for journey steps
const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      // Update progress dot
      const idx = parseInt(e.target.id.replace("step-",""));
      document.querySelectorAll(".progress-dot").forEach((dot, di) => {
        dot.style.background = di <= idx ? "var(--orange)" : "rgba(59,130,246,0.3)";
        dot.style.boxShadow = di === idx ? "0 0 8px var(--orange)" : "none";
      });
      // Progress bar
      const pct = ((idx + 1) / CONFIG.journeySteps.length) * 100;
      document.getElementById("progressFill").style.height = pct + "%";
      document.getElementById("journeyProgress").setAttribute("aria-valuenow", Math.round(pct));
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".journey-step").forEach(el => stepObserver.observe(el));

// ── All Skills Grid ───────────────────────────────────────────
function renderSkillsGrid() {
  const grid = document.getElementById("skillsGrid");
  CONFIG.skillGroups.forEach(group => {
    const card = document.createElement("div");
    card.className = "skill-group-card";
    card.innerHTML = `
      <div class="skill-group-header">
        <span class="skill-group-icon">${group.icon}</span>
        <span class="skill-group-name">${group.group}</span>
      </div>
      <div class="skill-items">
        ${group.skills.map(s => `
          <div class="skill-item">
            <span class="skill-item-icon">${s.icon}</span>
            <div class="skill-item-body">
              <div class="skill-item-name">
                ${s.name}${s.link ? ` <a href="${s.link}" target="_blank" rel="noopener noreferrer" aria-label="${s.name} (opens new tab)">↗</a>` : ""}
                <span class="level-pill ${s.level}" style="margin-left:0.4rem">${s.level}</span>
              </div>
              <div class="skill-item-what">${s.what}</div>
            </div>
          </div>`).join("")}
      </div>`;
    grid.appendChild(card);
  });
}
renderSkillsGrid();

// ── Projects ──────────────────────────────────────────────────
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  CONFIG.projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-header">
        <span class="project-emoji">${p.icon}</span>
        <div class="project-titles">
          <div class="project-title">${p.title}</div>
          <div class="project-subtitle">${p.subtitle}</div>
        </div>
      </div>
      <p class="project-desc">${p.description}</p>
      ${p.impact ? `<div class="project-impact">${p.impact}</div>` : ""}
      <div class="tech-tags">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}</div>
      <div class="project-links">
        ${p.github ? `<a href="${p.github}" class="project-link github" target="_blank" rel="noopener noreferrer" aria-label="View ${p.title} source on GitHub">💻 GitHub</a>` : ""}
        ${p.live ? `<a href="${p.live}" class="project-link live" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.title} live demo">${p.liveLabel ? "▶ " + p.liveLabel : "🚀 Live Demo"}</a>` : ""}
      </div>`;
    grid.appendChild(card);
  });
}
renderProjects();

// ── AWS Section ───────────────────────────────────────────────
function renderAWS() {
  const grid = document.getElementById("awsServicesGrid");
  CONFIG.awsServices.forEach(s => {
    const a = document.createElement("a");
    a.href = s.link; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.className = "aws-service-card";
    a.setAttribute("aria-label", `${s.name}: ${s.why}`);
    a.innerHTML = `
      <div class="aws-service-header">
        <span class="aws-service-icon">${s.icon}</span>
        <span class="aws-service-name">${s.name}</span>
      </div>
      <p class="aws-service-why">${s.why}</p>`;
    grid.appendChild(a);
  });

  const learnings = document.getElementById("awsLearnings");
  CONFIG.awsLearnings.forEach(l => {
    learnings.innerHTML += `<li>${l}</li>`;
  });
  const challenges = document.getElementById("awsChallenges");
  CONFIG.awsChallenges.forEach(c => {
    challenges.innerHTML += `<li>${c}</li>`;
  });
}
renderAWS();

// ── Contact Social Links ──────────────────────────────────────
function renderContactSocials() {
  const grid = document.getElementById("socialLinksGrid");
  if (!grid) return;
  grid.innerHTML = "";
  Object.entries(CONFIG.socials).forEach(([key, s]) => {
    if (!s.url) return;
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = `social-big-link platform-${key}`;
    a.setAttribute("aria-label", `${s.label}${s.handle ? " — " + s.handle : ""}`);

    let prefix = "@";
    let cleanHandle = s.handle || "";
    if (key === "linkedin") {
      prefix = "in/";
      cleanHandle = cleanHandle.replace(/^in\//, "");
    } else if (key === "github" || key === "instagram" || key === "youtube" || key === "twitter") {
      prefix = "@";
      cleanHandle = cleanHandle.replace(/^@/, "");
    } else if (key === "aws") {
      prefix = "☁ ";
    } else if (key === "email") {
      prefix = "✉ ";
    }

    a.innerHTML = `
      <div class="social-big-icon-wrap platform-icon-${key}">
        ${SOCIAL_ICONS[key] || "🔗"}
      </div>
      <div class="social-big-content">
        <div class="social-big-label">${s.label}</div>
        ${s.handle ? `<div class="social-big-handle"><span class="handle-prefix">${prefix}</span><span class="handle-text">${cleanHandle}</span></div>` : ""}
      </div>
      <div class="social-big-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
      </div>`;
    grid.appendChild(a);
  });
}
renderContactSocials();

// ── Copy Email ────────────────────────────────────────────────
document.getElementById("copyEmail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONFIG.socials.email.raw);
    const c = document.getElementById("copyConfirm");
    c.classList.add("show");
    setTimeout(() => c.classList.remove("show"), 2500);
  } catch {}
});

// ── Royal OSI Mission Experience (Creative Feature) ─────────
const osi = initOSIExperience({
  onClose: () => {
    // Modal closed
  }
});

["openOSIHero", "openOSISection", "floatingDNPBtn"].forEach(id => {
  document.getElementById(id)?.addEventListener("click", () => {
    osi.open();
  });
});

document.getElementById("closeOSI")?.addEventListener("click", () => {
  osi.close();
});

// Esc key to close
window.addEventListener("keydown", e => {
  const osiModal = document.getElementById("osiModal");
  if (e.key === "Escape" && osiModal && !osiModal.hasAttribute("hidden")) {
    osi.close();
  }
});

// ── Hero canvas & Journey canvas ──────────────────────────────
if (!liteMode) {
  initHeroCanvas(document.getElementById("heroCanvas"));
  initJourneyCanvas(document.getElementById("journeyCanvas"));
}

// ── Scroll animations (generic) ───────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("revealed");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".glass-card, .project-card, .edu-card, .cert-card, .skill-group-card, .aws-service-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  revealObserver.observe(el);
});
// Add CSS for revealed
const revealStyle = document.createElement("style");
revealStyle.textContent = ".revealed { opacity: 1 !important; transform: translateY(0) !important; }";
document.head.appendChild(revealStyle);

// ── 404 / Broken link guard ───────────────────────────────────
// Ensure no empty hrefs slip through
document.querySelectorAll("a[href='#']").forEach(a => {
  if (!a.id && !a.className.includes("nav")) {
    a.style.display = "none";
  }
});

// ── Floating button hide near contact ────────────────────────
const contactSection = document.getElementById("contact");
const floatingBtn = document.getElementById("floatingDNPBtn");
const floatObserver = new IntersectionObserver(entries => {
  entries.forEach(e => floatingBtn?.classList.toggle("hide", e.isIntersecting));
}, { threshold: 0.1 });
if (contactSection && floatingBtn) floatObserver.observe(contactSection);

console.log("☁️ Anil Kumawat Portfolio loaded. AWS Amplify deployed. Build: Vite 5.");

