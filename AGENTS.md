# AGENTS.md

## Project Overview

**LoL Team Builder** — a React webapp to build blue/red League of Legends teams and quickly visualize each champion's spells (Q/W/E/R). Data is pulled from Riot's public **Data Dragon** API (locale `es_MX`), and the app is deployed to GitHub Pages.

## Tech Stack

- React 19 + Vite 7, plain JS/JSX (no TypeScript)
- pnpm (v11) + Node 22
- ESLint (react-hooks + react-refresh)

## Commands

```bash
pnpm install    # install dependencies
pnpm dev        # start dev server
pnpm build      # production build to dist/
pnpm lint       # run ESLint
pnpm preview    # preview the production build
```

## Project Structure

- `src/App.jsx` — root component; orchestrates hooks, state, and layout.
- `src/hooks/` — one hook per concern: `useTeamsLogic`, `useAddChamp`, `useSearch`, `useSettings`, `useLoading`, `useModal`, `useApiEndpoints`, `useGetChamps`.
- `src/components/<Name>/` — one folder per component with an `index.jsx` and a colocated `<Name>.css`.
- `src/utils/` — pure helpers: `findChamps`, `checkNoRepeatData`, `getApiEndpoints`.
- `src/constants.js` — `TEAM_TYPES` (`BLUE` / `RED`).
- `.github/workflows/deploy.yml` — CI/CD that builds and deploys to GitHub Pages.

## Key Conventions

- **Language:** UI text is in Spanish; write commit messages in Spanish with prefixes like `FIX.`, `REFACTOR.`, `CHANGE.`, `HOTFIX.`.
- **Components:** functional components only, named exports, one folder per component with colocated CSS.
- **State:** use custom hooks (no state library). Settings are persisted to `localStorage` under key `lol-champ-settings`.
- **Styling:** plain CSS (no framework), per-component CSS files, CSS variables in `src/index.css` (`--color-red-bg`, `--color-blue-bg`, `--panel-size`), and `/* MARK: */` section comments in `src/App.css`.
- **Vite base:** `/LoL-Team-Champs-view/` — required for GitHub Pages; do not change.
- **Business rules:** max 5 champions per team; no repeated champion within a team; champ ids starting with `Jade_` are the "LoL Classic" filter (`settings.jadeOnly`).
- **Tests:** none exist. Verify changes with `pnpm lint` and `pnpm build`.
