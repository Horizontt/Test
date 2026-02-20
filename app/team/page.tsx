import type { Metadata } from 'next'
import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import { getTeamMembers, TeamMember } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Our Team — VineAI',
  description: 'Meet the AI engineers, strategists, and automation specialists behind VineAI.',
}

const fallbackTeam: TeamMember[] = [
  {
    _id: 'team-liam', name: 'Liam Hargraves', role: 'Founder & AI Strategist', initials: 'LH',
    bio: "Former McKinsey consultant turned AI evangelist. Liam spent a decade helping Fortune 500 companies optimise operations before founding VineAI to bring that same rigour to Australian SMBs. He's led over 80 AI implementations and is obsessed with finding the 20% of changes that drive 80% of results.",
    quote: "Most businesses don't need more AI — they need the right AI in the right place.",
    specialities: ['AI strategy', 'Business transformation', 'ROI modelling'],
    stats: [{ value: '80+', label: 'AI projects' }, { value: '10yr', label: 'Consulting' }, { value: '$12M', label: 'Saved' }],
    accentColor: '#34d399', gradientFrom: '#34d399', gradientTo: '#059669', order: 1,
  },
  {
    _id: 'team-maya', name: 'Maya Okonkwo', role: 'Head of AI Engineering', initials: 'MO',
    bio: "Maya leads VineAI's technical delivery — from custom GPT agents to full-stack automation pipelines. With a background in ML research at CSIRO and 6 years building production AI systems, she turns complex business problems into elegant, automated solutions.",
    quote: "The best automation is the one your team doesn't even notice — it just works.",
    specialities: ['Machine learning', 'Automation pipelines', 'Custom AI agents'],
    stats: [{ value: '150+', label: 'Automations' }, { value: 'PhD', label: 'Comp. Sci.' }, { value: '6yr', label: 'Prod. ML' }],
    accentColor: '#60a5fa', gradientFrom: '#60a5fa', gradientTo: '#3b82f6', order: 2,
  },
  {
    _id: 'team-jake', name: 'Jake Whitfield', role: 'Client Success Lead', initials: 'JW',
    bio: "Jake is the bridge between technical implementation and real-world business impact. He manages every client relationship end-to-end, ensuring AI systems don't just get deployed — they get adopted, loved, and expanded. Previously ran operations at two high-growth Australian startups.",
    quote: 'Technology only works if your team actually uses it. That\'s where I come in.',
    specialities: ['Client management', 'Change management', 'Training & adoption'],
    stats: [{ value: '89%', label: 'Retention' }, { value: '4.9★', label: 'Rating' }, { value: '120+', label: 'Clients' }],
    accentColor: '#f472b6', gradientFrom: '#f472b6', gradientTo: '#ec4899', order: 3,
  },
]

export default async function TeamPage() {
  const sanityTeam = await getTeamMembers().catch(() => [])
  const team = sanityTeam.length ? sanityTeam : fallbackTeam

  return (
    <main style={{ paddingTop: 100 }}>
      <section className="section">
        <div className="section-inner">
          <RevealWrapper>
            <Link href="/" className="font-mono" style={{ fontSize: 14, color: '#34d399', display: 'inline-block', marginBottom: 32 }}>← Back to Home</Link>
          </RevealWrapper>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <RevealWrapper><span className="badge">👥 Our Team</span></RevealWrapper>
            <RevealWrapper delay={0.05}>
              <h1 className="font-display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 20, marginBottom: 16, lineHeight: 1.1 }}>
                The people behind<br />your AI transformation
              </h1>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>A lean, senior team — every person ships real results.</p>
            </RevealWrapper>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {team.map((m, i) => (
              <RevealWrapper key={m._id} delay={i * 0.1}>
                <div className="glass hoverable" style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }} className="team-grid-inner">
                    {/* Left: avatar & stats */}
                    <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg,rgba(0,0,0,0.2),rgba(0,0,0,0.05))', borderRight: '1px solid rgba(255,255,255,0.06)', minHeight: 320 }}>
                      <div style={{ width: 100, height: 100, borderRadius: 24, background: `linear-gradient(135deg,${m.gradientFrom},${m.gradientTo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 800, color: '#080a0f', fontFamily: 'var(--font-display)', marginBottom: 24, boxShadow: `0 12px 40px ${m.accentColor}44` }}>
                        {m.initials}
                      </div>
                      <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, textAlign: 'center' }}>{m.name}</h2>
                      <div className="font-mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{m.role}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                        {m.stats?.map((s, j) => (
                          <div key={j} style={{ textAlign: 'center', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)' }}>
                            <div className="font-display" style={{ fontSize: 18, fontWeight: 700 }}>{s.value}</div>
                            <div className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Right: bio & specialities */}
                    <div style={{ padding: 40 }}>
                      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 24 }}>{m.bio}</p>
                      <div style={{ padding: '18px 22px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 24 }}>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontStyle: 'italic' }}>"{m.quote}"</p>
                      </div>
                      <div className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', marginBottom: 8 }}>SPECIALITIES</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {m.specialities?.map((s, j) => (
                          <span key={j} style={{ padding: '6px 14px', borderRadius: 8, background: `${m.accentColor}14`, border: `1px solid ${m.accentColor}33`, fontSize: 12, color: m.accentColor, fontFamily: 'var(--font-mono)' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
