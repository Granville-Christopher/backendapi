const mongoose = require("mongoose");

const CryptoPaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("CryptoPayment", CryptoPaymentSchema);
