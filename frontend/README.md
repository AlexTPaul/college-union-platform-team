# College Union Platform — Modular Demo

This is the refactored **frontend-only demo** of the College Union Digital Platform.

## Purpose

This structure is designed for parallel student development. Each team owns a feature folder rather than editing one giant `main.jsx`.

## Main structure

```text
college-union-platform/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── routes.jsx
│   ├── layouts/
│   ├── components/
│   ├── features/
│   ├── services/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   ├── data/demo/
│   └── styles/
├── supabase/
├── docs/
├── tests/
└── package.json
```

## Run

```bash
npm install
npm run dev
```

## Team branches

- `feature/home`
- `feature/events-announcements`
- `feature/grievances`
- `feature/blood-bank`
- `feature/academics`
- `feature/academic-maintainer`
- `feature/student-welfare`
- `feature/emergency`
- `feature/magazine`
- `feature/university-map`
- `feature/notifications`
- `feature/auth-profile`
- `feature/admin`
- `feature/qa-integration`

## Important rule

A team should normally modify only its `src/features/<module>/` folder and shared components when necessary. Do not put module UI into `main.jsx`.

## Demo limitation

The demo has no real backend, authentication, database, storage or push notifications. Existing buttons demonstrate UI behavior only.

The next production step is to connect the services in `src/services/` and the data model to Supabase.


## Demo media
Any poster/cover/media area is represented by an explicit text placeholder. No external image files or URLs are required for the demo.


## Blank-screen fix
Shared JSX UI components explicitly import React for the classic JSX runtime: `Stat.jsx`, `Card.jsx`, `PageHead.jsx`, and `MediaPlaceholder.jsx`.
