import url from "url";
import router from "./router.js";

export default (req, res) => {
  const method = req.method;
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(req.method, req.url);

  if (router[method]?.[pathname]) {
    res.writeHead(200, { "Content-Type": "application/json" });
    router[method][pathname](req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ERROR: "Route not found" }));
  }
};
