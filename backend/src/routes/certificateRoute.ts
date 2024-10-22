import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  createCertificate,
  getCertificate,
  verifyCertificate,
} from "../controller/certificatecontroller";

const router: Router = Router();

router.post("/", protect, createCertificate);
router.get("/:id", protect, getCertificate);
router.post("/verify", verifyCertificate);

export default router;
