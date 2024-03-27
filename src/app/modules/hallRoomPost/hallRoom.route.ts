import express from "express";
import { HallRoomPostController } from "./hallRoom.controller";
import { upload } from "../../middleware/multer";

const router = express.Router();

router.get("/", HallRoomPostController.getAllHallRoomPost);
router.get("/:id", HallRoomPostController.getHallRoomPostById);
// router.post("/", HallRoomPostController.createHallRoomPost);
// router.post(
//   "/",
// //   upload.array("files"),
//   HallRoomPostController.createHallRoomPost
// );
router.put("/:id", HallRoomPostController.updateHallRoomPost);
router.delete("/:id", HallRoomPostController.deleteHallRoomPost);

export const hallRoomPostRoutes = router;
