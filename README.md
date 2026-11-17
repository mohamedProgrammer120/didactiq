# Didactiq

**Plateforme pédagogique pour l'enseignement explicite** (primaire marocain — niveaux 1AEF à 6AEF).

Clone clean-room inspiré des pratiques de diffusion de séances, cartes mentales didactiques et mode hors-ligne.

## Fonctionnalités (vertical slice)

- Profil enseignant (niveau + pôle FR/AR)
- Catalogue de séances par jour avec priorisation
- Mode **Cockpit** (diffusion plein écran)
- Génération de **carte mentale** via gabarit local (4 phases : Ouverture → Modélisation → Pratique → Clôture)
- Thème clair / sombre
- Bilingue FR / AR (base RTL)
- PWA ready
- Auth magic-link (Supabase)
- Schéma Postgres + RLS prêt

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + design tokens
- **Supabase** (Auth + Postgres + Storage + Realtime)
- **Lucide** icons

## Démarrage rapide

```bash
# 1. Cloner
git clone https://github.com/mohamedProgrammer120/didactiq.git
cd didactiq

# 2. Installer
npm install

# 3. Variables d'environnement
cp .env.example .env.local
# Remplir NEXT_PUBLIC_SUPABASE_URL et les clés (optionnel pour le mode local)

# 4. Lancer
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

> Sans Supabase configuré, l'app fonctionne en mode local (seed + localStorage).

## Structure

```
app/                  # Pages & layout
components/           # UI (Topbar, SessionCard, Cockpit, MindMapModal…)
data/                 # Seed de démonstration
lib/
  db/                 # Accès données Supabase
  supabase/           # Clients auth
  mindmap.ts          # Gabarit didactique 4 phases
  profile.ts          # Profil local
supabase/
  migrations/         # Schéma SQL + RLS
  seed.sql
```

## Licence

MIT — code original, aucun code ni asset de la plateforme source n'a été copié.
