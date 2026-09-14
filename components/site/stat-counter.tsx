'use client'

import { useEffect, useRef, useState } from 'react'

export function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [display, setDisplay] = useState('0')
  const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10)
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    const node = ref.current
    if (!node || Number.isNaN(numeric)) {
      setDisplay(value)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1200
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          const current = Math.round(numeric * (1 - Math.pow(1 - progress, 3)))
          setDisplay(`${current}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [numeric, suffix, value])

  return (
    <div>
      <p ref={ref} className="font-serif text-4xl text-foreground sm:text-5xl">
        {display}
      </p>
      <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  )
}
