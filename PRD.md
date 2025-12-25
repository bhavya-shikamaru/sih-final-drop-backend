
---

# 📘 Backend Product Requirements Document (PRD)

## Project Title

**UmeedAI – Backend REST API**

---

## 1. Document Information

| Field                 | Value                                           |
| --------------------- | ----------------------------------------------- |
| **Document Type**     | Backend Product Requirements Document           |
| **Project Name**      | UmeedAI                                         |
| **Version**           | v1.0.0                                          |
| **Status**            | Draft                                           |
| **Last Updated**      | December 2025                                   |
| **Owner / Author**    | Bhavya                                          |
| **Intended Audience** | Backend Developers, Reviewers, Hackathon Judges |
| **API Style**         | REST (Richardson Level 2)                       |

### Change Log

| Version | Date     | Description         |
| ------- | -------- | ------------------- |
| v1.0.0  | Dec 2025 | Initial backend PRD |

---

## 2. Backend Overview

### 2.1 Purpose

The **UmeedAI Backend API** provides a secure, scalable, and explainable data layer for identifying and managing students at risk of academic drop-out.
It consolidates student, attendance, and academic performance data into a unified system that enables early intervention by mentors and faculty.

The backend acts as:

* A **source of truth** for institutional data
* A **decision-support system**, not an autonomous decision-maker
* A **RESTful service layer** consumed by a React-based frontend and external tools (Postman, dashboards)

---

### 2.2 Scope

#### In Scope

* User authentication and role-based access control (faculty, mentor, admin)
* CRUD management of students and related academic data
* Attendance and academic record ingestion (manual + CSV-based)
* Rule-based and explainable risk assessment
* Secure REST APIs with consistent responses and error handling
* MongoDB persistence via Mongoose ODM
* Docker-compatible deployment

#### Out of Scope (for this version)

* Real-time streaming data
* Complex black-box ML models
* Third-party analytics platforms
* Mobile-specific APIs
* Payment or financial systems

---

### 2.3 Target Consumers

| Consumer                  | Description                                        |
| ------------------------- | -------------------------------------------------- |
| **Frontend Web App**      | React + Tailwind dashboard for faculty and mentors |
| **Postman / API Clients** | Development, testing, and demonstrations           |
| **Future Integrations**   | Analytics tools, reporting dashboards              |

---

### 2.4 Success Criteria

The backend will be considered successful if:

* All core resources support full CRUD operations
* APIs follow REST conventions and HTTP semantics
* Authentication and authorization prevent unauthorized access
* Validation prevents malformed or dangerous input
* Error responses are consistent, debuggable, and human-readable
* MongoDB data is reliably persisted and queryable
* API can be demonstrated end-to-end in under 2 minutes

---

### 2.5 Design Principles

* **Explainability First**: Every risk assessment must be traceable to inputs
* **Security by Default**: Protected routes, validated input, controlled access
* **Statelessness**: No server-side sessions; JWT-based auth only
* **Consistency**: Uniform response and error formats across all endpoints
* **Scalability**: Clean layering allows future feature expansion

---

## 3. Technology Stack

### 3.1 Runtime & Language

| Component     | Choice        |
| ------------- | ------------- |
| Runtime       | Node.js (LTS) |
| Language      | TypeScript    |
| API Framework | Express.js    |

TypeScript is used to:

* Enforce compile-time safety
* Prevent runtime shape mismatches
* Improve maintainability of large codebases

---

### 3.2 Database & Persistence

| Component  | Choice                   |
| ---------- | ------------------------ |
| Database   | MongoDB Community Server |
| ODM        | Mongoose                 |
| Deployment | Docker container         |
| Tooling    | MongoDB Compass          |

MongoDB is chosen for:

* Flexible schema evolution
* Natural fit for document-style academic records
* Strong ecosystem with Mongoose

Mongoose provides:

* Schema validation
* Middleware hooks
* Model-level abstraction
* Consistent query APIs

---

### 3.3 API Design & Standards

| Aspect         | Standard               |
| -------------- | ---------------------- |
| API Style      | REST                   |
| Maturity Level | Richardson Level 2     |
| Data Format    | JSON                   |
| Versioning     | URL-based (`/api/v1`)  |
| Error Handling | Centralized middleware |

---

### 3.4 Supporting Libraries & Tools

| Purpose                | Tool                              |
| ---------------------- | --------------------------------- |
| Authentication         | JSON Web Tokens (JWT)             |
| Validation             | Zod                               |
| Logging                | Custom logger (Winston / similar) |
| Environment Management | dotenv                            |
| API Testing            | Postman                           |
| Containerization       | Docker                            |

---

### 3.5 Frontend Integration

**Frontend Exists:** ✅ Yes

**Description:**
A React + TailwindCSS web application that consumes this backend API to:

* Authenticate users
* Display student data
* Visualize risk indicators
* Support mentor-driven intervention workflows

The frontend communicates with the backend exclusively via HTTP APIs.

---

### 3.6 Deployment Compatibility

The backend is designed to run:

* Locally (Node + MongoDB)
* With MongoDB running in Docker
* In future cloud environments (Render, Railway, AWS)

No vendor-specific services are required.

---


# 4. REST Principles & Richardson Maturity Model

This backend follows **REST (Representational State Transfer)** principles and is designed to comply with **Richardson Maturity Model – Level 2**, which is the industry standard for practical REST APIs.

---

## 4.1 REST Constraints (The 6 Core Principles)

REST is defined by **six architectural constraints**. These are not rules you memorize — they explain *why* REST APIs scale and remain maintainable.

| Constraint                    | Explanation                                                                                                                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client–Server**             | The frontend (client) and backend (server) are independent. UI changes do not affect backend logic, and backend changes do not require frontend rewrites (as long as API contracts remain stable). |
| **Stateless**                 | Every request contains all the information needed to process it. The server does not store client session state. Authentication is handled using tokens (JWT).                                     |
| **Cacheable**                 | Responses can indicate whether they are cacheable. This improves performance and reduces unnecessary server load.                                                                                  |
| **Uniform Interface**         | APIs expose resources using consistent URLs and HTTP methods (e.g., `GET /students`, `POST /students`).                                                                                            |
| **Layered System**            | The system is composed of layers (routes, services, database). Each layer has a single responsibility.                                                                                             |
| **Code on Demand (Optional)** | Servers may optionally send executable code (e.g., JavaScript). This constraint is **not used** in this project.                                                                                   |

---

## 4.2 Richardson Maturity Model

The Richardson Maturity Model measures how “RESTful” an API is.

| Level       | Description                   | Example                                                   |
| ----------- | ----------------------------- | --------------------------------------------------------- |
| **Level 0** | Single endpoint, action-based | `POST /api` with `{ action: "getStudents" }`              |
| **Level 1** | Resource-based URLs           | `GET /students`, `GET /users`                             |
| **Level 2** | Proper HTTP verbs             | `GET /students`, `POST /students`, `DELETE /students/:id` |
| **Level 3** | HATEOAS (hypermedia links)    | Responses include links to related actions                |

**Target Level for this project:**
✅ **Level 2**

Level 2 provides:

* Clear semantics
* Predictable APIs
* Compatibility with frontend frameworks
* Simplicity for students and evaluators

---

## 4.3 HTTP Methods

| Method     | Purpose                   | Example                |
| ---------- | ------------------------- | ---------------------- |
| **GET**    | Retrieve data             | `GET /students`        |
| **POST**   | Create new resource       | `POST /students`       |
| **PUT**    | Replace entire resource   | `PUT /students/:id`    |
| **PATCH**  | Update part of a resource | `PATCH /students/:id`  |
| **DELETE** | Remove a resource         | `DELETE /students/:id` |

---

## 4.4 HTTP Status Codes

### Success (2xx)

| Code               | When to Use                              |
| ------------------ | ---------------------------------------- |
| **200 OK**         | Successful GET, PUT, PATCH               |
| **201 Created**    | Resource created successfully            |
| **204 No Content** | Successful request with no response body |

### Client Errors (4xx)

| Code                 | When to Use                         |
| -------------------- | ----------------------------------- |
| **400 Bad Request**  | Invalid input or validation failure |
| **401 Unauthorized** | Missing or invalid authentication   |
| **403 Forbidden**    | Authenticated but not allowed       |
| **404 Not Found**    | Resource does not exist             |
| **409 Conflict**     | Duplicate or conflicting data       |

### Server Errors (5xx)

| Code                          | When to Use                 |
| ----------------------------- | --------------------------- |
| **500 Internal Server Error** | Unhandled server failure    |
| **503 Service Unavailable**   | Database or dependency down |

---

## 4.5 Idempotency

**Idempotency** means that performing the same operation multiple times produces the same result.

| Method | Idempotent? | Explanation                            |
| ------ | ----------- | -------------------------------------- |
| GET    | ✅ Yes       | Fetching data does not change state    |
| PUT    | ✅ Yes       | Replacing the same resource repeatedly |
| DELETE | ✅ Yes       | Deleting an already deleted resource   |
| POST   | ❌ No        | Creates new resources each time        |

**Why it matters:**
Idempotency allows safe retries in case of network failures.

---

# 5. API Architecture

The backend follows a **layered architecture** to enforce separation of concerns, improve testability, and ensure maintainability.

---

## 5.1 Layered Architecture Diagram

```
Client (Frontend / Postman)
        |
        v
      Routes
        |
        v
   Middleware
        |
        v
   Controllers
        |
        v
     Services
        |
        v
  Repositories
        |
        v
     Models
        |
        v
     MongoDB
```

Each layer has **one responsibility** and does not skip layers.

---

## 5.2 Layer Responsibilities

| Layer        | Responsibility                      |
| ------------ | ----------------------------------- |
| Routes       | Define endpoints and HTTP methods   |
| Middleware   | Authentication, validation, logging |
| Controllers  | Handle request/response mapping     |
| Services     | Business logic and rules            |
| Repositories | Database queries                    |
| Models       | Schema definitions and validation   |

---

## 5.3 Code Examples (TypeScript)

### Routes Layer

```ts
router.get("/students", requireAuth, getAllStudents);
```

Defines:

* URL
* HTTP method
* Middleware
* Controller

---

### Middleware Layer

```ts
export function requireAuth(req, res, next) {
  if (!req.user) {
    return sendError(res, "Unauthorized", 401);
  }
  next();
}
```

Handles:

* Authentication
* Authorization
* Validation
* Logging

---

### Controller Layer

```ts
export async function getAllStudents(req, res) {
  const students = await studentService.getAll();
  sendSuccess(res, students);
}
```

Responsibilities:

* Extract request data
* Call service
* Format response

❌ No business logic here.

---

### Service Layer

```ts
export async function getAll() {
  return studentRepository.findAll();
}
```

Responsibilities:

* Business rules
* Data transformation
* Decision-making

---

### Repository Layer

```ts
export function findAll() {
  return StudentModel.find();
}
```

Responsibilities:

* Database interaction only
* No HTTP or business logic

---

### Model Layer

```ts
const StudentSchema = new Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, enum: ["active", "at-risk"] }
});
```

Responsibilities:

* Data structure
* Validation
* Persistence rules

---

## 5.4 Why This Architecture Matters

* Easy to test each layer independently
* Business logic remains reusable
* Database can be replaced without rewriting routes
* Frontend changes do not affect backend logic

This architecture is **industry-standard** and suitable for both learning and production systems.

---


# 6. API Versioning Strategy

API versioning ensures that **changes do not break existing clients**. As the backend evolves, older frontend applications or integrations must continue to function reliably.

---

## 6.1 Why Version APIs?

Without versioning:

* A small backend change can break the frontend
* Old clients stop working unexpectedly
* Debugging becomes difficult

With versioning:

* New features can be added safely
* Breaking changes are controlled
* Multiple client versions can coexist

**Rule of thumb:**

> Once an API is public or consumed by a frontend, it must be versioned.

---

## 6.2 URI Path Versioning

This project uses **URL-based versioning**, which is simple, explicit, and widely used.

### Format

```
/api/v1/<resource>
```

### Examples

```http
GET    /api/v1/students
POST   /api/v1/users
PATCH  /api/v1/attendance/:id
```

### Why URL-based versioning?

* Easy to understand
* Visible in logs and Postman
* No special headers required
* Beginner-friendly

---

## 6.3 Semantic Versioning (MAJOR.MINOR.PATCH)

The project follows **Semantic Versioning (SemVer)**:

```
MAJOR.MINOR.PATCH
```

| Version Part | Meaning                      | Example                                  |
| ------------ | ---------------------------- | ---------------------------------------- |
| **MAJOR**    | Breaking changes             | Removing fields, changing response shape |
| **MINOR**    | Backward-compatible features | Adding new endpoints                     |
| **PATCH**    | Bug fixes                    | Fixing validation or logic errors        |

---

### Examples

| Change                 | Version Update |
| ---------------------- | -------------- |
| Fix a bug              | `1.0.1`        |
| Add new endpoint       | `1.1.0`        |
| Change response format | `2.0.0`        |

---

## 6.4 Version Progression Timeline

Typical backend lifecycle:

```
0.1.0  → Initial prototype
0.5.0  → MVP (hackathon-ready)
1.0.0  → Stable release
1.1.0  → New features
2.0.0  → Breaking changes
```

For **UmeedAI**:

* Current stage: `0.5.0` (MVP)
* Target stable release: `1.0.0`

---

## 6.5 NPM Version Commands

NPM provides built-in commands to manage versions.

### Patch version

```bash
npm version patch
```

Example:

```
1.0.0 → 1.0.1
```

---

### Minor version

```bash
npm version minor
```

Example:

```
1.0.0 → 1.1.0
```

---

### Major version

```bash
npm version major
```

Example:

```
1.0.0 → 2.0.0
```

These commands:

* Update `package.json`
* Create a Git tag
* Encourage disciplined releases

---

## 6.6 Versioning Best Practices

* Never introduce breaking changes in a MINOR or PATCH release
* Deprecate old versions before removing them
* Maintain documentation per version
* Avoid versioning every small change
* Prefer `/api/v1` over header-based versioning for clarity

---

# 7. Application Structure

The backend follows a **layered, modular folder structure** designed for scalability and clarity.

---

## 7.1 Complete Folder Structure

```
src/
├── config/
│   ├── database.ts
│   ├── logger.ts
│
├── routes/
│   ├── index.ts
│   ├── user.routes.ts
│   ├── student.routes.ts
│
├── controllers/
│   ├── user.controller.ts
│   ├── student.controller.ts
│
├── services/
│   ├── user.service.ts
│   ├── student.service.ts
│
├── repositories/
│   ├── user.repository.ts
│   ├── student.repository.ts
│
├── models/
│   ├── user.model.ts
│   ├── student.model.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│
├── utils/
│   ├── response.utils.ts
│   ├── appError.ts
│
├── validation/
│   └── schemas/
│       ├── user.schema.ts
│       ├── student.schema.ts
│
├── server.ts
└── app.ts (optional)
```

---

## 7.2 File Naming Conventions

| Layer      | Naming Pattern             | Example                 |
| ---------- | -------------------------- | ----------------------- |
| Routes     | `<resource>.routes.ts`     | `student.routes.ts`     |
| Controller | `<resource>.controller.ts` | `student.controller.ts` |
| Service    | `<resource>.service.ts`    | `student.service.ts`    |
| Repository | `<resource>.repository.ts` | `student.repository.ts` |
| Model      | `<resource>.model.ts`      | `student.model.ts`      |
| Validation | `<resource>.schema.ts`     | `student.schema.ts`     |

---

## 7.3 Code Organization Pattern (Single Resource)

We’ll use **Student** as an example.

---

### Model Layer

```ts
const StudentSchema = new Schema({
  name: String,
  department: String,
  status: String
});

export const StudentModel = model("Student", StudentSchema);
```

---

### Repository Layer

```ts
export function findAllStudents() {
  return StudentModel.find();
}
```

---

### Service Layer

```ts
import * as studentRepo from "../repositories/student.repository";

export function getAllStudents() {
  return studentRepo.findAllStudents();
}
```

---

### Controller Layer

```ts
export async function getStudents(req, res) {
  const students = await studentService.getAllStudents();
  res.json({ success: true, data: students });
}
```

---

### Routes Layer

```ts
router.get("/students", requireAuth, getStudents);
```

---

## 7.4 Request Flow Summary

```
HTTP Request
   ↓
Routes
   ↓
Middleware (auth, validation)
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Model (MongoDB)
```

Each layer:

* Knows **only about the layer below**
* Has **one responsibility**
* Is independently testable


---

# 8. API Endpoints Specification

This section defines the **public contract** of the backend API.
All endpoints follow:

* REST principles (Richardson Level 2)
* JSON request/response format
* URL-based versioning (`/api/v1`)
* Consistent success and error responses

---

## 8.1 Managed Resources

The backend manages the following core resources:

1. **Users** – Faculty, mentors, and administrators
2. **Students** – Primary subjects of analysis
3. **Attendance** – Time-series attendance records
4. **Academics** – Marks, attempts, and academic performance
5. **Risk Assessments** – Derived, explainable risk insights
6. **Uploads** – CSV-based data ingestion

---

## 8.2 Endpoint Documentation Template

All endpoints are documented using the following template.

```md
### <HTTP METHOD> <ENDPOINT>

**Description:**  
Brief explanation of what the endpoint does.

**Authentication:**  
Required / Not Required

**Query Parameters:**  
- `param` (type) – description

**Request Body:**  
JSON schema (if applicable)

**Success Response:**  
- Status Code
- Response body

**Error Responses:**  
- Status Code – Reason
```

This template ensures:

* Consistency across documentation
* Easy onboarding for new developers
* Clear expectations for frontend integration

---

## 8.3 Core Endpoints Checklist

### Users

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/v1/auth/login` | Authenticate user |
| GET    | `/api/v1/users`      | Get all users     |
| GET    | `/api/v1/users/:id`  | Get user by ID    |
| POST   | `/api/v1/users`      | Create user       |
| PUT    | `/api/v1/users/:id`  | Update user       |
| DELETE | `/api/v1/users/:id`  | Delete user       |

---

### Students

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | `/api/v1/students`     | List students (paginated) |
| GET    | `/api/v1/students/:id` | Get student by ID         |
| POST   | `/api/v1/students`     | Create student            |
| PUT    | `/api/v1/students/:id` | Update student            |
| DELETE | `/api/v1/students/:id` | Delete student            |

---

### Attendance

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| GET    | `/api/v1/attendance`            | List attendance records   |
| POST   | `/api/v1/attendance`            | Add attendance record     |
| GET    | `/api/v1/attendance/:studentId` | Get attendance by student |

---

### Academics

| Method | Endpoint                       | Description            |
| ------ | ------------------------------ | ---------------------- |
| GET    | `/api/v1/academics/:studentId` | Get academic records   |
| POST   | `/api/v1/academics`            | Add academic record    |
| PUT    | `/api/v1/academics/:id`        | Update academic record |

---

### Risk Assessments

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| GET    | `/api/v1/risk/:studentId`  | Get risk assessment |
| POST   | `/api/v1/risk/recalculate` | Recalculate risk    |

---

### Uploads

| Method | Endpoint                  | Description     |
| ------ | ------------------------- | --------------- |
| POST   | `/api/v1/uploads/csv`     | Upload CSV data |
| GET    | `/api/v1/uploads/history` | Upload history  |

---

## 8.4 Detailed Example: GET Students (Paginated)

### GET `/api/v1/students`

**Description:**
Retrieve a paginated list of students with optional filters.

**Authentication:**
Required (JWT)

---

### Query Parameters

| Parameter    | Type   | Description                  |
| ------------ | ------ | ---------------------------- |
| `page`       | number | Page number (default: 1)     |
| `limit`      | number | Items per page (default: 10) |
| `department` | string | Filter by department         |
| `status`     | string | Filter by risk status        |

---

### Example Request

```http
GET /api/v1/students?page=1&limit=10&department=CS
Authorization: Bearer <JWT>
```

---

### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "64f1a9c2",
        "name": "Aman Verma",
        "department": "CS",
        "semester": 4,
        "status": "at-risk"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 57,
      "totalPages": 6
    }
  }
}
```

---

### Error Responses

* **401 Unauthorized** – Missing or invalid token
* **400 Bad Request** – Invalid query parameters

---

# 9. Response Format Standards

All API responses follow a **uniform structure** to simplify frontend handling and debugging.

---

## 9.1 Success Response Format

### TypeScript Interface

```ts
export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}
```

---

### Example: Single Resource

```json
{
  "success": true,
  "data": {
    "_id": "64f1a9c2",
    "name": "Aman Verma",
    "department": "CS"
  }
}
```

---

### Example: List with Pagination

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 0,
      "totalPages": 0
    }
  }
}
```

---

### Example: Created Resource (201 Created)

```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "64f1b2d9",
    "name": "Riya Sharma"
  }
}
```

---

### Example: Deleted Resource

```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": null
}
```

---

## 9.2 Error Response Format

### TypeScript Interface

```ts
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
```

---

### Example: Validation Error (400)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid input data",
    "details": [
      { "field": "name", "message": "Name is required" }
    ]
  }
}
```

---

### Example: Not Found (404)

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Student not found"
  }
}
```

---

## 9.3 Response Utility Code

To enforce consistency, responses are sent using shared utilities.

### `response.utils.ts`

```ts
import { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200
) {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

export function sendError(
  res: Response,
  error: { code: string; message: string; details?: unknown },
  statusCode = 500
) {
  res.status(statusCode).json({
    success: false,
    error
  });
}
```


---

# 10. Error Handling Strategy

A consistent and centralized error handling strategy is critical for:

* Debuggability
* Security (no stack traces leaking to clients)
* Frontend predictability
* Clean controller and service code

This backend follows a **fail-fast, centralized error handling approach**.

---

## 10.1 Error Handling Philosophy

* Controllers and services **do not send raw errors**
* All errors are normalized into a standard format
* One global error handler is responsible for responses
* Known error types are mapped to meaningful HTTP status codes
* Unknown errors default to `500 Internal Server Error`

---

## 10.2 Custom ApiError Class

Custom errors allow us to:

* Attach HTTP status codes
* Attach machine-readable error codes
* Distinguish expected vs unexpected failures

### `utils/appError.ts`

```ts
export class ApiError extends Error {
  public statusCode: number;
  public errorCode: string;
  public isOperational: boolean;

  constructor(
    statusCode: number,
    errorCode: string,
    message: string,
    isOperational = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
```

---

### Example Usage

```ts
throw new ApiError(
  404,
  "STUDENT_NOT_FOUND",
  "Student not found"
);
```

This keeps controllers clean and expressive.

---

## 10.3 Async Error Wrapper Utility

Express does not catch errors thrown inside async functions by default.
We use a wrapper to eliminate repetitive `try/catch` blocks.

### `utils/asyncHandler.ts`

```ts
import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
```

---

### Example Controller Usage

```ts
export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  sendSuccess(res, users);
});
```

---

## 10.4 Global Error Handler Middleware

All errors eventually reach this middleware.

### `middlewares/error.middleware.ts`

```ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/appError";
import { sendError } from "../utils/response.utils";

export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";
  let message = "Internal server error";

  // Custom application errors
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
  }

  // Mongoose validation error
  else if (err.name === "ValidationError") {
    statusCode = 400;
    errorCode = "VALIDATION_FAILED";
    message = Object.values((err as any).errors)
      .map((e: any) => e.message)
      .join(". ");
  }

  // Invalid ObjectId
  else if (err.name === "CastError") {
    statusCode = 400;
    errorCode = "INVALID_ID";
    message = "Invalid resource identifier";
  }

  // MongoDB duplicate key
  else if ((err as any).code === 11000) {
    statusCode = 409;
    errorCode = "DUPLICATE_FIELD";
    const field = Object.keys((err as any).keyValue)[0];
    message = `Duplicate value for field '${field}'`;
  }

  sendError(
    res,
    { code: errorCode, message },
    statusCode
  );
}
```

---

## 10.5 Error Type Mapping Summary

| Error Type       | HTTP Code | Error Code            |
| ---------------- | --------- | --------------------- |
| Validation error | 400       | VALIDATION_FAILED     |
| Invalid ID       | 400       | INVALID_ID            |
| Unauthorized     | 401       | UNAUTHORIZED          |
| Forbidden        | 403       | FORBIDDEN             |
| Not found        | 404       | NOT_FOUND             |
| Duplicate key    | 409       | DUPLICATE_FIELD       |
| Unknown          | 500       | INTERNAL_SERVER_ERROR |

---

# 11. Database Schema Design

This section defines how data is modeled and validated in MongoDB using Mongoose.

---

## 11.1 Schema Design Principles

* Each resource has **one schema**
* Schemas enforce validation at the database level
* Required fields are explicitly marked
* Indexes are added for frequently queried fields
* Sensitive fields are excluded from responses
* Timestamps are enabled by default

---

## 11.2 Example Schema: User

### TypeScript Interfaces

```ts
export type UserRole = "admin" | "faculty" | "mentor";

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### Mongoose Schema

```ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    role: {
      type: String,
      enum: ["admin", "faculty", "mentor"],
      default: "faculty"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
```

---

### Indexes

```ts
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
```

Indexes improve:

* Login performance
* Role-based queries

---

### Schema Middleware (Password Hashing)

```ts
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
});
```

---

### Instance Methods

```ts
UserSchema.methods.comparePassword = function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

---

### Model Export

```ts
export const UserModel = mongoose.model<IUserDocument>(
  "User",
  UserSchema
);
```

---

## 11.3 Schema Checklist for All Resources

| Resource         | Required Fields           | Indexed Fields     |
| ---------------- | ------------------------- | ------------------ |
| Users            | email, password, role     | email              |
| Students         | name, department, status  | department, status |
| Attendance       | studentId, date, status   | studentId, date    |
| Academics        | studentId, subject, marks | studentId          |
| Risk Assessments | studentId, score          | studentId          |
| Uploads          | filename, type, status    | createdAt          |

---

## 11.4 Why This Schema Design Works

* Strong validation prevents bad data
* Indexes keep queries fast
* Clear separation between domain models
* Secure handling of sensitive fields
* Scales naturally with new requirements

---


# 12. Development Workflow

This section defines **how backend development is carried out**, ensuring consistency, code quality, and predictable progress.

---

## 12.1 Order of Development (Step-by-Step)

The backend follows a **bottom-up development order**, starting from data models and moving outward to API exposure.

### Recommended Development Sequence

1. **Model**

    * Define schema and validation rules
    * Add indexes and hooks
2. **Repository**

    * Implement database queries
    * Keep logic database-specific only
3. **Service**

    * Apply business rules
    * Combine multiple repository calls if needed
4. **Controller**

    * Handle HTTP requests and responses
    * No business logic
5. **Routes**

    * Map HTTP methods and URLs to controllers
6. **Validation**

    * Validate request body, params, and query
7. **Testing**

    * Verify endpoints using Postman or automated tests

### Why This Order?

* Prevents rewriting logic
* Encourages separation of concerns
* Makes debugging easier
* Matches how real production backends are built

---

## 12.2 Git Workflow

The project uses a **simple and effective Git workflow**, suitable for both solo and team development.

### Branches

| Branch      | Purpose                       |
| ----------- | ----------------------------- |
| `main`      | Stable, production-ready code |
| `dev`       | Active development            |
| `feature/*` | Individual features or fixes  |

---

## 12.3 Branch Naming Conventions

Feature branches follow this pattern:

```text
feature/<short-description>
```

### Examples

```text
feature/auth-jwt
feature/student-crud
feature/csv-upload
```

Bug fixes:

```text
fix/validation-error
fix/mongo-connection
```

---

## 12.4 Commit Message Format (Conventional Commits)

Commit messages follow the **Conventional Commits** standard.

### Format

```text
<type>(optional-scope): short description
```

### Common Types

| Type       | Meaning                   |
| ---------- | ------------------------- |
| `feat`     | New feature               |
| `fix`      | Bug fix                   |
| `refactor` | Code refactoring          |
| `docs`     | Documentation changes     |
| `test`     | Adding or updating tests  |
| `chore`    | Tooling or config changes |

---

### Examples

```bash
feat(auth): add JWT login endpoint
fix(students): handle invalid ObjectId
docs(prd): add error handling section
```

---

## 12.5 Version Progression Timeline

Versioning follows **Semantic Versioning** throughout development.

### Typical Progression

```text
0.1.0  → Initial setup
0.3.0  → Core CRUD implemented
0.5.0  → MVP (hackathon ready)
1.0.0  → Stable release
1.1.0  → Backward-compatible features
2.0.0  → Breaking changes
```

Each release:

* Is tagged in Git
* Updates `package.json`
* Is documented in the PRD or release notes

---

# 13. OpenAPI Specification (Swagger)

OpenAPI (commonly known as Swagger) is used to **document and visualize REST APIs**.

---

## 13.1 What is OpenAPI / Swagger?

OpenAPI is a specification that:

* Describes API endpoints in a machine-readable format
* Generates interactive documentation
* Helps frontend and backend teams collaborate
* Reduces misunderstandings about request/response formats

Swagger UI renders this specification as a web interface.

---

## 13.2 Why Use Swagger?

* Single source of truth for API contracts
* Interactive testing directly in the browser
* Easy onboarding for new developers
* Required or strongly encouraged in many evaluations

---

## 13.3 Setup Instructions

### Install Dependencies

```bash
npm install swagger-ui-express swagger-jsdoc
```

---

### Swagger Configuration

```ts
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UmeedAI API",
      version: "1.0.0",
      description: "Backend API documentation for UmeedAI"
    }
  },
  apis: ["src/routes/*.ts"]
};

const specs = swaggerJsdoc(options);
```

---

### Mount Swagger UI

```ts
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
```

Access documentation at:

```text
http://localhost:5000/api-docs
```

---

## 13.4 JSDoc Annotation Example

Swagger documentation is generated using **JSDoc comments** in route files.

### Example: Students Route

```ts
/**
 * @openapi
 * /api/v1/students:
 *   get:
 *     summary: Get all students
 *     tags:
 *       - Students
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/students", requireAuth, getStudents);
```

---

## 13.5 Documenting Endpoints (Best Practices)

* Document **every public endpoint**
* Include:

    * Summary
    * Authentication requirement
    * Parameters
    * Response codes
* Keep documentation close to route definitions
* Update Swagger docs when APIs change

---

# 14. Testing Strategy

Testing ensures that the backend behaves correctly, remains stable during changes, and integrates smoothly with the frontend.

The UmeedAI backend follows a **layered testing approach**, moving from isolated logic to full system verification.

---

## 14.1 Testing Levels

### 1. Unit Testing

* Tests individual functions in isolation
* Focuses on services, utilities, and validators
* No database or network calls

**Tools:**

* Jest

---

### 2. Integration Testing

* Tests API endpoints with the database
* Verifies route → controller → service → repository flow
* Ensures correct HTTP responses

**Tools:**

* Jest
* Supertest

---

### 3. End-to-End (E2E) Testing

* Tests the system as a whole
* Validates real user flows
* Typically performed via Postman for MVP

**Tools:**

* Postman
* Browser (via frontend)

---

## 14.2 Manual Testing with Postman

Postman is used as the **primary manual testing and demo tool**.

### Postman Testing Checklist

* [ ] Health check endpoint responds (`/api/health`)
* [ ] Authentication works (login, token generation)
* [ ] Protected routes reject unauthenticated requests
* [ ] CRUD operations work for all resources
* [ ] Pagination parameters behave correctly
* [ ] Validation errors return structured messages
* [ ] Invalid IDs return 400 errors
* [ ] Non-existent resources return 404
* [ ] Duplicate records are handled gracefully

---

## 14.3 Example Automated Test (Jest + Supertest)

### Setup

```bash
npm install -D jest supertest @types/jest
```

---

### Example: Students API Test

```ts
import request from "supertest";
import { setupServer } from "../server";

describe("GET /api/v1/students", () => {
  const app = setupServer();

  it("should return list of students", async () => {
    const response = await request(app)
      .get("/api/v1/students")
      .set("Authorization", "Bearer test-token");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.items)).toBe(true);
  });
});
```

This test verifies:

* Route availability
* Correct HTTP status
* Response structure

---

# 15. Deployment Plan

The backend is designed to be deployed consistently across environments using environment variables and containerized services.

---

## 15.1 Environment Setup

| Environment | Purpose                | Database               |
| ----------- | ---------------------- | ---------------------- |
| Development | Local development      | Local MongoDB / Docker |
| Staging     | Pre-production testing | Cloud MongoDB          |
| Production  | Live system            | Cloud MongoDB          |

---

## 15.2 Deployment Platforms Comparison

| Platform    | Pros                        | Cons                       |
| ----------- | --------------------------- | -------------------------- |
| **Railway** | Simple setup, Mongo support | Free tier limits           |
| **Render**  | Stable, easy CI             | Slower cold starts         |
| **Vercel**  | Great for frontend          | Not ideal for Express APIs |

**Recommended for Backend:** Railway or Render
**Recommended for Frontend:** Vercel

---

## 15.3 Deployment Checklist

### Before Deployment

* [ ] All tests passing
* [ ] Environment variables configured
* [ ] MongoDB connection verified
* [ ] Swagger docs accessible
* [ ] `npm run build` successful
* [ ] `.env` not committed

---

### After Deployment

* [ ] Health check endpoint accessible
* [ ] Authentication works
* [ ] CRUD endpoints verified
* [ ] Logs monitored
* [ ] Frontend successfully consumes API

---

## 15.4 Environment Variables Template

```env
PORT=5000
NODE_ENV=production

MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/umeedai

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=12
```

---

# 16. Documentation Checklist

The following documentation files are required for a complete backend project.

---

## 16.1 Required Documentation Files

| File              | Purpose                    |
| ----------------- | -------------------------- |
| `README.md`       | Project overview and setup |
| `CONTRIBUTING.md` | Contribution guidelines    |
| `LICENSE`         | Legal usage terms          |
| `CHANGELOG.md`    | Version history            |

---

## 16.2 README.md Must Include

* Project description
* Tech stack
* Setup instructions
* Environment variables
* API documentation link
* Postman collection link

---

## 16.3 Optional (Recommended)

* `API_CONTRACTS.md`
* `ERROR_CODES.md`
* Architecture diagram

---


# 14. Testing Strategy

Testing ensures that the backend behaves correctly, remains stable during changes, and integrates smoothly with the frontend.

The UmeedAI backend follows a **layered testing approach**, moving from isolated logic to full system verification.

---

## 14.1 Testing Levels

### 1. Unit Testing

* Tests individual functions in isolation
* Focuses on services, utilities, and validators
* No database or network calls

**Tools:**

* Jest

---

### 2. Integration Testing

* Tests API endpoints with the database
* Verifies route → controller → service → repository flow
* Ensures correct HTTP responses

**Tools:**

* Jest
* Supertest

---

### 3. End-to-End (E2E) Testing

* Tests the system as a whole
* Validates real user flows
* Typically performed via Postman for MVP

**Tools:**

* Postman
* Browser (via frontend)

---

## 14.2 Manual Testing with Postman

Postman is used as the **primary manual testing and demo tool**.

### Postman Testing Checklist

* [ ] Health check endpoint responds (`/api/health`)
* [ ] Authentication works (login, token generation)
* [ ] Protected routes reject unauthenticated requests
* [ ] CRUD operations work for all resources
* [ ] Pagination parameters behave correctly
* [ ] Validation errors return structured messages
* [ ] Invalid IDs return 400 errors
* [ ] Non-existent resources return 404
* [ ] Duplicate records are handled gracefully

---

## 14.3 Example Automated Test (Jest + Supertest)

### Setup

```bash
npm install -D jest supertest @types/jest
```

---

### Example: Students API Test

```ts
import request from "supertest";
import { setupServer } from "../server";

describe("GET /api/v1/students", () => {
  const app = setupServer();

  it("should return list of students", async () => {
    const response = await request(app)
      .get("/api/v1/students")
      .set("Authorization", "Bearer test-token");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.items)).toBe(true);
  });
});
```

This test verifies:

* Route availability
* Correct HTTP status
* Response structure

---

# 15. Deployment Plan

The backend is designed to be deployed consistently across environments using environment variables and containerized services.

---

## 15.1 Environment Setup

| Environment | Purpose                | Database               |
| ----------- | ---------------------- | ---------------------- |
| Development | Local development      | Local MongoDB / Docker |
| Staging     | Pre-production testing | Cloud MongoDB          |
| Production  | Live system            | Cloud MongoDB          |

---

## 15.2 Deployment Platforms Comparison

| Platform    | Pros                        | Cons                       |
| ----------- | --------------------------- | -------------------------- |
| **Railway** | Simple setup, Mongo support | Free tier limits           |
| **Render**  | Stable, easy CI             | Slower cold starts         |
| **Vercel**  | Great for frontend          | Not ideal for Express APIs |

**Recommended for Backend:** Railway or Render
**Recommended for Frontend:** Vercel

---

## 15.3 Deployment Checklist

### Before Deployment

* [ ] All tests passing
* [ ] Environment variables configured
* [ ] MongoDB connection verified
* [ ] Swagger docs accessible
* [ ] `npm run build` successful
* [ ] `.env` not committed

---

### After Deployment

* [ ] Health check endpoint accessible
* [ ] Authentication works
* [ ] CRUD endpoints verified
* [ ] Logs monitored
* [ ] Frontend successfully consumes API

---

## 15.4 Environment Variables Template

```env
PORT=5000
NODE_ENV=production

MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/umeedai

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=12
```

---

# 16. Documentation Checklist

The following documentation files are required for a complete backend project.

---

## 16.1 Required Documentation Files

| File              | Purpose                    |
| ----------------- | -------------------------- |
| `README.md`       | Project overview and setup |
| `CONTRIBUTING.md` | Contribution guidelines    |
| `LICENSE`         | Legal usage terms          |
| `CHANGELOG.md`    | Version history            |

---

## 16.2 README.md Must Include

* Project description
* Tech stack
* Setup instructions
* Environment variables
* API documentation link
* Postman collection link

---

## 16.3 Optional (Recommended)

* `API_CONTRACTS.md`
* `ERROR_CODES.md`
* Architecture diagram

---


