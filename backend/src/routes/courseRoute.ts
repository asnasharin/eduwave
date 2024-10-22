import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getCourses,
  viewCourse,
} from "../controller/courseConroller";
import { protect, isLoggedIn } from "../middlewares/authMiddleware";
const router: Router = Router();

router.route("/").get(isLoggedIn, getCourses).post(protect, createCourse);
router
  .route("/:id")
  .get(isLoggedIn, viewCourse)
  .put(protect, editCourse)
  .patch(protect, deleteCourse);

export default router;
