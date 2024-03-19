import express from "express";
import { PaidImageController } from "./paidImage.controller";

const router = express.Router();

router.get("/", PaidImageController.getAllPaidImage);
router.get("/:id", PaidImageController.getPaidImageById);
router.post("/", PaidImageController.createPaidImage);
router.put("/:id", PaidImageController.updatePaidImage);
router.delete("/:id", PaidImageController.deletePaidImage);

export const paidImageRoutes = router;
