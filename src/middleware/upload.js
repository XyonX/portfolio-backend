import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to the 'uploads/' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Unique filename
  },
});

const fileFilter = (req, file, cb) => {
  console.log("[Multer] Filtering:", file.fieldname, file.mimetype);

  // Different rules per field
  if (file.fieldname === "featuredImage") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Featured image must be an image file"), false);
    }
  } else if (file.fieldname === "mdFile") {
    if (
      file.mimetype === "text/markdown" ||
      file.mimetype === "text/plain" ||
      file.mimetype === "application/octet-stream"
    ) {
      cb(null, true);
    } else {
      cb(new Error("MD file must be a Markdown/text file"), false);
    }
  } else {
    cb(new Error("Unexpected file field"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB for both files
    files: 2, // Allow exactly 2 files
  },
});

export default upload;
