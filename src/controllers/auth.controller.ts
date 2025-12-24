import { Request, Response } from "express";
import { sendSuccess, sendError } from "../utils/response.utils";

export function login(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (!email || !password) {
        sendError(res, "Email and password are required", 400);
        return;
    }

    // TEMP: fake login for Postman + flow testing
    sendSuccess(res, {
        accessToken: "FAKE_JWT_TOKEN_123",
        user: {
            id: "mentor_123",
            role: "mentor"
        }
    });
}
