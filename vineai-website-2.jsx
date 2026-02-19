import { useState, useEffect, useRef, useCallback } from "react";

function useRouter() {
  const [route, setRoute] = useState("/");
  const navigate = useCallback((path) => { setRoute(path); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  return { route, navigate };
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView(0.1);
  const t = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };
  return (<div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : t[direction], transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>);
}

function GlassCard({ children, hover = true, style = {}, onClick }) {
  const base = { background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", cursor: onClick ? "pointer" : "default" };
  return (<div onClick={onClick} style={{ ...base, ...style }}
    onMouseEnter={hover ? (e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; } : undefined}
    onMouseLeave={hover ? (e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; } : undefined}
  >{children}</div>);
}

function Badge({ children }) {
  return (<span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "100px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399", fontSize: "13px", fontWeight: 500, fontFamily: "'DM Mono', monospace" }}>{children}</span>);
}

function PageHeader({ badge, title, subtitle }) {
  return (<div style={{ textAlign: "center", marginBottom: "64px" }}>
    <Reveal><Badge>{badge}</Badge></Reveal>
    <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em", color: "#fff", marginTop: "20px", marginBottom: "16px", lineHeight: 1.1 }}>{title}</h2></Reveal>
    {subtitle && <Reveal delay={0.1}><p style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", maxWidth: "560px", margin: "0 auto", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{subtitle}</p></Reveal>}
  </div>);
}

function Sec({ children, id }) {
  return (<section id={id} style={{ padding: "120px 24px", position: "relative" }}><div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>{children}</div></section>);
}

const CC = { Strategy: { bg: "rgba(52,211,153,0.1)", bd: "rgba(52,211,153,0.25)", tx: "#34d399" }, Insights: { bg: "rgba(96,165,250,0.1)", bd: "rgba(96,165,250,0.25)", tx: "#60a5fa" }, "Case Study": { bg: "rgba(251,191,36,0.1)", bd: "rgba(251,191,36,0.25)", tx: "#fbbf24" }, Compliance: { bg: "rgba(244,114,182,0.1)", bd: "rgba(244,114,182,0.25)", tx: "#f472b6" } };

const TEAM = [
  { id: "liam", name: "Liam Hargraves", role: "Founder & AI Strategist", ini: "LH", grad: "linear-gradient(135deg, #34d399, #059669)", accent: "#34d399",
    bio: "Former McKinsey consultant turned AI evangelist. Liam spent a decade helping Fortune 500 companies optimise operations before founding VineAI to bring that same rigour to Australian SMBs. He's led over 80 AI implementations and is obsessed with finding the 20% of changes that drive 80% of results.",
    spec: ["AI strategy", "Business transformation", "ROI modelling"], stats: [{ v: "80+", l: "AI projects" }, { v: "10yr", l: "Consulting" }, { v: "$12M", l: "Saved" }],
    quote: "Most businesses don't need more AI — they need the right AI in the right place." },
  { id: "maya", name: "Maya Okonkwo", role: "Head of AI Engineering", ini: "MO", grad: "linear-gradient(135deg, #60a5fa, #3b82f6)", accent: "#60a5fa",
    bio: "Maya leads VineAI's technical delivery — from custom GPT agents to full-stack automation pipelines. With a background in ML research at CSIRO and 6 years building production AI systems, she turns complex business problems into elegant, automated solutions.",
    spec: ["Machine learning", "Automation pipelines", "Custom AI agents"], stats: [{ v: "150+", l: "Automations" }, { v: "PhD", l: "Comp. Sci." }, { v: "6yr", l: "Prod. ML" }],
    quote: "The best automation is the one your team doesn't even notice — it just works." },
  { id: "jake", name: "Jake Whitfield", role: "Client Success Lead", ini: "JW", grad: "linear-gradient(135deg, #f472b6, #ec4899)", accent: "#f472b6",
    bio: "Jake is the bridge between technical implementation and real-world business impact. He manages every client relationship end-to-end, ensuring AI systems don't just get deployed — they get adopted, loved, and expanded. Previously ran operations at two high-growth Australian startups.",
    spec: ["Client management", "Change management", "Training & adoption"], stats: [{ v: "89%", l: "Retention" }, { v: "4.9★", l: "Rating" }, { v: "120+", l: "Clients" }],
    quote: "Technology only works if your team actually uses it. That's where I come in." },
];

const POSTS = [
  { id: "ai-audit-guide", title: "The Complete Guide to Running an AI Audit for Your SMB", excerpt: "Not sure where AI fits in your business? Here's our exact framework for identifying the highest-ROI opportunities.", category: "Strategy", time: "8 min", date: "Feb 12, 2026", featured: true, content: [
    { t: "i", text: "Every business has hidden inefficiencies that AI can solve. The challenge isn't whether AI can help — it's knowing where to start. After 120+ audits for Australian SMBs, we've refined a framework that consistently uncovers the highest-ROI opportunities." },
    { t: "h", text: "Why Most Businesses Get AI Wrong" },
    { t: "p", text: "The most common mistake is 'solution-first thinking' — businesses hear about a tool and try to find a problem for it. This leads to wasted money and AI scepticism. The right approach is problem-first: map your workflows, measure where time and money are lost, then match the right AI capability to each bottleneck." },
    { t: "h", text: "The 5-Step AI Audit Framework" },
    { t: "p", text: "Step 1: Process Inventory — Document every recurring workflow. We typically find 40–80 distinct processes in a company of 20. Step 2: Pain Scoring — Rate each on time consumed, error frequency, and frustration. Step 3: AI Feasibility Mapping — Assess whether current AI can meaningfully improve each high-pain process. Step 4: ROI Modelling — Calculate expected savings and cost impact. Step 5: Priority Ranking — Rank by combined ROI, speed, and risk score." },
    { t: "h", text: "What a Good Audit Delivers" },
    { t: "p", text: "A clear, prioritised roadmap — not a vague strategy deck. Each item includes the specific process to automate, the tool to use, expected ROI, and realistic timeline. Our clients typically find their top 3 opportunities account for 70% of total potential savings." },
    { t: "h", text: "Ready to Run Your Own Audit?" },
    { t: "p", text: "You can start with this framework yourself. But if you'd prefer an experienced team to do it faster, that's what our free consultation is for. We'll identify quick wins and give you a roadmap you can act on immediately." },
  ]},
  { id: "chatgpt-not-enough", title: "Why ChatGPT Alone Isn't Enough: Moving Beyond Basic AI", excerpt: "Your team uses ChatGPT for drafting emails. That's great — but you're only scratching the surface of what AI can do.", category: "Insights", time: "6 min", date: "Feb 5, 2026", featured: false, content: [
    { t: "i", text: "If your team is using ChatGPT for emails and questions, you're ahead of most. But conversational AI is just the tip of the iceberg. The real gains come from AI woven into your actual business systems." },
    { t: "h", text: "The ChatGPT Ceiling" },
    { t: "p", text: "ChatGPT doesn't know your customers, processes, or data. Every time your team uses it, they start from zero — copying context in, interpreting outputs, transferring results manually. That's assisted manual work, not automation." },
    { t: "h", text: "What Comes After ChatGPT" },
    { t: "p", text: "The next level is AI connected to your data and embedded in workflows. A system that auto-triages support tickets from your knowledge base. A pipeline that pulls CRM data, generates forecasts, and emails leadership — without anyone lifting a finger." },
    { t: "h", text: "The Integration Advantage" },
    { t: "p", text: "Integrated AI compounds benefits. Data flows automatically, decisions happen faster, teams focus on high-value work. Clients typically see 12x workflow speed improvement moving from ad-hoc ChatGPT to integrated systems." },
    { t: "h", text: "Making the Leap" },
    { t: "p", text: "Start with one high-impact workflow, automate it properly, measure results, and expand. That's exactly our approach with every VineAI client." },
  ]},
  { id: "automation-saves-23-hours", title: "How Automation Saved Our Clients 23 Hours Per Week (On Average)", excerpt: "We tracked time savings across 40 implementations. Here's where the biggest wins came from.", category: "Case Study", time: "7 min", date: "Jan 28, 2026", featured: false, content: [
    { t: "i", text: "When we tell clients our implementations save 23 hours per week on average, we get raised eyebrows. So we broke down exactly where those hours come from using data from 40 engagements." },
    { t: "h", text: "The Biggest Time Sinks" },
    { t: "p", text: "The three largest sources: data entry and transfer (8.2 hrs/week), reporting and dashboards (5.4 hrs/week), and email triage and response drafting (4.7 hrs/week). Together that's 18+ hours of recoverable time per week." },
    { t: "h", text: "Case Study: Coastal Builders" },
    { t: "p", text: "A Gold Coast construction firm with 35 employees spending 40 hours/week on admin. We implemented automated scheduling sync, AI-powered client comms, and auto-generated reports. Result: 32 hours saved per week." },
    { t: "h", text: "The Compound Effect" },
    { t: "p", text: "Time savings compound. Teams respond faster, spot problems earlier, and have capacity for growth. Several clients report revenue increases from freed-up capacity — not just cost savings." },
    { t: "h", text: "Your Potential Savings" },
    { t: "p", text: "Most SMBs with 5–100 employees have 15–30 hours per week of automatable work. The question isn't whether savings exist — it's which to capture first." },
  ]},
  { id: "ai-privacy-australia", title: "AI and Data Privacy: What Australian Businesses Need to Know", excerpt: "Implementing AI doesn't mean compromising on data security. Here's how to stay compliant with Australian privacy law.", category: "Compliance", time: "5 min", date: "Jan 20, 2026", featured: false, content: [
    { t: "i", text: "The most common concern we hear: where does my data go? Is it secure? Am I compliant? These are the right questions — and the answers are more reassuring than you think." },
    { t: "h", text: "The Australian Privacy Landscape" },
    { t: "p", text: "Australia's Privacy Act 1988 and the APPs set clear rules for personal information. When implementing AI, these rules apply just as they do to any other technology." },
    { t: "h", text: "Keeping Data Onshore" },
    { t: "p", text: "We prioritise onshore processing. Many AI tools offer AU/APAC hosting, and for sensitive data we deploy private models within your own infrastructure. Your customer data never needs to leave your control." },
    { t: "h", text: "Practical Privacy Safeguards" },
    { t: "p", text: "Every implementation includes data minimisation, role-based access, audit logging, and encryption at rest and in transit. For regulated industries, we add additional protection layers tailored to your requirements." },
    { t: "h", text: "The Bottom Line" },
    { t: "p", text: "AI and privacy aren't in conflict. With the right approach, you can automate aggressively while improving your security posture. The key is a partner who understands both the tech and the regulations." },
  ]},
  { id: "5-signs-ready-for-ai", title: "5 Signs Your Business Is Ready for AI (And 3 Signs It's Not)", excerpt: "AI isn't right for every business at every stage. Here's how to honestly assess whether now is the time to invest.", category: "Strategy", time: "5 min", date: "Jan 14, 2026", featured: false, content: [
    { t: "i", text: "Not every business is ready for AI, and that's okay. Implementing at the wrong time can be worse than not implementing at all. Here's how to tell if you're ready." },
    { t: "h", text: "5 Signs You're Ready" },
    { t: "p", text: "1. You have repeatable processes your team does weekly. 2. You're drowning in data but not extracting insights. 3. Your team is stretched thin because manual work eats their time. 4. You've tried ChatGPT/Zapier and want to go deeper. 5. You can articulate your bottlenecks." },
    { t: "h", text: "3 Signs You're Not Ready (Yet)" },
    { t: "p", text: "1. Your processes aren't documented — start there first. 2. You're looking for a magic bullet — AI amplifies good operations, doesn't fix broken ones. 3. Leadership isn't bought in — without commitment, tools gather dust." },
    { t: "h", text: "The Honest Assessment" },
    { t: "p", text: "If 3+ 'ready' signs fit you, you're in a strong position. If 'not ready' resonated more, that's valuable awareness — we can help you build toward readiness with a lighter engagement." },
    { t: "h", text: "Not Sure Where You Stand?" },
    { t: "p", text: "That's what our free consultation is for. In 30 minutes we'll give you an honest assessment and a concrete first step. No pressure, no jargon, just clarity." },
  ]},
];
function Nav({ scrolled, navigate, route }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [{ label: "Solution", act: () => navigate("/") }, { label: "Process", act: () => navigate("/") }, { label: "Team", act: () => navigate("/team") }, { label: "Blog", act: () => navigate("/blog") }];
  const isActive = (l) => (route === "/team" && l === "Team") || (route.startsWith("/blog") && l === "Blog");

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "12px 0" : "20px 0", background: scrolled ? "rgba(8,10,15,0.85)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent", transition: "all 0.4s ease" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #34d399, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 800, color: "#080a0f", fontFamily: "'Space Grotesk', sans-serif" }}>V</div>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>VineAI</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="nav-desktop">
          {links.map((item) => (
            <button key={item.label} onClick={item.act} style={{ color: isActive(item.label) ? "#34d399" : "rgba(255,255,255,0.55)", fontSize: "14px", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", transition: "color 0.2s", padding: 0 }}
              onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = isActive(item.label) ? "#34d399" : "rgba(255,255,255,0.55)"}>{item.label}</button>
          ))}
          <button onClick={() => { if (route !== "/") navigate("/"); setTimeout(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }), 150); }} style={{ padding: "10px 22px", borderRadius: "10px", background: "linear-gradient(135deg, #34d399, #059669)", color: "#080a0f", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 8px 30px rgba(52,211,153,0.3)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Book a Call</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile-btn" style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer" }}>{menuOpen ? "✕" : "☰"}</button>
      </div>
      {menuOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(8,10,15,0.95)", backdropFilter: "blur(20px)", padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="nav-mobile-menu">
          {links.map((item) => (<button key={item.label} onClick={() => { item.act(); setMenuOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 0", color: "rgba(255,255,255,0.7)", fontSize: "16px", background: "none", border: "none", fontFamily: "'DM Sans', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>{item.label}</button>))}
          <button onClick={() => { navigate("/"); setMenuOpen(false); }} style={{ display: "block", width: "100%", marginTop: "16px", padding: "14px", borderRadius: "10px", background: "linear-gradient(135deg, #34d399, #059669)", color: "#080a0f", fontSize: "15px", fontWeight: 600, textAlign: "center", border: "none", cursor: "pointer" }}>Book a Free Call</button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [c1, setC1] = useState(0); const [c2, setC2] = useState(0); const [c3, setC3] = useState(0);
  useEffect(() => { let s = 0; const t = setInterval(() => { s++; const e = 1 - Math.pow(1 - s / 60, 3); setC1(Math.round(e * 47)); setC2(Math.round(e * 12)); setC3(Math.round(e * 89)); if (s >= 60) clearInterval(t); }, 33); return () => clearInterval(t); }, []);
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "120px 24px 80px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <Reveal><Badge>{"🤖 AI Automation for Australian SMBs"}</Badge></Reveal>
        <Reveal delay={0.1}><h1 style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", marginTop: "24px", marginBottom: "24px" }}>Stop guessing.<br /><span style={{ background: "linear-gradient(135deg, #34d399, #6ee7b7, #a7f3d0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Start automating.</span></h1></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.65, color: "rgba(255,255,255,0.55)", maxWidth: "540px", marginBottom: "36px", fontFamily: "'DM Sans', sans-serif" }}>We audit your business, find the highest-impact AI opportunities, and implement the systems that cut costs, automate workflows, and free up your team.</p></Reveal>
        <Reveal delay={0.3}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <a href="#book" style={{ padding: "16px 32px", borderRadius: "12px", background: "linear-gradient(135deg, #34d399, #059669)", color: "#080a0f", fontSize: "16px", fontWeight: 700, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 20px rgba(52,211,153,0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(52,211,153,0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(52,211,153,0.2)"; }}>Book Free Consultation →</a>
            <a href="#process" style={{ padding: "16px 28px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontSize: "16px", fontWeight: 500, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>See How It Works</a>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <div style={{ display: "flex", gap: "32px", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
            {[{ v: `${c1}%`, l: "Avg. cost reduction" }, { v: `${c2}x`, l: "Workflow speedup" }, { v: `${c3}%`, l: "Client retention" }].map((s, i) => (<div key={i}><div style={{ fontSize: "28px", fontWeight: 700, color: "#34d399", fontFamily: "'Space Grotesk', sans-serif" }}>{s.v}</div><div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", marginTop: "4px" }}>{s.l}</div></div>))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { icon: "⏱", title: "Your team wastes hours on manual work", desc: "Data entry, follow-ups, reporting — tasks that should be automated eat your team's time every day.", stat: "23 hrs/wk", sl: "lost to manual tasks" },
    { icon: "🎯", title: "You know AI matters, but where to start?", desc: "The landscape changes weekly. You don't have time to become an AI expert on top of running a business.", stat: "73%", sl: "of SMBs unsure where to begin" },
    { icon: "💸", title: "You're paying for tools you barely use", desc: "Subscriptions stack up but nobody's connected the dots. Spending more, getting fragmented results.", stat: "$2.4K/mo", sl: "avg. wasted on unused SaaS" },
    { icon: "🔌", title: "Nothing talks to anything else", desc: "CRM doesn't sync with invoicing. Marketing runs in a silo. Data lives in 15 spreadsheets.", stat: "67%", sl: "of data stuck in silos" },
  ];
  return (<Sec id="problem">
    <PageHeader badge="⚠️ The Problem" title={<>You're leaving money<br />on the table. Every day.</>} subtitle="Most businesses sit on massive efficiency gains — they just don't know which levers to pull." />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
      {items.map((p, i) => (<Reveal key={i} delay={i * 0.1}><GlassCard style={{ padding: "32px 28px", height: "100%" }}>
        <div style={{ fontSize: "28px", marginBottom: "18px" }}>{p.icon}</div>
        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "12px", lineHeight: 1.35 }}>{p.title}</h3>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65, marginBottom: "20px" }}>{p.desc}</p>
        <div style={{ padding: "14px 16px", borderRadius: "10px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#f87171", fontFamily: "'Space Grotesk', sans-serif" }}>{p.stat}</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", marginTop: "2px" }}>{p.sl}</div>
        </div>
      </GlassCard></Reveal>))}
    </div>
  </Sec>);
}

function Solution() {
  const items = [
    { icon: "🔍", title: "AI Opportunity Audit", desc: "We map every process, find the biggest drains, and show exactly where AI has the highest ROI.", f: ["Process mapping", "ROI modelling", "Priority scoring"] },
    { icon: "⚡", title: "Workflow Automation", desc: "Custom systems that eliminate repetitive tasks, reduce errors, and give your team time back.", f: ["Custom integrations", "Zero-code solutions", "Auto-reporting"] },
    { icon: "🧠", title: "AI Implementation", desc: "From chatbots to predictive analytics — AI tools tailored to your industry, data, and goals.", f: ["Custom AI agents", "Data pipelines", "Smart dashboards"] },
    { icon: "📈", title: "Ongoing Optimisation", desc: "We continuously monitor, improve, and expand your AI systems as your business grows.", f: ["Performance tracking", "Monthly reports", "Scaling roadmap"] },
  ];
  return (<Sec id="solution">
    <PageHeader badge="✅ The Solution" title={<>AI that actually works<br />for your business</>} subtitle="No buzzwords. No generic tools. High-impact AI designed around how your business actually operates." />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
      {items.map((b, i) => (<Reveal key={i} delay={i * 0.1}><GlassCard style={{ padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(52,211,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "20px" }}>{b.icon}</div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "12px" }}>{b.title}</h3>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65, marginBottom: "20px", flex: 1 }}>{b.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>{b.f.map((f, j) => (<span key={j} style={{ padding: "5px 12px", borderRadius: "6px", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.15)", fontSize: "12px", color: "#34d399", fontFamily: "'DM Mono', monospace" }}>{f}</span>))}</div>
      </GlassCard></Reveal>))}
    </div>
  </Sec>);
}

function Process() {
  const steps = [
    { n: "01", title: "Discovery Call", desc: "30-minute call to understand your business, team, and bottlenecks. No sales pitch.", time: "Day 1", d: "Free" },
    { n: "02", title: "AI Audit & Roadmap", desc: "We audit your workflows, data, and tools. You get a prioritised roadmap ranked by impact.", time: "Week 1–2", d: "PDF report" },
    { n: "03", title: "Build & Implement", desc: "We design, build, and deploy your AI systems with weekly check-ins and demos.", time: "Week 3–6", d: "Agile sprints" },
    { n: "04", title: "Launch & Optimise", desc: "Go live with full support. We monitor performance and continuously improve.", time: "Ongoing", d: "Monthly reviews" },
  ];
  return (<Sec id="process">
    <PageHeader badge="🔄 How It Works" title={<>From chaos to clarity<br />in four steps</>} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
      {steps.map((s, i) => (<Reveal key={i} delay={i * 0.1}><GlassCard style={{ padding: "32px 28px", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, #34d399, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "16px", color: "#080a0f", flexShrink: 0 }}>{s.n}</div>
          <div><h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3><div style={{ fontSize: "12px", color: "#34d399", fontFamily: "'DM Mono', monospace", marginTop: "2px" }}>{s.time} · {s.d}</div></div>
        </div>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65 }}>{s.desc}</p>
      </GlassCard></Reveal>))}
    </div>
  </Sec>);
}
function Proof() {
  const test = [
    { name: "Sarah Chen", role: "CEO, BrightPath Logistics", loc: "Melbourne", text: "VineAI found $180K in annual savings we didn't know we were losing. Their AI audit was the single best investment we made.", stat: "$180K", sl: "annual savings", av: "SC" },
    { name: "Marcus Drewe", role: "Ops Director, Coastal Builders", loc: "Gold Coast", text: "We went from drowning in admin to automated reporting, scheduling, and client comms. My team focuses on what matters.", stat: "32hrs", sl: "saved per week", av: "MD" },
    { name: "Priya Sharma", role: "Founder, Elevate Digital", loc: "Sydney", text: "I was sceptical about AI consultants. VineAI changed my mind. They don't just advise — they build, deploy, and optimise.", stat: "3x", sl: "revenue per employee", av: "PS" },
  ];
  return (<Sec id="results">
    <PageHeader badge="⭐ Results" title={<>Real businesses.<br />Real results.</>} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "48px" }}>
      {[{ v: "47%", l: "Avg. cost reduction", ic: "📉" }, { v: "120+", l: "Businesses transformed", ic: "🏢" }, { v: "$4.2M", l: "Client savings to date", ic: "💰" }, { v: "12x", l: "Avg. workflow speedup", ic: "⚡" }].map((s, i) => (
        <Reveal key={i} delay={i * 0.05}><GlassCard style={{ padding: "28px 24px" }}>
          <div style={{ fontSize: "14px", marginBottom: "16px", opacity: 0.4 }}>{s.ic}</div>
          <div style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "#34d399", lineHeight: 1, marginBottom: "8px" }}>{s.v}</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Mono', monospace" }}>{s.l}</div>
        </GlassCard></Reveal>
      ))}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
      {test.map((t, i) => (<Reveal key={i} delay={i * 0.1}><GlassCard style={{ padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 18px", borderRadius: "10px", background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.12)", marginBottom: "20px", display: "inline-flex", alignItems: "baseline", gap: "8px", alignSelf: "flex-start" }}>
          <span style={{ fontSize: "24px", fontWeight: 700, color: "#34d399", fontFamily: "'Space Grotesk', sans-serif" }}>{t.stat}</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace" }}>{t.sl}</span>
        </div>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, flex: 1, marginBottom: "24px", fontStyle: "italic" }}>"{t.text}"</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #34d399, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#080a0f", fontFamily: "'Space Grotesk', sans-serif" }}>{t.av}</div>
          <div><div style={{ fontSize: "14px", fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{t.name}</div><div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}>{t.role} · {t.loc}</div></div>
        </div>
      </GlassCard></Reveal>))}
    </div>
  </Sec>);
}

function About() {
  return (<Sec id="about">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
      <Reveal direction="right"><div>
        <Badge>{"👋 About VineAI"}</Badge>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em", color: "#fff", marginTop: "20px", marginBottom: "20px" }}>Built for business owners who want answers, not hype.</h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, marginBottom: "16px" }}>VineAI was founded because we saw Australian businesses being left behind — not for lack of ambition, but for lack of clear, practical guidance.</p>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, marginBottom: "32px" }}>We're a team of AI engineers, strategists, and automation specialists who embed into your operations and deliver measurable results.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[{ i: "🇦🇺", l: "Australian-founded & operated" }, { i: "🤝", l: "120+ businesses served" }, { i: "🏆", l: "AI specialists since 2021" }, { i: "🔒", l: "Privacy-first, data onshore" }].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 18px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "20px" }}>{c.i}</span><span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{c.l}</span>
            </div>
          ))}
        </div>
      </div></Reveal>
      <Reveal direction="left" delay={0.15}>
        <GlassCard hover={false} style={{ padding: "40px 32px", background: "rgba(52,211,153,0.03)", border: "1px solid rgba(52,211,153,0.1)" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "rgba(52,211,153,0.5)", marginBottom: "20px" }}>{"// our_philosophy.js"}</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#fff", lineHeight: 1.4, marginBottom: "24px" }}>"Every business has AI opportunities hiding in plain sight. Our job is to find them, build them, and prove they work."</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[{ v: "5–100", l: "Employee range" }, { v: "SMB", l: "Focus segment" }, { v: "6 weeks", l: "Avg. implementation" }, { v: "AU-wide", l: "Service area" }].map((item, i) => (
              <div key={i} style={{ padding: "14px", borderRadius: "8px", background: "rgba(255,255,255,0.03)" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#34d399", fontFamily: "'Space Grotesk', sans-serif" }}>{item.v}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", marginTop: "4px" }}>{item.l}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </Reveal>
    </div>
  </Sec>);
}

function FinalCTA() {
  return (<Sec id="book">
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 60%)", filter: "blur(80px)", pointerEvents: "none" }} />
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <Reveal><GlassCard hover={false} style={{ padding: "clamp(40px, 6vw, 72px) clamp(28px, 5vw, 56px)", textAlign: "center", background: "rgba(52,211,153,0.03)", border: "1px solid rgba(52,211,153,0.12)" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "linear-gradient(135deg, #34d399, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 28px" }}>🚀</div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em", color: "#fff", marginBottom: "16px", lineHeight: 1.15 }}>Ready to find out what AI<br />can do for your business?</h2>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65, maxWidth: "460px", margin: "0 auto 36px" }}>Book a free 30-minute consultation. No strings attached.</p>
        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "18px 40px", borderRadius: "14px", background: "linear-gradient(135deg, #34d399, #059669)", color: "#080a0f", fontSize: "17px", fontWeight: 700, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 30px rgba(52,211,153,0.25)", transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 50px rgba(52,211,153,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 30px rgba(52,211,153,0.25)"; }}>Book Your Free Consultation →</a>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "28px", flexWrap: "wrap" }}>
          {["Free, no obligation", "30 minutes", "Actionable insights"].map((item, i) => (<span key={i} style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "#34d399" }}>✓</span> {item}</span>))}
        </div>
      </GlassCard></Reveal>
    </div>
  </Sec>);
}

function Footer({ navigate }) {
  return (<footer style={{ padding: "48px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px", marginBottom: "40px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg, #34d399, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "#080a0f", fontFamily: "'Space Grotesk', sans-serif" }}>V</div>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', sans-serif" }}>VineAI</span>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>AI automation for Australian SMBs.</p>
        </div>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace", marginBottom: "14px", letterSpacing: "0.05em" }}>COMPANY</div>
          {[{ l: "Home", a: "/" }, { l: "Team", a: "/team" }, { l: "Blog", a: "/blog" }].map((x) => (<button key={x.l} onClick={() => navigate(x.a)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", padding: "4px 0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "rgba(255,255,255,0.6)"} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.3)"}>{x.l}</button>))}
        </div>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace", marginBottom: "14px", letterSpacing: "0.05em" }}>LEGAL</div>
          {["Privacy Policy", "Terms of Service", "Contact"].map((l) => (<div key={l} style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", padding: "4px 0" }}>{l}</div>))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", fontSize: "12px", color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>© 2026 VineAI. Melbourne, Australia.</div>
    </div>
  </footer>);
}

function TeamPage({ navigate }) {
  return (<div style={{ paddingTop: "100px" }}><Sec>
    <Reveal><button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#34d399", fontSize: "14px", fontFamily: "'DM Mono', monospace", cursor: "pointer", marginBottom: "32px", padding: 0 }}>← Back to Home</button></Reveal>
    <PageHeader badge="👥 Our Team" title={<>The people behind<br />your AI transformation</>} subtitle="A lean, senior team — every person ships real results." />
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {TEAM.map((m, i) => (<Reveal key={m.id} delay={i * 0.1}><GlassCard style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: `linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05))`, borderRight: "1px solid rgba(255,255,255,0.06)", minHeight: "320px" }}>
            <div style={{ width: "100px", height: "100px", borderRadius: "24px", background: m.grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", fontWeight: 800, color: "#080a0f", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "24px", boxShadow: `0 12px 40px ${m.accent}44` }}>{m.ini}</div>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", textAlign: "center" }}>{m.name}</h3>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace", marginTop: "6px" }}>{m.role}</div>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {m.stats.map((s, j) => (<div key={j} style={{ textAlign: "center", padding: "10px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>{s.v}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", marginTop: "2px" }}>{s.l}</div>
              </div>))}
            </div>
          </div>
          <div style={{ padding: "40px" }}>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, marginBottom: "24px" }}>{m.bio}</p>
            <div style={{ padding: "18px 22px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "24px" }}>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, fontStyle: "italic" }}>"{m.quote}"</p>
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", marginBottom: "8px" }}>SPECIALITIES</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {m.spec.map((s, j) => (<span key={j} style={{ padding: "6px 14px", borderRadius: "8px", background: `${m.accent}14`, border: `1px solid ${m.accent}33`, fontSize: "12px", color: m.accent, fontFamily: "'DM Mono', monospace" }}>{s}</span>))}
            </div>
          </div>
        </div>
      </GlassCard></Reveal>))}
    </div>
  </Sec></div>);
}

function BlogOverview({ navigate }) {
  const feat = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);
  return (<div style={{ paddingTop: "100px" }}><Sec>
    <Reveal><button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#34d399", fontSize: "14px", fontFamily: "'DM Mono', monospace", cursor: "pointer", marginBottom: "32px", padding: 0 }}>← Back to Home</button></Reveal>
    <PageHeader badge="📝 Blog" title={<>Insights, guides &<br />real-world case studies</>} subtitle="Practical AI knowledge for Australian business owners — no fluff." />
    {feat && <Reveal><GlassCard onClick={() => navigate(`/blog/${feat.id}`)} style={{ padding: 0, overflow: "hidden", marginBottom: "32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div style={{ padding: "48px 40px", background: "linear-gradient(135deg, rgba(52,211,153,0.06), rgba(52,211,153,0.02))", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "240px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "80px", fontWeight: 700, color: "rgba(52,211,153,0.12)", lineHeight: 1, marginBottom: "16px" }}>01</div>
          <div style={{ display: "flex", gap: "8px" }}><span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}>{feat.date}</span><span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>·</span><span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}>{feat.time}</span></div>
        </div>
        <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontFamily: "'DM Mono', monospace", background: CC[feat.category].bg, border: `1px solid ${CC[feat.category].bd}`, color: CC[feat.category].tx }}>{feat.category}</span>
            <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontFamily: "'DM Mono', monospace", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}>Featured</span>
          </div>
          <h3 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.3, marginBottom: "14px" }}>{feat.title}</h3>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65 }}>{feat.excerpt}</p>
          <div style={{ marginTop: "20px", fontSize: "14px", color: "#34d399", fontFamily: "'DM Mono', monospace" }}>Read article →</div>
        </div>
      </div>
    </GlassCard></Reveal>}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
      {rest.map((p, i) => (<Reveal key={p.id} delay={i * 0.08}><GlassCard onClick={() => navigate(`/blog/${p.id}`)} style={{ padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontFamily: "'DM Mono', monospace", background: CC[p.category]?.bg, border: `1px solid ${CC[p.category]?.bd}`, color: CC[p.category]?.tx }}>{p.category}</span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}>{p.time}</span>
        </div>
        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.35, marginBottom: "12px" }}>{p.title}</h3>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65, flex: 1, marginBottom: "16px" }}>{p.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}>{p.date}</span><span style={{ fontSize: "13px", color: "#34d399", fontFamily: "'DM Mono', monospace" }}>Read →</span></div>
      </GlassCard></Reveal>))}
    </div>
  </Sec></div>);
}

function BlogArticle({ navigate, postId }) {
  const post = POSTS.find((p) => p.id === postId);
  if (!post) return (<div style={{ paddingTop: "160px", textAlign: "center" }}><Sec><h2 style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>Article not found</h2></Sec></div>);
  const others = POSTS.filter((p) => p.id !== postId).slice(0, 3);
  return (<div style={{ paddingTop: "100px" }}><Sec>
    <Reveal><button onClick={() => navigate("/blog")} style={{ background: "none", border: "none", color: "#34d399", fontSize: "14px", fontFamily: "'DM Mono', monospace", cursor: "pointer", marginBottom: "32px", padding: 0 }}>← Back to Blog</button></Reveal>
    <Reveal><div style={{ maxWidth: "740px", margin: "0 auto" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <span style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: "'DM Mono', monospace", background: CC[post.category]?.bg, border: `1px solid ${CC[post.category]?.bd}`, color: CC[post.category]?.tx }}>{post.category}</span>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>{post.date} · {post.time}</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.15 }}>{post.title}</h1>
      </div>
      <div>
        {post.content.map((b, i) => {
          if (b.t === "i") return <p key={i} style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8, marginBottom: "36px", paddingBottom: "36px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{b.text}</p>;
          if (b.t === "h") return <h2 key={i} style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", marginTop: "40px", marginBottom: "16px" }}>{b.text}</h2>;
          return <p key={i} style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8, marginBottom: "20px" }}>{b.text}</p>;
        })}
      </div>
      <GlassCard hover={false} style={{ padding: "36px 32px", marginTop: "48px", textAlign: "center", background: "rgba(52,211,153,0.03)", border: "1px solid rgba(52,211,153,0.12)" }}>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "12px" }}>Want to see what AI can do for your business?</h3>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px" }}>Book a free 30-minute consultation with our team.</p>
        <button onClick={() => { navigate("/"); setTimeout(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }), 150); }} style={{ padding: "14px 28px", borderRadius: "12px", background: "linear-gradient(135deg, #34d399, #059669)", color: "#080a0f", fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Book Free Consultation →</button>
      </GlassCard>
      <div style={{ marginTop: "64px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "24px" }}>More from the blog</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {others.map((p) => (<GlassCard key={p.id} onClick={() => navigate(`/blog/${p.id}`)} style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "200px" }}><div style={{ fontSize: "15px", fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>{p.title}</div><div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>{p.date} · {p.time}</div></div>
              <span style={{ fontSize: "13px", color: "#34d399", fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>Read →</span>
            </div>
          </GlassCard>))}
        </div>
      </div>
    </div></Reveal>
  </Sec></div>);
}

export default function VineAI() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  let page;
  if (route === "/team") page = <TeamPage navigate={navigate} />;
  else if (route === "/blog") page = <BlogOverview navigate={navigate} />;
  else if (route.startsWith("/blog/")) page = <BlogArticle navigate={navigate} postId={route.replace("/blog/", "")} />;
  else page = <><Hero /><Problem /><Solution /><Process /><Proof /><About /><FinalCTA /></>;

  return (
    <div style={{ background: "#080a0f", color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}body{background:#080a0f}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#080a0f}::-webkit-scrollbar-thumb{background:rgba(52,211,153,0.3);border-radius:3px}
        @media(max-width:768px){.nav-desktop{display:none!important}.nav-mobile-btn{display:block!important}}
        @media(min-width:769px){.nav-mobile-btn{display:none!important}.nav-mobile-menu{display:none!important}}
        ::selection{background:rgba(52,211,153,0.3);color:#fff}
      `}</style>
      <Nav scrolled={scrolled} navigate={navigate} route={route} />
      {page}
      <Footer navigate={navigate} />
    </div>
  );
}
