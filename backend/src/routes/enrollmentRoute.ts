import { Router } from "express";
import {
  createEnrollment,
  updateProgress,
  verifyPayment,
} from "../controller/enrollmentController";

const router: Router = Router();

router.post("/create", createEnrollment);
router.post("/verify", verifyPayment);
router.post("/update-progress", updateProgress);

export default router;
