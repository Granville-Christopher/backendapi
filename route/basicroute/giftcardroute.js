const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadGiftCard } = require("../../controllers/giftcardcontroller");

const router = express.Router();

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/giftcards/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload2 = multer({ storage: storage2 });

router.post("/giftcard", upload2.any(), uploadGiftCard);

module.exports = router;
