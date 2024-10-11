import { Router } from "express";
import { verifyMail, verifyOTP } from "../controller/userController";

const router: Router = Router();

router.post("/verify-email", verifyMail);
router.post("/verify-otp", verifyOTP);

export default router;
