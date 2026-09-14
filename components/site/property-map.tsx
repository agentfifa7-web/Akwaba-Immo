'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap, LayerGroup } from 'leaflet'

export interface MapPin {
  id: string
  lat: number
  lng: number
  title: string
  subtitle: string
  price?: string
  href: string
  kind: 'property' | 'project' | 'agency'
  badge?: string
}

/** Centre géographique approximatif de la Côte d'Ivoire. */
export const CI_CENTER: [number, number] = [7.54, -5.55]
export const CI_DEFAULT_ZOOM = 7

const PRIMARY = '#b3261e'
const GRAPHITE = '#241f1a'

function popupHtml(pin: MapPin) {
  const kindLabel = pin.badge ?? (pin.kind === 'project' ? 'Projet' : pin.kind === 'agency' ? 'Agence' : 'Bien')
  return `
    <div style="min-width:190px;font-family:Inter,ui-sans-serif,sans-serif">
      <p style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:${PRIMARY};font-weight:700;margin:0 0 4px">${kindLabel}</p>
      <p style="font-family:Georgia,'Playfair Display',serif;font-size:15px;margin:0 0 2px;color:#1a1512;line-height:1.3">${pin.title}</p>
      <p style="font-size:12px;color:#726a60;margin:0 0 8px">${pin.subtitle}</p>
      ${pin.price ? `<p style="font-size:13px;font-weight:700;color:${PRIMARY};margin:0 0 8px">${pin.price}</p>` : ''}
      <a href="${pin.href}" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${PRIMARY};text-decoration:underline">Voir la fiche →</a>
    </div>
  `
}

/**
 * Carte interactive (Leaflet + fonds OpenStreetMap, sans clé API) couvrant
 * toute la Côte d'Ivoire. Chargée uniquement côté client.
 */
export function PropertyMap({
  pins,
  center,
  zoom = CI_DEFAULT_ZOOM,
  height = '520px',
  className,
  fitToPins = true,
}: {
  pins: MapPin[]
  center?: [number, number]
  zoom?: number
  height?: string
  className?: string
  fitToPins?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const layerRef = useRef<LayerGroup | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !containerRef.current || mapRef.current) return
      const map = L.map(containerRef.current, { scrollWheelZoom: true, zoomControl: true })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      }).addTo(map)
      map.setView(center ?? CI_CENTER, zoom)
      layerRef.current = L.layerGroup().addTo(map)
      mapRef.current = map
      setLoaded(true)
      requestAnimationFrame(() => map.invalidateSize())
    })()
    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      layerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loaded || !mapRef.current || !layerRef.current) return
    ;(async () => {
      const L = (await import('leaflet')).default
      const layer = layerRef.current!
      layer.clearLayers()

      const icon = (kind: MapPin['kind']) =>
        L.divIcon({
          className: '',
          html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 4px;transform:rotate(-45deg);background:${
            kind === 'project' ? GRAPHITE : PRIMARY
          };border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35)"></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -28],
        })

      const bounds: [number, number][] = []
      pins.forEach((pin) => {
        const marker = L.marker([pin.lat, pin.lng], { icon: icon(pin.kind) })
        marker.bindPopup(popupHtml(pin), { closeButton: true, maxWidth: 240 })
        marker.addTo(layer)
        bounds.push([pin.lat, pin.lng])
      })

      if (fitToPins && bounds.length === 1) {
        mapRef.current!.setView(bounds[0], Math.max(zoom, 14))
      } else if (fitToPins && bounds.length > 1) {
        mapRef.current!.fitBounds(bounds, { padding: [48, 48] })
      } else if (center) {
        mapRef.current!.setView(center, zoom)
      } else {
        mapRef.current!.setView(CI_CENTER, zoom)
      }
    })()
  }, [pins, loaded, fitToPins, center, zoom])

  return (
    <div className={`relative overflow-hidden rounded-xl border border-border ${className ?? ''}`} style={{ height }}>
      <div ref={containerRef} className="absolute inset-0" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-xs uppercase tracking-wider text-muted-foreground">
          Chargement de la carte…
        </div>
      )}
    </div>
  )
}
