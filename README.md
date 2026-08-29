# College Union Platform — Team Ready

```text
college-union-platform/
├── frontend/      # Shared React/Vite app for all teams
├── backend/       # Shared Supabase backend + Edge Function starters
├── contracts/     # Shared API contracts for all modules
├── docs/          # Team workflow and assignment rules
└── README.md      # Project overview
```

## Team model
This project is designed for multiple students to work in parallel on separate feature pages without building disconnected apps.

- One shared frontend app
- One shared backend project
- Each student or team owns one feature area
- Each feature has a clear page, API contract, and backend responsibility
- Shared-routing, layouts, and core UI stay under central ownership

## Frontend ownership
Students work inside `frontend/src/features/<module>/`.
Examples:
- `home`
- `events`
- `grievances`
- `blood-bank`
- `academics`
- `notifications`
- `profile`
- `admin`

## Backend ownership
Backend work happens inside `backend/supabase/` and follows the contracts in `contracts/API_CONTRACT.md`.
Each feature team must keep its API shape consistent with the documented contract.

## Core team responsibilities
The core/integration team owns:
- App shell and routing
- shared layouts and shared UI components
- environment variables
- API contract versioning
- merge review for cross-feature changes

## Workflow
1. Pick a feature folder and corresponding contract.
2. Create or work on your own feature branch.
3. Build only your module page and API use cases.
4. Keep a clear interface contract with the backend.
5. Submit a PR only after your feature is tested in the shared app.

## Run frontend
```powershell
cd frontend
npm install
npm run dev
```

## Important
The frontend is demo-only until the real backend is connected. The backend starter should be treated as a shared service layer, not as isolated student projects.
