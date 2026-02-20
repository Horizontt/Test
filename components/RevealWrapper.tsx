'use client'

import { useEffect, useRef } from 'react'

interface RevealWrapperProps {
  children: React.ReactNode
  direction?: 'up' | 'left' | 'right'
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export default function RevealWrapper({ children, direction = 'up', delay = 0, className = '', style }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const dirClass = direction === 'left' ? ' from-left' : direction === 'right' ? ' from-right' : ''

  return (
    <div
      ref={ref}
      className={`reveal${dirClass}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
    >
      {children}
    </div>
  )
}
