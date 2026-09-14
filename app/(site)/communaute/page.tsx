'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Flame, Video } from 'lucide-react'

import { communityPosts } from '@/lib/data'
import { PostCard } from '@/components/site/post-card'
import { SectionHeading } from '@/components/site/section-heading'
import { cn } from '@/lib/utils'

const categories = Array.from(new Set(communityPosts.map((p) => p.category)))

export default function CommunityPage() {
  const [category, setCategory] = useState<string | null>(null)
  const filtered = useMemo(() => communityPosts.filter((p) => !category || p.category === category), [category])

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="KÔSMÉA Community" title="Découvrez ce qui vous correspond" description="Des looks partagés par la communauté, tous shoppables." />
        <div className="flex gap-2">
          <Link href="/defis" className="flex items-center gap-1.5 border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:border-primary">
            <Flame className="size-3.5" /> Défis
          </Link>
          <Link href="/live" className="flex items-center gap-1.5 border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:border-primary">
            <Video className="size-3.5" /> Live
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider', !category ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
        >
          Tout
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn('rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider', category === c ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
