import { Request, Response } from "express";
import { sendSuccess } from "../utils/response.utils";

export function getRiskByStudent(req: Request, res: Response): void {
    const { studentId } = req.params;

    // TEMP: deterministic fake logic for demo
    sendSuccess(res, {
        studentId,
        riskScore: 78,
        riskLevel: "high",
        factorsTriggered: [
            "Attendance below 65%",
            "Midsem score declining"
        ]
    });
}
