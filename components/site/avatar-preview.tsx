import type { AvatarConfig } from '@/lib/store'
import { getMannequin } from '@/lib/mannequins'
import { cn } from '@/lib/utils'

/**
 * Aperçu du mannequin — soit l'une des photos KÔSMÉA, soit la propre photo
 * (tête-aux-pieds) de la personne une fois uploadée. Les couleurs choisies
 * (maquillage, coiffure, tenue) sont superposées en fondu sur la photo :
 * un rendu indicatif fidèle à la couleur réelle, mais qui n'est jamais
 * présenté comme une transformation IA photo-réaliste du visage ou du
 * tissu — nous l'indiquons toujours clairement.
 */
export function AvatarPreview({ config, className }: { config: AvatarConfig; className?: string }) {
  const usingPhoto = config.photoMode === 'photo' && config.customPhoto
  const photo = usingPhoto ? config.customPhoto! : getMannequin(config.mannequinId).photo
  const label = usingPhoto ? 'Mon mannequin — rendu indicatif sur photo' : `${getMannequin(config.mannequinId).name} — rendu indicatif sur photo`

  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-secondary', className)}>
      <img
        src={photo}
        alt={usingPhoto ? 'Mon mannequin' : `Mannequin ${getMannequin(config.mannequinId).name}`}
        className={cn('absolute inset-0 h-full w-full object-cover', usingPhoto ? 'object-[center_8%]' : 'object-[center_22%]')}
      />

      {usingPhoto ? (
        <>
          {/* Photo tête-aux-pieds : bandes larges (cheveux / visage / tenue) */}
          <div className="absolute inset-x-[15%] top-0 h-[7%] rounded-b-[50%] blur-2xl mix-blend-multiply" style={{ backgroundColor: config.hairColor, opacity: 0.28 }} />
          <div className="absolute inset-x-[22%] top-[6%] h-[9%] rounded-full blur-xl mix-blend-multiply" style={{ backgroundColor: config.lipstickShade, opacity: 0.22 }} />
          <div className="absolute inset-x-0 top-[16%] h-[78%] blur-2xl mix-blend-multiply" style={{ backgroundColor: config.outfitColor, opacity: 0.22 }} />
        </>
      ) : (
        <>
          {/* Coiffure */}
          <div className="absolute inset-x-[8%] top-0 h-[34%] rounded-b-[50%] blur-2xl mix-blend-multiply" style={{ backgroundColor: config.hairColor, opacity: 0.3 }} />
          {/* Fard à paupières */}
          <div className="absolute left-[27%] top-[30%] h-[7%] w-[17%] rounded-full blur-md mix-blend-multiply" style={{ backgroundColor: config.eyeshadowShade, opacity: 0.4 }} />
          <div className="absolute right-[27%] top-[30%] h-[7%] w-[17%] rounded-full blur-md mix-blend-multiply" style={{ backgroundColor: config.eyeshadowShade, opacity: 0.4 }} />
          {/* Blush */}
          <div className="absolute left-[16%] top-[42%] h-[11%] w-[15%] rounded-full blur-xl mix-blend-multiply" style={{ backgroundColor: config.blushShade, opacity: 0.32 }} />
          <div className="absolute right-[16%] top-[42%] h-[11%] w-[15%] rounded-full blur-xl mix-blend-multiply" style={{ backgroundColor: config.blushShade, opacity: 0.32 }} />
          {/* Rouge à lèvres */}
          <div className="absolute left-1/2 top-[52%] h-[6%] w-[19%] -translate-x-1/2 rounded-full blur-sm mix-blend-multiply" style={{ backgroundColor: config.lipstickShade, opacity: 0.55 }} />
          {/* Tenue */}
          <div className="absolute inset-x-0 bottom-0 h-[28%] blur-2xl mix-blend-multiply" style={{ backgroundColor: config.outfitColor, opacity: 0.28 }} />
        </>
      )}

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-obsidian/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
        {label}
      </p>
    </div>
  )
}
