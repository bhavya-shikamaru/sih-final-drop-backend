# Data Model: Automated Mentor Alerts

This document defines the data entities required for this feature.

## Alert

Represents a log of a single notification sent to a mentor. Stored in the `alerts` collection.

### Fields

| Field Name        | Type       | Required | Description                                                    |
|-------------------|------------|----------|----------------------------------------------------------------|
| `studentId`       | ObjectId   | Yes      | Reference to the student who triggered the alert.              |
| `mentorId`        | ObjectId   | Yes      | Reference to the mentor who received the alert.                |
| `triggeringEvent` | String     | Yes      | The reason the alert was sent (e.g., 'RISK_LEVEL_INCREASED').|
| `notificationType`| String     | Yes      | The method of notification (e.g., 'EMAIL').                      |
| `status`          | String     | Yes      | The status of the notification ('SENT' or 'FAILED').         |
| `sentAt`          | Date       | Yes      | Timestamp of when the alert was sent.                          |

---

## Setting

Represents a global application setting. Stored in the `settings` collection.

### Fields

| Field Name | Type    | Required | Unique | Description                                        |
|------------|---------|----------|--------|----------------------------------------------------|
| `key`      | String  | Yes      | Yes    | The unique key for the setting (e.g., 'alerts_enabled').|
| `value`    | Mixed   | Yes      | No     | The value of the setting (e.g., `true`, `false`).  |
| `notes`    | String  | No       | No     | A description of what the setting controls.        |
