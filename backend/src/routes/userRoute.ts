import { Router } from "express";
import { userSignup, verifyMail, verifyOTP } from "../controller/userController";

const router: Router = Router();

router.post("/verify-email", verifyMail);
router.post("/verify-otp", verifyOTP);
router.post("/signup", userSignup);

export default router;
