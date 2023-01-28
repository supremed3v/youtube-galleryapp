import ImageGallery from "../models/ImageGallery.js";
import cloudinary from "cloudinary";

export const uploadImages = async (req, res, next) => {
  let images = [];

  if (typeof req.body.photos === "string") {
    images.push(req.body.photos);
  } else {
    images = req.body.photos;
  }

  if (!req.body.titleOfGallery) {
    res.status(500).json({
      success: false,
      message: "Please add title",
    });
  }

  const imageLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader
      .upload(images[i], {
        folder: "gallery",
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Cloudinary Err: ${err.message}`,
        });
      });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  const imageGallery = await ImageGallery.create({
    ...req.body,
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
