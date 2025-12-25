# Implementation Plan: Adaptive Risk Thresholds

**Branch**: `001-adaptive-risk-thresholds` | **Date**: 2025-12-25 | **Spec**: [./spec.md](./spec.md)
**Input**: Feature specification from `specs/feature/001-adaptive-risk-thresholds/spec.md`

## Summary

This feature introduces a system for administrators to configure the thresholds used in the student risk assessment engine. This involves creating a new data model for thresholds, building secure APIs for management, and refactoring the risk calculation logic to use these dynamic values instead of hardcoded ones.

## Technical Context

**Language/Version**: TypeScript
**Primary Dependencies**: Express.js, Mongoose, Zod
**Storage**: MongoDB
**Testing**: Postman (manual E2E), Jest + Supertest (Unit/Integration)
**Target Platform**: Node.js (LTS)
**Project Type**: Web Application (Backend)
**Performance Goals**: <200ms p95 response time for new configuration APIs.
**Constraints**: The system must be backward compatible. If no custom thresholds are configured, the existing risk assessment logic must function using its default values.
**Scale/Scope**: The feature will manage a low cardinality of data (tens of thresholds, not thousands).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Explainability First**: The factors and values of configurable thresholds must be clear and auditable.
- **II. Layered Architecture**: New logic must be correctly placed within the existing layered structure (e.g., `RiskService`, new `ConfigRepository`).
- **III. Security by Default**: New configuration endpoints MUST be protected and restricted to 'admin' roles.
- **IV. API Standardization**: New endpoints must adhere to the established REST conventions, response formats, and versioning.
- **V. Pragmatic Testability**: New services must be unit-testable, and endpoints must be verifiable via Postman.

## Project Structure

### Documentation (this feature)

```text
specs/feature/001-adaptive-risk-thresholds/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (New files to be added)

```text
src/
├── models/config/
│   └── Threshold.model.ts      # New Mongoose model for RiskThreshold
├── routes/
│   └── config.routes.ts        # New routes for /api/v1/config/*
├── controllers/
│   └── config.controller.ts    # New controller for config logic
├── services/
│   └── config.service.ts       # New service for config business logic
├── repositories/
│   └── config.repository.ts    # New repository for DB access
└── validation/schemas/
    └── config.schema.ts        # New Zod schemas for validation
```

**Structure Decision**: The plan is to extend the existing layered architecture. New functionality for managing configuration will be encapsulated in a new `config` domain vertical (routes, controller, service, model). The existing `RiskService` will be modified to consume data from this new module. This maintains separation of concerns while allowing for clean integration.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None*    | -          | -                                   |
