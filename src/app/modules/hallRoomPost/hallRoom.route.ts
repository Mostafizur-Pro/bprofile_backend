import express from "express";
import { HallRoomPostController } from "./hallRoom.controller";


const router = express.Router();

router.post("/", HallRoomPostController.createHallRoomPost);

export const hallRoomPostRoutes = router;
