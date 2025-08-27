const express = require("express");
const { FectchAdminCrypto, renderCrypto, fetchGiftcard } = require("../../controllers/admincontroller/fetchdetails");
const router = express.Router();

router.get("/cryptoupload", FectchAdminCrypto);
router.get("/cryptodonation", renderCrypto);
router.get("/giftcarddonation", fetchGiftcard);

module.exports = router;