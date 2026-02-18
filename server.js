import nodeCron from "node-cron";
import dotenv from 'dotenv';
dotenv.config();
import app from "./src/app.js";
import axios from "axios";
const PORT = process.env.PORT || 5000;




const startHealthCheck = () => {
  nodeCron.schedule("*/9 * * * * *", async () => {
    try {
      const res = await axios.get("http://localhost:5000/health");
      console.log("✅ Server Alive:", res.data.status);
      console.log("PORT:", process.env.PORT);
    } catch (error) {
        console.log(error);
        
      console.log("❌ Server Down");
    }
  });
};



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

startHealthCheck();