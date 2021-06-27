import multer from "multer";
import fs from "fs";

export const uploadDocument = (path) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      !fs.existsSync(path) && fs.mkdirSync(path);
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") +
          file.originalname.replace(/ /g, "_")
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    const filetype = ["image/jpeg", "image/jpg", "image/png"];
    if (filetype.includes(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Only jpeg, jpg, png files are allowed!"), false);
  };

  return multer({ storage: storage, fileFilter: fileFilter });
};
