import { Request, Response } from "express";
import { academicStore, CreateAcademicInput } from "../models/academics/Academic.model";
import { sendSuccess, sendError, generateId } from "../utils/response.utils";

export function createAcademic(req: Request, res: Response): void {
    const input: CreateAcademicInput = req.body;

    if (!input.studentId || !input.subjectCode) {
        sendError(res, "Invalid academic data", 400);
        return;
    }

    const record = {
        _id: generateId(),
        ...input,
        recordedAt: new Date()
    };

    academicStore.push(record);
    sendSuccess(res, record, 201, "Academic record created");
}
