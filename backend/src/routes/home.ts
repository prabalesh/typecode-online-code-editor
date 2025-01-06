import { Router } from "express";
import { executeProgram, getRuntimes } from "../handlers/home";


const router = Router()

router.get("/runtimes", getRuntimes);
router.post("/execute", executeProgram);

export default router;