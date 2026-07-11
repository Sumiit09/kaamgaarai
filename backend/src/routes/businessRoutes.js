import express from "express";

import {
  getBusinesses,
  createBusiness,
  getMyBusiness,
} from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusinesses);
router.post("/", createBusiness);
router.get("/me/:ownerId", getMyBusiness);

export default router;