'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'

  function scrollToSection(id: string) {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  function goToBooking() {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#book')
    }
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="main-nav">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#34d399,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#080a0f', fontFamily: 'var(--font-display)' }}>V</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>VineAI</span>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav">
          <button className={`nav-link${isHome ? '' : ''}`} onClick={() => scrollToSection('solution')}>Solution</button>
          <button className="nav-link" onClick={() => scrollToSection('process')}>Process</button>
          <Link href="/team" className={`nav-link${pathname === '/team' ? ' active' : ''}`}>Team</Link>
          <Link href="/blog" className={`nav-link${pathname.startsWith('/blog') ? ' active' : ''}`}>Blog</Link>
          <button className="nav-cta" onClick={goToBooking}>Book a Call</button>
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'rgba(8,10,15,0.95)', backdropFilter: 'blur(20px)', padding: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => scrollToSection('solution')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 0', color: 'rgba(255,255,255,0.7)', fontSize: 16, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>Solution</button>
        <button onClick={() => scrollToSection('process')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 0', color: 'rgba(255,255,255,0.7)', fontSize: 16, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer' }}>Process</button>
        <Link href="/team" onClick={() => setMenuOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 0', color: 'rgba(255,255,255,0.7)', fontSize: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Team</Link>
        <Link href="/blog" onClick={() => setMenuOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 0', color: 'rgba(255,255,255,0.7)', fontSize: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Blog</Link>
        <button onClick={goToBooking} style={{ display: 'block', width: '100%', marginTop: 16, padding: 14, borderRadius: 10, background: 'linear-gradient(135deg,#34d399,#059669)', color: '#080a0f', fontSize: 15, fontWeight: 600, textAlign: 'center', border: 'none', cursor: 'pointer' }}>Book a Free Call</button>
      </div>
    </nav>
  )
}
