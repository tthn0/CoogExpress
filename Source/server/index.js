import dotenv from "dotenv";
import http from "http";
import handleRequest from "./src/utils/handleRequest.js";

dotenv.config({ path: "../config/.env" });

const server = http.createServer(handleRequest);
const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
