/**
 * students Controller
 *
 * Handles CRUD operations for students monitored by UmeedAI.
 * students are subjects of analysis, not system users.
 */

import { Request, Response } from "express";
import {
    Student,
    CreateStudentInput,
    UpdateStudentInput,
    studentsStore
} from "../models/students/Student.model";
import {
    sendSuccess,
    sendError,
    getPaginationMeta,
    parsePaginationParams,
    generateId
} from "../utils/response.utils";

/**
 * GET /api/students
 *
 * Retrieves all students with pagination and optional filters.
 *
 * Query params:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 * - department: Filter by department
 * - status: active | at-risk | dropped
 */
export function getAllStudents(req: Request, res: Response): void {
    const { page, limit } = parsePaginationParams(
        req.query.page as string,
        req.query.limit as string
    );

    const department = req.query.department as string | undefined;
    const status = req.query.status as Student["status"] | undefined;

    let filtered = [...studentsStore];

    if (department) {
        filtered = filtered.filter(
            s => s.department.toLowerCase() === department.toLowerCase()
        );
    }

    if (status) {
        filtered = filtered.filter(s => s.status === status);
    }

    const startIndex = (page - 1) * limit;
    const paginatedStudents = filtered.slice(startIndex, startIndex + limit);

    sendSuccess(res, {
        students: paginatedStudents,
        pagination: getPaginationMeta(page, limit, filtered.length)
    });
}

/**
 * GET /api/students/:id
 *
 * Retrieves a single student by ID.
 */
export function getStudentById(req: Request, res: Response): void {
    const { id } = req.params;
    const student = studentsStore.find(s => s._id === id);

    if (!student) {
        sendError(res, "Student not found", 404);
        return;
    }

    sendSuccess(res, student);
}

/**
 * POST /api/students
 *
 * Creates a new student record.
 *
 * Request body: CreateStudentInput
 */
export function createStudent(req: Request, res: Response): void {
    const input: CreateStudentInput = req.body;
    const errors: Array<{ field: string; message: string }> = [];

    if (!input.enrollmentId) {
        errors.push({ field: "enrollmentId", message: "Enrollment ID is required" });
    }

    if (!input.name) {
        errors.push({ field: "name", message: "Student name is required" });
    }

    if (!input.department) {
        errors.push({ field: "department", message: "Department is required" });
    }

    if (studentsStore.some(s => s.enrollmentId === input.enrollmentId)) {
        errors.push({
            field: "enrollmentId",
            message: "Enrollment ID must be unique"
        });
    }

    if (errors.length > 0) {
        sendError(res, "Validation failed", 400, errors);
        return;
    }

    const now = new Date();

    const newStudent: Student = {
        _id: generateId(),
        ...input,
        status: "active",
        createdAt: now,
        updatedAt: now
    };

    studentsStore.push(newStudent);
    sendSuccess(res, newStudent, 201, "Student created successfully");
}

/**
 * PUT /api/students/:id
 *
 * Updates an existing student.
 * Supports partial updates.
 *
 * Request body: UpdateStudentInput
 */
export function updateStudent(req: Request, res: Response): void {
    const { id } = req.params;
    const updates: UpdateStudentInput = req.body;

    const index = studentsStore.findIndex(s => s._id === id);

    if (index === -1) {
        sendError(res, "Student not found", 404);
        return;
    }

    const updatedStudent: Student = {
        ...studentsStore[index],
        ...updates,
        _id: studentsStore[index]._id, // Prevent ID modification
        enrollmentId: studentsStore[index].enrollmentId, // Prevent enrollmentId changes
        updatedAt: new Date()
    };

    studentsStore[index] = updatedStudent;
    sendSuccess(res, updatedStudent, 200, "Student updated successfully");
}

/**
 * DELETE /api/students/:id
 *
 * Soft-deletes a student by marking status as "dropped".
 */
export function deleteStudent(req: Request, res: Response): void {
    const { id } = req.params;
    const student = studentsStore.find(s => s._id === id);

    if (!student) {
        sendError(res, "Student not found", 404);
        return;
    }

    student.status = "dropped";
    student.updatedAt = new Date();

    sendSuccess(res, null, 200, "Student marked as dropped");
}
