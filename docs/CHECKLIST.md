# ✅ Pre-Submission Checklist — AWS Student Builder Challenge 2026

**Builder:** Anil Kumawat  
**Project:** My Cloud Journey Portfolio

---

## 🎨 Rubric 1: Creativity & Memorability (30%)

- [ ] Game launches from the **glowing hero button** ("Play My Cloud Journey 🎮")
- [ ] Game launches from the **floating button** (bottom-right, always visible)
- [ ] Game launches from the **#game section** button
- [ ] 8 levels completed — each maps to a real stage of Anil's journey
- [ ] Character visually evolves (🧒 → 🏆) across levels
- [ ] Each level shows a **banner with a real personal fact**
- [ ] Level 7 = GreenCloud AI (real project)
- [ ] Win state: **confetti + "Hire Me!" button** → scrolls to #contact
- [ ] Obstacles have meaningful names (Bug, Downtime, Misconfig, Idle Instance)
- [ ] Mobile: game playable on a 360px-wide phone with on-screen controls
- [ ] `prefers-reduced-motion` respected — game respects the setting

---

## ☁️ Rubric 2: Working AWS Implementation (25%)

- [ ] Site is **live on a public Amplify URL** (not localhost)
- [ ] URL starts with `https://` — padlock visible
- [ ] Amplify console shows **"Deployment successful"**
- [ ] Build log shows `npm ci` → `npm run build` → artifacts from `dist/`
- [ ] **#aws section** is visible on the site with:
  - [ ] Inline SVG architecture diagram (GitHub → Amplify → CloudFront → Visitor)
  - [ ] Service cards for Amplify, CloudFront, HTTPS, Builder Center
  - [ ] "What I Learned" and "Challenges" lists
- [ ] `README.md` lists all AWS services and links to their documentation
- [ ] No broken external links (run `npm run check-links`)

---

## 📝 Rubric 3: Communication Quality (25%)

- [ ] `README.md` present with: overview, live URL, features, tech stack, AWS services, setup, how to edit config.js, screenshots, learnings, challenges
- [ ] `docs/SUBMISSION.md` present with first-person write-up: summary, creative feature guide, AWS services, challenges/fixes, learnings, screenshot checklist
- [ ] `docs/README_GREENCLOUD.md` ready to paste into the GreenCloud AI repo
- [ ] In-site **#aws section** serves as "How I Built This" (visible to judges without reading docs)
- [ ] All section headings match what the rubric expects (About, Skills, Projects, AWS, Contact)

---

## 🖥️ Rubric 4: Completeness & Usability (20%)

### Sections present and clearly labeled:
- [ ] **#about** — About Me (bio, photo/avatar, education timeline, certifications)
- [ ] **#skills** — Skills / Tech Superpowers (3D journey + all-skills grid)
- [ ] **#projects** — Projects / Achievements (4 cards with links)
- [ ] **#game** — Creative Feature (game section + launcher)
- [ ] **#aws** — Built on AWS (architecture + services)
- [ ] **#contact** — Socials & Contact

### Navigation:
- [ ] Sticky nav visible on all sections
- [ ] Hamburger menu works on mobile
- [ ] All `#section` anchor links scroll correctly
- [ ] Active nav link highlights on scroll

### Content:
- [ ] Bio displayed **exactly** as specified (all 7 lines with emojis)
- [ ] Education timeline: 10th (87%, 2022), 12th (81.4%, 2024), B.Tech (ongoing)
- [ ] Certifications: AWS Student Builder Challenge, AWS Builder Center
- [ ] All 6 skill groups present with correct skills
- [ ] GreenCloud AI card: GitHub + live links + impact line
- [ ] Social links: Instagram, LinkedIn, GitHub, YouTube, AWS, Email

### Social Links (critical):
- [ ] All links are **absolute HTTPS URLs** (no relative paths, no dead `#` links)
- [ ] All links open in a **new tab** with `rel="noopener noreferrer"`
- [ ] Touch targets **≥ 44px** on mobile
- [ ] Floating game button **does NOT overlap** social links in contact section
- [ ] Copy-email button works and shows "Copied!" confirmation
- [ ] Run `npm run check-links` → 0 errors

### Responsive:
- [ ] Desktop (1280px+): all sections visible, no overflow
- [ ] Tablet (768px): nav collapses to hamburger, 2-col grids collapse
- [ ] Mobile (360px): single column, text readable, buttons tappable
- [ ] 4K (1920px+): content max-width limits, no huge empty space

### Accessibility:
- [ ] Skip-to-content link visible on Tab press
- [ ] All images have alt text
- [ ] All interactive elements have ARIA labels
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus rings visible on all interactive elements
- [ ] Game canvas has ARIA label and game controls have ARIA labels

### Performance:
- [ ] Fonts loaded via Google Fonts (no render-blocking)
- [ ] Scripts deferred (`type="module"`)
- [ ] No broken console errors
- [ ] Lite mode toggle works

---

## 🔗 Manual Link Test (click every one on desktop AND mobile)

| Link | URL | ✅ Desktop | ✅ Mobile |
|---|---|---|---|
| Instagram | https://www.instagram.com/techy_ai30 | | |
| LinkedIn | https://www.linkedin.com/in/anil-kumawat-7609a1383 | | |
| GitHub | https://github.com/Anilkumawat01 | | |
| YouTube | https://www.youtube.com/@Ai_tools_Automations | | |
| AWS Builder | https://builder.aws.com?inviteId=d04eceb2... | | |
| Email (mailto) | mailto:anil707396@gmail.com | | |
| Copy email | (button) | | |
| GreenCloud GitHub | https://github.com/Anilkumawat01/green-cloud-Ai | | |
| GreenCloud Live | https://greencloud-5vl7b2mmn-anil01.vercel.app/ | | |
| Portfolio GitHub | https://github.com/Anilkumawat01/anil-kumawat | | |
| Footer GitHub | (same as above) | | |

---

## 🎯 Final Go/No-Go

- [ ] Live URL works (paste in incognito window)
- [ ] Mobile works (paste on a real phone or BrowserStack)
- [ ] Game plays to completion (all 8 levels, confetti, Hire Me button)
- [ ] `npm run check-links` → 0 errors
- [ ] No console errors on page load
- [ ] Submission form filled with live URL, GitHub URL, and screenshots
- [ ] `docs/SUBMISSION.md` content pasted into the hackathon form
- [ ] README updated with actual live Amplify URL

---

**Ship it! ☁️🚀**

