import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
} from "../controller/messageController";

const router: Router = Router();

router.post("/", createMessage);
router.route("/:id").get(getAllMessages).patch(deleteMessage);

export default router;
