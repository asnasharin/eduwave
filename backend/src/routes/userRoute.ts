import { Router } from "express";
import { googleAuth, userLogin, userSignup, verifyMail, verifyOTP } from "../controller/userController";

const router: Router = Router();

router.post("/verify-email", verifyMail);
router.post("/verify-otp", verifyOTP);
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/googleAuth", googleAuth);

export default router;
