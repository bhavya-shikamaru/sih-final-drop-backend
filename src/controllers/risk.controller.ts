import { Request, Response } from "express";
import { sendSuccess } from "../utils/response.utils";
import { ConfigService } from "../services/config.service";

export function getRiskByStudent(req: Request, res: Response): void {
    const { studentId } = req.params;

    // TODO: Refactor this logic into a dedicated RiskService (T013)
    const configService = new ConfigService();

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
