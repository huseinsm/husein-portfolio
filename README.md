# Husein Sidharta Muhammad — Portfolio

Personal portfolio built with Next.js (App Router) and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Structure

```
src/
├── app/                 # layout, page, global styles
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, About, Skills, Research, Projects, Contact
│   └── ui/              # Reveal, SectionHeading, NeuralBackground, Icons
├── data/                # ← edit content here
│   ├── profile.ts       # name, bio, stats, contact links
│   ├── skills.ts
│   ├── research.ts      # ongoing research (pipeline, role, metric)
│   └── projects.ts      # project list; add description/tags/href when ready
└── lib/types.ts
```

All content lives in `src/data/`, so updating the site rarely requires touching components.
