import { IncomingMessage, ServerResponse } from "http";
import { getItems, getItemById, addItem, updateItem, deleteItem } from "../controller/items";

//Server runs on => https://localhost:4000/items

export const itemsRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/items")) {
    const parts = req.url.split("/");
    const id = parts[2] ? parseInt(parts[2]) : undefined;

    if (req.method === "GET" && !id) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(getItems()));
      return;
    }

    if (req.method === "GET" && id) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }
      const item = getItemById(id);
      if (!item) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
        return;
      }
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(item));
      return;
    }
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const { name, quantity, purchasedStatus } = JSON.parse(body);
          if (!name || typeof name !== "string") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Name is required" }));
            return;
          }
          if (quantity === undefined || typeof quantity !== "number") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Quantity is required and must be a number" }));
            return;
          }
          if (purchasedStatus === undefined || typeof purchasedStatus !== "boolean") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Purchased status is required and must be a boolean" }));
            return;
          }

          const newItem = addItem(name, quantity, purchasedStatus);
          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch (error) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
      return;
    }

    if (req.method === "PUT" && id) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }

      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const { name, quantity, purchasedStatus } = JSON.parse(body);
          
          // Validation section
          if (name !== undefined && typeof name !== "string") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Name must be a string" }));
            return;
          }
          if (quantity !== undefined && typeof quantity !== "number") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Quantity must be a number" }));
            return;
          }
          if (purchasedStatus !== undefined && typeof purchasedStatus !== "boolean") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Purchased status must be a boolean" }));
            return;
          }

          const updatedItem = updateItem(id, name, quantity, purchasedStatus);
          
          if (!updatedItem) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item not found" }));
            return;
          }

          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify(updatedItem));
        } catch (error) {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
      return;
    }

    if (req.method === "DELETE" && id) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }

      const deleted = deleteItem(id);
      
      if (!deleted) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
        return;
      }

      res.writeHead(204);
      res.end();
      return;
    }

    res.writeHead(405, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed on /items" }));
    return;
  }
};
