import { Router } from "express";

import authRoutes from "./auth.routes";
import studentRoutes from "./students.routes";
import attendanceRoutes from "./attendance.routes";
import academicRoutes from "./academics.routes";


const router = Router();

// Auth routes
router.use("/auth", authRoutes);

// Student routes
router.use("/students", studentRoutes);

// Attendance routes
router.use("/attendance", attendanceRoutes);

// Academic routes
router.use("/academics", academicRoutes);



export default router;
