import { redirect } from 'next/navigation'

// Ancienne route (projets immobiliers) conservée uniquement pour rediriger :
// cet environnement ne permet pas de supprimer des fichiers.
export default function Redirect() {
  redirect('/admin/promotions')
}
