'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: keyof React.JSX.IntrinsicElements
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Comp = Tag as any
  return (
    <Comp
      ref={ref}
      style={visible ? { animationDelay: `${delay}ms` } : { opacity: 0 }}
      className={cn(visible && 'reveal', className)}
    >
      {children}
    </Comp>
  )
}
