# Career Evidence (working name)

A React Native + Expo Router prototype exploring an AI-powered Career
Evidence and Employability platform for students and early-career
candidates across the health sciences. **This is a local, offline demo —
not a finished product.** See `CLAUDE.md` for the full product/engineering
contract this repo follows.

## Product purpose

The product should answer:

> What can this student genuinely prove they can do, what evidence
> supports it, what is missing for the career they want, and what
> should they do next?

**Core rule: AI can improve expression. AI must never invent evidence.**
A skill, competency, achievement, project, internship, leadership claim,
or outcome must ultimately be traceable to evidence supplied or
confirmed by the user. Unsupported claims remain unverified — the
prototype never quietly upgrades a claim to "verified."

## Current MVP flow

```
Welcome
  → Target Job (pick a faculty, then a role — or type your own)
  → Evidence Vault (add local evidence, tagged to that role's competencies)
  → Evidence Gap Map (rule-based, responds to your evidence)
  → Next Evidence Action (commit to a timeframe, mark it finished)
  → Pilot Feedback
```

A "Pilot Guide" screen for demo facilitators is reachable directly at
`/pilot-guide` (not linked from the student-facing flow).

## The role library

`src/data/roleLibrary.ts` holds 23 hand-curated roles across 8 faculties
(covering the faculties of JSS AHER, Mysuru), each with exactly 8 ordered
competencies:

- **Medicine & Public Health** — Public Health Programme Officer,
  Epidemiology & Surveillance Officer, Clinical Research Associate /
  Coordinator, Hospital Quality & Accreditation Officer, Medical Writer
- **Pharmacy** — Pharmacovigilance Associate, Regulatory Affairs
  Associate, Clinical / Hospital Pharmacist, Pharmaceutical Quality
  Assurance Analyst
- **Life Sciences** — Bioinformatics Analyst, Clinical Nutritionist /
  Dietitian, Microbiology Analyst, Environmental & Water Health Officer,
  Counselling / Mental Health Associate
- **Biomedical & Laboratory Sciences** — Medical Laboratory Scientist,
  Biomedical / Life Sciences Research Associate
- **Dentistry** — Dental Clinician (Early Career)
- **Health Management** — Hospital Administration Executive, Health
  Insurance & Claims Associate
- **Yoga & Wellness** — Yoga Therapist / Wellness Programme Officer
- **Research & Academic Pathway** — Academic & Research Pathway (PG,
  residency, fellowship), Health Data Analyst, Digital Health / Health
  Informatics Associate

There is no role inference or keyword extraction from a job description —
a role is only ever scored if the student picks one of these 23, or types
their own via **Other**, in which case the Gap Map shows an honest notice
instead of a guess.

**Sample evidence is Health Data Analyst-shaped and only appears for that
role.** Every other role starts with an empty Evidence Vault and its
empty state — an empty map that's true is better than a full map that's
irrelevant.

## Routes

| Route              | Purpose                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| `/`                 | Welcome — headline + 4-step value proposition                          |
| `/target-job`       | Two-step role picker (faculty → role, or Other), company, job description |
| `/evidence`         | Evidence Vault — sample (Health Data Analyst only) + local evidence, reset control |
| `/add-evidence`     | Form to add one evidence item, tagged against the selected role's competencies |
| `/gap-map`          | Evidence Gap Map — rule-based, scores against the selected role's competencies |
| `/next-action`      | Recommended next evidence-building project, with a commitment + finish step |
| `/pilot-feedback`   | Structured feedback form (local only)                                  |
| `/pilot-guide`      | 5-minute facilitator script + observation questions (not linked publicly) |

## How to run locally

```bash
npm install
npm run web     # browser preview
npm start        # QR code for Expo Go (Android/iOS)
npm run android  # requires an Android emulator/device
npm run ios      # requires macOS + Xcode, or Expo Go
```

## Validation commands

```bash
npx tsc --noEmit      # TypeScript check (strict mode)
npx eslint .          # Lint
npx expo export --platform web       # Verify the app builds
npx expo export --platform android   # Verify the native JS bundle builds
```

## Demo / pilot testing instructions

1. From Welcome, tap **See what I can prove** to start.
2. On Target Job, pick a faculty, then a role within it (or **Other** to
   type a custom role), then **Analyse My Target**.
3. On Evidence Vault, tap **+ Add Evidence**, fill in a title and type,
   tick which of the role's competencies this work demonstrates, and
   optionally check "Is there something you could actually show
   someone?" — then **Save Evidence**.
4. Tap **Build My Evidence Map** and watch the Gap Map reflect exactly
   the competencies you ticked, with a transparent "Updated from your
   demo evidence" explanation — no AI involved, just transparent rules
   based on evidence type.
5. Continue to Next Evidence Action, add it to your plan, and pick when
   you'll finish it.
6. On Pilot Feedback (or Evidence Vault), use **Reset everything**
   before the next student sits down — this clears local evidence, the
   selected faculty/role, company, job description, and the action
   plan/commitment, restoring the original Health Data Analyst sample
   state.

All state is in-memory only (React Context, no `AsyncStorage`). A page
reload returns to the original sample data.

## Deploying a shareable web preview (EAS Hosting)

The simplest Expo-supported way to share this prototype with pilot
students over a link is **EAS Hosting**, which serves the static web
export (`npx expo export --platform web`) from a URL — no app store
build, no APK, no backend required.

```bash
# one-time, interactive — run this locally, not in CI
npx eas-cli login

# links this repo to an Expo project (also one-time)
npx eas-cli init

# builds the static web bundle and deploys it
npx expo export --platform web
npx eas-cli deploy
```

`eas deploy` prints the preview URL when it finishes (add `--prod` for
a stable production alias instead of a preview alias). Share that URL
directly with students — it works in any browser, no install needed.

This requires an Expo account (free) and cannot be completed
non-interactively without one, so it must be run from a machine where
you can log in (or with an `EXPO_TOKEN` for CI — see
https://docs.expo.dev/accounts/programmatic-access/).

## What is intentionally not built yet

- Supabase, any database, or persistence beyond a single session
- Authentication / accounts
- Real AI evidence analysis (the Gap Map uses simple, transparent
  rules based on evidence type — clearly labelled as such)
- File uploads or cloud storage
- Analytics or tracking
- Payments
- Resume builder, job search, employer/university dashboards, social
  features, notifications, tab navigation
- Role inference from a job description (roles are hand-curated only)

## Engineering notes

- Expo SDK 57, Expo Router (file-based routing), TypeScript strict mode
- All screens under `app/`; reusable logic under `src/` (`components/`,
  `data/`, `state/`, `types/`, `theme/`, `utils/`)
- `src/data/roleLibrary.ts` is the hand-curated role/competency library
  (23 roles, 8 faculties); `HEALTH_DATA_ANALYST_ROLE_ID` and
  `OTHER_ROLE_ID` mark the two special cases (sample evidence, and the
  unscored custom-role path)
- `src/state/EvidenceContext.tsx` holds evidence in memory and exposes
  `addEvidence()`, `resetDemoEvidence()`, and `syncSampleEvidenceForRole()`
  (clears/restores the Health Data Analyst sample set when the selected
  role changes, without touching local evidence)
- `src/state/TargetJobContext.tsx` holds the selected target job and the
  Next Evidence Action's commitment/finished state together, so
  `resetAll()` can clear both in one call ("Reset everything")
- `src/utils/buildDemoGapMap.ts` is a small, pure, typed function that
  derives the Gap Map and Readiness Snapshot from whatever evidence
  currently exists, using evidence **source type** (project with/without
  an output, coursework, certificate, etc.) as the tiering rule — not
  what the student typed
- Evidence is tagged against competencies via an exact multi-select (the
  student ticks which of the selected role's 8 competencies a piece of
  evidence demonstrates) rather than free text, so it reliably matches
  the Gap Map's scoring
- Full product/engineering rules live in `CLAUDE.md` — read it before
  making product or architecture decisions in this repo
