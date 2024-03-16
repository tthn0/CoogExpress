import url from "url";

export default (req) => {
  const reqUrl = req.url;
  const parsedUrl = url.parse(reqUrl, true);
  return parsedUrl.query;
};
