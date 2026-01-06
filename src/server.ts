import http, { IncomingMessage, ServerResponse } from "http";
import { itemsRoute } from "./routes/items";
import { error } from "./utils/http";

const PORT = 4000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  console.log(req.url, "url");

  if (req.url?.startsWith("/items")) {
    itemsRoute(req, res);
  } else {
    return error(res, 404, "ROUTE_NOT_FOUND", "Route Mentioned Not Found");
  }
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
