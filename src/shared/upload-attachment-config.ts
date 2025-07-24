import multer from "fastify-multer";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../../tmp/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
