// ============================================================
// config.js — SINGLE SOURCE OF TRUTH
// Edit this file to update every section of the portfolio.
// ============================================================

export const CONFIG = {
  // ── Personal ────────────────────────────────────────────
  name: "Anil Kumawat",
  tagline: "Aspiring Cloud Engineer ☁️ | B.Tech Student, AI & Data Science",
  city: "Bikaner, Rajasthan, India",
  email: "anil707396@gmail.com",
  resumePDF: "", // ADD: "/resume.pdf" — set to "" to hide the button
  photo: "",     // ADD: "/photo.jpg" — leave "" for the initials avatar "AK"
  initials: "AK",

  bio: [
    "Anil Kumawat | Aspiring Cloud Engineer ☁️",
    "🎓 B.Tech Student | AI & Data Science",
    "☁️ Passionate about Cloud Computing & Cloud Architecture",
    "💻 Exploring AWS, Linux, Networking & DevOps",
    "🤖 Interested in AI, Automation & Emerging Technologies",
    "🚀 Building real-world projects | Learning every day",
    "Turning curiosity into skills and ideas into real-world solutions.",
  ],

  goal: "Become a successful Cloud Engineer and get placed in a cloud/DevOps role.",

  quickFacts: [
    { icon: "📍", label: "Location", value: "Bikaner, Rajasthan, India" },
    { icon: "🎯", label: "Goal", value: "Cloud Engineer & DevOps role" },
    { icon: "📚", label: "Currently Learning", value: "AWS, Linux, Networking, DevOps" },
  ],

  // ── Education ────────────────────────────────────────────
  education: [
    {
      level: "10th",
      school: "Jawahar Memorial Public School",
      board: "Rajasthan Board of Secondary Education (RBSE)",
      year: "2022",
      score: "87.00%",
      icon: "🏫",
    },
    {
      level: "12th",
      school: "KVM Public Senior School, Sikar",
      board: "Rajasthan Board of Secondary Education (RBSE)",
      year: "2024",
      score: "81.4%",
      icon: "📚",
    },
    {
      level: "B.Tech",
      school: "Government Engineering College Bikaner",
      board: "AI & Data Science (Ongoing)",
      year: "2025 – 2029",
      score: "",
      icon: "🎓",
    },
  ],

  // ── Certifications / Achievements ────────────────────────
  certifications: [
    {
      title: "AWS Student Builder Challenge Participant",
      issuer: "AWS",
      year: "2026",
      detail: "Build Your Tech Superpower",
      badge: "",   // ADD: badge image URL
      link: "https://builder.aws.com?inviteId=d04eceb2-954b-4ae7-99f7-6532427c593c",
    },
    {
      title: "AWS Builder Center Member",
      issuer: "Amazon Web Services",
      year: "2026",
      detail: "Active community member",
      badge: "",
      link: "https://builder.aws.com?inviteId=d04eceb2-954b-4ae7-99f7-6532427c593c",
    },
    // ADD more certifications/badges here:
    // { title: "", issuer: "", year: "", detail: "", badge: "", link: "" },
  ],

  // ── Skills ───────────────────────────────────────────────
  // Levels: "Learning" | "Practicing" | "Comfortable"
  skillGroups: [
    {
      group: "Programming",
      icon: "💻",
      skills: [
        { name: "Java",   icon: "☕", level: "Practicing", what: "OOP and backend logic practice" },
        { name: "Python", icon: "🐍", level: "Practicing", what: "Scripting, automation, and AI experiments" },
        { name: "C++",    icon: "⚙️", level: "Practicing", what: "DSA problem solving and competitive programming" },
      ],
    },
    {
      group: "Computer Science",
      icon: "🧠",
      skills: [
        { name: "Data Structures & Algorithms", icon: "🔢", level: "Practicing", what: "LeetCode-style problems in Java/C++" },
        { name: "Problem Solving",              icon: "🧩", level: "Comfortable", what: "Breaking complex problems into small steps" },
      ],
    },
    {
      group: "Cloud & Infrastructure",
      icon: "☁️",
      skills: [
        { name: "AWS (EC2, S3, IAM, VPC, Amplify)", icon: "🟠", level: "Learning",   what: "Hands-on labs, deploying this portfolio on Amplify" },
        { name: "Cloud Computing & Architecture",    icon: "🏗️", level: "Learning",   what: "Understanding cloud models, regions, AZs, and services" },
        { name: "Networking (IP, DNS, TCP/IP, Subnets)", icon: "🌐", level: "Learning", what: "Foundational networking for cloud & DevOps" },
        { name: "Linux",                             icon: "🐧", level: "Learning",   what: "Command line, file system, shell scripting" },
        { name: "DevOps (Git, GitHub, CI/CD, Docker)", icon: "🔁", level: "Learning", what: "Version control, pipelines, containerization basics" },
      ],
    },
    {
      group: "AI & Automation",
      icon: "🤖",
      skills: [
        { name: "AI Tools",           icon: "✨", level: "Practicing", what: "Using and reviewing AI productivity tools" },
        { name: "Workflow Automation", icon: "⚡", level: "Learning",   what: "Connecting apps and automating repetitive tasks" },
        { name: "Emerging Tech",      icon: "🔭", level: "Learning",   what: "Staying up-to-date with AI/cloud trends" },
      ],
    },
    {
      group: "Creator & Communication",
      icon: "🎥",
      skills: [
        { name: "Content Creation",  icon: "📱", level: "Comfortable", what: "YouTube & Instagram tech content on AI tools" },
        { name: "Script Writing",    icon: "✍️", level: "Comfortable", what: "Clear explainer scripts for tech topics" },
        { name: "YouTube Channel",   icon: "▶️", level: "Comfortable", what: "\"Ai Tools & Automations\" — tutorials and reviews", link: "https://www.youtube.com/@Ai_tools_Automations" },
      ],
    },
    {
      group: "Soft Skills",
      icon: "🌟",
      skills: [
        { name: "Curiosity",           icon: "🔍", level: "Comfortable", what: "Always asking why — drives deep learning" },
        { name: "Consistent Learning", icon: "📆", level: "Comfortable", what: "Daily learning streak across cloud, code, and tools" },
        { name: "Building in Public",  icon: "🏗️", level: "Practicing",  what: "Sharing progress and projects openly online" },
      ],
    },
  ],

  // Journey order for the 3D scroll skills path
  journeySteps: [
    { icon: "⚙️", name: "C++ & Programming", level: "Practicing",  fact: "Started with C++ to master logic before cloud." },
    { icon: "☕", name: "Java",               level: "Practicing",  fact: "OOP fundamentals for backend & DSA." },
    { icon: "🐍", name: "Python",             level: "Practicing",  fact: "Automation scripts and AI experiments." },
    { icon: "🔢", name: "DSA & Problem Solving", level: "Practicing", fact: "LeetCode grind — the foundation of real engineering." },
    { icon: "🌐", name: "Networking",         level: "Learning",    fact: "IP, DNS, TCP/IP, subnets — how the internet actually works." },
    { icon: "🐧", name: "Linux",              level: "Learning",    fact: "Terminal power — every cloud engineer's superpower." },
    { icon: "🖥️", name: "Virtualization",    level: "Learning",    fact: "VMs → containers → cloud — the abstraction ladder." },
    { icon: "☁️", name: "Cloud Basics",       level: "Learning",    fact: "Public, private, hybrid — why cloud changed everything." },
    { icon: "🟠", name: "AWS Core (EC2, S3, IAM, VPC)", level: "Learning", fact: "Hands-on with compute, storage, identity, and networking on AWS." },
    { icon: "🗄️", name: "Databases (RDS/DynamoDB)", level: "Learning", fact: "Relational and NoSQL — picking the right data store." },
    { icon: "⚡", name: "Serverless (Lambda, API Gateway)", level: "Learning", fact: "Zero infra management; just ship code." },
    { icon: "🔁", name: "DevOps (Git, Docker, CI/CD, Amplify)", level: "Learning", fact: "Push code → Amplify builds → CloudFront serves it. Done." },
    { icon: "🔒", name: "Security & Monitoring (CloudWatch)", level: "Learning", fact: "IAM least-privilege + CloudWatch alarms = sleep at night." },
    { icon: "🤖", name: "AI & Automation",    level: "Practicing",  fact: "AI tools + automation = 10× productivity." },
    { icon: "📱", name: "Content Creation",   level: "Comfortable", fact: "YouTube & Instagram — teaching to reinforce learning." },
    { icon: "🏆", name: "Cloud Engineer",     level: "Goal",        fact: "The destination: hired, building, and shipping on AWS." },
  ],

  // ── Projects ─────────────────────────────────────────────
  projects: [
    {
      id: "greencloud",
      title: "GreenCloud AI",
      subtitle: "Cloud Sustainability Dashboard",
      description:
        "Companies rent cloud instances and leave many idle — wasting electricity and increasing carbon emissions. GreenCloud AI is a web app that identifies unused/idle cloud instances to help reduce wasted resources and carbon footprint.",
      impact: "Cloud sustainability: less idle compute = less energy = lower emissions.",
      tech: ["Next.js", "TypeScript", "Vercel"],
      github: "https://github.com/Anilkumawat01/green-cloud-Ai",
      live: "https://greencloud-5vl7b2mmn-anil01.vercel.app/",
      icon: "🌱",
      featured: true,
    },
    {
      id: "portfolio",
      title: "My Cloud Journey Portfolio",
      subtitle: "3D Scroll + The Royal OSI Mission",
      description:
        "This portfolio — a single-page, scroll-driven 3D storytelling site with an interactive 'DO NOT PRESS' educational feature: The Royal OSI Message Delivery Mission (Maharani Padmavati ➔ Maharawal Ratan Singh). Deployed on AWS Amplify Hosting.",
      impact: "Built & deployed on AWS Amplify; demonstrates full cloud deployment pipeline.",
      tech: ["Vite", "Vanilla JS", "Three.js", "AWS Amplify", "CloudFront"],
      github: "https://github.com/Anilkumawat01/cloud-journey-portfolio", // ADD: update with actual repo URL
      live: "",   // ADD: Amplify live URL after deploy
      icon: "🚀",
      featured: true,
    },
    {
      id: "content",
      title: "AI Tools & Automations",
      subtitle: "YouTube & Instagram Content",
      description:
        "Creator of \"Ai Tools & Automations\" on YouTube and \"tech.Ai\" on Instagram, sharing tutorials, reviews, and automation workflows to help people use AI tools more effectively.",
      impact: "Teaching and content creation — reinforcing learning by sharing it.",
      tech: ["YouTube", "Instagram", "Content Creation", "Script Writing"],
      github: "",  // no code repo for content
      live: "https://www.youtube.com/@Ai_tools_Automations",
      liveLabel: "YouTube Channel",
      icon: "🎥",
      featured: false,
    },
    {
      id: "learning",
      title: "Learning Roadmap",
      subtitle: "Java • Python • C++ • DSA • Linux • Networking • AWS",
      description:
        "Active learning projects: DSA in Java/C++, Python scripting, Linux CLI practice, networking fundamentals, and AWS hands-on labs. Building the foundation for a cloud/DevOps career.",
      impact: "Consistent daily practice — the best project is leveling up every day.",
      tech: ["Java", "Python", "C++", "DSA", "Linux", "AWS Fundamentals"],
      github: "https://github.com/Anilkumawat01",
      live: "",
      icon: "📚",
      featured: false,
    },
    // ADD more projects here when ready
  ],

  // ── AWS Services used ────────────────────────────────────
  awsServices: [
    {
      name: "AWS Amplify Hosting",
      icon: "🟠",
      why: "One-click CI/CD from GitHub — every push auto-builds and deploys the site.",
      link: "https://aws.amazon.com/amplify/",
    },
    {
      name: "Amazon CloudFront (via Amplify)",
      icon: "🌍",
      why: "Global CDN — serves the site from edge locations close to every visitor for fast load times.",
      link: "https://aws.amazon.com/cloudfront/",
    },
    {
      name: "HTTPS / TLS (via Amplify)",
      icon: "🔒",
      why: "Automatic SSL certificate — secure connection for every visitor with zero configuration.",
      link: "https://aws.amazon.com/amplify/",
    },
    {
      name: "AWS Builder Center",
      icon: "🏗️",
      why: "Community and resources — where I discovered the Student Builder Challenge.",
      link: "https://builder.aws.com?inviteId=d04eceb2-954b-4ae7-99f7-6532427c593c",
    },
  ],

  awsLearnings: [
    "Setting up Amplify Hosting connected to a GitHub repository for automatic CI/CD.",
    "Understanding how CloudFront edge locations reduce latency for global visitors.",
    "Configuring the amplify.yml build spec (preBuild → build → artifacts).",
    "Learning IAM best practices: least-privilege access when setting up AWS services.",
    "Debugging Amplify build failures by reading CloudWatch-backed build logs.",
  ],

  awsChallenges: [
    "First Amplify deploy failed — fixed by ensuring the dist/ folder matched the baseDirectory in amplify.yml.",
    "Understanding the difference between Amplify's managed hosting and a manual EC2 + S3 setup.",
    "Learning to scope IAM permissions correctly without using AdministratorAccess.",
  ],

  // ── Social Links ─────────────────────────────────────────
  // Set a URL to show the link; set to "" to hide it.
  socials: {
    instagram: { label: "Instagram (tech.Ai)", url: "https://www.instagram.com/techy_ai30", handle: "@techy_ai30" },
    linkedin:  { label: "LinkedIn",            url: "https://www.linkedin.com/in/anil-kumawat-7609a1383", handle: "anil-kumawat" },
    github:    { label: "GitHub",              url: "https://github.com/Anilkumawat01", handle: "Anilkumawat01" },
    youtube:   { label: "YouTube",             url: "https://www.youtube.com/@Ai_tools_Automations", handle: "@Ai_tools_Automations" },
    aws:       { label: "AWS Builder Center",  url: "https://builder.aws.com?inviteId=d04eceb2-954b-4ae7-99f7-6532427c593c", handle: "Builder Profile" },
    twitter:   { label: "X / Twitter",         url: "", handle: "" },   // ADD if you have
    email:     { label: "Email",               url: "mailto:anil707396@gmail.com", handle: "anil707396@gmail.com", raw: "anil707396@gmail.com" },
  },

  // ── SEO / Meta ────────────────────────────────────────────
  seo: {
    title: "Anil Kumawat | Aspiring Cloud Engineer — AWS Portfolio",
    description:
      "Personal portfolio of Anil Kumawat — B.Tech AI & Data Science student from Bikaner, Rajasthan. Exploring AWS, Cloud Computing, DevOps, and AI. See my projects and play the Cloud Journey runner game!",
    ogImage: "/og-image.png", // generate after deploy
    twitterHandle: "", // ADD if you have
    siteUrl: "https://YOUR_AMPLIFY_URL.amplifyapp.com", // ADD after deploy
    keywords: "Anil Kumawat, Cloud Engineer, AWS, B.Tech, AI Data Science, Bikaner, DevOps, Portfolio, AWS Amplify",
  },
};

