import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer, FileLocation) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `digital_menu/${FileLocation}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default uploadToCloudinary;
