const mongoose = require("mongoose");

const GiftCardUploadSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    giftCardType: {
      type: String,
      required: true,
    },
    giftCardCountry: {
      type: String,
      required: true,
    },
    proofs: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GiftCardUpload", GiftCardUploadSchema);
