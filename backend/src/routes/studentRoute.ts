import { Router } from "express";
import {
  getProfile,
  updateProfile,
  updateStudentProfile,
} from "../controller/studentProfileController";


const router: Router = Router();

router.route("/").get(getProfile).post(updateStudentProfile);
router.patch("/updateProfilePicture", updateProfile);


export default router;
