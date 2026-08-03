import dotenv from "dotenv";
import app from "./app.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/test", testRoutes);
app.listen(PORT, () => {
    console.log("====================================");
    console.log("🚀 AI Employee Backend Started");
    console.log(`🌍 Server running at: http://localhost:${PORT}`);
    console.log("====================================");
});
