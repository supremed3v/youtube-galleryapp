import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cloudinary from "cloudinary";
import useImageRoutes from "./routes/imagesRoute.js";
const app = express();
dotenv.config();
const PORT = 5000;
app.use(cors());

connectDB();
app.use(express.json({ extended: true, limit: "50mb" }));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v1", useImageRoutes);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
