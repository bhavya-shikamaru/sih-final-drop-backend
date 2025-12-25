# Data Model: Adaptive Risk Thresholds

**Source**: `specs/feature/001-adaptive-risk-thresholds/spec.md`

This document defines the data entities required for the "Adaptive Risk Thresholds" feature.

## RiskThreshold

Represents a single, configurable rule used by the risk assessment engine. These entities will be stored in a new MongoDB collection named `risk_thresholds`.

### Fields

| Field Name  | Type     | Required | Unique | Description                                                                 |
|-------------|----------|----------|--------|-----------------------------------------------------------------------------|
| `factor`    | String   | Yes      | Yes    | A unique, machine-readable identifier for the risk factor.                  |
| `value`     | Number   | Yes      | No     | The numeric value of the threshold.                                         |
| `operator`  | String   | Yes      | No     | The comparison operator (e.g., 'LT', 'GT', 'EQ') to apply against the value.|
| `description`| String  | No       | No     | A human-readable description of what the threshold represents.              |
| `createdAt` | Date     | Yes      | No     | Timestamp of when the record was created (managed by Mongoose).             |
| `updatedAt` | Date     | Yes      | No     | Timestamp of the last update (managed by Mongoose).                         |

### Example `factor` Identifiers

- `ATTENDANCE_PERCENTAGE_BELOW`
- `GPA_BELOW`
- `FAILED_SUBJECTS_ABOVE`

### Validation Rules

- `factor`: Must be a non-empty string.
- `value`: Must be a valid number.
- `operator`: Must be one of 'LT' (Less Than), 'GT' (Greater Than), 'EQ' (Equal To).

### Example Document (in MongoDB)

```json
{
  "_id": "60d5ecb3e7a5c8001fabbbe1",
  "factor": "ATTENDANCE_PERCENTAGE_BELOW",
  "value": 75,
  "operator": "LT",
  "description": "Flags students with attendance below 75%.",
  "createdAt": "2025-12-25T10:00:00.000Z",
  "updatedAt": "2025-12-25T10:00:00.000Z"
}
```
