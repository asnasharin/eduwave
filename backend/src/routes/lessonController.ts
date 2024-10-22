import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  createLesson,
  deleteLesson,
  editLesson,
  getLessons,
} from "../controller/lessonController";

const router: Router = Router();

router.post("/", protect, createLesson);
router
  .route("/:id")
  .put(protect, editLesson)
  .patch(protect, deleteLesson)
  .get(protect, getLessons);

export default router;
