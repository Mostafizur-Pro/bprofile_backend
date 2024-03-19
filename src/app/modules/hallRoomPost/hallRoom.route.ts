import express from "express";
import { HallRoomPostController } from "./hallRoom.controller";


const router = express.Router();

router.get("/", HallRoomPostController.getAllHallRoomPost);
router.get("/:id", HallRoomPostController.getHallRoomPostById);
router.post("/", HallRoomPostController.createHallRoomPost);

export const hallRoomPostRoutes = router;
