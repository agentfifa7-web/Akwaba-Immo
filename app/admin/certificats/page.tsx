'use client'

import { useState } from 'react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, ExternalLink, Plus, Printer, ShieldCheck, Trash2 } from 'lucide-react'

import { getProductBySlug, products } from '@/lib/data'
import { useAdminCollection } from '@/lib/store'
import { certificateUrl, defaultThankYou, generateCertificateCode, type Certificate } from '@/lib/certificates'
import { EmptyState, PageHeader } from '@/components/admin/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const eligibleProducts = products.filter((p) => p.subcategory === 'Sacs' || p.subcategory === 'Chaussures' || p.category === 'mode')

function siteOrigin() {
  if (typeof window === 'undefined') return ''
  return window.location.origin
}

export default function AdminCertificatesPage() {
  const { items, add, remove, hydrated } = useAdminCollection<Certificate>('certificats', [])
  const [productId, setProductId] = useState(eligibleProducts[0]?.id ?? '')
  const [customerFirstName, setCustomerFirstName] = useState('')
  const [customerLastName, setCustomerLastName] = useState('')
  const [message, setMessage] = useState('')
  const [thankYou, setThankYou] = useState(defaultThankYou)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function createCertificate() {
    if (!productId || !customerFirstName || !customerLastName) return
    add({
      id: `cert-${Date.now()}`,
      code: generateCertificateCode(),
      productId,
      customerFirstName,
      customerLastName,
      message,
      thankYou: thankYou || defaultThankYou,
      issuedAt: new Date().toISOString(),
    })
    setCustomerFirstName('')
    setCustomerLastName('')
    setMessage('')
  }

  function copyLink(cert: Certificate) {
    const url = `${siteOrigin()}${certificateUrl(cert.code)}`
    navigator.clipboard?.writeText(url)
    setCopiedId(cert.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  function printCertificate(cert: Certificate) {
    const url = `${siteOrigin()}${certificateUrl(cert.code)}?print=1`
    window.open(url, '_blank')
  }

  return (
    <div>
      <PageHeader
        title="Certificats d'authenticité"
        description="Générez un QR code unique à imprimer sur un produit physique (sac, chaussure…). Le client scanne et retrouve sa dédicace personnalisée."
      />

      <div className="mb-10 grid gap-6 border border-border bg-card p-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <div>
            <Label>Produit concerné</Label>
            <Select value={productId} onChange={(e) => setProductId(e.target.value)}>
              {eligibleProducts.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Prénom du client</Label>
              <Input value={customerFirstName} onChange={(e) => setCustomerFirstName(e.target.value)} placeholder="Aïcha" />
            </div>
            <div>
              <Label>Nom du client</Label>
              <Input value={customerLastName} onChange={(e) => setCustomerLastName(e.target.value)} placeholder="Koné" />
            </div>
          </div>
          <div>
            <Label>Message personnalisé</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ce sac a été confectionné et sélectionné spécialement pour vous…"
              rows={3}
            />
          </div>
          <div>
            <Label>Mot de remerciement</Label>
            <Textarea value={thankYou} onChange={(e) => setThankYou(e.target.value)} rows={2} />
          </div>
          <Button className="gap-2" onClick={createCertificate} disabled={!productId || !customerFirstName || !customerLastName}>
            <Plus className="size-4" /> Générer le certificat & QR code
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-border p-6 text-center">
          <ShieldCheck className="size-8 text-accent" />
          <p className="text-sm text-muted-foreground">
            Chaque certificat obtient un code unique (ex. <span className="font-mono text-foreground">KSM-7F3K-QW2M</span>) et une page
            publique <span className="font-mono text-foreground">/certificat/[code]</span>. Imprimez le QR code généré et apposez-le sur
            l’étiquette, la doublure ou la semelle intérieure du produit.
          </p>
        </div>
      </div>

      {!hydrated ? (
        <EmptyState />
      ) : items.length === 0 ? (
        <EmptyState label="Aucun certificat généré pour le moment." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cert) => {
            const product = products.find((p) => p.id === cert.productId) ?? getProductBySlug(cert.productId)
            return (
              <div key={cert.id} className="flex flex-col gap-4 border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-accent">{cert.code}</p>
                    <p className="mt-1 font-serif text-lg leading-tight">{product?.name ?? 'Produit'}</p>
                    <p className="text-xs text-muted-foreground">
                      Pour {cert.customerFirstName} {cert.customerLastName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(cert.id, false)}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Supprimer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="flex justify-center rounded-lg bg-white p-4">
                  <QRCodeSVG value={`${siteOrigin()}${certificateUrl(cert.code)}`} size={140} level="M" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="flex-1 gap-1.5 text-xs" onClick={() => copyLink(cert)}>
                    <Copy className="size-3.5" /> {copiedId === cert.id ? 'Copié ✓' : 'Copier le lien'}
                  </Button>
                  <Button variant="outline" className="flex-1 gap-1.5 text-xs" onClick={() => printCertificate(cert)}>
                    <Printer className="size-3.5" /> Imprimer
                  </Button>
                  <Link
                    href={certificateUrl(cert.code)}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:border-primary"
                  >
                    <ExternalLink className="size-3.5" /> Voir
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
