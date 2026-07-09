import express from "express";
import cors from "cors";

import businessRoutes from "./routes/businessRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 AI Employee Backend Running",
        version: "1.0.0"
    });
});

// API Routes
app.use("/api/businesses", businessRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/whatsapp", whatsappRoutes);

export default app;