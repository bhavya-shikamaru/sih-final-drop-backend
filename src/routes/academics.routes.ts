import { Router } from "express";
import { createAcademic } from "../controllers/academics.controller";

const router = Router();

router.post("/", createAcademic);

export default router;
