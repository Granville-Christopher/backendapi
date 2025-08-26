const User = require("../../models/adminmodels/register");
const bcrypt = require("bcryptjs");
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email field must not be empty" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ error: "Password field must not be empty" });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, userExists.password);
    if (!correctPassword) {
      return res.status(401).json({ error: "Password does not match" });
    }

    req.session.user = {
      id: userExists._id,
      email: userExists.email,
      role: userExists.role,
    };

    // Ensure session is saved before responding
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Session error" });
      }

      console.log("User logged in:", userExists.email);
      return res.status(200).json({
        message: "Login successful",
        user: req.session.user,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { loginUser };
