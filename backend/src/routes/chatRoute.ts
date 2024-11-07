import { Router } from "express";
import { createChat, getMychats } from "../controller/chatController";

const router: Router = Router();

router.route("/").post(createChat).get(getMychats);

export default router;
