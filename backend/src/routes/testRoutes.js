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