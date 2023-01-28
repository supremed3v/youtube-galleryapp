import express from "express";
import {
  getImageGallery,
  uploadImages,
} from "../controller/imagesController.js";

const router = express.Router();

router.post("/upload", uploadImages);
router.get("/gallery", getImageGallery);

export default router;
