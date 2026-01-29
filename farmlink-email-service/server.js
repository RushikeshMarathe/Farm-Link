require("dotenv").config();
const express = require("express");
const cors = require("cors");

const emailController = require("./controllers/emailController");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", emailController.sendEmail);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`📧 Email service running on port ${PORT}`);
});
