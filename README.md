# Niyantran

AI-assisted block planning workspace for Indian Railways maintenance corridors.

## What's in this pass

The `frontend/` app matches your "Pulse" screen spec, styled in the
navy/cream/gold/forest-green palette from the reference screens and
branded with your real logo. Motion (page transitions, staggered card
entrances, a sliding sidebar highlight, animated block/notification
panels, skeleton loaders) runs throughout via `framer-motion`.

No login or landing page has been added, per your earlier instruction —
the app opens straight into the workspace with a static "Dept. Officer"
badge in the top bar. Screen 1 from the spec (Login / Role Selection) was
intentionally skipped; say the word if you'd like it added after all.

Pages (sidebar order):
- **Overview** — corridor status strip (per-section health dots), stat
  cards, ENG department summary donut, upcoming blocks strip, quick links
- **Priority Queue** — full sortable/filterable table (asset ID, dept,
  defect, criticality, urgency, network-impact index, composite score,
  recommended slot), row-expand score breakdown, Approve / Send to
  Scheduler / Flag for manual review actions
- **Block Calendar** — Day/Week hourly timeline (traffic + maintenance
  blocks, click a block to approve/reject) and Month Rollup (planned vs.
  backlog chart, month summary, calendar grid)
- **Conflict Resolution** — merged blocks awaiting sign-off (accept /
  split out a task / escalate to DRM) and capacity conflicts (which
  tasks got bumped this week vs. which won the slot)
- **What-If Simulator** — stage a hypothetical defect or freight-forecast
  surge, run it through the live optimizer, see a before/after diff, then
  commit or discard
- **Reports/Analytics** — downtime trend, SLA compliance % by department,
  block utilization efficiency, department comparison table, CSV export,
  and the 4-week status-quo vs. AI-optimized risk forecast

The notifications bell (top bar) now surfaces approval requests, capacity
conflicts, and SLA/critical-severity breaches, each clickable through to
the relevant page.

## Running it

Backend (FastAPI):
```bash
cd Backend
pip install -r requirements.txt
python train_system1.py   # produces risk_model.json, only needed once
uvicorn main:app --reload --port 8000
```

Frontend (Vite + React):
```bash
cd frontend
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).
The frontend expects the backend at `http://localhost:8000` — override
with a `VITE_API_URL` env var if you're running it elsewhere.

## Notes / honest caveats

- The **TRAFFIC row** on the day timeline is illustrative — the backend
  doesn't yet expose a real train-timetable feed, so it renders a stable,
  deterministic set of passenger/freight services around the maintenance
  windows. Swap `useSyntheticTraffic` in
  `src/components/calendar/DayTimeline.jsx` for a real COA/TMS feed later.
- **Conflict Resolution**'s "capacity conflicts" section is a frontend
  approximation: System 2's CP-SAT solver doesn't emit a discrete
  conflict log, only the final accept/reject outcome per task, so the
  UI infers "who won the slot" by comparing risk scores within a section.
- **What-If Simulator**: there's no dry-run endpoint on the backend, so
  "Run simulation" does call the live optimizer (and its blocks do get
  written to the SQLite DB as pending) — it just won't appear in your
  workspace views unless you click "Commit." It never overwrites a block
  you've already approved/rejected, because the backend explicitly
  preserves prior officer decisions on upsert.
- **Asset Availability**, the Month Rollup's calendar-grid dots, and the
  Priority Queue's "network-impact index" are derived/presentational
  metrics built from real fields (severity, traffic_density,
  colocation_risk) rather than a single backend field — formulas are
  documented in code comments where used.
- I don't have network access in this sandbox, so I couldn't run
  `npm install` / a production build to verify it compiles clean. I did
  a thorough manual pass (brace/paren balance, import resolution, icon
  name verification, prop wiring) — please flag anything that breaks on
  your end and I'll fix it fast.
