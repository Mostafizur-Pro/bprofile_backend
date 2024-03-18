import express from "express";
import { MessageController } from "./message.controller";

const router = express.Router();

router.get("/", MessageController.getAllMessages);
router.get("/:id", MessageController.getMessageById);
router.post("/", MessageController.createMessage);
router.put("/:id", MessageController.updateMessage);
router.delete("/:id", MessageController.deleteMessage);

export const messageRoutes = router;
