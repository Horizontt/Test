import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RevealWrapper from '@/components/RevealWrapper'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { getPostBySlug, getAllPostSlugs, PostFull, PostSummary } from '@/sanity/lib/queries'

const catClass: Record<string, string> = {
  Strategy: 'cat-strategy',
  Insights: 'cat-insights',
  'Case Study': 'cat-casestudy',
  Compliance: 'cat-compliance',
}

// Fallback static posts (used when Sanity isn't seeded)
const fallbackPosts: (PostFull & { otherTitles?: string[] })[] = [
  {
    _id: '1', title: 'The Complete Guide to Running an AI Audit for Your SMB',
    slug: 'ai-audit-guide', category: 'Strategy', excerpt: 'Not sure where AI fits?',
    timeToRead: '8 min', date: '2026-02-12', featured: true,
    content: [
      { _type: 'block', _key: 'b1', style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'Every business has hidden inefficiencies that AI can solve. The challenge isn\'t whether AI can help — it\'s knowing where to start. After 120+ audits for Australian SMBs, we\'ve refined a framework that consistently uncovers the highest-ROI opportunities.', marks: [] }] },
      { _type: 'block', _key: 'b2', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'Why Most Businesses Get AI Wrong', marks: [] }] },
      { _type: 'block', _key: 'b3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: "The most common mistake is 'solution-first thinking' — businesses hear about a tool and try to find a problem for it. This leads to wasted money and AI scepticism. The right approach is problem-first: map your workflows, measure where time and money are lost, then match the right AI capability to each bottleneck.", marks: [] }] },
      { _type: 'block', _key: 'b4', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's4', text: 'The 5-Step AI Audit Framework', marks: [] }] },
      { _type: 'block', _key: 'b5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: 'Step 1: Process Inventory — Document every recurring workflow. We typically find 40–80 distinct processes in a company of 20. Step 2: Pain Scoring — Rate each on time consumed, error frequency, and frustration. Step 3: AI Feasibility Mapping — Assess whether current AI can meaningfully improve each high-pain process. Step 4: ROI Modelling — Calculate expected savings and cost impact. Step 5: Priority Ranking — Rank by combined ROI, speed, and risk score.', marks: [] }] },
      { _type: 'block', _key: 'b6', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's6', text: 'What a Good Audit Delivers', marks: [] }] },
      { _type: 'block', _key: 'b7', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's7', text: 'A clear, prioritised roadmap — not a vague strategy deck. Each item includes the specific process to automate, the tool to use, expected ROI, and realistic timeline. Our clients typically find their top 3 opportunities account for 70% of total potential savings.', marks: [] }] },
      { _type: 'block', _key: 'b8', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's8', text: 'Ready to Run Your Own Audit?', marks: [] }] },
      { _type: 'block', _key: 'b9', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's9', text: "You can start with this framework yourself. But if you'd prefer an experienced team to do it faster, that's what our free consultation is for. We'll identify quick wins and give you a roadmap you can act on immediately.", marks: [] }] },
    ],
  },
  {
    _id: '2', title: "Why ChatGPT Alone Isn't Enough: Moving Beyond Basic AI",
    slug: 'chatgpt-not-enough', category: 'Insights', excerpt: "Your team uses ChatGPT — but you're only scratching the surface.",
    timeToRead: '6 min', date: '2026-02-05', featured: false,
    content: [
      { _type: 'block', _key: 'b1', style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: 's1', text: "If your team is using ChatGPT for emails and questions, you're ahead of most. But conversational AI is just the tip of the iceberg. The real gains come from AI woven into your actual business systems.", marks: [] }] },
      { _type: 'block', _key: 'b2', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'The ChatGPT Ceiling', marks: [] }] },
      { _type: 'block', _key: 'b3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: "ChatGPT doesn't know your customers, processes, or data. Every time your team uses it, they start from zero — copying context in, interpreting outputs, transferring results manually. That's assisted manual work, not automation.", marks: [] }] },
      { _type: 'block', _key: 'b4', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's4', text: 'What Comes After ChatGPT', marks: [] }] },
      { _type: 'block', _key: 'b5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: 'The next level is AI connected to your data and embedded in workflows. A system that auto-triages support tickets from your knowledge base. A pipeline that pulls CRM data, generates forecasts, and emails leadership — without anyone lifting a finger.', marks: [] }] },
      { _type: 'block', _key: 'b6', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's6', text: 'The Integration Advantage', marks: [] }] },
      { _type: 'block', _key: 'b7', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's7', text: 'Integrated AI compounds benefits. Data flows automatically, decisions happen faster, teams focus on high-value work. Clients typically see 12x workflow speed improvement moving from ad-hoc ChatGPT to integrated systems.', marks: [] }] },
      { _type: 'block', _key: 'b8', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's8', text: 'Making the Leap', marks: [] }] },
      { _type: 'block', _key: 'b9', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's9', text: "Start with one high-impact workflow, automate it properly, measure results, and expand. That's exactly our approach with every VineAI client.", marks: [] }] },
    ],
  },
  {
    _id: '3', title: 'How Automation Saved Our Clients 23 Hours Per Week (On Average)',
    slug: 'automation-saves-23-hours', category: 'Case Study', excerpt: 'We tracked time savings across 40 implementations.',
    timeToRead: '7 min', date: '2026-01-28', featured: false,
    content: [
      { _type: 'block', _key: 'b1', style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: 's1', text: "When we tell clients our implementations save 23 hours per week on average, we get raised eyebrows. So we broke down exactly where those hours come from using data from 40 engagements.", marks: [] }] },
      { _type: 'block', _key: 'b2', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'The Biggest Time Sinks', marks: [] }] },
      { _type: 'block', _key: 'b3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: 'The three largest sources: data entry and transfer (8.2 hrs/week), reporting and dashboards (5.4 hrs/week), and email triage and response drafting (4.7 hrs/week). Together that\'s 18+ hours of recoverable time per week.', marks: [] }] },
      { _type: 'block', _key: 'b4', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's4', text: 'Case Study: Coastal Builders', marks: [] }] },
      { _type: 'block', _key: 'b5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: 'A Gold Coast construction firm with 35 employees spending 40 hours/week on admin. We implemented automated scheduling sync, AI-powered client comms, and auto-generated reports. Result: 32 hours saved per week.', marks: [] }] },
      { _type: 'block', _key: 'b6', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's6', text: 'The Compound Effect', marks: [] }] },
      { _type: 'block', _key: 'b7', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's7', text: 'Time savings compound. Teams respond faster, spot problems earlier, and have capacity for growth. Several clients report revenue increases from freed-up capacity — not just cost savings.', marks: [] }] },
    ],
  },
  {
    _id: '4', title: 'AI and Data Privacy: What Australian Businesses Need to Know',
    slug: 'ai-privacy-australia', category: 'Compliance', excerpt: "Stay compliant with Australian privacy law.",
    timeToRead: '5 min', date: '2026-01-20', featured: false,
    content: [
      { _type: 'block', _key: 'b1', style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: 's1', text: "The most common concern we hear: where does my data go? Is it secure? Am I compliant? These are the right questions — and the answers are more reassuring than you think.", marks: [] }] },
      { _type: 'block', _key: 'b2', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'The Australian Privacy Landscape', marks: [] }] },
      { _type: 'block', _key: 'b3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: "Australia's Privacy Act 1988 and the APPs set clear rules for personal information. When implementing AI, these rules apply just as they do to any other technology.", marks: [] }] },
      { _type: 'block', _key: 'b4', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's4', text: 'Keeping Data Onshore', marks: [] }] },
      { _type: 'block', _key: 'b5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: 'We prioritise onshore processing. Many AI tools offer AU/APAC hosting, and for sensitive data we deploy private models within your own infrastructure. Your customer data never needs to leave your control.', marks: [] }] },
      { _type: 'block', _key: 'b6', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's6', text: 'Practical Privacy Safeguards', marks: [] }] },
      { _type: 'block', _key: 'b7', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's7', text: 'Every implementation includes data minimisation, role-based access, audit logging, and encryption at rest and in transit. For regulated industries, we add additional protection layers tailored to your requirements.', marks: [] }] },
    ],
  },
  {
    _id: '5', title: "5 Signs Your Business Is Ready for AI (And 3 Signs It's Not)",
    slug: '5-signs-ready-for-ai', category: 'Strategy', excerpt: "Honestly assess whether now is the time to invest.",
    timeToRead: '5 min', date: '2026-01-14', featured: false,
    content: [
      { _type: 'block', _key: 'b1', style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: 's1', text: "Not every business is ready for AI, and that's okay. Implementing at the wrong time can be worse than not implementing at all. Here's how to tell if you're ready.", marks: [] }] },
      { _type: 'block', _key: 'b2', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's2', text: '5 Signs You\'re Ready', marks: [] }] },
      { _type: 'block', _key: 'b3', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's3', text: "1. You have repeatable processes your team does weekly. 2. You're drowning in data but not extracting insights. 3. Your team is stretched thin because manual work eats their time. 4. You've tried ChatGPT/Zapier and want to go deeper. 5. You can articulate your bottlenecks.", marks: [] }] },
      { _type: 'block', _key: 'b4', style: 'h2', markDefs: [], children: [{ _type: 'span', _key: 's4', text: "3 Signs You're Not Ready (Yet)", marks: [] }] },
      { _type: 'block', _key: 'b5', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's5', text: "1. Your processes aren't documented — start there first. 2. You're looking for a magic bullet — AI amplifies good operations, doesn't fix broken ones. 3. Leadership isn't bought in — without commitment, tools gather dust.", marks: [] }] },
    ],
  },
]

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return dateStr
  }
}

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null) ?? fallbackPosts.find(p => p.slug === slug)
  if (!post) return { title: 'Article Not Found — VineAI' }
  return {
    title: `${post.title} — VineAI`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => [])
  const allSlugs = [...new Set([...slugs, ...fallbackPosts.map(p => p.slug)])]
  return allSlugs.map(slug => ({ slug }))
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const sanityPost = await getPostBySlug(slug).catch(() => null)
  const post: PostFull | undefined = sanityPost ?? fallbackPosts.find(p => p.slug === slug)

  if (!post) notFound()

  const otherPosts = fallbackPosts.filter(p => p.slug !== slug).slice(0, 3) as PostSummary[]

  return (
    <main style={{ paddingTop: 100 }}>
      <section className="section">
        <div className="section-inner">
          <RevealWrapper>
            <Link href="/blog" className="font-mono" style={{ fontSize: 14, color: '#34d399', display: 'inline-block', marginBottom: 32 }}>← Back to Blog</Link>
          </RevealWrapper>

          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            {/* Article header */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className={`cat ${catClass[post.category] ?? 'cat-strategy'}`} style={{ padding: '5px 12px', fontSize: 12 }}>{post.category}</span>
                <span className="font-mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{formatDate(post.date)} · {post.timeToRead}</span>
              </div>
              <h1 className="font-display" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{post.title}</h1>
            </div>

            {/* Article content */}
            {post.content && Array.isArray(post.content) && post.content.length > 0 ? (
              <PortableTextRenderer content={post.content} />
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>{post.excerpt}</p>
            )}

            {/* CTA card */}
            <div className="glass" style={{ padding: '36px 32px', marginTop: 48, textAlign: 'center', background: 'rgba(52,211,153,0.03)', borderColor: 'rgba(52,211,153,0.12)' }}>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Want to see what AI can do for your business?</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>Book a free 30-minute consultation with our team.</p>
              <Link href="/#book" className="btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>Book Free Consultation →</Link>
            </div>

            {/* More articles */}
            <div style={{ marginTop: 64 }}>
              <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>More from the blog</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {otherPosts.map(p => (
                  <Link key={p._id} href={`/blog/${p.slug}`} style={{ display: 'block' }}>
                    <div className="glass hoverable" style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                          <div className="font-mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{formatDate(p.date)} · {p.timeToRead}</div>
                        </div>
                        <span className="font-mono" style={{ fontSize: 13, color: '#34d399', flexShrink: 0 }}>Read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
