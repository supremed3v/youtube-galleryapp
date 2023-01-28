import mongoose from "mongoose";

const ImageGallerySchema = new mongoose.Schema({
  titleOfGallery: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
});

export default mongoose.models.ImageGallery ||
  mongoose.model("ImageGallery", ImageGallerySchema);
