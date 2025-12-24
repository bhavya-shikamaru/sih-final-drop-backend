/**
 * Validation Middleware
 *
 * Validates incoming request data using Zod schemas.
 * This middleware runs BEFORE controllers, ensuring only
 * valid and sanitized data reaches business logic.
 *
 * Why this exists in UmeedAI:
 * - Prevent malformed student / academic data
 * - Protect MongoDB from invalid writes
 * - Provide clear, explainable error messages
 * - Keep controllers clean and focused
 *
 * @module middlewares/validation.middleware
 */

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { sendError } from "../utils/response.utils";

/**
 * Which part of the request should be validated.
 *
 * - body   : Request body (POST / PUT / PATCH)
 * - query  : Query string (?page=1&limit=10)
 * - params : URL parameters (/students/:id)
 */
type ValidationTarget = "body" | "query" | "params";

/**
 * Creates a validation middleware for a single request target.
 *
 * This is a middleware factory that returns an Express middleware.
 *
 * Flow:
 * 1. Extract request data (body / query / params)
 * 2. Validate using Zod schema
 * 3. Replace request data with validated & transformed data
 * 4. Forward request OR return validation error
 *
 * @param schema - Zod schema defining valid data
 * @param target - Request target to validate (default: body)
 */
export function validate(
    schema: ZodSchema,
    target: ValidationTarget = "body"
) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const data = req[target];

            // Validate and transform data
            const validated = schema.parse(data);

            // Replace original request data with validated data
            if (target === "body") {
                req.body = validated;
            } else if (target === "query") {
                Object.assign(req.query, validated);
            } else if (target === "params") {
                Object.assign(req.params, validated);
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const validationErrors = error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                }));

                sendError(res, "Validation failed", 400, validationErrors);
                return;
            }

            // Unexpected error → forward to global error handler
            next(error);
        }
    };
}

/**
 * Validates multiple parts of the request at once.
 *
 * Useful when:
 * - params + body
 * - query + body
 *
 * All validation errors are collected and returned together.
 *
 * @param schemas - Mapping of request targets to Zod schemas
 */
export function validateMultiple(
    schemas: Partial<Record<ValidationTarget, ZodSchema>>
) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const allErrors: Array<{ field: string; message: string }> = [];

        for (const [target, schema] of Object.entries(schemas)) {
            if (!schema) continue;

            try {
                const data = req[target as ValidationTarget];
                const validated = schema.parse(data);

                if (target === "body") {
                    req.body = validated;
                } else if (target === "query") {
                    Object.assign(req.query, validated);
                } else if (target === "params") {
                    Object.assign(req.params, validated);
                }
            } catch (error) {
                if (error instanceof ZodError) {
                    const errors = error.issues.map((issue) => ({
                        field: `${target}.${issue.path.join(".")}`,
                        message: issue.message
                    }));
                    allErrors.push(...errors);
                } else {
                    next(error);
                    return;
                }
            }
        }

        if (allErrors.length > 0) {
            sendError(res, "Validation failed", 400, allErrors);
            return;
        }

        next();
    };
}

/**
 * Sanitizes a single string to prevent XSS attacks.
 *
 * Escapes HTML special characters so scripts cannot execute.
 */
export function sanitizeString(input: string): string {
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;")
        .trim();
}

/**
 * Recursively sanitizes all string values in an object or array.
 *
 * Used when handling nested request bodies (e.g. academic records,
 * student metadata, CSV ingestion results).
 */
export function sanitizeObject<T>(obj: T): T {
    if (typeof obj === "string") {
        return sanitizeString(obj) as T;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => sanitizeObject(item)) as T;
    }

    if (obj && typeof obj === "object") {
        const sanitized: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            sanitized[key] = sanitizeObject(value);
        }
        return sanitized as T;
    }

    return obj;
}
