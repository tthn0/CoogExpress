import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { queryDatabase } from "./database.js";

const __dirname = import.meta.dirname;
dotenv.config({ path: __dirname + "/../../.env" });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOTIFICATION_EMAIL,
    pass: process.env.NOTIFICATION_EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = { to, subject, text };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", to, "|", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

class EmailQueueService {
  static #isProcessing = false;

  static start = (pollingDelay = 1000) => {
    setInterval(this.checkEmailQueue, this.pollingDelay);
    console.log("EmailQueueService started with polling delay:", pollingDelay);
  };

  static checkEmailQueue = async () => {
    if (this.#isProcessing) return;

    this.#isProcessing = true;
    try {
      await this.processEmailQueue();
    } catch (error) {
      console.error("Error sending email:", error);
    }
    this.#isProcessing = false;
  };

  static markAsProcessed = async (id) => {
    return await queryDatabase(
      `UPDATE email_queue
      SET processed = 1
      WHERE id = ?;`,
      [id]
    );
  };

  static processEmailQueue = async () => {
    const unprocessedEmails = await queryDatabase(
      `SELECT * FROM email_queue WHERE processed = 0;`
    );
    const emailPromises = unprocessedEmails.map((emailTuple) => {
      return new Promise(async (resolve, reject) => {
        const success = await sendEmail(
          emailTuple.user_email,
          emailTuple.email_subject,
          emailTuple.email_body
        );
        if (success) resolve(await this.markAsProcessed(emailTuple.id));
        else reject("Failed to send email.");
      });
    });
    return await Promise.all(emailPromises);
  };
}

export { EmailQueueService };
