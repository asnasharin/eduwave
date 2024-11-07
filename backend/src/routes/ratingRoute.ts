import { Router } from "express";
import {
  createTutorRating,
  getMyTutorRating,
  createCourseRating,
  getMyCourseRating,
} from "../controller/RatingController";

const router: Router = Router();

router.post("/", createTutorRating);
router.get("/", getMyTutorRating);
router.post("/course", createCourseRating);
router.get("/course", getMyCourseRating);

export default router;
