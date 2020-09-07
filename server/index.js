const path = require("path");
const express = require("express");
const app = express();
const transporter = require("./config");
const dotenv = require("dotenv");
dotenv.config();

const buildPath = path.join(__dirname, "..", "build");
app.use(express.json());
app.use(express.static(buildPath));

app.post("/send", (req, res) => {
  try {
    const mailOptions = {
      from: process.env.email,
      to: req.body.email,
      subject: process.env.subject,
      html: process.env.html,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Something Went Wrong. mistake in route Try Again Later",
        });
      } else {
        res.send({
          success: true,
          message:
            "Hy Iam Ishav bhatt Thanks for Contacting Us. We will get back you shortly ",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

app.listen(3030, () => {
  console.log("server start on port 3030");
});
