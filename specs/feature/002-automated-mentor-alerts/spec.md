# Feature Specification: Automated Mentor Alerts

**Feature Branch**: `feature/002-automated-mentor-alerts`  
**Created**: 2025-12-25
**Status**: Draft  
**Input**: User description: "automated mentor alerts"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mentor receives an alert (P1)

As a mentor, I want to receive an email notification when one of my assigned students' risk status changes to "medium" or "high", so I can intervene in a timely manner.

**Why this priority**: This is the core value proposition of the feature.

**Independent Test**: Manually update a student's risk status in the database and verify that an email is sent to their assigned mentor's email address.

**Acceptance Scenarios**:
1.  **Given** a student is assigned to a mentor and their risk level is "low", **When** the student's risk level changes to "high", **Then** an email alert is sent to the mentor.
2.  **Given** a student's risk level is already "high", **When** the risk is recalculated and remains "high", **Then** no new alert is sent (to avoid spam).

---

### User Story 2 - Admin can manage alert system (P2)

As an admin, I want to be able to enable or disable the automated alert system globally, so I can control the flow of notifications during maintenance or initial setup.

**Why this priority**: Provides essential administrative control over a system that sends external communications.

**Independent Test**: Use an API endpoint to disable the alert system. Manually trigger a risk-level change for a student. Verify that NO email alert is sent.

**Acceptance Scenarios**:
1.  **Given** the alert system is globally disabled, **When** a student's risk level increases, **Then** no alert is generated or sent.
2.  **Given** the alert system is globally enabled, **When** a student's risk level increases, **Then** an alert is generated and sent.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A `NotificationService` MUST be created, responsible for sending notifications. Initially, it will support email.
- **FR-002**: The email service will be integrated using `nodemailer`. It should be configurable via environment variables (SMTP host, port, user, pass). For local development, it can use a mock service like Ethereal or log to the console.
- **FR-003**: The `RiskService` (or equivalent logic) MUST be modified to call the `NotificationService` after a student's risk level increases to a "medium" or "high" state.
- **FR-004**: The system MUST check if an alert for a similar risk increase was sent recently (e.g., within the last 7 days) for the same student to prevent spamming the mentor. This requires a new data model.
- **FR-005**: An `Alert` model MUST be created to log all sent notifications for auditing. It should track the student, mentor, type of alert, and status.
- **FR-006**: A global `Settings` collection MUST be used to store the on/off state of the alert system. The `NotificationService` must check this setting before sending any alert.

### Key Entities

- **Alert**:
  - `studentId` (ObjectId, ref: 'Student', required)
  - `mentorId` (ObjectId, ref: 'User', required)
  - `triggeringEvent` (String, required, e.g., 'RISK_LEVEL_INCREASED_TO_HIGH')
  - `notificationType` (String, required, default: 'EMAIL')
  - `status` (String, required, enum: ['SENT', 'FAILED'])
  - `sentAt` (Date, default: Date.now)

## Success Criteria *(mandatory)*

- **SC-001**: When a student's risk level increases, their assigned mentor receives a correctly formatted email alert within 5 minutes.
- **SC-002**: The alert system correctly respects the global enable/disable setting.
- **SC-003**: The system does not send duplicate alerts for the same student within a 7-day period.
