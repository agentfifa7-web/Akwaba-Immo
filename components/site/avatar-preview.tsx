import type { AvatarConfig } from '@/lib/store'
import { cn } from '@/lib/utils'

/**
 * Aperçu du mannequin.
 *
 * Deux modes :
 * - "photo" : la propre photo tête-aux-pieds de l'utilisateur, avec des
 *   superpositions de couleur en fondu (maquillage, coiffure, tenue).
 * - "mannequin" (par défaut) : une silhouette illustrée entière, façon
 *   croquis de mode (proportions soignées : encolure, taille, hanches,
 *   bras et jambes distincts), dessinée directement à partir de la teinte
 *   choisie dans la palette KÔSMÉA — donc toujours fidèlement représentative,
 *   sans dépendre d'une photo tierce dont nous ne maîtrisons pas le contenu.
 *
 * Dans les deux cas, c'est un rendu indicatif : la couleur donne une idée
 * fidèle du choix effectué, ce n'est jamais présenté comme une
 * transformation IA photo-réaliste du visage ou du tissu.
 */
export function AvatarPreview({ config, className }: { config: AvatarConfig; className?: string }) {
  const usingPhoto = config.photoMode === 'photo' && config.customPhoto

  if (usingPhoto) {
    return (
      <div className={cn('relative overflow-hidden rounded-2xl bg-secondary', className)}>
        <img src={config.customPhoto} alt="Mon mannequin" className="absolute inset-0 h-full w-full object-cover object-[center_8%]" />
        <div className="absolute inset-x-[15%] top-0 h-[7%] rounded-b-[50%] blur-2xl mix-blend-multiply" style={{ backgroundColor: config.hairColor, opacity: 0.28 }} />
        <div className="absolute inset-x-[22%] top-[6%] h-[9%] rounded-full blur-xl mix-blend-multiply" style={{ backgroundColor: config.lipstickShade, opacity: 0.22 }} />
        <div className="absolute inset-x-0 top-[16%] h-[78%] blur-2xl mix-blend-multiply" style={{ backgroundColor: config.outfitColor, opacity: 0.22 }} />
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-obsidian/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
          Mon mannequin — rendu indicatif sur photo
        </p>
      </div>
    )
  }

  const longHair = /longue/i.test(config.hairLength) && !/mi-/i.test(config.hairLength)
  const midHair = /mi-longue/i.test(config.hairLength)
  const shortHair = !longHair && !midHair

  const sizesByBody: Record<string, { bust: number; waist: number; hip: number }> = {
    généreuse: { bust: 33, waist: 29, hip: 39 },
    athlétique: { bust: 25, waist: 19, hip: 27 },
    fine: { bust: 23, waist: 17, hip: 25 },
    moyenne: { bust: 28, waist: 22, hip: 32 },
  }
  const bodyKey = /généreuse/i.test(config.bodyType)
    ? 'généreuse'
    : /athlétique/i.test(config.bodyType)
      ? 'athlétique'
      : /fine/i.test(config.bodyType)
        ? 'fine'
        : 'moyenne'
  const { bust, waist, hip } = sizesByBody[bodyKey]

  const cx = 120
  const shoulderY = 128
  const bustY = 156
  const waistY = 196
  const hipY = 226
  const hemY = 276
  const kneeY = 322
  const ankleY = 372
  const footY = 388
  const shoulderW = bust * 0.98

  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-gradient-to-b from-secondary to-card', className)}>
      <svg viewBox="0 0 240 400" className="h-full w-full">
        {/* Ombre au sol */}
        <ellipse cx={cx} cy={footY - 2} rx="36" ry="6" fill="#000000" opacity="0.1" />

        {/* Cheveux — couche arrière (longs / mi-longs) */}
        {longHair && (
          <>
            <path
              d={`M${cx - 24} 58 Q${cx - 40} 140 ${cx - 30} 236 Q${cx - 27} 246 ${cx - 20} 244 Q${cx - 27} 150 ${cx - 14} 62 Z`}
              fill={config.hairColor}
            />
            <path
              d={`M${cx + 24} 58 Q${cx + 40} 140 ${cx + 30} 236 Q${cx + 27} 246 ${cx + 20} 244 Q${cx + 27} 150 ${cx + 14} 62 Z`}
              fill={config.hairColor}
            />
          </>
        )}
        {midHair && (
          <>
            <path
              d={`M${cx - 24} 58 Q${cx - 36} 108 ${cx - 28} 168 Q${cx - 25} 176 ${cx - 18} 174 Q${cx - 24} 116 ${cx - 13} 62 Z`}
              fill={config.hairColor}
            />
            <path
              d={`M${cx + 24} 58 Q${cx + 36} 108 ${cx + 28} 168 Q${cx + 25} 176 ${cx + 18} 174 Q${cx + 24} 116 ${cx + 13} 62 Z`}
              fill={config.hairColor}
            />
          </>
        )}

        {/* Jambes */}
        <path
          d={`M${cx - hip * 0.42} ${hemY - 4} Q${cx - hip * 0.4} ${(hemY + kneeY) / 2} ${cx - 11} ${kneeY} Q${cx - 10} ${(kneeY + ankleY) / 2} ${cx - 9} ${ankleY} L${cx - 2} ${ankleY} Q${cx - 3} ${(kneeY + ankleY) / 2} ${cx - 4} ${kneeY} Q${cx - 6} ${(hemY + kneeY) / 2} ${cx - 4} ${hemY - 4} Z`}
          fill={config.skinTone}
        />
        <path
          d={`M${cx + hip * 0.42} ${hemY - 4} Q${cx + hip * 0.4} ${(hemY + kneeY) / 2} ${cx + 11} ${kneeY} Q${cx + 10} ${(kneeY + ankleY) / 2} ${cx + 9} ${ankleY} L${cx + 2} ${ankleY} Q${cx + 3} ${(kneeY + ankleY) / 2} ${cx + 4} ${kneeY} Q${cx + 6} ${(hemY + kneeY) / 2} ${cx + 4} ${hemY - 4} Z`}
          fill={config.skinTone}
        />

        {/* Chaussures */}
        <path d={`M${cx - 11} ${ankleY} L${cx - 2} ${ankleY} L${cx - 2} ${footY} L${cx - 23} ${footY} Q${cx - 23} ${footY - 6} ${cx - 11} ${ankleY + 2} Z`} fill="#171310" />
        <path d={`M${cx + 11} ${ankleY} L${cx + 2} ${ankleY} L${cx + 2} ${footY} L${cx + 23} ${footY} Q${cx + 23} ${footY - 6} ${cx + 11} ${ankleY + 2} Z`} fill="#171310" />

        {/* Bras */}
        <path
          d={`M${cx - shoulderW * 0.92} ${shoulderY + 6} Q${cx - shoulderW * 1.18} ${shoulderY + 55} ${cx - shoulderW * 1.05} ${shoulderY + 108} Q${cx - shoulderW * 1.0} ${shoulderY + 132} ${cx - shoulderW * 0.82} ${shoulderY + 130} Q${cx - shoulderW * 0.92} ${shoulderY + 100} ${cx - shoulderW * 0.78} ${shoulderY + 52} Q${cx - shoulderW * 0.72} ${shoulderY + 20} ${cx - shoulderW * 0.6} ${shoulderY + 4} Z`}
          fill={config.skinTone}
        />
        <path
          d={`M${cx + shoulderW * 0.92} ${shoulderY + 6} Q${cx + shoulderW * 1.18} ${shoulderY + 55} ${cx + shoulderW * 1.05} ${shoulderY + 108} Q${cx + shoulderW * 1.0} ${shoulderY + 132} ${cx + shoulderW * 0.82} ${shoulderY + 130} Q${cx + shoulderW * 0.92} ${shoulderY + 100} ${cx + shoulderW * 0.78} ${shoulderY + 52} Q${cx + shoulderW * 0.72} ${shoulderY + 20} ${cx + shoulderW * 0.6} ${shoulderY + 4} Z`}
          fill={config.skinTone}
        />
        <ellipse cx={cx - shoulderW * 0.87} cy={shoulderY + 134} rx="6" ry="8" fill={config.skinTone} />
        <ellipse cx={cx + shoulderW * 0.87} cy={shoulderY + 134} rx="6" ry="8" fill={config.skinTone} />

        {/* Cou */}
        <path d={`M${cx - 8} 96 L${cx + 8} 96 L${cx + 10} 132 L${cx - 10} 132 Z`} fill={config.skinTone} />

        {/* Buste / tenue (silhouette avec encolure) */}
        <path
          d={`M${cx - 9} 108 Q${cx - shoulderW * 0.6} 112 ${cx - shoulderW * 0.95} ${shoulderY} Q${cx - bust * 1.02} ${bustY} ${cx - waist * 0.85} ${waistY} Q${cx - hip * 1.05} ${hipY} ${cx - hip * 0.92} ${hemY} Q${cx} ${hemY + 9} ${cx + hip * 0.92} ${hemY} Q${cx + hip * 1.05} ${hipY} ${cx + waist * 0.85} ${waistY} Q${cx + bust * 1.02} ${bustY} ${cx + shoulderW * 0.95} ${shoulderY} Q${cx + shoulderW * 0.6} 112 ${cx + 9} 108 Q${cx} 116 ${cx - 9} 108 Z`}
          fill={config.outfitColor}
        />

        {/* Visage */}
        <ellipse cx={cx} cy="70" rx="25" ry="29" fill={config.skinTone} />
        <ellipse cx={cx - 25} cy="72" rx="3.6" ry="6.5" fill={config.skinTone} />
        <ellipse cx={cx + 25} cy="72" rx="3.6" ry="6.5" fill={config.skinTone} />

        {/* Cheveux — calotte avant */}
        <path d={`M${cx - 26} 52 A 27 30 0 0 1 ${cx + 26} 52 Q${cx + 14} 42 ${cx} 44 Q${cx - 14} 42 ${cx - 26} 52 Z`} fill={config.hairColor} />
        {shortHair && (
          <path
            d={`M${cx - 26} 50 A 27 28 0 0 1 ${cx + 26} 50 L${cx + 24} 70 Q${cx + 16} 56 ${cx} 58 Q${cx - 16} 56 ${cx - 24} 70 Z`}
            fill={config.hairColor}
          />
        )}

        {/* Sourcils */}
        <path d={`M${cx - 19} 60 Q${cx - 11} 56 ${cx - 4} 59.5`} stroke={config.hairColor} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d={`M${cx + 4} 59.5 Q${cx + 11} 56 ${cx + 19} 60`} stroke={config.hairColor} strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Fard à paupières */}
        <ellipse cx={cx - 11} cy="65" rx="7.5" ry="3.6" fill={config.eyeshadowShade} opacity="0.65" />
        <ellipse cx={cx + 11} cy="65" rx="7.5" ry="3.6" fill={config.eyeshadowShade} opacity="0.65" />

        {/* Yeux */}
        <path d={`M${cx - 18} 68.5 Q${cx - 11} 65 ${cx - 4} 68.5 Q${cx - 11} 71.5 ${cx - 18} 68.5 Z`} fill="#fff" />
        <path d={`M${cx + 4} 68.5 Q${cx + 11} 65 ${cx + 18} 68.5 Q${cx + 11} 71.5 ${cx + 4} 68.5 Z`} fill="#fff" />
        <circle cx={cx - 10} cy="68.5" r="2.5" fill="#171310" />
        <circle cx={cx + 10} cy="68.5" r="2.5" fill="#171310" />
        {config.eyeliner && (
          <>
            <path d={`M${cx - 18} 68.5 Q${cx - 11} 64.6 ${cx - 4} 68.5`} stroke="#171310" strokeWidth="1.1" fill="none" />
            <path d={`M${cx + 4} 68.5 Q${cx + 11} 64.6 ${cx + 18} 68.5`} stroke="#171310" strokeWidth="1.1" fill="none" />
          </>
        )}
        {config.mascara && (
          <>
            <path d={`M${cx - 18} 68 l-2 -1.4`} stroke="#171310" strokeWidth="0.9" strokeLinecap="round" />
            <path d={`M${cx + 18} 68 l2 -1.4`} stroke="#171310" strokeWidth="0.9" strokeLinecap="round" />
          </>
        )}

        {/* Nez */}
        <path d={`M${cx - 1.8} 71 Q${cx - 3} 79 ${cx} 81.5 Q${cx + 3} 79 ${cx + 1.8} 71`} stroke="rgba(0,0,0,0.16)" strokeWidth="1.1" fill="none" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx={cx - 15.5} cy="80" rx="6" ry="4" fill={config.blushShade} opacity="0.4" />
        <ellipse cx={cx + 15.5} cy="80" rx="6" ry="4" fill={config.blushShade} opacity="0.4" />

        {/* Lèvres */}
        <path d={`M${cx - 8} 92.5 Q${cx} 90 ${cx + 8} 92.5 Q${cx} 98 ${cx - 8} 92.5 Z`} fill={config.lipstickShade} />
      </svg>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-obsidian/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
        Mannequin KÔSMÉA — aperçu illustré
      </p>
    </div>
  )
}
