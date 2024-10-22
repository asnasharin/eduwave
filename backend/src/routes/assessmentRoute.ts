import { Router } from "express";
import {
  createAssessment,
  getAssessment,
  checkAssessment,
} from "../controller/AssesssmentControler";

const router: Router = Router();

router.post("/", createAssessment);
router.get("/:id", getAssessment);
router.post("/verify", checkAssessment);

export default router;
