'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

import { PageHeader } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type TabKey = 'utilisateurs' | 'seo' | 'reseaux' | 'formulaires' | 'general'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'general', label: 'Général' },
  { key: 'utilisateurs', label: 'Utilisateurs & rôles' },
  { key: 'seo', label: 'SEO' },
  { key: 'reseaux', label: 'Réseaux sociaux' },
  { key: 'formulaires', label: 'Formulaires' },
]

const roles = [
  { name: 'Administrateur', permissions: { catalogue: true, crm: true, contenu: true, systeme: true } },
  { name: 'Commercial', permissions: { catalogue: true, crm: true, contenu: false, systeme: false } },
  { name: 'Gestion', permissions: { catalogue: false, crm: true, contenu: false, systeme: false } },
  { name: 'Juridique', permissions: { catalogue: false, crm: false, contenu: true, systeme: false } },
]

const permissionColumns: { key: keyof (typeof roles)[number]['permissions']; label: string }[] = [
  { key: 'catalogue', label: 'Catalogue' },
  { key: 'crm', label: 'CRM' },
  { key: 'contenu', label: 'Contenu' },
  { key: 'systeme', label: 'Système' },
]

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-4 border border-border bg-card px-4 py-3 text-left"
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className={cn('relative h-5 w-9 shrink-0 transition-colors', checked ? 'bg-primary' : 'bg-muted')}>
        <span className={cn('absolute top-0.5 size-4 bg-white transition-transform', checked ? 'translate-x-[18px]' : 'translate-x-0.5')} />
      </span>
    </button>
  )
}

export default function AdminParametresPage() {
  const [tab, setTab] = useState<TabKey>('general')

  const [general, setGeneral] = useState({
    siteName: 'AKWABA IMMOBILIER',
    email: 'contact@akwaba-immobilier.ci',
    phone: '+225 27 22 00 00 00',
  })

  const [seo, setSeo] = useState({
    title: 'AKWABA IMMOBILIER — L’immobilier qui fait avancer votre vie',
    description:
      'Plateforme immobilière premium en Côte d’Ivoire : achat, location, terrains, projets, investissement, construction et gestion immobilière.',
  })

  const [social, setSocial] = useState({
    facebook: 'https://facebook.com/akwabaimmobilier',
    instagram: 'https://instagram.com/akwabaimmobilier',
    linkedin: 'https://linkedin.com/company/akwaba-immobilier',
    youtube: 'https://youtube.com/@akwabaimmobilier',
  })

  const [forms, setForms] = useState({
    achat: true,
    location: true,
    estimation: true,
    terrain: true,
    construction: true,
    investissement: true,
    gestion: true,
    contact: true,
  })

  const [permissions, setPermissions] = useState(roles)
  const [saved, setSaved] = useState(false)

  function togglePermission(roleIndex: number, key: string) {
    setPermissions((prev) =>
      prev.map((r, i) => (i === roleIndex ? { ...r, permissions: { ...r.permissions, [key]: !r.permissions[key as keyof typeof r.permissions] } } : r)),
    )
  }

  function handleSaveNotice() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader
        title="Paramètres"
        description="Configuration générale du back-office AKWABA ADMIN (aperçu — non persisté)."
      />

      <div className="mb-6 flex flex-wrap gap-2 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors',
              tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'general' ? (
        <div className="max-w-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Informations générales</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="siteName">Nom du site</Label>
              <Input id="siteName" value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="genEmail">Email de contact</Label>
              <Input id="genEmail" type="email" value={general.email} onChange={(e) => setGeneral({ ...general, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="genPhone">Téléphone</Label>
              <Input id="genPhone" value={general.phone} onChange={(e) => setGeneral({ ...general, phone: e.target.value })} />
            </div>
          </div>
        </div>
      ) : null}

      {tab === 'utilisateurs' ? (
        <div className="border border-border bg-card p-6">
          <h2 className="mb-1 font-serif text-lg font-semibold text-foreground">Utilisateurs & rôles</h2>
          <p className="mb-4 text-sm text-muted-foreground">Matrice de permissions par rôle interne (aperçu, non persisté).</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-border px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Rôle
                  </th>
                  {permissionColumns.map((c) => (
                    <th key={c.key} className="border-b border-border px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((role, i) => (
                  <tr key={role.name}>
                    <td className="border-b border-border px-3 py-3 text-sm font-medium text-foreground">{role.name}</td>
                    {permissionColumns.map((c) => (
                      <td key={c.key} className="border-b border-border px-3 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={role.permissions[c.key]}
                          onChange={() => togglePermission(i, c.key)}
                          className="size-4 accent-primary"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {tab === 'seo' ? (
        <div className="max-w-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Référencement (SEO)</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="seoTitle">Titre par défaut</Label>
              <Input id="seoTitle" value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="seoDesc">Meta description</Label>
              <textarea
                id="seoDesc"
                value={seo.description}
                onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                className="flex min-h-28 w-full border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-primary"
              />
            </div>
          </div>
        </div>
      ) : null}

      {tab === 'reseaux' ? (
        <div className="max-w-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Réseaux sociaux</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" value={social.linkedin} onChange={(e) => setSocial({ ...social, linkedin: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="youtube">YouTube</Label>
              <Input id="youtube" value={social.youtube} onChange={(e) => setSocial({ ...social, youtube: e.target.value })} />
            </div>
          </div>
        </div>
      ) : null}

      {tab === 'formulaires' ? (
        <div className="max-w-2xl">
          <h2 className="mb-1 font-serif text-lg font-semibold text-foreground">Formulaires actifs</h2>
          <p className="mb-4 text-sm text-muted-foreground">Activez ou désactivez les types de demandes acceptés depuis le site public.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Toggle checked={forms.achat} onChange={(v) => setForms({ ...forms, achat: v })} label="Demande d’achat" />
            <Toggle checked={forms.location} onChange={(v) => setForms({ ...forms, location: v })} label="Demande de location" />
            <Toggle checked={forms.estimation} onChange={(v) => setForms({ ...forms, estimation: v })} label="Demande d’estimation" />
            <Toggle checked={forms.terrain} onChange={(v) => setForms({ ...forms, terrain: v })} label="Demande foncière" />
            <Toggle checked={forms.construction} onChange={(v) => setForms({ ...forms, construction: v })} label="Projet de construction" />
            <Toggle checked={forms.investissement} onChange={(v) => setForms({ ...forms, investissement: v })} label="Demande d’investissement" />
            <Toggle checked={forms.gestion} onChange={(v) => setForms({ ...forms, gestion: v })} label="Gestion immobilière" />
            <Toggle checked={forms.contact} onChange={(v) => setForms({ ...forms, contact: v })} label="Formulaire de contact général" />
          </div>
        </div>
      ) : null}

      <Separator className="my-8" />

      <div className="flex items-center gap-3">
        <Button onClick={handleSaveNotice}>Enregistrer les modifications</Button>
        {saved ? (
          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <Check className="size-4" /> Modifications enregistrées
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Aperçu d’interface — ces réglages ne sont pas persistés.</span>
        )}
      </div>
    </div>
  )
}
