import { redirect } from 'next/navigation'

// Ancienne route (terrains) conservée uniquement pour rediriger :
// cet environnement ne permet pas de supprimer des fichiers.
export default function Redirect() {
  redirect('/admin/ia')
}
