import type { AvatarConfig } from '@/lib/store'
import { getMannequin } from '@/lib/mannequins'
import { cn } from '@/lib/utils'

/**
 * Aperçu du mannequin — une vraie photo de personne, sur laquelle les
 * couleurs choisies (maquillage, coiffure, tenue) sont superposées en
 * fondu. C'est un rendu indicatif : la couleur donne une idée fidèle du
 * choix effectué, mais ce n'est pas une transformation IA photo-réaliste
 * du visage ou du vêtement — nous l'indiquons toujours clairement.
 */
export function AvatarPreview({ config, className }: { config: AvatarConfig; className?: string }) {
  const mannequin = getMannequin(config.mannequinId)

  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-secondary', className)}>
      <img
        src={mannequin.photo}
        alt={`Mannequin ${mannequin.name}`}
        className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
      />

      {/* Coiffure — teinte sur la zone supérieure */}
      <div
        className="absolute inset-x-[8%] top-0 h-[34%] rounded-b-[50%] blur-2xl mix-blend-multiply"
        style={{ backgroundColor: config.hairColor, opacity: 0.3 }}
      />
      {/* Fard à paupières */}
      <div
        className="absolute left-[27%] top-[30%] h-[7%] w-[17%] rounded-full blur-md mix-blend-multiply"
        style={{ backgroundColor: config.eyeshadowShade, opacity: 0.4 }}
      />
      <div
        className="absolute right-[27%] top-[30%] h-[7%] w-[17%] rounded-full blur-md mix-blend-multiply"
        style={{ backgroundColor: config.eyeshadowShade, opacity: 0.4 }}
      />
      {/* Blush */}
      <div
        className="absolute left-[16%] top-[42%] h-[11%] w-[15%] rounded-full blur-xl mix-blend-multiply"
        style={{ backgroundColor: config.blushShade, opacity: 0.32 }}
      />
      <div
        className="absolute right-[16%] top-[42%] h-[11%] w-[15%] rounded-full blur-xl mix-blend-multiply"
        style={{ backgroundColor: config.blushShade, opacity: 0.32 }}
      />
      {/* Rouge à lèvres */}
      <div
        className="absolute left-1/2 top-[52%] h-[6%] w-[19%] -translate-x-1/2 rounded-full blur-sm mix-blend-multiply"
        style={{ backgroundColor: config.lipstickShade, opacity: 0.55 }}
      />
      {/* Tenue — teinte sur le bas du cadre */}
      <div
        className="absolute inset-x-0 bottom-0 h-[28%] blur-2xl mix-blend-multiply"
        style={{ backgroundColor: config.outfitColor, opacity: 0.28 }}
      />

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-obsidian/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
        {mannequin.name} — rendu indicatif sur photo
      </p>
    </div>
  )
}
