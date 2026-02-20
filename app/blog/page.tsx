import type { Metadata } from 'next'
import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import { getAllPosts, PostSummary } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Blog — VineAI',
  description: 'Practical AI knowledge for Australian business owners — no fluff.',
}

const catClass: Record<string, string> = {
  Strategy: 'cat-strategy',
  Insights: 'cat-insights',
  'Case Study': 'cat-casestudy',
  Compliance: 'cat-compliance',
}

const fallbackPosts: PostSummary[] = [
  { _id: '1', title: 'The Complete Guide to Running an AI Audit for Your SMB', slug: 'ai-audit-guide', category: 'Strategy', excerpt: 'Not sure where AI fits in your business? Here\'s our exact framework for identifying the highest-ROI opportunities.', timeToRead: '8 min', date: '2026-02-12', featured: true },
  { _id: '2', title: "Why ChatGPT Alone Isn't Enough: Moving Beyond Basic AI", slug: 'chatgpt-not-enough', category: 'Insights', excerpt: 'Your team uses ChatGPT for drafting emails. That\'s great — but you\'re only scratching the surface of what AI can do.', timeToRead: '6 min', date: '2026-02-05', featured: false },
  { _id: '3', title: 'How Automation Saved Our Clients 23 Hours Per Week (On Average)', slug: 'automation-saves-23-hours', category: 'Case Study', excerpt: 'We tracked time savings across 40 implementations. Here\'s where the biggest wins came from.', timeToRead: '7 min', date: '2026-01-28', featured: false },
  { _id: '4', title: 'AI and Data Privacy: What Australian Businesses Need to Know', slug: 'ai-privacy-australia', category: 'Compliance', excerpt: "Implementing AI doesn't mean compromising on data security. Here's how to stay compliant with Australian privacy law.", timeToRead: '5 min', date: '2026-01-20', featured: false },
  { _id: '5', title: '5 Signs Your Business Is Ready for AI (And 3 Signs It\'s Not)', slug: '5-signs-ready-for-ai', category: 'Strategy', excerpt: "AI isn't right for every business at every stage. Here's how to honestly assess whether now is the time to invest.", timeToRead: '5 min', date: '2026-01-14', featured: false },
]

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

export default async function BlogPage() {
  const sanityPosts = await getAllPosts().catch(() => [])
  const posts = sanityPosts.length ? sanityPosts : fallbackPosts

  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  return (
    <main style={{ paddingTop: 100 }}>
      <section className="section">
        <div className="section-inner">
          <RevealWrapper>
            <Link href="/" className="font-mono" style={{ fontSize: 14, color: '#34d399', display: 'inline-block', marginBottom: 32 }}>← Back to Home</Link>
          </RevealWrapper>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <RevealWrapper><span className="badge">📝 Blog</span></RevealWrapper>
            <RevealWrapper delay={0.05}>
              <h1 className="font-display" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 20, marginBottom: 16, lineHeight: 1.1 }}>
                Insights, guides &<br />real-world case studies
              </h1>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>Practical AI knowledge for Australian business owners — no fluff.</p>
            </RevealWrapper>
          </div>

          {/* Featured */}
          {featured && (
            <RevealWrapper>
              <Link href={`/blog/${featured.slug}`} style={{ display: 'block' }}>
                <div className="glass hoverable" style={{ overflow: 'hidden', marginBottom: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }} className="blog-feat-inner">
                    <div style={{ padding: '48px 40px', background: 'linear-gradient(135deg,rgba(52,211,153,0.06),rgba(52,211,153,0.02))', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 240 }}>
                      <div className="font-mono" style={{ fontSize: 80, fontWeight: 700, color: 'rgba(52,211,153,0.12)', lineHeight: 1, marginBottom: 16 }}>01</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{formatDate(featured.date)}</span>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>·</span>
                        <span className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{featured.timeToRead}</span>
                      </div>
                    </div>
                    <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                        <span className={`cat ${catClass[featured.category] ?? 'cat-strategy'}`}>{featured.category}</span>
                        <span className="cat cat-featured">Featured</span>
                      </div>
                      <h2 className="font-display" style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, lineHeight: 1.3, marginBottom: 14 }}>{featured.title}</h2>
                      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{featured.excerpt}</p>
                      <div className="font-mono" style={{ marginTop: 20, fontSize: 14, color: '#34d399' }}>Read article →</div>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealWrapper>
          )}

          {/* Rest of posts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginTop: 32 }}>
            {rest.map((p, i) => (
              <RevealWrapper key={p._id} delay={i * 0.08}>
                <Link href={`/blog/${p.slug}`} style={{ display: 'block', height: '100%' }}>
                  <div className="glass hoverable" style={{ padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                      <span className={`cat ${catClass[p.category] ?? 'cat-strategy'}`}>{p.category}</span>
                      <span className="font-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{p.timeToRead}</span>
                    </div>
                    <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.35, marginBottom: 12 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{p.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="font-mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{formatDate(p.date)}</span>
                      <span className="font-mono" style={{ fontSize: 13, color: '#34d399' }}>Read →</span>
                    </div>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
