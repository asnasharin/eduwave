import { Router } from "express";
import {
  getAUserPosts,
  createStudentPost,
  deleteStudentPost,
  updateStudentpost,
} from "../controller/studentPostController";

const router: Router = Router();

router.route("/").get(getAUserPosts).post(createStudentPost);
router.route("/:id").put(updateStudentpost).patch(deleteStudentPost);
export default router;
