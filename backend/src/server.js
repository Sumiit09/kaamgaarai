import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("====================================");
    console.log("🚀 AI Employee Backend Started");
    console.log(`🌍 Server running at: http://localhost:${PORT}`);
    console.log("====================================");
});