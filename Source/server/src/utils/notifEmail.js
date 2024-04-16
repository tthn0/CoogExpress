import nodemailer from "nodemailer";

const sendEmail = async (toAddress, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "coogexpress@gmail.com",
      pass: "vjwx tpix tyhx ahgw",
    },
  });

  // Email options
  const mailOptions = {
    from: "coogexpress@gmail.com",
    to: toAddress,
    subject: subject,
    text: message,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", toAddress, "|", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
  }
  return false;
};

export default sendEmail;