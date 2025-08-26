const cryptomail = require("../utils/nodemailer");
const transporter = cryptomail;

/**
  @param {Number} amount
  @param {Array} proofImages
 */
const sendCryptoMail = async (amount, proofImages) => {
  try {
    const htmlContent = `
      <h2>New Crypto Donation Received</h2>
      <p>You have received a crypto donation of <strong>$${amount}</strong>.</p>
      ${proofImages
        .map(
          (filePath) =>
            `<div style="margin-bottom:10px;"><img src="cid:${filePath}" style="max-width:300px;" /></div>`
        )
        .join("")}
      <p>Check the admin panel for more details.</p>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New Crypto Donation Received`,
      html: htmlContent,
      attachments: proofImages.map((filePath) => ({
        filename: filePath.split("/").pop(),
        path: filePath,
        cid: filePath,
      })),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Crypto email sent to admin:", info.response);
  } catch (error) {
    console.error("Error sending crypto email:", error);
  }
};

module.exports = { sendCryptoMail };
