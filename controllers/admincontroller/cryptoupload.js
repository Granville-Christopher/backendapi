const cryptoUpload = require("../../models/adminmodels/uploadwallet");

const uploadCryptoWallet = async (req, res) => {
  try {
    const { walletaddress, cryptocurrency, network } = req.body;

    if (!cryptocurrency || !walletaddress || !network) {
      return res.status(404).json({ error: "all fields are required" });
    }

    const newCryptoUpload = new cryptoUpload({
      walletaddress,
      network,
      cryptocurrency,
      qrcode: req.file ? req.file.path : null,
    });

    await newCryptoUpload.save();
    res
      .status(201)
      .json({
        success: true,
        message: "wallet uploaded successfully",
        data: newCryptoUpload,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  uploadCryptoWallet,
};
