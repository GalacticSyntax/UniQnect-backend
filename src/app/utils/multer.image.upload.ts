import multer from "multer";
import path from "path";

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // <-- make sure you have this folder!
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
