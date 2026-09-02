# TechTO: Toronto planning decision support

> "the Claude Code of city planning"

TechTO is an AI decision-support workspace for City of Toronto planning. It
combines a conversational agent, an interactive MapLibre city view, a versioned
city twin, and a population-opinion simulator. Planners can explore Toronto,
compare interventions, update the map, and examine a simulated distribution of
day-one resident acceptance. `/` is the landing page, and `/city` is the
planning workspace.

## Claude on Backboard

Claude is TechTO's planning brain. Backboard provides the live cloud runtime for
assistants, conversation threads, tools, specialists, and streaming. The current
Backboard model is Anthropic's Claude Fable 5 (`claude-fable-5`). Model selection
is capability-based at runtime, with Anthropic first in the provider preference
order.

The Planning Orchestrator works like a coding agent over a city twin. It can
answer directly, use general tools to query, patch, snapshot, analyze, and diff
Toronto data, or call planning, equity, feasibility, citizen-response, evidence,
and review specialists. It returns concise recommendations and map actions, not
a scripted report. Individual answers and complete conversations can be exported
as print-ready PDFs.

## Models and cloud services

TechTO keeps planning reasoning and population simulation separate:

| Layer | Model or service | Responsibility |
| --- | --- | --- |
| Planning agent | Claude Fable 5 through Backboard | Reasons about the request, selects tools, coordinates specialists, and explains recommendations. |
| Population opinion model | Fine-tuned Qwen3.5-9B LoRA through FreeSolo Flash and Modal | Writes first-person opinions for sampled resident personas and supports the day-one acceptance distribution. |
| Shared data | MongoDB Atlas, optional | Stores resident personas and, when `TECHTO_REPOSITORY_PROVIDER=mongo`, shared transit data. Local fixtures remain available for development and tests. |
| Map tiles | OpenFreeMap by default | Supplies the configurable MapLibre basemap. |

## Interpretation limits

TechTO estimates simulated day-one acceptance, not real public opinion or public
consultation. It does not predict ridership, emissions, congestion, land value,
or financial returns unless those outcomes are supplied by separate validated
models and evidence. Acceptance is presented as a distribution with uncertainty,
not as a single authoritative forecast.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`, then enter the planning workspace at `/city`.
Configure only the services needed for the surface you are running:

- `BACKBOARD_API_KEY` enables live Claude planning through Backboard. There is
  no mock Backboard adapter.
- `FREESOLO_API_KEY`, `FREESOLO_BASE_URL`, and
  `TECHTO_OPINION_MODEL_ALIAS` enable live resident-opinion inference.
- `TECHTO_REPOSITORY_PROVIDER=fixture|mongo` selects local fixtures or MongoDB
  Atlas. Use `mongo` for shared environments after running the Mongo bootstrap.
- `NEXT_PUBLIC_MAP_STYLE_URL` optionally overrides the OpenFreeMap style.

Keep Backboard, FreeSolo, and MongoDB credentials server-side. Never expose them
through a `NEXT_PUBLIC_` variable.

## Data

- Neighbourhood boundaries and profile indicators cover all 158 City of
  Toronto neighbourhoods using 2021 Census data.
- Subway, LRT, streetcar, and bus geometry is prepared from official TTC GTFS.
- The web app prefers resident personas from MongoDB and uses local synthetic
  display fixtures when that repository is unavailable.
- Population research inputs and preparation code live under `data/`,
  `population/`, and `scripts/data/`. Generated map inputs live under
  `public/data/`.

See [AGENTS.md](AGENTS.md) for modeling boundaries, data provenance, and the
distinction between the research population pipeline and web fixtures.

## Commands

```bash
npm run check
npm run test:e2e
npm run backboard:bootstrap
npm run backboard:status
npm run backboard:smoke
npm run mongo:bootstrap
npm run mongo:status
```

`npm run check` runs lint, type checking, unit tests, and a production build.
Backboard and MongoDB commands require their corresponding live credentials.

## Stack

Next.js, React, TypeScript, Tailwind CSS, MapLibre GL JS, Zustand, Backboard,
Claude Fable 5, FreeSolo Flash, Modal, MongoDB Atlas, Vitest, and Playwright.
