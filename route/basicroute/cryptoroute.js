const express = require("express");
const multer = require("multer");
const path = require("path");
const { Crypto } = require("../../controllers/cryptocontroller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/crypto/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/crypto", upload.single("proof"), Crypto);

module.exports = router;
