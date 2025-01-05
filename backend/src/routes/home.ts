import { Router } from "express";
import { executeProgram } from "../handlers/home";


const router = Router()

router.post("/execute", executeProgram);

export default router;