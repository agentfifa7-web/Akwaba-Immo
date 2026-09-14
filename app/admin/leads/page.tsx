import { redirect } from 'next/navigation'

// Ancienne route (leads immobiliers) conservée uniquement pour rediriger :
// cet environnement ne permet pas de supprimer des fichiers.
export default function Redirect() {
  redirect('/admin/commandes')
}
