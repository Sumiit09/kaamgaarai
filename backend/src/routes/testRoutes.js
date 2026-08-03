import express from "express";
import { extractIntent } from "../ai/intentExtractor.js";

const router = express.Router();

router.post("/intent", async (req, res) => {
    try {
        const { message } = req.body;

        const result = await extractIntent(message);

        res.json({
            success: true,
            result
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;

import { matchService } from "../services/serviceMatcher.js";

router.post("/service-match", (req, res) => {

    const { userService, services } = req.body;

    const result = matchService(userService, services);

    res.json({
        success: true,
        result
    });

});

import { getBookingsForDate } from "../services/availabilityService.js";

router.post("/availability", async (req, res) => {

    try {

        const {
            businessId,
            appointmentDate
        } = req.body;

        const bookings = await getBookingsForDate(
            businessId,
            appointmentDate
        );

        res.json({
            success: true,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

import { isSlotAvailable } from "../services/availabilityService.js";

router.post("/slot-check", async (req, res) => {

    try {

        const {
            businessId,
            appointmentDate,
            appointmentTime
        } = req.body;

        const available = await isSlotAvailable(
            businessId,
            appointmentDate,
            appointmentTime
        );

        res.json({
            success: true,
            available
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});