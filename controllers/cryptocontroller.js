const CryptoPayment = require("../models/crypto");
const { sendCryptoMail } = require("../config/cryptomail");

const Crypto = async (req, res) => {
  try {
    console.log("Incoming crypto donation:", req.body);
    console.log("Uploaded file:", req.file);

    const { amount } = req.body;

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Amount is required" });
    }

    const newCrypto = new CryptoPayment({
      amount,
      proof: req.file ? req.file.path : null,
    });

    await newCrypto.save();

    // Send email only if there is a proof file
    if (req.file && req.file.path) {
      await sendCryptoMail(amount, [req.file.path]);
    }

    res.status(201).json({
      success: true,
      message: "Crypto donation uploaded successfully",
      data: newCrypto,
    });
  } catch (err) {
    console.error("Crypto upload error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while uploading crypto donation",
      error: err.message,
    });
  }
};

module.exports = {
  Crypto,
};
