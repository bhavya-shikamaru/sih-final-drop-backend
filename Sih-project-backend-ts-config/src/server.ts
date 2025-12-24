/**
 * UmeedAI API Server
 *
 * Main entry point for the Express.js REST API server.
 * This server provides endpoints for:
 * - Authentication & Users (faculty, mentors, admins)
 * - Students (subjects of analysis)
 * - Attendance Records (time-series)
 * - Academic Records (marks, attempts)
 * - Risk Assessments (AI-driven insights)
 * - Data Uploads (CSV ingestion)
 *
 * @module server
 */

import express, { Request, Response, NextFunction } from "express";
import apiRouter from "./routes";

/**
 * Express application instance.
 */
const app = express();

/**
 * Server port from environment variable or default.
 */
const PORT = process.env.PORT || 5000;

// ============================================================================
// Middleware Configuration
// ============================================================================

/**
 * Parse JSON request bodies.
 * Required for POST/PUT/PATCH requests.
 */
app.use(express.json());

/**
 * Parse URL-encoded request bodies.
 * Supports form submissions.
 */
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// Routes
// ============================================================================

/**
 * Health check endpoint.
 * Useful for monitoring and deployment verification.
 */
app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "UmeedAI API is healthy"
    });
});

/**
 * Mount the main API router.
 * All endpoints are prefixed with /api.
 */
app.use("/api", apiRouter);

// ============================================================================
// Error Handling
// ============================================================================

/**
 * 404 Not Found handler.
 * Catches requests to undefined routes.
 */
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found"
    });
});

/**
 * Global error handler.
 * Ensures consistent error responses.
 */
app.use(
    (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error("Unhandled error:", err.message);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
);

// ============================================================================
// Server Startup
// ============================================================================

/**
 * Start the HTTP server.
 * Logs startup information for local development.
 */
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    UmeedAI API Server                        ║
╠══════════════════════════════════════════════════════════════╣
║  Status:    Running                                          ║
║  Port:      ${String(PORT).padEnd(44)}║
║  Base URL:  http://localhost:${String(PORT).padEnd(29)}║
╠══════════════════════════════════════════════════════════════╣
║  Endpoints:                                                  ║
║  • CRUD /api/users             - System users                ║
║  • CRUD /api/students          - Student records             ║
║  • CRUD /api/attendance        - Attendance data             ║
║  • CRUD /api/academics         - Academic records            ║
║  • GET  /api/risk/:studentId   - Risk assessment             ║
║  • POST /api/uploads           - CSV data uploads            ║
╚══════════════════════════════════════════════════════════════╝
	`);
});

