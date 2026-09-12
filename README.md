# Career Evidence (working name)

A React Native + Expo Router prototype exploring an AI-powered Career
Evidence and Employability platform for university students and
early-career candidates. **This is a local, offline demo — not a
finished product.** See `CLAUDE.md` for the full product/engineering
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
  → Target Job
  → Evidence Vault (add local demo evidence)
  → Evidence Gap Map (rule-based, responds to your local evidence)
  → Next Evidence Action
  → Pilot Feedback
```

A "Pilot Guide" screen for demo facilitators is reachable from Welcome.

## Routes

| Route              | Purpose                                                            |
| ------------------ | ------------------------------------------------------------------- |
| `/`                 | Welcome — headline + 4-step value proposition                      |
| `/target-job`       | Sample target role, company, job description                      |
| `/evidence`         | Evidence Vault — sample + locally added evidence, reset control    |
| `/add-evidence`     | Form to add one local demo evidence item                           |
| `/gap-map`          | Evidence Gap Map — rule-based, updates from local evidence          |
| `/next-action`      | Recommended next evidence-building project                         |
| `/pilot-feedback`   | Structured feedback form (local only)                              |
| `/pilot-guide`      | 5-minute facilitator script + observation questions (not for students) |

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

1. Open the app — a small "Demo mode: sample data and local-only
   changes." notice appears under the header on every screen.
2. From Welcome, a facilitator can tap **Open Pilot Guide** for the
   5-minute testing script and observation questions.
3. Walk a student through Target Job → Evidence Vault → Gap Map →
   Next Evidence Action → Pilot Feedback.
4. In Evidence Vault, add one evidence item with skills like
   `Python, statistics, data cleaning, business interpretation` and
   watch the Gap Map update with a transparent "Updated from your demo
   evidence" explanation — no AI involved, just simple keyword rules.
5. After feedback is submitted, use **Reset demo** (also available on
   Evidence Vault) to clear local evidence and any facilitator notes
   before the next student sits down.

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
  keyword rules — clearly labelled as such)
- File uploads or cloud storage
- Analytics or tracking
- Payments
- Resume builder, job search, employer/university dashboards, social
  features, notifications, tab navigation

## Engineering notes

- Expo SDK 57, Expo Router (file-based routing), TypeScript strict mode
- All screens under `app/`; reusable logic under `src/` (`components/`,
  `data/`, `state/`, `types/`, `theme/`, `utils/`)
- `src/state/EvidenceContext.tsx` holds evidence in memory and exposes
  `addEvidence()` / `resetDemoEvidence()`
- `src/utils/buildDemoGapMap.ts` is a small, pure, typed function that
  derives the Gap Map and Readiness Snapshot from the fixed sample
  baseline plus current local evidence
- Full product/engineering rules live in `CLAUDE.md` — read it before
  making product or architecture decisions in this repo
