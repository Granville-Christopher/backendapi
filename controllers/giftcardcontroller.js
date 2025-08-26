const GiftCardUpload = require("../models/giftcard");
const { sendGiftCardMail } = require("../config/giftcardmail");

const uploadGiftCard = async (req, res) => {
  try {
    const { amount, giftCardType, giftCardCountry } = req.body;

    if (!amount || !giftCardType || !giftCardCountry) {
      return res
        .status(400)
        .json({ error: "Amount, type, and country are required" });
    }

    const proofs = req.files ? req.files.map((file) => file.path) : [];

    if (!proofs.length) {
      return res
        .status(400)
        .json({ error: "At least one proof image is required" });
    }

    const newGiftCardUpload = new GiftCardUpload({
      amount,
      giftCardType,
      giftCardCountry,
      proofs,
    });

    await newGiftCardUpload.save();

    await sendGiftCardMail(amount, proofs, giftCardType, giftCardCountry);

    return res.status(201).json({
      message: "Gift card uploaded successfully",
      data: newGiftCardUpload,
    });
  } catch (error) {
    console.error("Error uploading gift card:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { uploadGiftCard };
