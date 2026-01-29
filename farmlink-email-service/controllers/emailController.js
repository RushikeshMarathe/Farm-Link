const fs = require("fs");
const path = require("path");
const { sendMail } = require("../services/emailService");

exports.sendEmail = async (req, res) => {
  try {
    const { to, type, resetLink } = req.body;

    let subject;
    let templatePath;

    if (type === "REGISTRATION") {
      subject = "Welcome to FarmLink 🌾";
      templatePath = path.join(__dirname, "../templates/registration.html");
    } else if (type === "RESET_PASSWORD") {
      subject = "Reset Your Password";
      templatePath = path.join(__dirname, "../templates/reset-password.html");
    } else {
      return res.status(400).json({ message: "Invalid email type" });
    }

    let html = fs.readFileSync(templatePath, "utf-8");

    if (resetLink) {
      html = html.replace("{{RESET_LINK}}", resetLink);
    }

    await sendMail(to, subject, html);

    res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
};
