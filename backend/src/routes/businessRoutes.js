import express from "express";

import {
  getBusinesses,
  createBusiness,
  getMyBusiness,
  updateBusiness,
} from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusinesses);
router.post("/", createBusiness);

// Agar getMyBusiness bana hua hai to ye line rakho
router.get("/me/:ownerId", getMyBusiness);

router.patch("/:id", updateBusiness);

export default router;