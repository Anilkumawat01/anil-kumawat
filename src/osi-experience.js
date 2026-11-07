// ============================================================
// osi-experience.js — The Royal OSI Message Delivery Mission 🕊️
// Maharani Padmavati ➔ Maharawal Ratan Singh
// A full visual, interactive storytelling experience for all 7 OSI layers
// ============================================================

export function initOSIExperience({ onClose }) {
  const stage = document.getElementById("osiStage");
  const stepper = document.getElementById("osiStepper");
  const modal = document.getElementById("osiModal");

  let currentStep = "intro"; // "intro" | 7 | 6 | 5 | 4 | 3 | 2 | 1 | "reverse" | "dashboard"
  let tcpMode = "tcp"; // for Layer 4 interactive switch
  let quizAnswered = {};

  const LAYERS = [
    {
      num: 7,
      name: "Application Layer",
      pdu: "Data",
      color: "#ec4899",
      oneLiner: "The layer that gives network services directly to user apps like browsers and chat apps.",
      simpleExplanation:
        "Imagine Maharani Padmavati wants to send a secret letter to Maharawal Ratan Singh. She unlocks her royal smartphone, taps open her messaging app, and types: \"महाराज, आप कहाँ हैं? ❤️ जल्दी वापस आइए!\" The Application Layer is the only layer the human user actually sees and touches. It connects user apps to the network world underneath.",
      analogy:
        "Think of opening WhatsApp, Gmail, or a web browser. You don't see cables or radio waves — you just see your chat box and a 'Send' button.",
      whatHappens: [
        "Maharani opens her royal chat app.",
        "She types: \"महाराज, आप कहाँ हैं? ❤️ जल्दी वापस आइए!\"",
        "The app grabs this text and prepares it using application protocols (like HTTP or chat protocols).",
        "It hands the plain royal message down to Layer 6."
      ],
      pigeonQuote: "अरे वाह! महारानी जी ने तो सीधे दिल की बात लिख दी! चलिए, अब इसे आगे पहुँचाते हैं!",
      pigeonMood: "🕊️ 📜",
      terms: [
        { term: "HTTP / HTTPS", desc: "The protocol used to browse websites securely." },
        { term: "DNS", desc: "The phonebook of the internet — turns human names into computer addresses." },
        { term: "SMTP", desc: "Used for sending emails across the globe." }
      ],
      learned: "The Application Layer is closest to the human user. It takes user actions (typing a message) and hands them to the network.",
      quiz: {
        question: "Which OSI layer provides network services directly to user applications?",
        options: [
          { text: "Application Layer", correct: true },
          { text: "Physical Layer", correct: false },
          { text: "Transport Layer", correct: false }
        ],
        explanation: "Correct! Layer 7 (Application) is closest to the user and directly interacts with software applications."
      }
    },
    {
      num: 6,
      name: "Presentation Layer",
      pdu: "Data",
      color: "#8b5cf6",
      oneLiner: "The translator and bodyguard — handles data formatting, compression, and encryption.",
      simpleExplanation:
        "Computers speak different languages and formats. The Presentation Layer makes sure both sides understand the data. It also shrinks the message (compression) and locks it with a secret key (encryption) so enemy spies in the Delhi Sultanate cannot read royal secrets!",
      analogy:
        "Imagine writing a confidential royal scroll, translating it into a standard diplomatic language, zipping it into an airtight capsule, and locking it with a golden padlock.",
      whatHappens: [
        "Data formatting: Converts text into a standard computer character encoding (like UTF-8).",
        "Compression: Removes redundant bytes to make the file smaller and faster to send.",
        "Encryption: Scrambles the text into unreadable ciphertext with a cryptographic lock.",
        "The protected data is handed down to Layer 5."
      ],
      pigeonQuote: "अरे! पहले इस शाही संदेश को सही format में तैयार करो। राजकीय secrets सबको थोड़ी दिखाने हैं!",
      pigeonMood: "🕊️ 🔐",
      terms: [
        { term: "Encoding / Decoding", desc: "Converting characters into standard byte formats so any machine can read them." },
        { term: "Encryption", desc: "Locking data with math so only the person with the key can unlock it." },
        { term: "Compression", desc: "Shrinking file size so it travels faster across the network." }
      ],
      learned: "Layer 6 translates, compresses, and encrypts data so it is readable by the destination machine and safe from prying eyes.",
      quiz: {
        question: "Which OSI layer handles data representation, encryption, and compression?",
        options: [
          { text: "Network Layer", correct: false },
          { text: "Presentation Layer", correct: true },
          { text: "Data Link Layer", correct: false }
        ],
        explanation: "Spot on! Presentation Layer (Layer 6) formats, encrypts, and compresses data."
      }
    },
    {
      num: 5,
      name: "Session Layer",
      pdu: "Data",
      color: "#3b82f6",
      oneLiner: "The conversation manager — opens, maintains, syncs, and closes communication sessions.",
      simpleExplanation:
        "Imagine Maharani and Maharawal are having a long ongoing conversation. The Session Layer makes sure the 'call' stays connected, manages turns (who speaks when), and adds checkpoints so if the connection drops, you don't have to restart from the beginning.",
      analogy:
        "Think of making a phone call: dialing the number (establishing the session), talking back and forth without talking over each other (managing), and hanging up when done (terminating).",
      whatHappens: [
        "Sends a request from Chittor Palace to Maharawal's camp to establish a dialogue.",
        "Performs a royal handshake to confirm both devices are ready to talk.",
        "Sets synchronization checkpoints in case of temporary disconnects.",
        "Maintains the session ID and hands control to Layer 4."
      ],
      pigeonQuote: "रुकिए महारानी जी! पहले यह सुनिश्चित कर लें कि महाराज के साथ communication session तैयार है!",
      pigeonMood: "🕊️ 🤝",
      terms: [
        { term: "Session Establishment", desc: "Opening a formal communication channel between two endpoints." },
        { term: "Synchronization Points", desc: "Checkpoints in data transfer — if 90% is downloaded and drops, resume from 90%." },
        { term: "Session Termination", desc: "Gracefully hanging up and releasing resources when communication is finished." }
      ],
      learned: "The Session Layer is like a telephone operator that opens the call, keeps it alive, and hangs up cleanly when done.",
      quiz: {
        question: "Which OSI layer is responsible for opening, managing, and closing communication sessions?",
        options: [
          { text: "Session Layer", correct: true },
          { text: "Physical Layer", correct: false },
          { text: "Application Layer", correct: false }
        ],
        explanation: "Exactly! Layer 5 (Session) establishes, maintains, and terminates communication sessions."
      }
    },
    {
      num: 4,
      name: "Transport Layer",
      pdu: "Segment (TCP) / Datagram (UDP)",
      color: "#06b6d4",
      oneLiner: "The delivery coordinator — chops data into numbered segments and manages end-to-end transport.",
      simpleExplanation:
        "Networks cannot send giant files in one piece. The Transport Layer chops the encrypted royal message into smaller numbered pieces called 'segments'. It also uses Port Numbers to make sure the message goes to the right application (e.g. chat app vs web browser), and chooses between reliable delivery (TCP) or fast delivery (UDP).",
      analogy:
        "Imagine sending a heavy royal chest divided into 3 numbered courier boxes. Box 1 of 3, Box 2 of 3, Box 3 of 3. If Box 2 gets lost in the desert, the courier asks the sender to resend only Box 2!",
      whatHappens: [
        "Data is divided into manageable numbered segments.",
        "Destination Port is attached (identifies the receiving app).",
        "If TCP: Handshake established, sequence numbers attached, acknowledgments required.",
        "If UDP: Fire and forget without guarantees (great for voice/video).",
        "Segments are passed down to Layer 3."
      ],
      pigeonQuote: "इतना बड़ा शाही संदेश! इसे ठीक से organize करना पड़ेगा। कोई हिस्सा रास्ते में खोना नहीं चाहिए!",
      pigeonMood: "🕊️ 📦",
      terms: [
        { term: "TCP (Transmission Control Protocol)", desc: "Reliable, ordered, error-checked delivery. Requires ACK for every packet." },
        { term: "UDP (User Datagram Protocol)", desc: "Fast, lightweight delivery with no delivery guarantees. Used for gaming/video calls." },
        { term: "Port Numbers", desc: "Sub-addresses that tell the computer which specific application should receive the data (e.g. Port 443 for HTTPS)." },
        { term: "Flow Control", desc: "Ensures a fast sender does not overwhelm a slow receiver with too much data at once." }
      ],
      learned: "Layer 4 breaks data into pieces, uses port numbers to find the right application, and provides reliable (TCP) or fast (UDP) delivery.",
      quiz: {
        question: "Which transport protocol guarantees that all pieces arrive in order and retransmits lost data?",
        options: [
          { text: "TCP", correct: true },
          { text: "UDP", correct: false },
          { text: "IP", correct: false }
        ],
        explanation: "Correct! TCP (Transmission Control Protocol) is the reliable protocol with ordering and retransmission guarantees."
      }
    },
    {
      num: 3,
      name: "Network Layer",
      pdu: "Packet",
      color: "#10b981",
      oneLiner: "The global navigator — assigns logical IP addresses and finds the best route across routers.",
      simpleExplanation:
        "Now our royal pigeon knows WHAT to deliver, but WHERE is Maharawal Ratan Singh? The Network Layer puts the segment inside an envelope called an 'IP Packet' and stamps it with the Source IP (Chittorgarh Palace) and Destination IP (Battlefield of Mewar). Routers along the way read the destination IP and forward the packet step-by-step.",
      analogy:
        "Think of Google Maps navigating a courier across cities, or writing a postal code and city address on an envelope so sorting offices know which highway to route it along.",
      whatHappens: [
        "Wraps the segment inside an IP Packet.",
        "Stamps Source IP: 192.0.2.10 (Chittorgarh Palace — documentation example).",
        "Stamps Destination IP: 198.51.100.20 (Mewar Camp — documentation example).",
        "Routers look at routing tables to decide the fastest path across multiple networks.",
        "Hands the packet down to Layer 2."
      ],
      pigeonQuote: "अरे! महारावल साहब का महल कहाँ है? बिना address के मैं भी delivery नहीं कर सकता!",
      pigeonMood: "🕊️ 🗺️",
      terms: [
        { term: "IP Address", desc: "A logical address (like a home postal address) that uniquely identifies a device on a network." },
        { term: "Router", desc: "A smart networking device that forwards packets between different networks based on IP addresses." },
        { term: "Packet", desc: "The official Data Unit at Layer 3 — contains data plus IP header (source & destination IPs)." },
        { term: "Routing", desc: "The process of selecting the best path for traffic across multiple networks." }
      ],
      learned: "The Network Layer uses IP addresses and routers to navigate data across different networks from source to destination.",
      quiz: {
        question: "Which device operates at Layer 3 to route packets between different networks?",
        options: [
          { text: "Router", correct: true },
          { text: "Repeater", correct: false },
          { text: "Network Cable", correct: false }
        ],
        explanation: "Spot on! Routers inspect IP packets and forward them between different networks."
      }
    },
    {
      num: 2,
      name: "Data Link Layer",
      pdu: "Frame",
      color: "#f59e0b",
      oneLiner: "The local neighborhood courier — packs packets into frames and uses physical MAC addresses.",
      simpleExplanation:
        "IP addresses get you to the right city network, but the Data Link Layer delivers the parcel directly to the specific machine on the local link! It wraps the IP packet into a 'Frame', stamps it with hardware MAC addresses (like a device's permanent digital fingerprint), and adds an error check (CRC) to catch corrupted data.",
      analogy:
        "If an IP address is your city street address, a MAC address is your personal biometric fingerprint on your national ID card. It identifies the exact physical machine.",
      whatHappens: [
        "Encapsulates the IP Packet into a Frame.",
        "Adds Source MAC Address (Palace Wi-Fi card).",
        "Adds Next-Hop MAC Address (Palace Router entrance).",
        "Appends a checksum (FCS / CRC) to detect if any bits got corrupted.",
        "Network switches forward frames using MAC address tables.",
        "Hands the frame to Layer 1."
      ],
      pigeonQuote: "बस पहुँचने ही वाले हैं! पहले local delivery का सही पता जाँच लेते हैं!",
      pigeonMood: "🕊️ 🏷️",
      terms: [
        { term: "MAC Address", desc: "Media Access Control — a permanent physical 48-bit address burned into every network card (NIC)." },
        { term: "Frame", desc: "The Protocol Data Unit (PDU) at Layer 2 — has header, payload, and trailer." },
        { term: "Switch", desc: "A Layer 2 device that forwards frames inside a local area network (LAN) using MAC addresses." },
        { term: "CRC / Error Detection", desc: "A mathematical check at the end of the frame that catches bits flipped by electrical noise." }
      ],
      learned: "Layer 2 uses MAC addresses and switches to move frames across a single local network link and catches transmission errors.",
      quiz: {
        question: "What is the Protocol Data Unit (PDU) at the Data Link Layer?",
        options: [
          { text: "Frame", correct: true },
          { text: "Segment", correct: false },
          { text: "Packet", correct: false }
        ],
        explanation: "Correct! Data at Layer 2 is packaged into Frames with MAC addresses and an error-checking trailer."
      }
    },
    {
      num: 1,
      name: "Physical Layer",
      pdu: "Bits (0s and 1s)",
      color: "#ef4444",
      oneLiner: "The raw hardware foundation — converts frames into electric voltage, light flashes, or radio waves.",
      simpleExplanation:
        "Everything we've built — the words, encryption, port numbers, IP addresses, and MAC headers — must finally leave the machine as pure physical energy! The Physical Layer converts everything into raw binary bits (0s and 1s) and blasts them through copper cables as electrical voltage, through fiber-optic glass as light pulses, or through the air as radio waves.",
      analogy:
        "The physical asphalt highway or railway tracks. Without physical road, the courier cannot move regardless of how nicely packaged the box is.",
      whatHappens: [
        "The entire frame is converted into a stream of binary bits: 01001101 01100001...",
        "Copper Ethernet: Voltage high = 1, voltage low = 0.",
        "Fiber Optics: Light pulse on = 1, light pulse off = 0.",
        "Wi-Fi / 5G: Modulated radio frequency electromagnetic waves.",
        "The bits fly across the physical media toward Maharawal Ratan Singh's camp!"
      ],
      pigeonQuote: "आखिरकार! अब संदेश 0 और 1 बनकर असली transmission journey पर निकल चुका है!",
      pigeonMood: "🕊️ ⚡",
      terms: [
        { term: "Bits (Binary Digits)", desc: "The smallest unit of computer data — strictly 0 or 1." },
        { term: "Fiber Optic Cable", desc: "Transmits data as beams of laser light through ultra-pure glass strands at near light-speed." },
        { term: "Ethernet (Twisted Pair)", desc: "Copper cables that carry data as high/low electrical voltages." },
        { term: "Radio Frequency", desc: "Wireless electromagnetic waves used by Wi-Fi, Bluetooth, and 4G/5G mobile towers." }
      ],
      learned: "The Physical Layer deals with the physical medium, connectors, voltages, and converting data into raw 0s and 1s.",
      quiz: {
        question: "What does the Physical Layer transmit across communication media?",
        options: [
          { text: "Raw Bits (0s and 1s)", correct: true },
          { text: "HTML files", correct: false },
          { text: "SQL queries", correct: false }
        ],
        explanation: "Exactly! At Layer 1, all data is reduced to raw binary bits transmitted as light, electricity, or radio waves."
      }
    }
  ];

  // ── Stepper builder ───────────────────────────────────────
  function updateStepper() {
    const steps = [
      { id: "intro", label: "Intro 👑" },
      { id: 7, label: "L7 App" },
      { id: 6, label: "L6 Pres" },
      { id: 5, label: "L5 Sess" },
      { id: 4, label: "L4 Tran" },
      { id: 3, label: "L3 Net" },
      { id: 2, label: "L2 Link" },
      { id: 1, label: "L1 Phys" },
      { id: "reverse", label: "Decap 🔓" },
      { id: "dashboard", label: "Review 📋" }
    ];

    stepper.innerHTML = steps
      .map(
        s => `
        <button class="step-pill ${currentStep === s.id ? "active" : ""}" data-step="${s.id}">
          ${s.label}
        </button>`
      )
      .join("");

    stepper.querySelectorAll(".step-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.step;
        goToStep(isNaN(target) ? target : parseInt(target));
      });
    });
  }

  function goToStep(step) {
    currentStep = step;
    updateStepper();
    renderStage();
  }

  // ── Render Stage based on currentStep ─────────────────────
  function renderStage() {
    stage.scrollTop = 0;
    if (currentStep === "intro") {
      renderIntro();
    } else if (typeof currentStep === "number") {
      renderLayer(currentStep);
    } else if (currentStep === "reverse") {
      renderReverse();
    } else if (currentStep === "dashboard") {
      renderDashboard();
    }
  }

  // ── 1. STORY INTRODUCTION ─────────────────────────────────
  function renderIntro() {
    stage.innerHTML = `
      <div class="osi-intro-card glass-card">
        <div class="royal-banner-head">
          <span class="royal-emblem">👑 🕊️ 👑</span>
          <div class="royal-headline">BREAKING ROYAL NEWS FROM RAJASTHAN!</div>
          <div class="royal-subhead">Chittorgarh Palace • Year 1303 CE (Digital Remaster)</div>
        </div>

        <div class="royal-cast-grid">
          <div class="cast-card sender">
            <div class="cast-avatar">👸</div>
            <div class="cast-title">The Sender</div>
            <div class="cast-name">Maharani Padmavati</div>
            <div class="cast-place">Chittorgarh Palace, Rajasthan</div>
            <div class="cast-bubble">
              "महाराज, आप कहाँ हैं? ❤️<br/><strong>जल्दी वापस आइए!</strong>"
            </div>
          </div>

          <div class="cast-mission-center">
            <div class="pigeon-hero-avatar">🕊️</div>
            <div class="mission-tag">THE ROYAL COURIER</div>
            <div class="pigeon-dialogue-box">
              <span class="pigeon-name">Royal Pigeon:</span>
              <p>"Even in a royal kingdom, messages need proper networking! Delivering this message is not simple — I must carry it through <strong>all 7 OSI networking layers</strong>! Let's see how the internet actually works!"</p>
            </div>
            <div class="mission-path-preview">
              <span>Application</span> ➔ <span>Presentation</span> ➔ <span>Session</span> ➔ <span>Transport</span> ➔ <span>Network</span> ➔ <span>Data Link</span> ➔ <span>Physical</span>
            </div>
          </div>

          <div class="cast-card receiver">
            <div class="cast-avatar">🤴</div>
            <div class="cast-title">The Receiver</div>
            <div class="cast-name">Maharawal Ratan Singh</div>
            <div class="cast-place">Royal Battlefield, Mewar</div>
            <div class="cast-waiting">
              Waiting on his royal smartphone... 📱<br/>
              <span class="status-waiting">Status: Offline until bits arrive</span>
            </div>
          </div>
        </div>

        <div class="intro-action-bar">
          <div class="intro-rule-note">
            💡 <strong>Mission Rule:</strong> We will follow the message layer-by-layer. At every layer, you'll see what happens to the message, enjoy a funny pigeon comment, learn important tech terms in plain English, and answer one quick question before moving forward!
          </div>
          <button class="btn btn-primary btn-lg pulse-glow" id="startMissionBtn">
            🕊️ Start Royal Pigeon Mission (Layer 7 ➔)
          </button>
        </div>
      </div>
    `;

    document.getElementById("startMissionBtn").addEventListener("click", () => {
      goToStep(7);
    });
  }

  // ── 2. SEVEN LAYER DETAILS ────────────────────────────────
  function renderLayer(layerNum) {
    const layer = LAYERS.find(l => l.num === layerNum);
    if (!layer) return;

    const isLastLayer = layerNum === 1;
    const nextStep = isLastLayer ? "reverse" : layerNum - 1;
    const prevStep = layerNum === 7 ? "intro" : layerNum + 1;

    stage.innerHTML = `
      <div class="osi-layer-container">
        <!-- Layer Header Card -->
        <div class="layer-header-card glass-card" style="border-left: 5px solid ${layer.color};">
          <div class="layer-badge-row">
            <span class="layer-pill" style="background:${layer.color}22; color:${layer.color}; border:1px solid ${layer.color};">
              LAYER ${layer.num} of 7
            </span>
            <span class="pdu-pill">Data Unit: <strong>${layer.pdu}</strong></span>
          </div>
          <h2 class="layer-title">${layer.name}</h2>
          <p class="layer-oneliner">${layer.oneLiner}</p>
        </div>

        <!-- 2-Column Core Layout -->
        <div class="layer-body-grid">
          <!-- Left: Explanations & Royal Journey -->
          <div class="layer-text-column">
            <!-- Simple Explanation -->
            <div class="glass-card layer-section">
              <div class="section-tag">📖 Simple Explanation (Beginner Friendly)</div>
              <p class="simple-text">${layer.simpleExplanation}</p>
            </div>

            <!-- Real-Life Analogy -->
            <div class="glass-card layer-section analogy-card">
              <div class="section-tag">💡 Real-Life Analogy</div>
              <p class="analogy-text">${layer.analogy}</p>
            </div>

            <!-- What happens to our message -->
            <div class="glass-card layer-section message-transform-card">
              <div class="section-tag">📜 What Happens to our Royal Message Here?</div>
              <ul class="transform-list">
                ${layer.whatHappens.map(step => `<li>${step}</li>`).join("")}
              </ul>
            </div>
          </div>

          <!-- Right: Visual Animation Canvas / Interactive Widget -->
          <div class="layer-visual-column">
            <div class="glass-card visual-stage-card">
              <div class="visual-stage-header">
                <span class="visual-label">🎬 Visual Metaphor — Layer ${layer.num}</span>
                <span class="visual-status" id="visualStatusText">Live Simulation</span>
              </div>
              <div class="visual-animation-wrap" id="visualAnimationWrap">
                <!-- Render unique interactive simulation per layer -->
              </div>
            </div>

            <!-- Pigeon Dialogue Box -->
            <div class="glass-card pigeon-dialogue-card">
              <div class="pigeon-card-head">
                <span class="pigeon-head-avatar">${layer.pigeonMood}</span>
                <span class="pigeon-head-name">Royal Pigeon's Diary</span>
              </div>
              <p class="pigeon-quote">"${layer.pigeonQuote}"</p>
            </div>
          </div>
        </div>

        <!-- Tech Terms & What We Learned -->
        <div class="layer-footer-grid">
          <div class="glass-card terms-card">
            <div class="section-tag">🔑 Technical Terminology &amp; Keywords</div>
            <div class="terms-list">
              ${layer.terms
                .map(
                  t => `
                <div class="term-item">
                  <div class="term-name">${t.term}</div>
                  <div class="term-desc">${t.desc}</div>
                </div>`
                )
                .join("")}
            </div>
          </div>

          <div class="glass-card learned-card">
            <div class="section-tag">🎯 What Did We Learn?</div>
            <p class="learned-text">${layer.learned}</p>
          </div>
        </div>

        <!-- Knowledge Check Quiz -->
        <div class="glass-card quiz-card" id="quizCard">
          <div class="section-tag">🧠 Quick Knowledge Check — Layer ${layer.num}</div>
          <p class="quiz-question">${layer.quiz.question}</p>
          <div class="quiz-options" id="quizOptions">
            ${layer.quiz.options
              .map(
                (opt, i) => `
              <button class="quiz-option-btn" data-correct="${opt.correct}" data-index="${i}">
                <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
                <span class="opt-text">${opt.text}</span>
              </button>`
              )
              .join("")}
          </div>
          <div class="quiz-feedback" id="quizFeedback" hidden></div>
        </div>

        <!-- Navigation Controls -->
        <div class="layer-nav-bar">
          <button class="btn btn-outline" id="prevLayerBtn">
            ← Previous (${typeof prevStep === "number" ? "Layer " + prevStep : "Intro"})
          </button>
          <div class="layer-nav-center">
            <span class="nav-hint">Step ${8 - layerNum} of 9</span>
          </div>
          <button class="btn btn-primary btn-lg" id="nextLayerBtn">
            ${isLastLayer ? "🔓 Watch Reverse Unpacking ➔" : `Next: Layer ${nextStep} (${LAYERS.find(l => l.num === nextStep)?.name.split(" ")[0]}) ➔`}
          </button>
        </div>
      </div>
    `;

    // Hook nav buttons
    document.getElementById("prevLayerBtn").addEventListener("click", () => goToStep(prevStep));
    document.getElementById("nextLayerBtn").addEventListener("click", () => goToStep(nextStep));

    // Hook quiz
    setupQuiz(layer);

    // Build specific animation for this layer
    buildLayerAnimation(layerNum);
  }

  // ── SPECIFIC LAYER ANIMATIONS ─────────────────────────────
  function buildLayerAnimation(num) {
    const wrap = document.getElementById("visualAnimationWrap");
    if (!wrap) return;

    if (num === 7) {
      // Layer 7: Typing Maharani + Smartphone + Pigeon receiving letter
      wrap.innerHTML = `
        <div class="sim-l7">
          <div class="phone-frame">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <div class="chat-header">
                <span class="chat-avatar">👸</span>
                <div class="chat-user">Maharani Padmavati<span class="chat-status">online (Chittorgarh)</span></div>
              </div>
              <div class="chat-body">
                <div class="chat-bubble royal-typing" id="typingBubble">
                  महाराज, आप कहाँ हैं? ❤️ जल्दी वापस आइए!
                </div>
                <div class="chat-meta">Protocol: HTTPS (Port 443) • App: RoyalMessenger</div>
              </div>
              <div class="phone-send-bar">
                <button class="btn-royal-send" id="simulateSendBtn">🚀 Send Letter</button>
              </div>
            </div>
          </div>
          <div class="sim-pigeon-receive" id="pigeonLetter">
            <div class="pigeon-anim">🕊️</div>
            <div class="letter-scroll" id="flyingLetter">📜 [Payload Data]</div>
          </div>
        </div>
      `;
      document.getElementById("simulateSendBtn")?.addEventListener("click", () => {
        const letter = document.getElementById("flyingLetter");
        letter.classList.add("dispatched");
        letter.textContent = "📜 Handed to Layer 6!";
      });
    } else if (num === 6) {
      // Layer 6: Formatting machine, Compression, Encryption
      wrap.innerHTML = `
        <div class="sim-l6">
          <div class="pipeline-row">
            <div class="pipe-box" id="pipeOriginal">
              <div class="pipe-title">1. Raw Text</div>
              <div class="pipe-content">"महाराज, आप कहाँ हैं? ❤️"</div>
            </div>
            <div class="pipe-arrow">➔</div>
            <div class="pipe-box" id="pipeFormat">
              <div class="pipe-title">2. UTF-8 Format</div>
              <div class="pipe-content code-font">4D 61 68 61 72 61 6A...</div>
            </div>
          </div>
          <div class="pipeline-row" style="margin-top:1rem;">
            <div class="pipe-box" id="pipeCompress">
              <div class="pipe-title">3. Compressed (Gzip)</div>
              <div class="pipe-content">Size: 42 B ➔ 18 B (-57%)</div>
            </div>
            <div class="pipe-arrow">➔</div>
            <div class="pipe-box locked" id="pipeEncrypt">
              <div class="pipe-title">4. Encrypted (TLS 1.3)</div>
              <div class="pipe-content">🔒 [AES-256 CIPHERTEXT]</div>
              <div class="lock-status">Safe from enemy spies! 🛡️</div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" id="toggleCipherBtn" style="margin-top:1rem;">
            🔓 Toggle Illustrative Decryption
          </button>
        </div>
      `;
      let locked = true;
      document.getElementById("toggleCipherBtn")?.addEventListener("click", () => {
        locked = !locked;
        const box = document.getElementById("pipeEncrypt");
        box.querySelector(".pipe-content").textContent = locked
          ? "🔒 [AES-256 CIPHERTEXT]"
          : "🔓 \"महाराज, आप कहाँ हैं? ❤️\" (Decrypted preview)";
      });
    } else if (num === 5) {
      // Layer 5: Two palaces + royal handshake + SESSION ESTABLISHED
      wrap.innerHTML = `
        <div class="sim-l5">
          <div class="session-palaces">
            <div class="palace-node">
              <div class="palace-icon">🏰</div>
              <div class="palace-name">Chittorgarh Palace</div>
              <div class="port-tag">Sender Endpoint</div>
            </div>
            <div class="session-handshake-channel" id="handshakeChannel">
              <div class="handshake-line"></div>
              <div class="handshake-packet" id="handshakePkt">SYN</div>
              <div class="session-badge" id="sessionBadge">CONNECTING...</div>
            </div>
            <div class="palace-node">
              <div class="palace-icon">⛺</div>
              <div class="palace-name">Mewar Royal Camp</div>
              <div class="port-tag">Receiver Endpoint</div>
            </div>
          </div>
          <div class="session-controls">
            <button class="btn btn-outline btn-sm" id="btnSyncCheck">
              ⚡ Trigger Sync Checkpoint
            </button>
            <span class="sync-indicator" id="syncStatus">Checkpoints: 3/3 active</span>
          </div>
        </div>
      `;
      setTimeout(() => {
        const badge = document.getElementById("sessionBadge");
        if (badge) {
          badge.textContent = "SESSION ESTABLISHED (ID: #ROYAL-1303)";
          badge.classList.add("established");
        }
      }, 800);
      document.getElementById("btnSyncCheck")?.addEventListener("click", () => {
        const st = document.getElementById("syncStatus");
        st.textContent = "✅ Royal Sync Point saved at " + new Date().toLocaleTimeString();
      });
    } else if (num === 4) {
      // Layer 4: Segmenter + interactive TCP / UDP switch
      wrap.innerHTML = `
        <div class="sim-l4">
          <div class="proto-switch-bar">
            <span>Transport Protocol:</span>
            <button class="btn-toggle-proto ${tcpMode === "tcp" ? "active" : ""}" id="btnTCP">
              🛡️ TCP (Reliable)
            </button>
            <button class="btn-toggle-proto ${tcpMode === "udp" ? "active" : ""}" id="btnUDP">
              ⚡ UDP (Fast / No-ACK)
            </button>
          </div>

          <div class="segment-conveyor">
            <div class="conveyor-title" id="protoTitle">
              ${tcpMode === "tcp" ? "TCP Mode: Segments with Sequence Numbers & ACK" : "UDP Mode: Lightweight Datagrams with No Retransmit"}
            </div>
            <div class="segment-boxes" id="segmentBoxes">
              ${[1, 2, 3]
                .map(
                  i => `
                <div class="segment-box ${tcpMode}">
                  <div class="seg-hdr">Port 443 ➔ 5222</div>
                  <div class="seg-body">${tcpMode === "tcp" ? `Seq #${i}` : `Datagram #${i}`}</div>
                  <div class="seg-ack">${tcpMode === "tcp" ? `ACK #${i + 1} ✓` : `No ACK`}</div>
                </div>`
                )
                .join("")}
            </div>
          </div>
          <div class="proto-desc-box" id="protoDesc">
            ${
              tcpMode === "tcp"
                ? "💡 <strong>TCP:</strong> If Segment #2 gets lost in the Thar Desert, the receiver won't send ACK #3 until Segment #2 is retransmitted. Nothing gets lost!"
                : "⚡ <strong>UDP:</strong> Packets are hurled like royal arrows. Fast, but if one falls into the sand, no one asks for a re-send."
            }
          </div>
        </div>
      `;

      document.getElementById("btnTCP")?.addEventListener("click", () => {
        tcpMode = "tcp";
        buildLayerAnimation(4);
      });
      document.getElementById("btnUDP")?.addEventListener("click", () => {
        tcpMode = "udp";
        buildLayerAnimation(4);
      });
    } else if (num === 3) {
      // Layer 3: Interactive animated router map with documentation IPs
      wrap.innerHTML = `
        <div class="sim-l3">
          <div class="ip-packet-header-view">
            <span class="hdr-tag">IP Packet Header</span>
            <span class="ip-addr-pill src">Source IP: 192.0.2.10 (Chittor Palace)</span>
            <span class="ip-arrow">➔</span>
            <span class="ip-addr-pill dst">Dest IP: 198.51.100.20 (Mewar Camp)</span>
          </div>
          <div class="disclaimer-mini">*(Note: 192.0.2.0/24 & 198.51.100.0/24 are official RFC 5737 documentation/example IP ranges)*</div>

          <div class="router-map">
            <div class="map-node palace-node">
              <span>🏰</span>
              <div class="lbl">Chittor (Src)</div>
            </div>
            <div class="router-cloud">
              <div class="r-node" id="r1"><span>🔀</span><div class="lbl">Router R1</div></div>
              <div class="r-node" id="r2"><span>🔀</span><div class="lbl">Router R2</div></div>
              <div class="r-node" id="r3"><span>🔀</span><div class="lbl">Router R3</div></div>
              <div class="animated-packet-dot" id="movingPacket">📦</div>
            </div>
            <div class="map-node camp-node">
              <span>⛺</span>
              <div class="lbl">Mewar (Dest)</div>
            </div>
          </div>
          <div class="routing-log" id="routingLog">
            Hop 1: Chittorgarh Gateway ➔ R1 (Best path selected via OSPF metric 10)
          </div>
        </div>
      `;
    } else if (num === 2) {
      // Layer 2: Network switch, Frame formation, MAC addresses, CRC check
      wrap.innerHTML = `
        <div class="sim-l2">
          <div class="frame-structure">
            <div class="frame-chunk f-preamble">Preamble</div>
            <div class="frame-chunk f-mac">Dst MAC: 00:1A:2B:3C:4D:5E</div>
            <div class="frame-chunk f-mac">Src MAC: AA:BB:CC:DD:EE:FF</div>
            <div class="frame-chunk f-payload">📦 IP Packet</div>
            <div class="frame-chunk f-crc" id="crcChunk">CRC Check: Valid ✓</div>
          </div>

          <div class="switch-lan-demo">
            <div class="switch-core">
              <span class="switch-icon">🖧</span>
              <span class="switch-name">Mewar Camp Ethernet Switch</span>
              <div class="mac-table">
                <span>Port 1: Maharawal's Tablet [00:1A:2B:3C:4D:5E]</span>
              </div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" id="testCrcBtn" style="margin-top:0.5rem;">
            🧪 Test CRC Error Detection
          </button>
        </div>
      `;
      document.getElementById("testCrcBtn")?.addEventListener("click", () => {
        const crc = document.getElementById("crcChunk");
        crc.classList.toggle("corrupted");
        crc.textContent = crc.classList.contains("corrupted")
          ? "CRC: CORRUPT! Frame Dropped ❌"
          : "CRC Check: Valid ✓";
      });
    } else if (num === 1) {
      // Layer 1: Glowing transmission tunnel 010101, fiber pulses, radio waves
      wrap.innerHTML = `
        <div class="sim-l1">
          <div class="tunnel-stage">
            <div class="tunnel-header">
              <span>Physical Signalling Media:</span>
              <span class="media-type active" id="btnFiber">🔦 Fiber Optic (Light)</span>
              <span class="media-type" id="btnCopper">⚡ Copper (Voltage)</span>
              <span class="media-type" id="btnWifi">📡 Radio Waves (Wi-Fi)</span>
            </div>
            <div class="bit-stream" id="bitStream">
              0 1 0 0 1 1 0 1 0 1 1 0 0 0 0 1 0 1 1 0 1 0 0 0 0 1 1 0 0 0 0 1
            </div>
            <div class="tunnel-canvas-placeholder">
              <div class="flying-pigeon-stream">🕊️ ➔ ➔ ➔ ⚡ 010101 ⚡ ➔ ➔ ➔ 📱</div>
            </div>
            <div class="speed-of-light-note">
              Speed: ~200,000 km/s in glass optical fiber. From Chittorgarh to Mewar in &lt; 2 milliseconds!
            </div>
          </div>
        </div>
      `;
    }
  }

  // ── QUIZ LOGIC ────────────────────────────────────────────
  function setupQuiz(layer) {
    const card = document.getElementById("quizCard");
    const options = card.querySelectorAll(".quiz-option-btn");
    const feedback = document.getElementById("quizFeedback");

    options.forEach(btn => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.dataset.correct === "true";
        options.forEach(b => b.classList.remove("selected", "correct", "wrong"));

        btn.classList.add("selected");
        if (isCorrect) {
          btn.classList.add("correct");
          feedback.className = "quiz-feedback correct";
          feedback.innerHTML = `🎉 <strong>Correct!</strong> ${layer.quiz.explanation}`;
          feedback.removeAttribute("hidden");
        } else {
          btn.classList.add("wrong");
          feedback.className = "quiz-feedback wrong";
          feedback.innerHTML = `❌ <strong>Not quite!</strong> Try again, or review the simple explanation above!`;
          feedback.removeAttribute("hidden");
        }
      });
    });
  }

  // ── 3. RECEIVING SIDE — REVERSE JOURNEY ────────────────────
  function renderReverse() {
    stage.innerHTML = `
      <div class="osi-reverse-container glass-card">
        <div class="reverse-header">
          <span class="reverse-icon">🔓 🕊️ 📱</span>
          <h2>The Message Arrives at the Battlefield!</h2>
          <p class="reverse-sub">
            The bits hit Maharawal Ratan Singh's phone antenna. Now, watch <strong>DECAPSULATION</strong> in reverse!
            The phone strips away each layer from Layer 1 up to Layer 7 until the original words appear.
          </p>
        </div>

        <div class="reverse-layers-stack" id="reverseStack">
          <div class="reverse-layer-bar" data-layer="1">
            <span class="rev-num">L1</span>
            <span class="rev-name">Physical Layer</span>
            <span class="rev-action">Radio pulses received ➔ Converted back into 0s and 1s bits</span>
            <span class="rev-icon">✓</span>
          </div>
          <div class="reverse-layer-bar" data-layer="2">
            <span class="rev-num">L2</span>
            <span class="rev-name">Data Link Layer</span>
            <span class="rev-action">Checks MAC address &amp; verifies CRC checksum ➔ Strips frame header</span>
            <span class="rev-icon">✓</span>
          </div>
          <div class="reverse-layer-bar" data-layer="3">
            <span class="rev-num">L3</span>
            <span class="rev-name">Network Layer</span>
            <span class="rev-action">Verifies destination IP matches this phone ➔ Strips IP packet header</span>
            <span class="rev-icon">✓</span>
          </div>
          <div class="reverse-layer-bar" data-layer="4">
            <span class="rev-num">L4</span>
            <span class="rev-name">Transport Layer</span>
            <span class="rev-action">Reassembles segments in order by sequence number &amp; sends TCP ACK ➔ Hands data to Port 443</span>
            <span class="rev-icon">✓</span>
          </div>
          <div class="reverse-layer-bar" data-layer="5">
            <span class="rev-num">L5</span>
            <span class="rev-name">Session Layer</span>
            <span class="rev-action">Maintains active dialogue connection with Chittorgarh Palace</span>
            <span class="rev-icon">✓</span>
          </div>
          <div class="reverse-layer-bar" data-layer="6">
            <span class="rev-num">L6</span>
            <span class="rev-name">Presentation Layer</span>
            <span class="rev-action">Decrypts TLS ciphertext &amp; decompresses data into readable UTF-8 text</span>
            <span class="rev-icon">✓</span>
          </div>
          <div class="reverse-layer-bar" data-layer="7">
            <span class="rev-num">L7</span>
            <span class="rev-name">Application Layer</span>
            <span class="rev-action">RoyalMessenger app pings notification and renders golden message bubble!</span>
            <span class="rev-icon">✓</span>
          </div>
        </div>

        <div class="maharawal-arrival-card">
          <div class="ratan-avatar">🤴</div>
          <div class="ratan-dialogue">
            <div class="ratan-name">Maharawal Ratan Singh (reads phone screen):</div>
            <div class="ratan-screen">
              "महाराज, आप कहाँ हैं? ❤️ जल्दी वापस आइए!"
            </div>
            <div class="pigeon-verdict">
              🕊️ <em>Pigeon's Final Verdict:</em> "सातों OSI layers ने इतनी मेहनत की... और संदेश में सिर्फ इतना ही था! 😂❤️"
            </div>
          </div>
        </div>

        <div class="reverse-actions">
          <button class="btn btn-outline" id="prevReverseBtn">← Back to Layer 1</button>
          <button class="btn btn-primary btn-lg pulse-glow" id="goDashboardBtn">
            📋 Open 7-Layer Revision Dashboard ➔
          </button>
        </div>
      </div>
    `;

    // Cascade light-up animation
    const bars = stage.querySelectorAll(".reverse-layer-bar");
    bars.forEach((bar, i) => {
      setTimeout(() => {
        bar.classList.add("lit");
      }, (i + 1) * 350);
    });

    document.getElementById("prevReverseBtn").addEventListener("click", () => goToStep(1));
    document.getElementById("goDashboardBtn").addEventListener("click", () => goToStep("dashboard"));
  }

  // ── 4. FINAL SEVEN-LAYER REVISION DASHBOARD ───────────────
  function renderDashboard() {
    stage.innerHTML = `
      <div class="osi-dashboard-container glass-card">
        <div class="dashboard-header">
          <div class="dash-title-row">
            <span class="dash-crest">👑 🕊️ 🌐</span>
            <h2>Royal OSI Mission: Complete 7-Layer Master Dashboard</h2>
          </div>
          <p class="dash-sub">
            Congratulations! You've walked the royal message all the way from Maharani Padmavati's fingertip to Maharawal Ratan Singh's screen.
            Click any layer below to jump back and review its detailed concept anytime.
          </p>
        </div>

        <div class="dashboard-table-wrap">
          <table class="osi-summary-table" role="table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Name</th>
                <th>Data Unit (PDU)</th>
                <th>Main Function (In Plain English)</th>
                <th>Key Keywords</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              ${LAYERS.map(
                l => `
                <tr class="table-row-clickable" data-layer="${l.num}">
                  <td><span class="tbl-layer-pill" style="background:${l.color}22; color:${l.color};">L${l.num}</span></td>
                  <td><strong>${l.name}</strong></td>
                  <td><code>${l.pdu}</code></td>
                  <td>${l.oneLiner}</td>
                  <td><small>${l.terms.map(t => t.term).join(", ")}</small></td>
                  <td><button class="btn-review-sm" data-layer="${l.num}">Jump ↗</button></td>
                </tr>`
              ).join("")}
            </tbody>
          </table>
        </div>

        <!-- Conceptual Note -->
        <div class="dash-note-box">
          💡 <strong>Engineering Note:</strong> The OSI model is a 7-layer <em>conceptual reference model</em> designed to help us think about and design networks cleanly. Modern real-world Internet protocols are built on the simpler <strong>TCP/IP model (4 or 5 layers)</strong>, where Application, Presentation, and Session functions are usually handled directly by the application itself! But the 7-layer OSI model remains the gold standard for interviews, certifications (AWS, Cisco), and deep networking mastery.
        </div>

        <!-- Dashboard Actions -->
        <div class="dashboard-actions">
          <button class="btn btn-outline" id="replayMissionBtn">
            🔄 Replay Mission From Start
          </button>
          <a href="#contact" class="btn btn-primary btn-lg" id="hireFromOSIBtn">
            🚀 Hire Anil Kumawat (Cloud &amp; Networking Ready!)
          </a>
          <button class="btn btn-secondary" id="exitOSIBtn">
            ✕ Back to Portfolio
          </button>
        </div>
      </div>
    `;

    // Jump to layer buttons
    stage.querySelectorAll("[data-layer]").forEach(el => {
      el.addEventListener("click", e => {
        const layer = parseInt(el.dataset.layer);
        if (!isNaN(layer)) goToStep(layer);
      });
    });

    document.getElementById("replayMissionBtn")?.addEventListener("click", () => goToStep("intro"));
    document.getElementById("exitOSIBtn")?.addEventListener("click", onClose);
    document.getElementById("hireFromOSIBtn")?.addEventListener("click", () => {
      onClose();
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    });
  }

  // ── Public API ────────────────────────────────────────────
  function open() {
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    goToStep("intro");
  }

  function close() {
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    if (onClose) onClose();
  }

  return { open, close, goToStep };
}
