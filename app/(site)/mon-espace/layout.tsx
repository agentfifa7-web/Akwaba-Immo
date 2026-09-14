// Cet environnement ne permet pas de supprimer des fichiers. Cette route a été
// remplacée par /mon-kosmea (voir app/(site)/mon-kosmea). Ce segment n'a plus
// aucune page enfant et ne génère donc plus aucune route accessible.
export default function DeprecatedMonEspaceLayout({ children }: { children: React.ReactNode }) {
  return children
}
