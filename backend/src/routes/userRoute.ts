import { Router } from "express";
import { userLogin, userSignup, verifyMail, verifyOTP } from "../controller/userController";

const router: Router = Router();

router.post("/verify-email", verifyMail);
router.post("/verify-otp", verifyOTP);
router.post("/signup", userSignup);
router.post("/login", userLogin)

export default router;
