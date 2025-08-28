const Giftcard = require("../../models/giftcard");
const CryptoUpload = require("../../models/crypto");
const adminCrypto = require("../../models/adminmodels/uploadwallet");

const fetchGiftcard = async (req, res) => {
  try {
    const renderGiftcards = await Giftcard.find();
    if (!renderGiftcards || renderGiftcards.length === 0) {
      console.log("no giftcard uploaded");
      return res.status(404).json({ error: "no gift card donations yet" });
    }

    const formattedGiftCardDonations = renderGiftcards.map((renderGiftcard) => {
      const formattedDate = new Date(
        renderGiftcard.createdAt
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      // The key change: Use a regex to safely remove the leading "uploads/" prefix
      // and ensure forward slashes are used for the URL.
      const proofUrls = Array.isArray(renderGiftcard.proofs)
        ? renderGiftcard.proofs.map(
            (p) =>
              `${req.protocol}://${req.get("host")}/uploads/${p
                .replace(/^uploads[\\/]/, "")
                .replace(/\\/g, "/")}`
          )
        : renderGiftcard.proofs
        ? [
            `${req.protocol}://${req.get(
              "host"
            )}/uploads/${renderGiftcard.proofs
              .replace(/^uploads[\\/]/, "")
              .replace(/\\/g, "/")}`,
          ]
        : [];

      return {
        id: renderGiftcard._id.toString(),
        amount: renderGiftcard.amount,
        type: renderGiftcard.giftCardType,
        country: renderGiftcard.giftCardCountry,
        proofUrls: proofUrls,
        date: formattedDate,
      };
    });

    return res.status(200).json({
      success: true,
      message: "giftcard donations found",
      giftcardDonations: formattedGiftCardDonations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const renderCrypto = async (req, res) => {
  try {
    const donations = await CryptoUpload.find();
    if (!donations || donations.length === 0) {
      return res.status(404).json({ error: "no crypto donations found" });
    }

    const formattedDonations = donations.map((donation) => {
      const formattedDate = new Date(donation.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );

      return {
        id: donation._id.toString(),
        amount: donation.amount,
        proofUrl: `${req.protocol}://${req.get(
          "host"
        )}/${donation.proof.replace(/\\/g, "/")}`,
        date: formattedDate,
      };
    });

    return res.status(200).json({
      success: true,
      message: "crypto donations found",
      donations: formattedDonations,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
};

// const FectchAdminCrypto = async (req, res) => {
//   try {
//     const fetchAdminCryptoUpload = await adminCrypto.find();
//     if (!fetchAdminCryptoUpload) {
//       console.log("no crypto upload found for admin");
//       return res.status(400).json({ error: "no admin crypto upload found" });
//     }

//     console.log("admin crypto upload found");
//     return res.status(201).json({
//       success: true,
//       message: "admin crypto upload found",
//       fetchAdminCryptoUpload,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "server error" });
//   }
// };
const FectchAdminCrypto = async (req, res) => {
  try {
    const fetchAdminCryptoUpload = await adminCrypto.find();

    if (!fetchAdminCryptoUpload || fetchAdminCryptoUpload.length === 0) {
      console.log("no crypto upload found for admin");
      return res.status(404).json({ error: "no admin crypto upload found" });
    }

    // Format the data to send a clean array of objects to the frontend
    const formattedWallets = fetchAdminCryptoUpload.map((wallet) => {
      // Construct the full QR code URL
      // This regex replaces 'uploads\' or 'uploads/' at the start of the string
      const qrcodePath = wallet.qrcode.replace(/^uploads[\\/]/, "");
      const qrcodeUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${qrcodePath.replace(/\\/g, "/")}`;

      return {
        id: wallet._id.toString(),
        cryptocurrency: wallet.cryptocurrency,
        network: wallet.network,
        walletaddress: wallet.walletaddress,
        qrcodeUrl: qrcodeUrl,
      };
    });

    console.log("admin crypto upload found and formatted");
    return res.status(200).json({
      success: true,
      message: "admin crypto upload found",
      wallets: formattedWallets,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  fetchGiftcard,
  renderCrypto,
  FectchAdminCrypto,
};
