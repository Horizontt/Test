import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import HeroCounter from '@/components/HeroCounter'
import { getHomeData, HomeData } from '@/sanity/lib/queries'

// ---- Static fallback data (used when Sanity isn't seeded yet) ----
const fallback: HomeData = {
  hero: {
    badge: '🤖 AI Automation for Australian SMBs',
    heading: 'Stop guessing.',
    headingHighlight: 'Start automating.',
    subheading: 'We audit your business, find the highest-impact AI opportunities, and implement the systems that cut costs, automate workflows, and free up your team.',
    primaryCta: 'Book Free Consultation →',
    secondaryCta: 'See How It Works',
    heroStats: [
      { targetNumber: 47, suffix: '%', label: 'Avg. cost reduction' },
      { targetNumber: 12, suffix: 'x', label: 'Workflow speedup' },
      { targetNumber: 89, suffix: '%', label: 'Client retention' },
    ],
  },
  problemSection: {
    badge: '⚠️ The Problem',
    heading: "You're leaving money on the table. Every day.",
    subheading: "Most businesses sit on massive efficiency gains — they just don't know which levers to pull.",
  },
  problems: [
    { icon: '⏱', title: 'Your team wastes hours on manual work', desc: 'Data entry, follow-ups, reporting — tasks that should be automated eat your team\'s time every day.', stat: '23 hrs/wk', statLabel: 'lost to manual tasks' },
    { icon: '🎯', title: 'You know AI matters, but where to start?', desc: 'The landscape changes weekly. You don\'t have time to become an AI expert on top of running a business.', stat: '73%', statLabel: 'of SMBs unsure where to begin' },
    { icon: '💸', title: "You're paying for tools you barely use", desc: "Subscriptions stack up but nobody's connected the dots. Spending more, getting fragmented results.", stat: '$2.4K/mo', statLabel: 'avg. wasted on unused SaaS' },
    { icon: '🔌', title: 'Nothing talks to anything else', desc: "CRM doesn't sync with invoicing. Marketing runs in a silo. Data lives in 15 spreadsheets.", stat: '67%', statLabel: 'of data stuck in silos' },
  ],
  solutionSection: {
    badge: '✅ The Solution',
    heading: 'AI that actually works for your business',
    subheading: 'No buzzwords. No generic tools. High-impact AI designed around how your business actually operates.',
  },
  solutions: [
    { icon: '🔍', title: 'AI Opportunity Audit', desc: 'We map every process, find the biggest drains, and show exactly where AI has the highest ROI.', features: ['Process mapping', 'ROI modelling', 'Priority scoring'] },
    { icon: '⚡', title: 'Workflow Automation', desc: 'Custom systems that eliminate repetitive tasks, reduce errors, and give your team time back.', features: ['Custom integrations', 'Zero-code solutions', 'Auto-reporting'] },
    { icon: '🧠', title: 'AI Implementation', desc: 'From chatbots to predictive analytics — AI tools tailored to your industry, data, and goals.', features: ['Custom AI agents', 'Data pipelines', 'Smart dashboards'] },
    { icon: '📈', title: 'Ongoing Optimisation', desc: 'We continuously monitor, improve, and expand your AI systems as your business grows.', features: ['Performance tracking', 'Monthly reports', 'Scaling roadmap'] },
  ],
  processSection: { badge: '🔄 How It Works', heading: 'From chaos to clarity in four steps' },
  processSteps: [
    { number: '01', title: 'Discovery Call', desc: '30-minute call to understand your business, team, and bottlenecks. No sales pitch.', timeframe: 'Day 1', deliverable: 'Free' },
    { number: '02', title: 'AI Audit & Roadmap', desc: 'We audit your workflows, data, and tools. You get a prioritised roadmap ranked by impact.', timeframe: 'Week 1–2', deliverable: 'PDF report' },
    { number: '03', title: 'Build & Implement', desc: 'We design, build, and deploy your AI systems with weekly check-ins and demos.', timeframe: 'Week 3–6', deliverable: 'Agile sprints' },
    { number: '04', title: 'Launch & Optimise', desc: 'Go live with full support. We monitor performance and continuously improve.', timeframe: 'Ongoing', deliverable: 'Monthly reviews' },
  ],
  resultsSection: { badge: '⭐ Results', heading: 'Real businesses. Real results.' },
  stats: [
    { icon: '📉', value: '47%', label: 'Avg. cost reduction' },
    { icon: '🏢', value: '120+', label: 'Businesses transformed' },
    { icon: '💰', value: '$4.2M', label: 'Client savings to date' },
    { icon: '⚡', value: '12x', label: 'Avg. workflow speedup' },
  ],
  testimonials: [
    { name: 'Sarah Chen', role: 'CEO, BrightPath Logistics', location: 'Melbourne', text: "VineAI found $180K in annual savings we didn't know we were losing. Their AI audit was the single best investment we made.", stat: '$180K', statLabel: 'annual savings', initials: 'SC' },
    { name: 'Marcus Drewe', role: 'Ops Director, Coastal Builders', location: 'Gold Coast', text: 'We went from drowning in admin to automated reporting, scheduling, and client comms. My team focuses on what matters.', stat: '32hrs', statLabel: 'saved per week', initials: 'MD' },
    { name: 'Priya Sharma', role: 'Founder, Elevate Digital', location: 'Sydney', text: "I was sceptical about AI consultants. VineAI changed my mind. They don't just advise — they build, deploy, and optimise.", stat: '3x', statLabel: 'revenue per employee', initials: 'PS' },
  ],
  about: {
    badge: '👋 About VineAI',
    heading: 'Built for business owners who want answers, not hype.',
    body1: 'VineAI was founded because we saw Australian businesses being left behind — not for lack of ambition, but for lack of clear, practical guidance.',
    body2: "We're a team of AI engineers, strategists, and automation specialists who embed into your operations and deliver measurable results.",
    quoteLabel: '// our_philosophy.js',
    quote: '"Every business has AI opportunities hiding in plain sight. Our job is to find them, build them, and prove they work."',
    creds: [
      { icon: '🇦🇺', label: 'Australian-founded & operated' },
      { icon: '🤝', label: '120+ businesses served' },
      { icon: '🏆', label: 'AI specialists since 2021' },
      { icon: '🔒', label: 'Privacy-first, data onshore' },
    ],
    aboutStats: [
      { value: '5–100', label: 'Employee range' },
      { value: 'SMB', label: 'Focus segment' },
      { value: '6 weeks', label: 'Avg. implementation' },
      { value: 'AU-wide', label: 'Service area' },
    ],
  },
  cta: {
    heading: 'Ready to find out what AI can do for your business?',
    subheading: 'Book a free 30-minute consultation. No strings attached.',
    buttonText: 'Book Your Free Consultation →',
    trustItems: ['Free, no obligation', '30 minutes', 'Actionable insights'],
  },
}

export default async function HomePage() {
  const sanityData = await getHomeData().catch(() => null)
  const d: HomeData = sanityData ?? fallback

  const hero = { ...fallback.hero, ...d.hero }
  const problemSection = { ...fallback.problemSection, ...d.problemSection }
  const problems = d.problems?.length ? d.problems : fallback.problems!
  const solutionSection = { ...fallback.solutionSection, ...d.solutionSection }
  const solutions = d.solutions?.length ? d.solutions : fallback.solutions!
  const processSection = { ...fallback.processSection, ...d.processSection }
  const processSteps = d.processSteps?.length ? d.processSteps : fallback.processSteps!
  const resultsSection = { ...fallback.resultsSection, ...d.resultsSection }
  const stats = d.stats?.length ? d.stats : fallback.stats!
  const testimonials = d.testimonials?.length ? d.testimonials : fallback.testimonials!
  const about = { ...fallback.about, ...d.about }
  const cta = { ...fallback.cta, ...d.cta }

  const heroStats = hero.heroStats?.length ? hero.heroStats : fallback.hero!.heroStats!

  return (
    <main>
      {/* ---- HERO ---- */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '120px 24px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(52,211,153,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle,rgba(52,211,153,0.08) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <RevealWrapper><span className="badge">{hero.badge}</span></RevealWrapper>
          <RevealWrapper delay={0.1}>
            <h1 className="font-display" style={{ fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginTop: 24, marginBottom: 24 }}>
              {hero.heading}<br />
              <span className="gradient-text">{hero.headingHighlight}</span>
            </h1>
          </RevealWrapper>
          <RevealWrapper delay={0.2}>
            <p style={{ fontSize: 'clamp(16px,1.8vw,20px)', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', maxWidth: 540, marginBottom: 36 }}>{hero.subheading}</p>
          </RevealWrapper>
          <RevealWrapper delay={0.3} style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <a href="#book" className="btn-primary">{hero.primaryCta}</a>
            <a href="#process" className="btn-secondary">{hero.secondaryCta}</a>
          </RevealWrapper>
          <RevealWrapper delay={0.45}>
            <HeroCounter stats={heroStats} />
          </RevealWrapper>
        </div>
      </section>

      {/* ---- PROBLEM ---- */}
      <section id="problem" className="section">
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, background: 'radial-gradient(circle,rgba(239,68,68,0.04) 0%,transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <RevealWrapper><span className="badge">{problemSection.badge}</span></RevealWrapper>
            <RevealWrapper delay={0.05}><h2 className="font-display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 20, marginBottom: 16, lineHeight: 1.1 }} dangerouslySetInnerHTML={{ __html: (problemSection.heading ?? '').replace('\n', '<br />') }} /></RevealWrapper>
            <RevealWrapper delay={0.1}><p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>{problemSection.subheading}</p></RevealWrapper>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {problems.map((p, i) => (
              <RevealWrapper key={i} delay={i * 0.1}>
                <div className="glass hoverable" style={{ padding: '32px 28px', height: '100%' }}>
                  <div style={{ fontSize: 28, marginBottom: 18 }}>{p.icon}</div>
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, lineHeight: 1.35 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                    <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#f87171' }}>{p.stat}</div>
                    <div className="font-mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{p.statLabel}</div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ---- SOLUTION ---- */}
      <section id="solution" className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <RevealWrapper><span className="badge">{solutionSection.badge}</span></RevealWrapper>
            <RevealWrapper delay={0.05}><h2 className="font-display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 20, marginBottom: 16, lineHeight: 1.1 }} dangerouslySetInnerHTML={{ __html: (solutionSection.heading ?? '').replace('\n', '<br />') }} /></RevealWrapper>
            <RevealWrapper delay={0.1}><p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>{solutionSection.subheading}</p></RevealWrapper>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {solutions.map((s, i) => (
              <RevealWrapper key={i} delay={i * 0.1}>
                <div className="glass hoverable" style={{ padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 20 }}>{s.icon}</div>
                  <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {s.features?.map((f, j) => <span key={j} className="tag tag-green">{f}</span>)}
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PROCESS ---- */}
      <section id="process" className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <RevealWrapper><span className="badge">{processSection.badge}</span></RevealWrapper>
            <RevealWrapper delay={0.05}><h2 className="font-display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 20, marginBottom: 16, lineHeight: 1.1 }} dangerouslySetInnerHTML={{ __html: (processSection.heading ?? '').replace('\n', '<br />') }} /></RevealWrapper>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {processSteps.map((s, i) => (
              <RevealWrapper key={i} delay={i * 0.1}>
                <div className="glass hoverable" style={{ padding: '32px 28px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#34d399,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#080a0f', flexShrink: 0 }}>{s.number}</div>
                    <div>
                      <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700 }}>{s.title}</h3>
                      <div className="font-mono" style={{ fontSize: 12, color: '#34d399', marginTop: 2 }}>{s.timeframe} · {s.deliverable}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ---- RESULTS ---- */}
      <section id="results" className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <RevealWrapper><span className="badge">{resultsSection.badge}</span></RevealWrapper>
            <RevealWrapper delay={0.05}><h2 className="font-display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 20, marginBottom: 16, lineHeight: 1.1 }} dangerouslySetInnerHTML={{ __html: (resultsSection.heading ?? '').replace('\n', '<br />') }} /></RevealWrapper>
          </div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 48 }}>
            {stats.map((s, i) => (
              <RevealWrapper key={i} delay={i * 0.05}>
                <div className="glass hoverable" style={{ padding: '28px 24px' }}>
                  <div style={{ fontSize: 14, marginBottom: 16, opacity: 0.4 }}>{s.icon}</div>
                  <div className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 700, color: '#34d399', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                  <div className="font-mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
                </div>
              </RevealWrapper>
            ))}
          </div>
          {/* Testimonials */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <RevealWrapper key={i} delay={i * 0.1}>
                <div className="glass hoverable" style={{ padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '14px 18px', borderRadius: 10, background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.12)', marginBottom: 20, display: 'inline-flex', alignItems: 'baseline', gap: 8, alignSelf: 'flex-start' }}>
                    <span className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#34d399' }}>{t.stat}</span>
                    <span className="font-mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{t.statLabel}</span>
                  </div>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, flex: 1, marginBottom: 24, fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#34d399,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#080a0f', fontFamily: 'var(--font-display)' }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                      <div className="font-mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t.role} · {t.location}</div>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ---- ABOUT ---- */}
      <section id="about" className="section">
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48, alignItems: 'center' }}>
            <RevealWrapper direction="left">
              <span className="badge">{about.badge}</span>
              <h2 className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 20, marginBottom: 20 }}>{about.heading}</h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 16 }}>{about.body1}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 32 }}>{about.body2}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {about.creds?.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: 20 }}>{c.icon}</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </RevealWrapper>
            <RevealWrapper direction="right" delay={0.15}>
              <div className="glass" style={{ padding: '40px 32px', background: 'rgba(52,211,153,0.03)', borderColor: 'rgba(52,211,153,0.1)' }}>
                <div className="font-mono" style={{ fontSize: 13, color: 'rgba(52,211,153,0.5)', marginBottom: 20 }}>{about.quoteLabel}</div>
                <div className="font-display" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4, marginBottom: 24 }}>{about.quote}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {about.aboutStats?.map((s, i) => (
                    <div key={i} style={{ padding: 14, borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                      <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#34d399' }}>{s.value}</div>
                      <div className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section id="book" className="section">
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, background: 'radial-gradient(circle,rgba(52,211,153,0.08) 0%,transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <RevealWrapper>
            <div className="glass" style={{ padding: 'clamp(40px,6vw,72px) clamp(28px,5vw,56px)', textAlign: 'center', background: 'rgba(52,211,153,0.03)', borderColor: 'rgba(52,211,153,0.12)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg,#34d399,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 28px' }}>🚀</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.15 }}>{cta.heading}</h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: 460, margin: '0 auto 36px' }}>{cta.subheading}</p>
              <a href={cta.buttonUrl ?? '#book'} className="btn-primary" style={{ padding: '18px 40px', borderRadius: 14, fontSize: 17, boxShadow: '0 4px 30px rgba(52,211,153,0.25)' }}>{cta.buttonText}</a>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
                {cta.trustItems?.map((item, i) => (
                  <span key={i} className="font-mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#34d399' }}>✓</span> {item}
                  </span>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </main>
  )
}
