@AGENTS.md

# Career Evidence — Engineering & Product Contract

This file is the permanent contract for this repository. Read it before making
product or architecture decisions. Working name: **Career Evidence** (temporary
internal label, not a final brand — do not invent or hard-code a permanent
brand identity such as "CareerProof").

## Product purpose

We are building an AI-powered **Career Evidence and Employability platform**
for university students and early-career candidates.

The product must answer:

> "What can this student genuinely prove they can do, what evidence supports
> it, what is missing for the career they want, and what should they do
> next?"

## Core rule

**AI can improve expression. AI must never invent evidence.**

A skill, competency, achievement, project, internship, leadership claim, or
outcome must ultimately be traceable to evidence supplied or confirmed by the
user. Unsupported claims must remain unverified, and must be presented as
such — never upgraded to "verified" by AI polish alone.

## Lean MVP

The MVP has four core capabilities:

1. **Target Job** — the role the student is aiming for.
2. **Evidence Vault** — the user's actual proof of work.
3. **Evidence Gap Map** — evidence vs. target role, honestly scored.
4. **Next Evidence Action** — the single best next thing to go prove.

## Not the product

Do not turn this into:

- a resume builder
- a generic AI chatbot
- a job board
- a LinkedIn clone
- a social network
- an LMS
- a course marketplace
- a college ERP
- an attendance app
- a study planner
- an internship marketplace
- an employer ATS
- a NEET-PG app

## Engineering rules

- TypeScript strict mode.
- Simple, modular architecture — prefer plain functions and small components
  over frameworks/abstractions.
- Reusable components where sensible; don't abstract trivial code.
- No unnecessary dependencies.
- No secrets in client code.
- Evidence is private by default.
- Accessibility-conscious UI (readable text sizes, sufficient contrast,
  meaningful labels).
- Handle loading/empty/error/success states when a screen has real async or
  conditional data — not required for static mock screens.
- Preserve provenance: any future AI-generated conclusion must remain linked
  back to the source evidence that justifies it.
- Never fabricate demo data that could be mistaken for a real person's data —
  mock data must be clearly fictional and clearly labelled as sample/demo.
- Explain significant architectural changes when introducing them.
- Test/typecheck/lint after meaningful changes.
- Do not implement features that were not requested.
