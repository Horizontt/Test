import { client } from './client'

// ---- Types ----

export interface HeroStat { targetNumber: number; suffix: string; label: string }
export interface ProblemCard { icon: string; title: string; desc: string; stat: string; statLabel: string }
export interface SolutionCard { icon: string; title: string; desc: string; features: string[] }
export interface ProcessStep { number: string; title: string; desc: string; timeframe: string; deliverable: string }
export interface StatCard { icon: string; value: string; label: string }
export interface Testimonial { name: string; role: string; location: string; text: string; stat: string; statLabel: string; initials: string }
export interface CredItem { icon: string; label: string }
export interface AboutStat { value: string; label: string }

export interface HomeData {
  hero?: {
    badge?: string; heading?: string; headingHighlight?: string; subheading?: string;
    primaryCta?: string; secondaryCta?: string; heroStats?: HeroStat[]
  }
  problemSection?: { badge?: string; heading?: string; subheading?: string }
  problems?: ProblemCard[]
  solutionSection?: { badge?: string; heading?: string; subheading?: string }
  solutions?: SolutionCard[]
  processSection?: { badge?: string; heading?: string }
  processSteps?: ProcessStep[]
  resultsSection?: { badge?: string; heading?: string }
  stats?: StatCard[]
  testimonials?: Testimonial[]
  about?: {
    badge?: string; heading?: string; body1?: string; body2?: string;
    quoteLabel?: string; quote?: string; creds?: CredItem[]; aboutStats?: AboutStat[]
  }
  cta?: { heading?: string; subheading?: string; buttonText?: string; buttonUrl?: string; trustItems?: string[] }
}

export interface TeamMember {
  _id: string; name: string; role: string; initials: string; bio: string; quote: string;
  specialities: string[]; stats: { value: string; label: string }[];
  accentColor: string; gradientFrom: string; gradientTo: string; order: number
}

export interface PostSummary {
  _id: string; title: string; slug: string; category: string; excerpt: string;
  timeToRead: string; date: string; featured: boolean
}

export interface PostFull extends PostSummary {
  content: unknown[]
}

// ---- Queries ----

export async function getHomeData(): Promise<HomeData | null> {
  return client.fetch(
    `*[_type == "homePage"][0]`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    `*[_type == "team"] | order(order asc) { _id, name, role, initials, bio, quote, specialities, stats, accentColor, gradientFrom, gradientTo, order }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getAllPosts(): Promise<PostSummary[]> {
  return client.fetch(
    `*[_type == "post"] | order(date desc) { _id, title, "slug": slug.current, category, excerpt, timeToRead, date, featured }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { _id, title, "slug": slug.current, category, excerpt, timeToRead, date, featured, content }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await client.fetch<{ slug: string }[]>(
    `*[_type == "post"] { "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } }
  )
  return posts.map(p => p.slug).filter(Boolean)
}
