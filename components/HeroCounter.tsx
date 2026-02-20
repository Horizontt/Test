'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroStat {
  targetNumber: number
  suffix: string
  label: string
}

interface HeroCounterProps {
  stats: HeroStat[]
}

export default function HeroCounter({ stats }: HeroCounterProps) {
  const [values, setValues] = useState(stats.map(() => 0))
  const started = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const steps = 60
        let step = 0
        const timer = setInterval(() => {
          step++
          const easing = 1 - Math.pow(1 - step / steps, 3)
          setValues(stats.map(s => Math.round(easing * s.targetNumber)))
          if (step >= steps) clearInterval(timer)
        }, 33)
        obs.unobserve(el)
      }
    }, { threshold: 0.1 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [stats])

  return (
    <div ref={ref} style={{ display: 'flex', gap: 32, marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
      {stats.map((s, i) => (
        <div key={i}>
          <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: '#34d399' }}>
            {values[i]}{s.suffix}
          </div>
          <div className="font-mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
