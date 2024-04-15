import dotenv from "dotenv";
import http from "http";
import { handleRequest } from "./utils/handleRequest.js";
import notifEmail from "./utils/notifEmail.js";

import { queryDatabase } from "./utils/database.js";

const __dirname = import.meta.dirname;
dotenv.config({ path: __dirname + "/../.env" });

const server = http.createServer(handleRequest);
const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const processEmailQueue = async () => {
  const unprocessedEmails = await queryDatabase(`
    SELECT * 
    FROM email_queue 
    WHERE processed = 0`);

  for (const email_msg of unprocessedEmails) {
    const result = await notifEmail(
      email_msg.user_email,
      email_msg.email_subject,
      email_msg.email_body
    );

    if (result == true) {
      const result = await queryDatabase(
        `
      UPDATE email_queue
      SET
        email_queue.processed = 1
      WHERE email_queue.id = ?
       `,
        [email_msg.id]
      );
    }
  }
  // console.log("queue refreshed")
};

processEmailQueue();
setInterval(processEmailQueue, 10000);