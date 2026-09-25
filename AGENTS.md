> **DEPRECATED** — This file is superseded by `CLAUDE.md`. Issues, session log, and project metadata now live in CLAUDE.md. This file is retained as a historical archive only.

# AGENTS.md

Inherits root rules from `/Users/daverobertson/Desktop/Code/AGENTS.md`.

## Project Overview

Catering is a premium service site for Act Two Catering. It is a marketing and lead generation surface with branded storytelling, service pages, and quote capture.

## Stack

- Static site shell
- JavaScript app bundle
- Web manifest and service worker
- Static hosting

## Key Decisions

- Preserve a premium hospitality visual language rather than generic SaaS patterns
- Keep the site deployable as a static package
- Favor trust and conversion clarity over novelty in primary flows

## Issue Tracker

| ID | Severity | Status | Title | Notes |
|----|----------|--------|-------|-------|
| 001 | P1 | open | Quote form does not submit to a real backend | Current form flow appears successful without actual lead delivery |
| 002 | P2 | open | Navigation semantics need cleanup | Click only anchor patterns weaken accessibility and fallback behavior |

## Session Log

[2026-03-18] [Catering] [docs] Add AGENTS baseline

## Status naming

Name work with one string everywhere (chat status title, session title, Notion
Status Check Runs "Human Name"):

`Project | 🚦 | Phase | Title → state, reason | MM-DD`

- 🚦: 🟢 complete and verified · 🟡 partial · 🔴 not started, blocked or failed · ⚪ unverifiable.
  Add ⏳ scheduled, 🙋 awaiting Dave or 🚧 blocked to 🟡/🔴/⚪, never to 🟢.
- Phase: Research, Design, Build, Audit or Scheduled. MM-DD: date of the latest light change.
- Every light change gets a new name: a `RENAME:` line in chat and the Notion row updated.
- Canonical source: https://github.com/DaveHomeAssist/skills/blob/master/status-naming.md
