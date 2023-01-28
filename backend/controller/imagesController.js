import ImageGallery from "../models/ImageGallery.js";
import cloudinary from "cloudinary";

export const uploadImages = async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (!req.body.title) {
    res.status(500).json({
      success: false,
      message: "Please add title",
    });
  }

  const imageLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "gallery",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  const imageGallery = await ImageGallery.create({
    titleOfGallery: req.body.title,
    images: imageLinks,
  });

  res.status(201).json({
    success: true,
    message: "Folder Uploaded successfully",
    imageGallery,
  });
};

export const getImageGallery = async (req, res) => {
  const gallery = await ImageGallery.find();

  res.status(200).json({
    success: true,
    gallery,
  });
};
