import express from "express";

import {
  getServices,
  createService,
  deleteService,
  updateService,
} from "../controllers/serviceController.js";
const router = express.Router();

router.get("/:businessId", getServices);
router.post("/:businessId", createService);
router.delete("/:id", deleteService);
router.patch("/:id", updateService);
export default router;