const express = require("express");
const router = express.Router();
const { loginUser } = require("../../controllers/admincontroller/login");

router.post("/login", loginUser);

router.get("/check-session", (req, res) => {
  try {
    if (req.session && req.session.user) {
      return res.status(200).json({ user: req.session.user });
    } else {
      console.log("unauthenticated");
      return res.status(401).json({ error: "Not authenticated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
