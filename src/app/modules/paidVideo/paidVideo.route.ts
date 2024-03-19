import express from "express";
import { PaidVideoController } from "./paidVideo.controller";

const router = express.Router();

router.get("/", PaidVideoController.getAllPaidVideo);
router.get("/:id", PaidVideoController.getPaidVideoById);
router.post("/", PaidVideoController.createPaidVideo);
router.put("/:id", PaidVideoController.updatePaidVideo);
router.delete("/:id", PaidVideoController.deletePaidVideo);

export const paidVideoRoutes = router;
