import express from "express";

import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/:businessId", getBookings);

router.patch("/:id", updateBooking);

router.delete("/:id", deleteBooking);

export default router;