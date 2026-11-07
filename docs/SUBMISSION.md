# 🚀 Hackathon Submission — AWS Student Builder Challenge 2026

**Project:** My Cloud Journey Portfolio  
**Builder:** Anil Kumawat  
**Challenge:** Build Your Tech Superpower  
**Live URL:** `https://YOUR_AMPLIFY_URL.amplifyapp.com` ← *Update after deploy*  
**GitHub:** `https://github.com/Anilkumawat01/cloud-journey-portfolio`

---

## 📝 Project Summary

I'm Anil Kumawat — a B.Tech student studying AI & Data Science at Government Engineering College Bikaner. I'm on a mission to become a Cloud Engineer, and this portfolio is my story: **"From a curious child to a placement-ready Cloud Engineer."**

The portfolio is a **single-page, scroll-driven 3D storytelling site** where scrolling reveals my entire learning journey — programming, networking, Linux, and then the full AWS cloud stack — with animated skill cards that appear one by one. But the part I'm most proud of is the **creative feature**: a **Subway-Surfers-style runner game** called **Cloud Journey Runner**, where you play as me, evolving from a school kid all the way to a hired Cloud Engineer.

Everything is deployed on **AWS Amplify Hosting** — zero backend, zero login, loads fast worldwide.

---

## 🎮 The Creative Feature — Cloud Journey Runner

### How to Find It

1. Open the portfolio at the live URL
2. On the Hero section, click the **glowing orange "🎮 Play My Cloud Journey" button** (it pulses — hard to miss!)
3. OR click the **floating 🎮 button** (always visible in the bottom-right corner)
4. OR scroll to the **"Creative Feature" section (#game)** and click "🚀 Launch Game"

### What It Is

A **3-lane pseudo-3D endless runner** built entirely in HTML5 Canvas (no external game library).

| Detail | Description |
|---|---|
| **Levels** | 8 levels, each representing a stage of my real journey |
| **Mechanic** | Collect 5 glowing knowledge orbs to advance; dodge career obstacles |
| **Character** | Evolves: 🧒 Child → 📚 Student → 🎓 B.Tech → 💻 Coder → ☁️ Cloud learner → 🏆 Hired! |
| **Obstacles** | Named after real problems: "Bug", "Downtime", "Misconfig", "Idle Instance" |
| **Levels reflect my story** | L1: Curiosity/School → L7: GreenCloud AI project → L8: Cloud Engineer |
| **Win state** | Confetti explosion + "🚀 Hire Me!" button that scrolls to my contact section |

### Why It Reflects My Real Story

Every level maps to a real chapter of my life. Level 7 is "GreenCloud AI" — my actual project on GitHub. Level 5 is "AWS Core" with EC2, S3, IAM obstacles. The character stages match my education timeline. The final level plays confetti and links directly to my contact section — because getting hired is the actual goal.

### Controls

| Platform | Controls |
|---|---|
| Desktop | Arrow Keys / WASD — left/right to change lanes, up/space to jump, down to slide |
| Mobile | Swipe left/right/up/down OR on-screen ◀ ▼ ▲ ▶ buttons (min 56px touch targets) |
| Keyboard shortcuts | Esc to close, P to pause |

---

## ☁️ AWS Services Used

### 1. AWS Amplify Hosting
**How I used it:** Connected my GitHub repository to AWS Amplify Hosting. Every push to `main` triggers an automatic CI/CD build and deployment.  
**Why:** Zero-infrastructure hosting — I write code, push, and it's live. The `amplify.yml` file controls the build: `npm ci` → `npm run build` → serves the `dist/` folder.

### 2. Amazon CloudFront (via Amplify)
**How I used it:** Amplify automatically provisions CloudFront in front of the site.  
**Why:** Global CDN — my portfolio loads fast for judges and recruiters anywhere in the world, not just from one server region.

### 3. HTTPS / TLS Certificate (via Amplify)
**How I used it:** Amplify auto-provisions and renews an SSL/TLS certificate.  
**Why:** Every visitor gets a secure HTTPS connection. No manual certificate setup.

### 4. AWS Builder Center
**How I used it:** Joined the AWS Builder Center community, which is where I discovered and registered for the Student Builder Challenge.  
**Link:** [builder.aws.com](https://builder.aws.com?inviteId=d04eceb2-954b-4ae7-99f7-6532427c593c)

---

## 🧩 Challenges I Faced & How I Fixed Them

### Challenge 1: Amplify First Deploy Failure
**Problem:** My first Amplify deploy failed with "No artifacts found."  
**Fix:** The `baseDirectory` in `amplify.yml` was not matching Vite's output folder. Changed it from `build` to `dist`. Lesson: always match your build tool's output directory exactly.

### Challenge 2: Mobile Game Canvas Sizing
**Problem:** On iOS Safari, `100vh` included the browser chrome, causing the game canvas to extend behind the address bar.  
**Fix:** Switched to `100dvh` (dynamic viewport height) and added `padding-bottom: env(safe-area-inset-bottom)` for notch-safe spacing.

### Challenge 3: Swipe vs. Scroll Conflict on Mobile
**Problem:** Vertical swipes in the game triggered the page scroll instead of the jump action.  
**Fix:** Added `touch-action: none` on the game canvas and locked `document.body` scroll (`overflow: hidden; position: fixed`) while the modal is open — restoring it on close.

### Challenge 4: Performance on Low-End Devices
**Problem:** Canvas animations caused jank on devices with ≤2 CPU cores or ≤2GB RAM.  
**Fix:** Auto-detect low-end (via `navigator.hardwareConcurrency` and `navigator.deviceMemory`), cap FPS at 30, reduce particle counts, and fall back to "Lite mode" (CSS-only) which skips all canvas entirely.

---

## 💡 What I Learned

1. **AWS Amplify's power:** A GitHub push → production in ~2 minutes. That's the cloud working for you.
2. **CloudFront is automatic:** I didn't manually configure a CDN — Amplify handled it. That's the value of managed services.
3. **IAM is fundamental:** Even a simple static site needs to understand AWS permissions to avoid overprivileged deployments.
4. **Canvas games are hard on mobile:** Touch input, viewport sizing, and body scroll locking took more time than the game logic itself.
5. **Build the docs alongside the code:** Writing `README.md` and this submission while building made me more intentional about *why* each decision was made.
6. **Accessibility isn't optional:** Screen-reader users and keyboard navigators deserve the same experience. ARIA labels on the game, skip links, and visible focus rings matter.

---

## 📸 Screenshot Checklist

Before final submission, capture and attach these screenshots:

| Screenshot | What to show |
|---|---|
| ✅ Hero section | Full hero with name, tagline, glowing game button, social icons |
| ✅ Skills scroll | Journey cards visible, progress indicator on the left |
| ✅ Game running | Game canvas active with character, orbs, obstacles visible |
| ✅ Game win | Confetti + "Hire Me!" button overlay |
| ✅ Projects section | All 4 project cards with tech tags and links |
| ✅ AWS section | Architecture diagram + service cards + learnings |
| ✅ Mobile view | Portfolio on a ~375px phone screen (hero + nav hamburger) |
| ✅ Game on mobile | Game canvas on phone with on-screen controls visible |
| ✅ Amplify console | Amplify app page showing connected GitHub repo |
| ✅ Build log | Amplify build log showing "Build complete" |
| ✅ Live URL | Browser address bar showing HTTPS + Amplify URL |

---

## 🔗 Key Links

| Resource | URL |
|---|---|
| Live Portfolio | `https://YOUR_AMPLIFY_URL.amplifyapp.com` |
| Portfolio GitHub | `https://github.com/Anilkumawat01/cloud-journey-portfolio` |
| GreenCloud AI (live) | https://greencloud-5vl7b2mmn-anil01.vercel.app/ |
| GreenCloud AI (GitHub) | https://github.com/Anilkumawat01/green-cloud-Ai |
| AWS Builder Profile | https://builder.aws.com?inviteId=d04eceb2-954b-4ae7-99f7-6532427c593c |
| LinkedIn | https://www.linkedin.com/in/anil-kumawat-7609a1383 |
| YouTube | https://www.youtube.com/@Ai_tools_Automations |

---

*— Anil Kumawat | Bikaner, Rajasthan, India | November 2026*

