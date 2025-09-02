const express = require("express");
const { FectchAdminCrypto, renderCrypto, fetchGiftcard, deleteCryptoDetails } = require("../../controllers/admincontroller/fetchdetails");
const router = express.Router();

router.get("/cryptoupload", FectchAdminCrypto);
router.get("/cryptodonation", renderCrypto);
router.get("/giftcarddonation", fetchGiftcard);
router.delete("/crypto/:id", deleteCryptoDetails);

module.exports = router;