'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { faqs } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

const categories = Array.from(new Set(faqs.map((f) => f.category)))

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading eyebrow="Besoin d’aide ?" title="Foire aux questions" />

      <div className="mt-12 space-y-10">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="font-serif text-xl">{category}</h2>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {faqs.filter((f) => f.category === category).map((faq) => (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpen((prev) => (prev === faq.id ? null : faq.id))}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-foreground"
                  >
                    {faq.question}
                    <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open === faq.id && 'rotate-180')} />
                  </button>
                  {open === faq.id && <p className="pb-4 text-sm leading-6 text-muted-foreground">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
