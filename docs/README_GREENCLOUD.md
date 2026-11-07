# 🌱 GreenCloud AI — Cloud Sustainability Dashboard

> **Identify idle cloud instances. Reduce wasted compute. Lower carbon emissions.**  
> Live Demo: [https://greencloud-5vl7b2mmn-anil01.vercel.app/](https://greencloud-5vl7b2mmn-anil01.vercel.app/)

---

## 🌍 The Problem

Companies rent cloud compute instances (virtual servers) and often leave many of them **idle or underutilized** for extended periods. This wastes:

- 💰 **Money** — paying for compute you're not using
- ⚡ **Electricity** — idle servers still consume power
- 🌫️ **Carbon** — the electricity generation behind those servers adds to carbon emissions

This is a recognized problem in the cloud industry — sometimes called the **"idle instance" problem** — and it's a significant contributor to the tech sector's overall environmental footprint.

---

## 💡 The Solution

**GreenCloud AI** is a web application that helps identify and raise awareness about unused or idle cloud instances.

By surfacing idle compute, it empowers teams and organizations to:
- Take action to terminate or rightsize underused instances
- Reduce their wasted resources and energy consumption
- Lower their cloud carbon footprint (Green Cloud / sustainability angle)

> **Impact statement:** Less idle compute = less energy = lower carbon emissions.

---

## 🚀 Live Demo

**[→ Open GreenCloud AI](https://greencloud-5vl7b2mmn-anil01.vercel.app/)**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js** (React) |
| Language | **TypeScript** |
| Deployment | **Vercel** |
| Styling | *(CSS/Tailwind — check repo)* |

---

## ⚙️ How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Anilkumawat01/green-cloud-Ai
cd green-cloud-Ai

# 2. Install dependencies
npm install
# or
yarn install

# 3. Run the development server
npm run dev
# or
yarn dev

# 4. Open in browser
# → http://localhost:3000
```

> **Note:** No API keys or environment variables are required for the core demo. If additional `.env` variables are needed, they will be listed in `.env.example`.

---

## 📂 Project Structure

```
green-cloud-Ai/
├── pages/           # Next.js pages
├── components/      # React components
├── public/          # Static assets
├── styles/          # CSS/styling
├── package.json
└── tsconfig.json
```

---

## 🌟 Features

- **Idle instance awareness** — visual dashboard highlighting unused/underutilized cloud resources
- **Sustainability focus** — frames cloud waste as an environmental issue, not just a cost issue
- **Web-based** — no installation required; accessible from any browser
- **Built with Next.js** — fast, server-rendered React application

---

## 🔭 Future Improvements (Planned)

- [ ] Real-time integration with AWS CloudWatch metrics to pull live instance utilization data
- [ ] Multi-cloud support (AWS, GCP, Azure)
- [ ] Carbon footprint estimator (gCO₂ per idle instance-hour)
- [ ] Automated alerts when instances fall below utilization threshold
- [ ] Team dashboard with historical idle time tracking
- [ ] Recommendations engine (rightsize, schedule, or terminate)

---

## 👨‍💻 About the Author

**Anil Kumawat** — Aspiring Cloud Engineer | B.Tech AI & Data Science, GEC Bikaner  
Passionate about cloud computing, sustainability, and DevOps.

- 🔗 [Portfolio](https://YOUR_AMPLIFY_URL.amplifyapp.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/anil-kumawat-7609a1383)
- 🐙 [GitHub](https://github.com/Anilkumawat01)

---

## 📄 License

MIT

