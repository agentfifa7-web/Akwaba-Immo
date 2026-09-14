import { Sparkles, Wand2, MessageSquareText } from 'lucide-react'

import { PageHeader, StatCard } from '@/components/admin/ui'

export default function AdminAiPage() {
  return (
    <div>
      <PageHeader title="IA & Essayage" description="Supervision des services d’intelligence artificielle et de la couche Virtual Try-On." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Conversations KÔSMÉA AI" value="4 218" hint="30 derniers jours" icon={MessageSquareText} />
        <StatCard label="Essayages virtuels" value="9 640" hint="Maquillage, mode, coiffure" icon={Sparkles} />
        <StatCard label="Looks générés" value="2 305" hint="Create My Look + AI Stylist" icon={Wand2} />
      </div>

      <div className="mt-8 border border-border bg-card p-6">
        <h2 className="font-serif text-lg font-semibold">Architecture des services IA</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Chaque fonctionnalité IA repose sur une interface de service dédiée (AIStylistService,
          MakeupRecommendationService, ColorRecommendationService, FashionRecommendationService,
          VirtualTryOnService, AIChatService) afin de pouvoir remplacer le moteur sous-jacent sans modifier
          l’application. La version actuelle utilise un moteur local basé sur des règles, qui ne recommande que des
          produits réellement présents dans le catalogue.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• AIStylistService — composition de looks (lib/assistant.ts)</li>
          <li>• MakeupRecommendationService / ColorRecommendationService — Color Lab, Makeup Studio</li>
          <li>• VirtualTryOnService — Try-On Hub (état simulation clairement affiché)</li>
          <li>• AIChatService — Assistant conversationnel (/assistant)</li>
        </ul>
      </div>
    </div>
  )
}
