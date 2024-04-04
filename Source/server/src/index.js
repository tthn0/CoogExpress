import dotenv from "dotenv";
import http from "http";
import { handleRequest } from "./utils/handleRequest.js";

const __dirname = import.meta.dirname;
dotenv.config({ path: __dirname + "/../.env" });

const server = http.createServer(handleRequest);
const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
