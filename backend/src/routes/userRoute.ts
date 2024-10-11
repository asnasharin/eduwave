import { Router } from "express";
import { checkPassword, googleAuth, resetPassword, userLogin, userSignup, verifyMail, verifyOTP } from "../controller/userController";
import { protect } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/verify-email", verifyMail);
router.post("/verify-otp", verifyOTP);
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/googleAuth", googleAuth);
router
   .route("/resetpassword")
   .post(protect, checkPassword)
   .patch(protect, resetPassword);

export default router;
