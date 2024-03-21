import express from "express";
import { LocationController } from "./location.controller";


const router = express.Router();

router.get("/", LocationController.getAllLocations);

export const locationRoutes = router;
