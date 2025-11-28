import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

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
  const filePath = path.resolve(
    "D:/Web-Practice-Projects/PH-(projetcts)/PH-Heathcare-Server/uploads/A Plague Tale_ Requiem - 1.5.1.0 (20230517_1120) 2_11_2025 11_40_56 PM.png"
  );

  cloudinary.uploader.upload(
    filePath,
    { public_id: "pic" },
    function (error, result) {
      if (error) {
        console.error("Upload error:", error);
        return;
      }
      console.log("Upload result:", result);
    }
  );
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
