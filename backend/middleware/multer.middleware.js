import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(path.extname(file.originalname).toLocaleLowerCase())
  );
  const mimeType = allowedTypes.test(file.mimeType);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("only images allowed jpg jpeg "));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
