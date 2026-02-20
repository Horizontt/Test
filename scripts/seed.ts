/**
 * Sanity Seed Script — VineAI
 *
 * Populates your Sanity dataset with all the VineAI content.
 *
 * Prerequisites:
 *   1. In your Sanity dashboard (sanity.io/manage), create a token with "Editor" permissions.
 *   2. Add to .env.local:  SANITY_API_TOKEN=your_token_here
 *
 * Run with:
 *   SANITY_API_TOKEN=your_token npx tsx scripts/seed.ts
 *
 * Or if you've added SANITY_API_TOKEN to .env.local, source it first:
 *   source .env.local && SANITY_API_TOKEN=$SANITY_API_TOKEN npx tsx scripts/seed.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

// Load .env.local manually
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8')
    for (const line of content.split('\n')) {
      const match = line.match(/^([^#=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        if (!process.env[key]) process.env[key] = value
      }
    }
  }
}
loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'yoredu23'
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production'
const token     = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌  SANITY_API_TOKEN is not set.')
  console.error('   Get a token from sanity.io/manage → your project → API → Tokens')
  console.error('   Then run:  SANITY_API_TOKEN=your_token npx tsx scripts/seed.ts')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2026-02-19', useCdn: false })

// ---- Helpers ----
let keyCount = 0
function key() { return `k${++keyCount}` }

function block(style: string, text: string) {
  return { _type: 'block', _key: key(), style, markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

// ---- Home Page Document ----
const homePage = {
  _type: 'homePage',
  _id: 'homePage',
  hero: {
    badge: '🤖 AI Automation for Australian SMBs',
    heading: 'Stop guessing.',
    headingHighlight: 'Start automating.',
    subheading: 'We audit your business, find the highest-impact AI opportunities, and implement the systems that cut costs, automate workflows, and free up your team.',
    primaryCta: 'Book Free Consultation →',
    secondaryCta: 'See How It Works',
    heroStats: [
      { _key: key(), targetNumber: 47, suffix: '%', label: 'Avg. cost reduction' },
      { _key: key(), targetNumber: 12, suffix: 'x', label: 'Workflow speedup' },
      { _key: key(), targetNumber: 89, suffix: '%', label: 'Client retention' },
    ],
  },
  problemSection: {
    badge: '⚠️ The Problem',
    heading: "You're leaving money on the table. Every day.",
    subheading: "Most businesses sit on massive efficiency gains — they just don't know which levers to pull.",
  },
  problems: [
    { _key: key(), icon: '⏱', title: 'Your team wastes hours on manual work', desc: "Data entry, follow-ups, reporting — tasks that should be automated eat your team's time every day.", stat: '23 hrs/wk', statLabel: 'lost to manual tasks' },
    { _key: key(), icon: '🎯', title: 'You know AI matters, but where to start?', desc: "The landscape changes weekly. You don't have time to become an AI expert on top of running a business.", stat: '73%', statLabel: 'of SMBs unsure where to begin' },
    { _key: key(), icon: '💸', title: "You're paying for tools you barely use", desc: "Subscriptions stack up but nobody's connected the dots. Spending more, getting fragmented results.", stat: '$2.4K/mo', statLabel: 'avg. wasted on unused SaaS' },
    { _key: key(), icon: '🔌', title: 'Nothing talks to anything else', desc: "CRM doesn't sync with invoicing. Marketing runs in a silo. Data lives in 15 spreadsheets.", stat: '67%', statLabel: 'of data stuck in silos' },
  ],
  solutionSection: {
    badge: '✅ The Solution',
    heading: 'AI that actually works for your business',
    subheading: 'No buzzwords. No generic tools. High-impact AI designed around how your business actually operates.',
  },
  solutions: [
    { _key: key(), icon: '🔍', title: 'AI Opportunity Audit', desc: 'We map every process, find the biggest drains, and show exactly where AI has the highest ROI.', features: ['Process mapping', 'ROI modelling', 'Priority scoring'] },
    { _key: key(), icon: '⚡', title: 'Workflow Automation', desc: 'Custom systems that eliminate repetitive tasks, reduce errors, and give your team time back.', features: ['Custom integrations', 'Zero-code solutions', 'Auto-reporting'] },
    { _key: key(), icon: '🧠', title: 'AI Implementation', desc: 'From chatbots to predictive analytics — AI tools tailored to your industry, data, and goals.', features: ['Custom AI agents', 'Data pipelines', 'Smart dashboards'] },
    { _key: key(), icon: '📈', title: 'Ongoing Optimisation', desc: 'We continuously monitor, improve, and expand your AI systems as your business grows.', features: ['Performance tracking', 'Monthly reports', 'Scaling roadmap'] },
  ],
  processSection: {
    badge: '🔄 How It Works',
    heading: 'From chaos to clarity in four steps',
  },
  processSteps: [
    { _key: key(), number: '01', title: 'Discovery Call', desc: '30-minute call to understand your business, team, and bottlenecks. No sales pitch.', timeframe: 'Day 1', deliverable: 'Free' },
    { _key: key(), number: '02', title: 'AI Audit & Roadmap', desc: 'We audit your workflows, data, and tools. You get a prioritised roadmap ranked by impact.', timeframe: 'Week 1–2', deliverable: 'PDF report' },
    { _key: key(), number: '03', title: 'Build & Implement', desc: 'We design, build, and deploy your AI systems with weekly check-ins and demos.', timeframe: 'Week 3–6', deliverable: 'Agile sprints' },
    { _key: key(), number: '04', title: 'Launch & Optimise', desc: 'Go live with full support. We monitor performance and continuously improve.', timeframe: 'Ongoing', deliverable: 'Monthly reviews' },
  ],
  resultsSection: {
    badge: '⭐ Results',
    heading: 'Real businesses. Real results.',
  },
  stats: [
    { _key: key(), icon: '📉', value: '47%', label: 'Avg. cost reduction' },
    { _key: key(), icon: '🏢', value: '120+', label: 'Businesses transformed' },
    { _key: key(), icon: '💰', value: '$4.2M', label: 'Client savings to date' },
    { _key: key(), icon: '⚡', value: '12x', label: 'Avg. workflow speedup' },
  ],
  testimonials: [
    { _key: key(), name: 'Sarah Chen', role: 'CEO, BrightPath Logistics', location: 'Melbourne', text: "VineAI found $180K in annual savings we didn't know we were losing. Their AI audit was the single best investment we made.", stat: '$180K', statLabel: 'annual savings', initials: 'SC' },
    { _key: key(), name: 'Marcus Drewe', role: 'Ops Director, Coastal Builders', location: 'Gold Coast', text: 'We went from drowning in admin to automated reporting, scheduling, and client comms. My team focuses on what matters.', stat: '32hrs', statLabel: 'saved per week', initials: 'MD' },
    { _key: key(), name: 'Priya Sharma', role: 'Founder, Elevate Digital', location: 'Sydney', text: "I was sceptical about AI consultants. VineAI changed my mind. They don't just advise — they build, deploy, and optimise.", stat: '3x', statLabel: 'revenue per employee', initials: 'PS' },
  ],
  about: {
    badge: '👋 About VineAI',
    heading: 'Built for business owners who want answers, not hype.',
    body1: 'VineAI was founded because we saw Australian businesses being left behind — not for lack of ambition, but for lack of clear, practical guidance.',
    body2: "We're a team of AI engineers, strategists, and automation specialists who embed into your operations and deliver measurable results.",
    quoteLabel: '// our_philosophy.js',
    quote: '"Every business has AI opportunities hiding in plain sight. Our job is to find them, build them, and prove they work."',
    creds: [
      { _key: key(), icon: '🇦🇺', label: 'Australian-founded & operated' },
      { _key: key(), icon: '🤝', label: '120+ businesses served' },
      { _key: key(), icon: '🏆', label: 'AI specialists since 2021' },
      { _key: key(), icon: '🔒', label: 'Privacy-first, data onshore' },
    ],
    aboutStats: [
      { _key: key(), value: '5–100', label: 'Employee range' },
      { _key: key(), value: 'SMB', label: 'Focus segment' },
      { _key: key(), value: '6 weeks', label: 'Avg. implementation' },
      { _key: key(), value: 'AU-wide', label: 'Service area' },
    ],
  },
  cta: {
    heading: 'Ready to find out what AI can do for your business?',
    subheading: 'Book a free 30-minute consultation. No strings attached.',
    buttonText: 'Book Your Free Consultation →',
    trustItems: ['Free, no obligation', '30 minutes', 'Actionable insights'],
  },
}

// ---- Team Members ----
const teamMembers = [
  {
    _type: 'team',
    _id: 'team-liam',
    name: 'Liam Hargraves',
    role: 'Founder & AI Strategist',
    initials: 'LH',
    bio: "Former McKinsey consultant turned AI evangelist. Liam spent a decade helping Fortune 500 companies optimise operations before founding VineAI to bring that same rigour to Australian SMBs. He's led over 80 AI implementations and is obsessed with finding the 20% of changes that drive 80% of results.",
    quote: "Most businesses don't need more AI — they need the right AI in the right place.",
    specialities: ['AI strategy', 'Business transformation', 'ROI modelling'],
    stats: [{ _key: key(), value: '80+', label: 'AI projects' }, { _key: key(), value: '10yr', label: 'Consulting' }, { _key: key(), value: '$12M', label: 'Saved' }],
    accentColor: '#34d399',
    gradientFrom: '#34d399',
    gradientTo: '#059669',
    order: 1,
  },
  {
    _type: 'team',
    _id: 'team-maya',
    name: 'Maya Okonkwo',
    role: 'Head of AI Engineering',
    initials: 'MO',
    bio: "Maya leads VineAI's technical delivery — from custom GPT agents to full-stack automation pipelines. With a background in ML research at CSIRO and 6 years building production AI systems, she turns complex business problems into elegant, automated solutions.",
    quote: "The best automation is the one your team doesn't even notice — it just works.",
    specialities: ['Machine learning', 'Automation pipelines', 'Custom AI agents'],
    stats: [{ _key: key(), value: '150+', label: 'Automations' }, { _key: key(), value: 'PhD', label: 'Comp. Sci.' }, { _key: key(), value: '6yr', label: 'Prod. ML' }],
    accentColor: '#60a5fa',
    gradientFrom: '#60a5fa',
    gradientTo: '#3b82f6',
    order: 2,
  },
  {
    _type: 'team',
    _id: 'team-jake',
    name: 'Jake Whitfield',
    role: 'Client Success Lead',
    initials: 'JW',
    bio: "Jake is the bridge between technical implementation and real-world business impact. He manages every client relationship end-to-end, ensuring AI systems don't just get deployed — they get adopted, loved, and expanded. Previously ran operations at two high-growth Australian startups.",
    quote: "Technology only works if your team actually uses it. That's where I come in.",
    specialities: ['Client management', 'Change management', 'Training & adoption'],
    stats: [{ _key: key(), value: '89%', label: 'Retention' }, { _key: key(), value: '4.9★', label: 'Rating' }, { _key: key(), value: '120+', label: 'Clients' }],
    accentColor: '#f472b6',
    gradientFrom: '#f472b6',
    gradientTo: '#ec4899',
    order: 3,
  },
]

// ---- Blog Posts ----
const blogPosts = [
  {
    _type: 'post',
    _id: 'post-ai-audit-guide',
    title: 'The Complete Guide to Running an AI Audit for Your SMB',
    slug: { _type: 'slug', current: 'ai-audit-guide' },
    category: 'Strategy',
    excerpt: "Not sure where AI fits in your business? Here's our exact framework for identifying the highest-ROI opportunities.",
    timeToRead: '8 min',
    date: '2026-02-12',
    featured: true,
    content: [
      block('blockquote', "Every business has hidden inefficiencies that AI can solve. The challenge isn't whether AI can help — it's knowing where to start. After 120+ audits for Australian SMBs, we've refined a framework that consistently uncovers the highest-ROI opportunities."),
      block('h2', 'Why Most Businesses Get AI Wrong'),
      block('normal', "The most common mistake is 'solution-first thinking' — businesses hear about a tool and try to find a problem for it. This leads to wasted money and AI scepticism. The right approach is problem-first: map your workflows, measure where time and money are lost, then match the right AI capability to each bottleneck."),
      block('h2', 'The 5-Step AI Audit Framework'),
      block('normal', "Step 1: Process Inventory — Document every recurring workflow. We typically find 40–80 distinct processes in a company of 20. Step 2: Pain Scoring — Rate each on time consumed, error frequency, and frustration. Step 3: AI Feasibility Mapping — Assess whether current AI can meaningfully improve each high-pain process. Step 4: ROI Modelling — Calculate expected savings and cost impact. Step 5: Priority Ranking — Rank by combined ROI, speed, and risk score."),
      block('h2', 'What a Good Audit Delivers'),
      block('normal', "A clear, prioritised roadmap — not a vague strategy deck. Each item includes the specific process to automate, the tool to use, expected ROI, and realistic timeline. Our clients typically find their top 3 opportunities account for 70% of total potential savings."),
      block('h2', 'Ready to Run Your Own Audit?'),
      block('normal', "You can start with this framework yourself. But if you'd prefer an experienced team to do it faster, that's what our free consultation is for. We'll identify quick wins and give you a roadmap you can act on immediately."),
    ],
  },
  {
    _type: 'post',
    _id: 'post-chatgpt-not-enough',
    title: "Why ChatGPT Alone Isn't Enough: Moving Beyond Basic AI",
    slug: { _type: 'slug', current: 'chatgpt-not-enough' },
    category: 'Insights',
    excerpt: "Your team uses ChatGPT for drafting emails. That's great — but you're only scratching the surface of what AI can do.",
    timeToRead: '6 min',
    date: '2026-02-05',
    featured: false,
    content: [
      block('blockquote', "If your team is using ChatGPT for emails and questions, you're ahead of most. But conversational AI is just the tip of the iceberg. The real gains come from AI woven into your actual business systems."),
      block('h2', 'The ChatGPT Ceiling'),
      block('normal', "ChatGPT doesn't know your customers, processes, or data. Every time your team uses it, they start from zero — copying context in, interpreting outputs, transferring results manually. That's assisted manual work, not automation."),
      block('h2', 'What Comes After ChatGPT'),
      block('normal', "The next level is AI connected to your data and embedded in workflows. A system that auto-triages support tickets from your knowledge base. A pipeline that pulls CRM data, generates forecasts, and emails leadership — without anyone lifting a finger."),
      block('h2', 'The Integration Advantage'),
      block('normal', "Integrated AI compounds benefits. Data flows automatically, decisions happen faster, teams focus on high-value work. Clients typically see 12x workflow speed improvement moving from ad-hoc ChatGPT to integrated systems."),
      block('h2', 'Making the Leap'),
      block('normal', "Start with one high-impact workflow, automate it properly, measure results, and expand. That's exactly our approach with every VineAI client."),
    ],
  },
  {
    _type: 'post',
    _id: 'post-automation-saves-23-hours',
    title: 'How Automation Saved Our Clients 23 Hours Per Week (On Average)',
    slug: { _type: 'slug', current: 'automation-saves-23-hours' },
    category: 'Case Study',
    excerpt: "We tracked time savings across 40 implementations. Here's where the biggest wins came from.",
    timeToRead: '7 min',
    date: '2026-01-28',
    featured: false,
    content: [
      block('blockquote', "When we tell clients our implementations save 23 hours per week on average, we get raised eyebrows. So we broke down exactly where those hours come from using data from 40 engagements."),
      block('h2', 'The Biggest Time Sinks'),
      block('normal', "The three largest sources: data entry and transfer (8.2 hrs/week), reporting and dashboards (5.4 hrs/week), and email triage and response drafting (4.7 hrs/week). Together that's 18+ hours of recoverable time per week."),
      block('h2', 'Case Study: Coastal Builders'),
      block('normal', "A Gold Coast construction firm with 35 employees spending 40 hours/week on admin. We implemented automated scheduling sync, AI-powered client comms, and auto-generated reports. Result: 32 hours saved per week."),
      block('h2', 'The Compound Effect'),
      block('normal', "Time savings compound. Teams respond faster, spot problems earlier, and have capacity for growth. Several clients report revenue increases from freed-up capacity — not just cost savings."),
      block('h2', 'Your Potential Savings'),
      block('normal', "Most SMBs with 5–100 employees have 15–30 hours per week of automatable work. The question isn't whether savings exist — it's which to capture first."),
    ],
  },
  {
    _type: 'post',
    _id: 'post-ai-privacy-australia',
    title: 'AI and Data Privacy: What Australian Businesses Need to Know',
    slug: { _type: 'slug', current: 'ai-privacy-australia' },
    category: 'Compliance',
    excerpt: "Implementing AI doesn't mean compromising on data security. Here's how to stay compliant with Australian privacy law.",
    timeToRead: '5 min',
    date: '2026-01-20',
    featured: false,
    content: [
      block('blockquote', "The most common concern we hear: where does my data go? Is it secure? Am I compliant? These are the right questions — and the answers are more reassuring than you think."),
      block('h2', 'The Australian Privacy Landscape'),
      block('normal', "Australia's Privacy Act 1988 and the APPs set clear rules for personal information. When implementing AI, these rules apply just as they do to any other technology."),
      block('h2', 'Keeping Data Onshore'),
      block('normal', "We prioritise onshore processing. Many AI tools offer AU/APAC hosting, and for sensitive data we deploy private models within your own infrastructure. Your customer data never needs to leave your control."),
      block('h2', 'Practical Privacy Safeguards'),
      block('normal', "Every implementation includes data minimisation, role-based access, audit logging, and encryption at rest and in transit. For regulated industries, we add additional protection layers tailored to your requirements."),
      block('h2', 'The Bottom Line'),
      block('normal', "AI and privacy aren't in conflict. With the right approach, you can automate aggressively while improving your security posture. The key is a partner who understands both the tech and the regulations."),
    ],
  },
  {
    _type: 'post',
    _id: 'post-5-signs-ready-for-ai',
    title: "5 Signs Your Business Is Ready for AI (And 3 Signs It's Not)",
    slug: { _type: 'slug', current: '5-signs-ready-for-ai' },
    category: 'Strategy',
    excerpt: "AI isn't right for every business at every stage. Here's how to honestly assess whether now is the time to invest.",
    timeToRead: '5 min',
    date: '2026-01-14',
    featured: false,
    content: [
      block('blockquote', "Not every business is ready for AI, and that's okay. Implementing at the wrong time can be worse than not implementing at all. Here's how to tell if you're ready."),
      block('h2', '5 Signs You\'re Ready'),
      block('normal', "1. You have repeatable processes your team does weekly. 2. You're drowning in data but not extracting insights. 3. Your team is stretched thin because manual work eats their time. 4. You've tried ChatGPT/Zapier and want to go deeper. 5. You can articulate your bottlenecks."),
      block('h2', "3 Signs You're Not Ready (Yet)"),
      block('normal', "1. Your processes aren't documented — start there first. 2. You're looking for a magic bullet — AI amplifies good operations, doesn't fix broken ones. 3. Leadership isn't bought in — without commitment, tools gather dust."),
      block('h2', 'The Honest Assessment'),
      block('normal', "If 3+ 'ready' signs fit you, you're in a strong position. If 'not ready' resonated more, that's valuable awareness — we can help you build toward readiness with a lighter engagement."),
      block('h2', 'Not Sure Where You Stand?'),
      block('normal', "That's what our free consultation is for. In 30 minutes we'll give you an honest assessment and a concrete first step. No pressure, no jargon, just clarity."),
    ],
  },
]

// ---- Seed ----
async function seed() {
  console.log(`\n🌱 Seeding VineAI data to Sanity (project: ${projectId}, dataset: ${dataset})\n`)

  const documents = [homePage, ...teamMembers, ...blogPosts]

  for (const doc of documents) {
    try {
      await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0])
      console.log(`  ✅  ${doc._type} — ${(doc as { _id?: string; title?: string; name?: string })._id}`)
    } catch (err) {
      console.error(`  ❌  Failed: ${(doc as { _id?: string })._id}`, err)
    }
  }

  console.log('\n✨  Done! Your Sanity dataset is now populated.')
  console.log('   Open the Studio at http://localhost:3000/studio to review and edit.\n')
}

seed()
