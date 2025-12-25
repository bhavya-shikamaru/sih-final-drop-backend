# Feature Specification: Adaptive Risk Thresholds

**Feature Branch**: `feature/001-adaptive-risk-thresholds`  
**Created**: 2025-12-25
**Status**: Draft  
**Input**: User description: "Implement adaptive risk thresholds"

## Clarifications
### Session 2025-12-25
- Q: The `RiskThreshold` entity in the spec defines a `factor` and a `value` (e.g., `ATTENDANCE_PERCENTAGE` and `75`), but it's missing a comparison operator. To perform a calculation like "attendance is less than 75%", the system needs this operator. How should the system determine which comparison operator (e.g., less than, greater than) to use? → A: Add a required `operator` field (e.g., 'LT', 'GT', 'EQ') to the `RiskThreshold` model. The risk engine will use this operator directly.
- Q: What should the default risk thresholds be? → A: Attendance < 75%, GPA < 2.0, Failed Subjects > 1.
- Q: What level of logging should be implemented for configuration changes? → A: Log all changes (create, update, delete) to an audit log, including the admin user who made the change, the old value, and the new value.
- Q: Should the system include validation logic to prevent logically invalid threshold values from being set? → A: Yes, implement server-side validation to prevent logically invalid thresholds (e.g., percentage > 100, negative values for certain factors).
- Q: What should happen if an admin attempts to set a logically invalid threshold (e.g., attendance percentage > 100%)? → A: The API should reject the request with a 400 Bad Request error and a clear message indicating the validation failure.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin can configure risk thresholds (Priority: P1)

As an admin, I want to be able to set and update the thresholds for various risk factors (e.g., attendance percentage, academic scores) so that the system's risk assessment aligns with our institution's specific policies.

**Why this priority**: This is the core functionality. Without it, the thresholds remain hardcoded.

**Independent Test**: Can be tested by hitting an API endpoint to set a threshold and verifying it's saved correctly in the database.

**Acceptance Scenarios**:
1.  **Given** an admin user is authenticated, **When** they send a POST request to `/api/v1/config/thresholds` with a valid threshold payload, **Then** the system saves the new threshold and returns a 201 Created status.
2.  **Given** a threshold for 'ATTENDANCE_PERCENTAGE' already exists, **When** an admin sends a PUT request to `/api/v1/config/thresholds/ATTENDANCE_PERCENTAGE` with an updated value, **Then** the system updates the existing record and returns a 200 OK status.

---

### User Story 2 - Risk assessment uses configurable thresholds (Priority: P2)

As a mentor, I want the student risk status to be automatically calculated based on the thresholds defined by the admin, so I can trust that the "at-risk" flag is based on current institutional criteria.

**Why this priority**: This makes the configuration from US1 actually useful.

**Independent Test**: Can be tested by configuring a very strict threshold (e.g., 99% attendance), running the risk assessment for a student who doesn't meet it, and verifying they are flagged as "at-risk".

**Acceptance Scenarios**:
1.  **Given** the attendance threshold is set to '< 75%' and a student has 74% attendance, **When** the risk assessment for that student is triggered, **Then** the student's status is updated to 'at-risk'.
2.  **Given** no custom threshold is configured, **When** the risk assessment is run, **Then** the system uses the default hardcoded values for its calculation.

---

### User Story 3 - View and manage threshold configurations (Priority: P3)

As an admin, I want to view the current risk threshold configurations and reset them to a default state if needed.

**Why this priority**: Provides necessary management and visibility for admins.

**Independent Test**: Can be tested by calling a GET endpoint and verifying it returns the currently set thresholds.

**Acceptance Scenarios**:
1.  **Given** an admin is authenticated, **When** they send a GET request to `/api/v1/config/thresholds`, **Then** the system returns a list of all currently configured thresholds.
2.  **Given** an admin is authenticated, **When** they send a DELETE request to `/api/v1/config/thresholds`, **Then** the system deletes all custom thresholds, reverting to the default logic.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a mechanism for storing risk threshold configurations in a new MongoDB collection named `risk_thresholds`.
- **FR-002**: The system MUST expose secure API endpoints for creating, updating, reading, and deleting these threshold configurations.
- **FR-003**: Access to the configuration endpoints MUST be restricted to users with the 'admin' role.
- **FR-004**: The risk calculation logic (likely in a `RiskService`) MUST be refactored to query the `risk_thresholds` collection before applying rules.
- **FR-005**: If no custom threshold is found for a specific risk factor, the system MUST use a default, hardcoded value as a fallback. These defaults are: Attendance < 75%, GPA < 2.0, Failed Subjects > 1.
- **FR-007**: The system MUST implement server-side validation for all incoming threshold configurations. Requests attempting to set logically invalid values (e.g., attendance percentage > 100%, negative values) MUST be rejected with a 400 Bad Request error and a clear message.

### Observability Requirements
- **FR-006**: The system MUST log all changes (create, update, delete) to risk thresholds to an audit log. This log MUST include the admin user who made the change, the timestamp, the specific threshold factor, and the old and new values.

### Key Entities

- **RiskThreshold**:
  - `factor` (String, unique, required): A unique identifier for the risk factor (e.g., 'ATTENDANCE_PERCENTAGE_BELOW', 'GPA_BELOW').
  - `operator` (String, required): The comparison operator to use (e.g., 'LT', 'GT', 'EQ').
  - `value` (Number, required): The numeric value of the threshold.
  - `description` (String): A human-readable description of what the threshold represents.
  - `createdAt` / `updatedAt` (Timestamps).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Admins can successfully modify a risk threshold via an API call, and subsequent risk assessments for affected students reflect this change.
- **SC-002**: The API for managing thresholds has a response time of <200ms p95.
- **SC-003**: The risk calculation logic correctly falls back to default values if the configuration is deleted.
