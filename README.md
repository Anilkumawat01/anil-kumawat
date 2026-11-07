# ☁️ Anil Kumawat — Cloud Journey Portfolio

> **AWS Student Builder Challenge 2026 — Build Your Tech Superpower**  
> Live URL: `https://YOUR_AMPLIFY_URL.amplifyapp.com` ← *Update after deploy*

---

## 🚀 What This Is

A **single-page, scroll-driven, 3D storytelling portfolio** for Anil Kumawat — an aspiring Cloud Engineer from Bikaner, Rajasthan. The story goes: *"From a curious child to a placement-ready Cloud Engineer."*

Scrolling reveals the journey. Clicking the game button turns it into a **Subway-Surfers-style runner game** (the creative feature).

**Audience:** hackathon judges, AWS evaluators, recruiters, internship hiring managers.

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🎨 3D Scroll Journey | Skills reveal one by one as you scroll — pseudo-3D tunnel canvas |
| 🎮 Cloud Journey Runner | 8-level runner game — collect orbs, dodge bugs, evolve character |
| ☁️ AWS Architecture | Inline SVG diagram + all services documented on-site |
| 📱 Mobile-first | 360px to 4K, touch controls, 100dvh, safe-area insets |
| ♿ Accessible | Semantic HTML, ARIA labels, keyboard nav, AA contrast |
| ⚡ Lite Mode | CSS-only fallback when WebGL unavailable or reduced-motion set |
| 🔗 All links | Every social link: absolute HTTPS URL, new tab, 44px+ touch target |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite 5 (vanilla JS/HTML/CSS) |
| 2D Canvas | Native HTML5 Canvas API (hero, journey, game) |
| Hosting | **AWS Amplify Hosting** |
| CDN | **Amazon CloudFront** (via Amplify) |
| Security | **HTTPS/TLS** (via Amplify) |
| CI/CD | **Amplify CI/CD** (GitHub → auto build → deploy) |

---

## ☁️ AWS Services Used

| Service | Why |
|---|---|
| **AWS Amplify Hosting** | One-click CI/CD from GitHub — every push auto-builds and deploys |
| **Amazon CloudFront** | Global CDN — edge locations for fast load worldwide |
| **HTTPS / TLS** | Automatic SSL certificate via Amplify — zero config |
| **AWS Builder Center** | Community where I discovered the Student Builder Challenge |

> All listed services are genuinely used. No fake AWS logos.

---

## 📂 Folder Structure

```
aws/
├── index.html              # Main portfolio (single page)
├── 404.html                # Custom 404 page
├── package.json            # npm scripts
├── vite.config.js          # Vite build config
├── amplify.yml             # AWS Amplify build spec
├── public/
│   ├── favicon.svg         # SVG favicon (AK + ☁️)
│   └── og-image.png        # ADD: Open Graph share image
├── src/
│   ├── config.js           # ← EDIT THIS FILE to update content
│   ├── style.css           # All styles (navy/blue/orange theme)
│   ├── main.js             # Orchestrator — renders all sections
│   ├── hero-canvas.js      # Animated cloud/star hero background
│   ├── journey-canvas.js   # Pseudo-3D tunnel for skills section
│   └── game.js             # Cloud Journey Runner engine
├── scripts/
│   └── check-links.js      # Pre-submission URL validator
└── docs/
    └── (supplementary docs)
```

---

## ⚙️ Setup & Local Development

```bash
# 1. Clone
git clone https://github.com/Anilkumawat01/anil-kumawat
cd anil-kumawat

# 2. Install
npm install

# 3. Dev server (http://localhost:3000)
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build
npm run preview

# 6. Check all social/project links
npm run check-links
```

---

## 🚀 Deploy on AWS Amplify (Step-by-Step)

### Prerequisites
- GitHub account with this repo pushed
- AWS account (free tier works)

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

2. **Open AWS Amplify Console**  
   → https://console.aws.amazon.com/amplify → **"New app"** → **"Host web app"**

3. **Connect GitHub**  
   → Authorize AWS Amplify → Select your repo → Select `main` branch

4. **Build Settings**  
   Amplify auto-detects `amplify.yml`. Confirm:
   ```yaml
   preBuild: npm ci
   build: npm run build
   baseDirectory: dist
   ```

5. **Click "Save and deploy"**  
   Amplify builds and deploys automatically (~2 min).

6. **Get your live URL**  
   Format: `https://<branch>.<appId>.amplifyapp.com`

7. **Update config**  
   Edit `src/config.js` → `seo.siteUrl` with your Amplify URL.

### Post-Deploy Checklist

- [ ] Open live URL on desktop — all sections visible
- [ ] Open on mobile (360px) — layout correct, game playable
- [ ] Click every social link — all open correct profiles
- [ ] Click "Play My Cloud Journey" — game launches and runs
- [ ] Test "Hire Me!" — scrolls to contact
- [ ] Check "Download Resume" — hidden (empty) unless you add PDF
- [ ] Confirm HTTPS padlock in browser
- [ ] Check Amplify console → build log shows "Build complete"
- [ ] Run `npm run check-links` locally — 0 errors

---

## ✏️ How to Edit Content (`src/config.js`)

**All content lives in one file: `src/config.js`**

| What to change | Key in config.js |
|---|---|
| Name, tagline, city | `name`, `tagline`, `city` |
| Bio lines | `bio[]` |
| Add resume PDF | `resumePDF: "/resume.pdf"` (place file in `public/`) |
| Add photo | `photo: "/photo.jpg"` (place file in `public/`) |
| Education | `education[]` |
| Certifications | `certifications[]` |
| Skills | `skillGroups[]`, `journeySteps[]` |
| Projects | `projects[]` |
| AWS services | `awsServices[]` |
| Social links | `socials{}` — set `url: ""` to hide any link |
| Learnings/Challenges | `awsLearnings[]`, `awsChallenges[]` |

---

## 🎮 Game Details

| Attribute | Detail |
|---|---|
| Type | 3-lane pseudo-3D endless runner |
| Levels | 8 (L1 School → L8 Cloud Engineer → Win: Hired!) |
| Controls | Arrow keys / WASD (desktop), Swipe + buttons (mobile) |
| Collectibles | 5 orbs per level to advance |
| Obstacles | Bug, Downtime, Misconfig, Idle Instance, etc. |
| Character | Evolves: 🧒 → 📚 → 🎓 → 💻 → ☁️ → 🟠 → 🏗️ → 🏆 |
| Win state | Confetti + "Hire Me!" button → scrolls to #contact |

---

## 📸 Screenshots

> *Add screenshots here after deploying.*

| View | Screenshot |
|---|---|
| Hero section | *(add)* |
| Skills scroll | *(add)* |
| Game running | *(add)* |
| Projects | *(add)* |
| Mobile view | *(add)* |
| Amplify console | *(add)* |
| Build log | *(add)* |

---

## 💡 What I Learned

- Deploying a Vite static site to AWS Amplify Hosting via GitHub CI/CD
- How CloudFront edge locations reduce global page load times
- Configuring `amplify.yml` build spec (preBuild → build → artifacts/baseDirectory)
- IAM best practices — least-privilege access when setting up AWS services
- How HTML5 Canvas API enables a game and 3D effects with zero external runtime deps
- Accessibility for game controls (ARIA labels, keyboard nav, focus management)
- Mobile-first CSS with `100dvh`, safe-area insets, and `touch-action: none` on canvas

## 🧩 Challenges I Faced

- **Amplify first deploy failure** — the `baseDirectory` in amplify.yml didn't match Vite's output. Fixed by setting `dist`.
- **Mobile game controls** — getting swipe detection to feel natural required tuning the threshold (30px) and separating horizontal/vertical swipes.
- **Canvas sizing on mobile** — `100dvh` vs `100vh` difference caused the game canvas to extend behind the browser chrome. Fixed with `100dvh` and `safe-area-inset-bottom`.
- **Scroll journey + sticky canvas** — combining CSS sticky with a scroll-driven canvas animation required careful z-index and overflow management.

---

## 📄 License

MIT — feel free to fork and adapt for your own portfolio (but swap out Anil's details!).

---

*Built with ☁️ by Anil Kumawat — AWS Student Builder Challenge 2026*

