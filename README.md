

---

# 🚀 UmeedAI – Backend REST API

UmeedAI is a backend REST API designed to **identify students at risk of academic drop-out** by consolidating attendance, academic performance, and engagement data into a single, explainable system for mentors and faculty.

The backend follows **industry-grade REST principles**, emphasizes **explainability over black-box AI**, and is optimized for **public technical institutes with limited resources**.

---

## 📌 Features

* RESTful API (Richardson Maturity Model – Level 2)
* Role-based users (admin, faculty, mentor)
* Student, attendance, and academic record management
* Explainable risk assessment engine
* CSV-based data ingestion
* MongoDB persistence using Mongoose
* Centralized error handling & validation
* Docker-compatible MongoDB setup
* Swagger (OpenAPI) documentation
* Postman collection for testing and demos

---

## 🧱 Tech Stack

### Backend

* **Node.js** (LTS)
* **Express.js**
* **TypeScript**
* **MongoDB Community Server**
* **Mongoose (ODM)**

### Tooling

* **Postman** – API testing
* **MongoDB Compass** – DB inspection
* **Docker** – Database container
* **Swagger UI** – API documentation
* **JWT** – Authentication
* **Zod** – Request validation

---

## 📁 Project Structure

```
src/
├── config/           # Database, logger, env setup
├── routes/           # API route definitions
├── controllers/      # HTTP request handlers
├── services/         # Business logic
├── repositories/     # Database access layer
├── models/           # Mongoose schemas
├── middlewares/      # Auth, validation, error handling
├── validation/       # Zod schemas
├── utils/            # Response helpers, errors
├── server.ts         # Server entry point
```

---

## 🔁 API Architecture

```
Client
  ↓
Routes
  ↓
Middleware (Auth, Validation)
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
MongoDB
```

Each layer has **one responsibility**, making the codebase easy to maintain and scale.

---

## 📚 API Documentation

### Swagger (OpenAPI)

After running the server, access API docs at:

```
http://localhost:5000/api-docs
```

---

## 🧪 Testing

### Manual Testing

* Postman collection used for:

    * Authentication
    * CRUD operations
    * Pagination
    * Validation errors
    * Demo flows

### Automated Testing

* **Jest** + **Supertest**
* Unit and integration tests supported

---

## ⚙️ Environment Setup

### Prerequisites

* Node.js (v18+ recommended)
* Docker
* MongoDB Compass (optional but recommended)

---

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/umeedai

JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=12
```

---

## 🐳 MongoDB via Docker

Run MongoDB using Docker:

```bash
docker run -d \
  --name umeedai-mongo \
  -p 27017:27017 \
  mongo:latest
```

---

## ▶️ Running the Server

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run dev
```

Health check:

```http
GET /api/health
```

Expected response:

```json
{
  "success": true,
  "message": "UmeedAI API is healthy"
}
```

---

## 📦 Core API Resources

| Resource   | Description              |
| ---------- | ------------------------ |
| Users      | Faculty, mentors, admins |
| Students   | Primary subjects         |
| Attendance | Time-series records      |
| Academics  | Marks and attempts       |
| Risk       | Risk assessment output   |
| Uploads    | CSV ingestion            |
| Config     | Dynamic risk threshold management (admin-only) |

All endpoints are versioned under:

```
/api/v1/*
```

---

## 🔐 Authentication

* JWT-based authentication
* Protected routes require:

```http
Authorization: Bearer <token>
```

RBAC is implemented at the middleware level.

---

## 📈 Success Criteria (MVP)

* All CRUD endpoints functional
* Explainable risk assessment working
* MongoDB persistence verified
* Postman demo under 2 minutes
* No unhandled runtime errors

---

## 🛣️ Roadmap (Phase 2)

* Adaptive risk thresholds
* Scheduled recalculations
* Automated mentor alerts
* Department-level analytics
* Audit logs and advanced RBAC

---

## 📖 References

* Express.js – [https://expressjs.com](https://expressjs.com)
* MongoDB – [https://www.mongodb.com/docs](https://www.mongodb.com/docs)
* Mongoose – [https://mongoosejs.com/docs](https://mongoosejs.com/docs)
* OpenAPI – [https://swagger.io/specification](https://swagger.io/specification)
* OWASP API Security – [https://owasp.org/www-project-api-security](https://owasp.org/www-project-api-security)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

Built as part of a **human-centered AI initiative** focused on early academic intervention, transparency, and educator empowerment.

---

