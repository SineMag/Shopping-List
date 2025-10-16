import http, { IncomingMessage, ServerResponse } from "http";
import { itemsRoute } from "./routes/items";

const PORT = 4000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  console.log(req.url, "url");

  if (req.url?.startsWith("/items")) {
    itemsRoute(req, res);
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Route Mentioned Not Found" }));
  }
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
