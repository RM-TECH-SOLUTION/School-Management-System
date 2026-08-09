# School Platform Delivery Plan

This document is a living checklist for the first production-ready foundation.

## Phase 1 — Foundation

- [x] Inspect existing repository (empty workspace)
- [x] Establish monorepo layout and shared configuration
- [x] Configure environment templates and local SQLite development database
- [x] Create Prisma relational schema and development seed data
- [x] Implement NestJS API foundation, validation and Swagger
- [x] Implement JWT access/refresh authentication and session persistence

## Phase 2 — Public website

- [x] Create shared design tokens and reusable UI primitives
- [x] Build responsive premium public homepage
- [x] Build public content route foundation
- [x] Connect public homepage content to CMS API
- [ ] Add metadata, sitemap, robots and structured data

## Phase 3 — Operations dashboard

- [x] Build login and protected dashboard shell
- [x] Add dashboard overview metrics
- [x] Deliver student management vertical slice (list, create, profile)
- [x] Deliver attendance vertical slice (mark and persist)
- [x] Deliver admissions vertical slice (create, status change, list)
- [x] Deliver fees vertical slice (create invoice, student status)
- [x] Deliver website CMS vertical slice (edit/publish homepage content)
- [x] Add animated section transitions, hover states, and dashboard motion polish

## Phase 4 — Quality and handoff

- [ ] Add remaining module foundations and API documentation
- [ ] Add loading, error, empty and confirmation states
- [ ] Install dependencies and run lint/type/build checks
- [ ] Complete README, migration/seed instructions and demo credentials

## Deferred operational modules

- [ ] Parents, teachers, classes, sections, subjects, timetable
- [ ] Examinations, results, homework, assignments
- [ ] Library, transport, communications, reporting, media workflow
- [ ] Sanity CDN integration (the API CMS is the immediate working source of truth)
