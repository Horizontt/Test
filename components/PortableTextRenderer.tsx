import { PortableText } from '@portabletext/react'

interface PortableTextRendererProps {
  content: unknown[]
}

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 20 }}>{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: '#fff' }}>{children}</h2>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.06)', fontStyle: 'italic' }}>{children}</p>
    ),
  },
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return <PortableText value={content as Parameters<typeof PortableText>[0]['value']} components={components} />
}
