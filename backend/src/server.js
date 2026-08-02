import dotenv from "dotenv";
import app from "./app.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("====================================");
    console.log("🚀 AI Employee Backend Started");
    console.log(`🌍 Server running at: http://localhost:${PORT}`);
    console.log("====================================");
});
app.use("/test", testRoutes);