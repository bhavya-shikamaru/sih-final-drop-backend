import { Router } from "express";
import { createAttendance } from "../controllers/attendance.controller";

const router = Router();

router.post("/", createAttendance);

export default router;
