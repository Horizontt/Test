import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ padding: '48px 24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#34d399,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#080a0f', fontFamily: 'var(--font-display)' }}>V</div>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)' }}>VineAI</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>AI automation for Australian SMBs.</p>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 14, letterSpacing: '0.05em' }}>COMPANY</div>
            <Link href="/" style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: 13, padding: '4px 0' }}>Home</Link>
            <Link href="/team" style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: 13, padding: '4px 0' }}>Team</Link>
            <Link href="/blog" style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: 13, padding: '4px 0' }}>Blog</Link>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 14, letterSpacing: '0.05em' }}>LEGAL</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', padding: '4px 0' }}>Privacy Policy</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', padding: '4px 0' }}>Terms of Service</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', padding: '4px 0' }}>Contact</div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>
          © 2026 VineAI. Melbourne, Australia.
        </div>
      </div>
    </footer>
  )
}
