import url from "url";
import router from "./router.js";

export default async (req, res) => {
  logRequest(req);
  await parseRequest(req);
  await routeRequest(req, res);
};

const logRequest = (req) => {
  console.log(req.method, req.url);
};

const parseRequest = async (req) => {
  const parseParams = (req) => url.parse(req.url, true).query;
  const parseBody = async (req) => {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
  };
  req.params = parseParams(req);
  const mayContainBody = ["POST", "PUT", "DELETE"].includes(req.method);
  const jsonType = req.headers["content-type"] === "application/json";
  if (mayContainBody && jsonType) req.body = await parseBody(req);
};

const routeRequest = async (req, res) => {
  const method = req.method;
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (router[method]?.[pathname]) {
    try {
      const result = await router[method][pathname](req, res);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result, null, 2));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ Error: error.message }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ Error: "Invalid route." }));
  }
};
