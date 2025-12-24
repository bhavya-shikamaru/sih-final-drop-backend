import { Request, Response } from "express";
import { attendanceStore, CreateAttendanceInput } from "../models/attendance/Attendance.model";
import { sendSuccess, sendError, generateId } from "../utils/response.utils";

export function createAttendance(req: Request, res: Response): void {
    const input: CreateAttendanceInput = req.body;

    if (!input.studentId || !input.subjectCode) {
        sendError(res, "Invalid attendance data", 400);
        return;
    }

    const record = {
        _id: generateId(),
        ...input,
        recordedAt: new Date(input.recordedAt)
    };

    attendanceStore.push(record);
    sendSuccess(res, record, 201, "Attendance record created");
}
