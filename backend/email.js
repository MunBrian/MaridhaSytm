const nodemailer = require("nodemailer");

//send email func
const sendEmail = (useremail) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: useremail,
      subject: "Maridha Hotel Booking Receipt",
      text: "Your hotel booking receipt is attached below",
      attachments: [{ filename: "receipt.pdf", path: "./receipt.pdf" }],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
