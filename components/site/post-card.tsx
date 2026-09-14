import Link from 'next/link'
import { Heart, MessageCircle } from 'lucide-react'

import type { CommunityPost } from '@/lib/data'
import { cn } from '@/lib/utils'

export function PostCard({ post, className }: { post: CommunityPost; className?: string }) {
  return (
    <Link href={`/communaute/${post.id}`} className={cn('group block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg', className)}>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img src={post.image} alt={post.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {post.productIds.length > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
            Shoppable
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <img src={post.authorPhoto} alt="" className="size-7 rounded-full object-cover" />
          <p className="text-xs font-semibold text-foreground">{post.handle}</p>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.caption}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Heart className="size-3.5" /> {post.likes}</span>
          <span className="flex items-center gap-1"><MessageCircle className="size-3.5" /> {post.comments}</span>
        </div>
      </div>
    </Link>
  )
}
