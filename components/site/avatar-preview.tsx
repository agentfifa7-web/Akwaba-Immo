import type { AvatarConfig } from '@/lib/store'
import { cn } from '@/lib/utils'

/**
 * Aperçu du mannequin.
 *
 * Deux modes :
 * - "photo" : la propre photo tête-aux-pieds de l'utilisateur, avec des
 *   superpositions de couleur en fondu (maquillage, coiffure, tenue).
 * - "mannequin" (par défaut) : une silhouette illustrée entière, dessinée
 *   directement à partir de la teinte choisie dans la palette KÔSMÉA — donc
 *   toujours fidèlement représentative, sans dépendre d'une photo tierce
 *   dont nous ne maîtrisons pas le contenu.
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
  const hipWidth = /généreuse/i.test(config.bodyType) ? 96 : /athlétique/i.test(config.bodyType) ? 78 : /fine/i.test(config.bodyType) ? 74 : 84

  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-gradient-to-b from-secondary to-card', className)}>
      <svg viewBox="0 0 240 340" className="h-full w-full">
        {/* Ombre au sol */}
        <ellipse cx="120" cy="328" rx="52" ry="7" fill="#000000" opacity="0.08" />

        {/* Cheveux — couche arrière (longs) */}
        {longHair && (
          <path d="M88 78 Q78 160 92 230 L104 230 Q94 150 98 82 Z" fill={config.hairColor} />
        )}
        {longHair && (
          <path d="M152 78 Q162 160 148 230 L136 230 Q146 150 142 82 Z" fill={config.hairColor} />
        )}

        {/* Jambes */}
        <path d="M100 216 Q96 260 98 318 L112 318 Q112 260 114 216 Z" fill={config.skinTone} />
        <path d="M140 216 Q144 260 142 318 L128 318 Q128 260 126 216 Z" fill={config.skinTone} />

        {/* Chaussures */}
        <ellipse cx="105" cy="322" rx="15" ry="7" fill="#171310" />
        <ellipse cx="135" cy="322" rx="15" ry="7" fill="#171310" />

        {/* Bras */}
        <path d="M76 140 Q64 175 70 210 Q72 216 80 214 Q76 178 88 145 Z" fill={config.skinTone} />
        <path d="M164 140 Q176 175 170 210 Q168 216 160 214 Q164 178 152 145 Z" fill={config.skinTone} />

        {/* Tenue (silhouette robe/ensemble) */}
        <path
          d={`M${120 - hipWidth * 0.42} 138 Q${120 - hipWidth * 0.5} 175 ${120 - hipWidth * 0.5} 216 Q120 226 ${120 + hipWidth * 0.5} 216 Q${120 + hipWidth * 0.5} 175 ${120 + hipWidth * 0.42} 138 Q120 148 ${120 - hipWidth * 0.42} 138 Z`}
          fill={config.outfitColor}
        />

        {/* Cou */}
        <rect x="108" y="106" width="24" height="26" rx="6" fill={config.skinTone} />

        {/* Cheveux — couche arrière (mi-longs) */}
        {midHair && <path d="M92 80 Q84 130 94 168 L106 168 Q98 128 100 84 Z" fill={config.hairColor} />}
        {midHair && <path d="M148 80 Q156 130 146 168 L134 168 Q142 128 140 84 Z" fill={config.hairColor} />}

        {/* Visage */}
        <ellipse cx="120" cy="76" rx="38" ry="42" fill={config.skinTone} />

        {/* Fard à paupières */}
        <path d="M96 68 Q108 60 118 66" stroke={config.eyeshadowShade} strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.75" />
        <path d="M122 66 Q132 60 144 68" stroke={config.eyeshadowShade} strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.75" />

        {/* Sourcils */}
        <path d="M97 58 Q108 52 119 57" stroke={config.hairColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M121 57 Q132 52 143 58" stroke={config.hairColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Yeux */}
        <ellipse cx="107" cy="74" rx="4.5" ry="3.2" fill="#171310" />
        <ellipse cx="133" cy="74" rx="4.5" ry="3.2" fill="#171310" />

        {/* Cils */}
        {config.mascara && <path d="M102 71 l-2.5 -2M107 70 l0 -3M113 71 l2.5 -2" stroke="#171310" strokeWidth="1.2" strokeLinecap="round" />}
        {config.mascara && <path d="M127 71 l-2.5 -2M133 70 l0 -3M139 71 l2.5 -2" stroke="#171310" strokeWidth="1.2" strokeLinecap="round" />}

        {/* Eyeliner */}
        {config.eyeliner && <path d="M102 75 Q107 71 112 75" stroke="#171310" strokeWidth="1.4" fill="none" />}
        {config.eyeliner && <path d="M128 75 Q133 71 138 75" stroke="#171310" strokeWidth="1.4" fill="none" />}

        {/* Blush */}
        <ellipse cx="98" cy="88" rx="9" ry="6" fill={config.blushShade} opacity="0.5" />
        <ellipse cx="142" cy="88" rx="9" ry="6" fill={config.blushShade} opacity="0.5" />

        {/* Lèvres */}
        <path d="M108 104 Q120 112 132 104 Q120 110 108 104 Z" fill={config.lipstickShade} />

        {/* Cheveux — couche avant (toutes longueurs) */}
        <path
          d={
            longHair
              ? 'M80 76 Q76 32 120 24 Q164 32 160 76 Q158 50 120 46 Q82 50 80 76 Z'
              : midHair
                ? 'M82 78 Q78 34 120 26 Q162 34 158 78 Q156 52 120 48 Q84 52 82 78 Z'
                : 'M78 82 Q70 30 120 22 Q170 30 162 82 Q166 56 120 44 Q74 56 78 82 Z'
          }
          fill={config.hairColor}
        />
      </svg>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-obsidian/80 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
        Mannequin KÔSMÉA — aperçu illustré
      </p>
    </div>
  )
}
