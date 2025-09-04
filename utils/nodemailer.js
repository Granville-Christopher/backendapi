const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP server verification failed:", error);
  }
  if (success) {
    console.log("SMTP server is ready to send emails");
  }
});

if (process.env.NODE_ENV === "development") {
  transporter.on("log", (info) => {
    console.log("Nodemailer log:", info);
  });
}

module.exports = transporter;
