# Tasks: Automated Mentor Alerts

**Input**: Design documents from `/specs/002-automated-mentor-alerts/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/

**Tests**: Testing will be performed manually via Postman as per the project's current testing strategy.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Install new project dependencies.

- [ ] T001 Install the `nodemailer` package and its types (`@types/nodemailer`) as a new dependency.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the core models and services required for the feature.
**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T002 [P] Create the Mongoose schema and model for `Setting` in `src/models/settings/Setting.model.ts`.
- [ ] T003 [P] Create the Mongoose schema and model for `Alert` in `src/models/notifications/Alert.model.ts`.
- [ ] T004 Create the initial `src/services/notification.service.ts` with a placeholder `sendEmail` method.
- [ ] T005 [P] Create a `SettingsRepository` in `src/repositories/settings.repository.ts`.
- [ ] T006 Create a `SettingsService` in `src/services/settings.service.ts` that uses the repository.

**Checkpoint**: Foundation ready. Core dependencies and data structures are in place.

---

## Phase 3: User Story 2 - Admin can manage alert system (Priority: P2)

**Goal**: Implement the API for admins to enable or disable the alert system.
**Independent Test**: Use Postman to hit the `PUT /api/v1/settings/alerts` endpoint to disable alerts. Trigger a risk change and verify no email is sent.

### Implementation for User Story 2

- [ ] T007 [P] [US2] Create `src/controllers/settings.controller.ts` with handlers to get and update the 'alerts_enabled' setting.
- [ ] T008 [P] [US2] Create `src/routes/settings.routes.ts` and define the `GET /alerts` and `PUT /alerts` endpoints.
- [ ] T009 [US2] Mount the new `settings.routes.ts` under `/api/v1/settings` in `src/routes/index.ts`.
- [ ] T010 [US2] Add 'admin' role authentication middleware to all routes in `src/routes/settings.routes.ts`.

**Checkpoint**: User Story 2 is fully functional. Admins can control the alert system.

---

## Phase 4: User Story 1 - Mentor receives an alert (Priority: P1)

**Goal**: Trigger and send email alerts to mentors when a student's risk level increases.
**Independent Test**: Manually update a student's risk status to 'high' and verify the assigned mentor receives an email (or that an email is logged to the console/Ethereal).

### Implementation for User Story 1
- [ ] T011 [P] [US1] Implement the email sending logic in `notification.service.ts` using `nodemailer` and Ethereal for testing.
- [ ] T012 [P] [US1] Create an `AlertRepository` in `src/repositories/notification.repository.ts` with a method to find recent alerts for a student.
- [ ] T013 [US1] In `notification.service.ts`, implement the logic to check for recent alerts (FR-004) before sending a new notification.
- [ ] T014 [US1] In `notification.service.ts`, implement the logic to save a record of the sent alert using the `AlertRepository`.
- [ ] T015 [US1] Modify the risk calculation logic (currently in `src/controllers/risk.controller.ts`) to call the `NotificationService` when a student's risk level increases. This includes fetching mentor details to get their email.

**Checkpoint**: User Story 1 is fully functional. Mentors receive alerts.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation and validation.

- [ ] T016 [P] Update the `README.md` and create a `.env.example` file to document the new environment variables required for the email service.
- [ ] T017 [P] Create a new Postman collection for the `/api/v1/settings` endpoints.

---
## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)** must complete before all other phases.
- **Foundational (Phase 2)** must complete before User Story phases (3 & 4).
- **User Story 2 (Phase 3)** should be completed before User Story 1, as the notification service will depend on the global on/off setting.

### Implementation Strategy
1.  **MVP First**: Complete Phases 1, 2, and 3. This delivers the administrative control over the feature.
2.  **Core Functionality**: Complete Phase 4 to enable the actual sending of alerts.
3.  **Documentation**: Complete Phase 5 to finalize the feature.
