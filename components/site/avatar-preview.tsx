import type { AvatarConfig } from '@/lib/store'
import { cn } from '@/lib/utils'

/**
 * Aperçu stylisé et abstrait de l'avatar — volontairement illustratif (pas
 * une photo transformée par IA). Le Virtual Beauty Studio doit toujours
 * distinguer clairement une simulation d'un rendu photo-réaliste.
 */
export function AvatarPreview({ config, className }: { config: AvatarConfig; className?: string }) {
  const longHair = /long/i.test(config.hairLength)

  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-gradient-to-b from-secondary to-card', className)}>
      <svg viewBox="0 0 200 280" className="h-full w-full">
        {/* Tenue / épaules */}
        <path d="M20 280 Q100 200 180 280 L180 300 L20 300 Z" fill={config.outfitColor} />
        {/* Cou */}
        <rect x="86" y="150" width="28" height="40" fill={config.skinTone} />
        {/* Cheveux (arrière, longs) */}
        {longHair && <path d="M45 90 Q40 220 60 250 L75 250 Q60 170 65 100 Z" fill={config.hairColor} />}
        {longHair && <path d="M155 90 Q160 220 140 250 L125 250 Q140 170 135 100 Z" fill={config.hairColor} />}
        {/* Visage */}
        <ellipse cx="100" cy="118" rx="52" ry="62" fill={config.skinTone} />
        {/* Blush */}
        <ellipse cx="68" cy="140" rx="12" ry="8" fill={config.blushShade} opacity="0.45" />
        <ellipse cx="132" cy="140" rx="12" ry="8" fill={config.blushShade} opacity="0.45" />
        {/* Fard à paupières */}
        <path d="M65 108 Q80 96 95 106" stroke={config.eyeshadowShade} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M105 106 Q120 96 135 108" stroke={config.eyeshadowShade} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7" />
        {/* Yeux */}
        <ellipse cx="80" cy="115" rx="6" ry="4" fill="#171310" />
        <ellipse cx="120" cy="115" rx="6" ry="4" fill="#171310" />
        {/* Eyeliner */}
        {config.eyeliner && <path d="M73 112 Q80 108 87 113" stroke="#171310" strokeWidth="2" fill="none" strokeLinecap="round" />}
        {config.eyeliner && <path d="M113 113 Q120 108 127 112" stroke="#171310" strokeWidth="2" fill="none" strokeLinecap="round" />}
        {/* Mascara */}
        {config.mascara && <path d="M74 119 l-4 3M80 121 l-1 4M86 119 l4 3" stroke="#171310" strokeWidth="1.5" strokeLinecap="round" />}
        {config.mascara && <path d="M114 119 l-4 3M120 121 l0 4M126 119 l4 3" stroke="#171310" strokeWidth="1.5" strokeLinecap="round" />}
        {/* Sourcils */}
        <path d="M68 100 Q80 94 92 99" stroke={config.hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M108 99 Q120 94 132 100" stroke={config.hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Lèvres */}
        <path d="M85 152 Q100 162 115 152 Q100 158 85 152 Z" fill={config.lipstickShade} />
        {/* Cheveux (devant) */}
        <path d="M45 100 Q50 55 100 48 Q150 55 155 100 Q150 75 100 70 Q50 75 45 100 Z" fill={config.hairColor} />
      </svg>
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-obsidian/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
        Aperçu — simulation illustrative
      </p>
    </div>
  )
}
