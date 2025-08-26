const giftcardmail = require("../utils/nodemailer");
const transporter = giftcardmail;

/**
  @param {Number} amount
  @param {Array} giftCardImages
  @param {String} giftCardType
  @param {String} giftCardCountry
 */
const sendGiftCardMail = async (
  amount,
  giftCardImages,
  giftCardType,
  giftCardCountry
) => {
  try {
    let htmlContent = `
      <h2>New Gift Card Donation Received</h2>
      <p>You have received a gift card donation of <strong>$${amount}</strong>.</p>
      <p><strong>Gift Card Type:</strong> ${giftCardType}</p>
      <p><strong>Country/Region:</strong> ${giftCardCountry}</p>
      <h3>Uploaded Gift Card Images:</h3>
      <div style="display:flex; flex-wrap: wrap;">`;

    const attachments = giftCardImages.map((filePath, index) => {
      const cid = `giftcard${index}@example.com`;
      htmlContent += `<div style="margin:5px;"><img src="cid:${cid}" style="max-width:200px; height:auto; border:1px solid #ccc; border-radius:8px;" /></div>`;
      return {
        filename: filePath.split("/").pop(),
        path: filePath,
        cid: cid,
      };
    });

    htmlContent += `</div>`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New Gift Card Donation Received`,
      html: htmlContent,
      attachments: attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("HTML email sent to admin:", info.response);
  } catch (error) {
    console.error("Error sending gift card email:", error);
  }
};

module.exports = { sendGiftCardMail };
