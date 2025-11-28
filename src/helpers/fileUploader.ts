import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path, { resolve } from "path";
import { rejects } from "assert";
import { error } from "console";

cloudinary.config({
  cloud_name: "djbubyrhf",
  api_key: "785918745814264",
  api_secret: "ocJ55uMbL1jCuuNj0SpGkQe7xjg",
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
  console.log({ file });
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { public_id: file.originalname },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
