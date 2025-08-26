const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role:{
      type: String,
      required: false,
      default: "admin"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
