const mongoose = require("mongoose");

const { Schema } = mongoose;

const walletSchema = new Schema(
  {
    network: {
      type: String,
      required: true,
    },

    walletaddress: {
      type: String,
      required: true,
    },

    cryptocurrency: {
      type: String,
      required: true,
    },

    qrcode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
