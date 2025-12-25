# Tasks: Adaptive Risk Thresholds

**Input**: Design documents from `/specs/001-adaptive-risk-thresholds/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/

**Tests**: Testing will be performed manually via Postman as per the project's current testing strategy.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Create the core files and database model required for all user stories.
**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T001 Create the Mongoose schema and model for `RiskThreshold` in `src/models/config/Threshold.model.ts`.
- [x] T002 Create the Zod validation schemas for threshold creation and updates in `src/validation/schemas/config.schema.ts`.
- [x] T003 Create the new router file for configuration at `src/routes/config.routes.ts`.
- [x] T004 Mount the new config router in the main application router at `src/routes/index.ts`.

**Checkpoint**: Foundation ready. The core data model and routing structure are in place.

---

## Phase 2: User Story 1 - Admin can configure risk thresholds (Priority: P1) 🎯 MVP

**Goal**: Allow admins to create and update risk thresholds.
**Independent Test**: Use Postman to send `POST` and `PUT` requests to the new config endpoints and verify the database is updated correctly.

### Implementation for User Story 1

- [x] T005 [P] [US1] Create `src/repositories/config.repository.ts` with `create` and `findByFactorAndUpdate` methods.
- [x] T006 [P] [US1] Create `src/services/config.service.ts` with `createThreshold` and `updateThresholdByFactor` methods.
- [x] T007 [US1] Create `src/controllers/config.controller.ts` with handlers for `createThreshold` and `updateThreshold`.
- [x] T008 [US1] In `src/routes/config.routes.ts`, define the `POST /thresholds` and `PUT /thresholds/:factor` routes, linking them to the controller handlers.
- [x] T009 [US1] Add middleware for 'admin' role authentication and Zod validation to the new routes in `src/routes/config.routes.ts`.
- [x] T010 [US1] Implement audit logging within `config.service.ts` for create and update operations, as specified in FR-006.

**Checkpoint**: User Story 1 is fully functional. Admins can create and update thresholds.

---

## Phase 3: User Story 2 - Risk assessment uses configurable thresholds (Priority: P2)

**Goal**: Refactor the existing risk calculation to use the new dynamic thresholds.
**Independent Test**: Set a custom threshold via the API. Trigger the risk calculation for a student who should be affected by this new rule. Verify the student's risk status is updated correctly.

### Implementation for User Story 2

- [x] T011 [P] [US2] Add a `findByFactor` method to `config.repository.ts`.
- [x] T012 [P] [US2] Add a `getThresholdByFactor` method to `config.service.ts`.
- [x] T013 [US2] Identify the `RiskService` (likely `src/controllers/risk.controller.ts` or a service it calls) and import the `ConfigService`.
- [x] T014 [US2] In the risk calculation logic, replace hardcoded values by fetching them from `ConfigService.getThresholdByFactor`.
- [x] T015 [US2] Implement the fallback logic in the risk calculation to use the default hardcoded values (e.g., Attendance < 75%) if the `ConfigService` does not return a value for a given factor.

**Checkpoint**: User Story 2 is fully functional. The risk engine now uses the database configuration.

---

## Phase 4: User Story 3 - View and manage threshold configurations (Priority: P3)

**Goal**: Allow admins to view all configurations and reset them.
**Independent Test**: Use Postman to `GET` all thresholds. Use Postman to `DELETE` all thresholds and verify the risk calculation reverts to default behavior.

### Implementation for User Story 3

- [x] T016 [P] [US3] Implement `findAll` and `deleteAll` methods in `config.repository.ts`.
- [x] T017 [P] [US3] Implement `getAllThresholds` and `resetAllThresholds` methods in `config.service.ts`.
- [x] T018 [P] [US3] Add `getAllThresholds` and `resetAllThresholds` handlers to `config.controller.ts`.
- [x] T019 [US3] In `src/routes/config.routes.ts`, define the `GET /thresholds` and `DELETE /thresholds` routes.
- [x] T020 [US3] Add 'admin' role authentication middleware to the new GET and DELETE routes.
- [ ] T021 [US3] Implement audit logging within `config.service.ts` for the delete operation.

**Checkpoint**: User Story 3 is fully functional. Admins have full CRUD control over thresholds.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation and validation.

- [ ] T022 [P] Create/update a Postman collection with requests for all new `/api/v1/config/thresholds` endpoints.
- [ ] T023 [P] Update the project's `README.md` or API documentation to include information about the new configuration feature and its endpoints.
- [ ] T024 Review all new code for adherence to project styling, conventions, and error handling patterns.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: MUST be completed before any user story work begins.
- **User Stories (Phase 2-4)**: Depend on the Foundational phase. They can be implemented sequentially in priority order (US1 → US2 → US3).
- **Polish (Phase 5)**: Should be done after all user stories are complete.

### User Story Dependencies

- **US1 (Admin CRUD)**: Has no dependencies on other stories.
- **US2 (Risk Engine)**: Depends on US1 being complete so that there is data to read.
- **US3 (Admin View/Delete)**: Has no dependencies on other stories but is logically grouped with US1.

### Implementation Strategy

1.  **MVP First**: Complete Phase 1 and Phase 2 (User Story 1). At this point, the core ability to create and manage thresholds is implemented.
2.  **Incremental Delivery**:
    -   Complete Phase 3 (US2) to make the thresholds functional.
    -   Complete Phase 4 (US3) to round out the admin management capabilities.
    -   Complete Phase 5 for final validation and documentation.
