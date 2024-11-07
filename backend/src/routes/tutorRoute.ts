import { Router } from "express";
import {
  getProfile,
  updateProfilePicture,
  updateTutorProfile,
  getStudentsPosts,
  getMyStudents,
  getAllTutors,
} from "../controller/tutorProfileController";

import {
  uploadDoc,
  getMydocmunts,
  deleteDocument,
} from "../controller/documentController";

import {
  createConnection,
  CancelConnection,
  getAllmyRequests,
  acceptRequest,
  deleteRequest,
} from "../controller/requestController";
import { getMyCourses } from "../controller/courseConroller";
import { isLoggedIn, protect } from "../middlewares/authMiddleware";

const router: Router = Router();

router.route("/").get(protect, getProfile).post(protect, updateTutorProfile);
router.patch("/updateProfilePicture", protect, updateProfilePicture);
router.post("/uploadDoc", protect, uploadDoc);
router.get("/documents", protect, getMydocmunts);
router.patch("/deletedocument", protect, deleteDocument);
router.get("/posts", protect, getStudentsPosts);
router.get("/requests", protect, getAllmyRequests);
router.post("/acceptRequest/:id", protect, acceptRequest);
router.delete("/deleteRequest/:id", protect, deleteRequest);
router.post("/createRequest", protect, createConnection);
router.post("/cancelConnection", protect, CancelConnection);
router.get("/myStudents", protect, getMyStudents);
router.get("/my_courses", protect, getMyCourses);
router.get("/all", isLoggedIn, getAllTutors);

export default router;
