import { IncomingMessage, ServerResponse } from "http";
import {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from "../controller/items";
import { success, created, error, noContent, readJson } from "../utils/http";

//Server runs on => https://localhost:4000/items

export const itemsRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/items")) {
    const path = req.url?.split("?")[0] || "";
    const parts = path.split("/");
    const id = parts[2] ? Number(parts[2]) : undefined;

    if (req.method === "GET" && !id) {
      return success(res, 200, getItems());
    }

    if (req.method === "GET" && id) {
      if (isNaN(id)) {
        return error(res, 400, "INVALID_ID", "Invalid item ID");
      }
      const item = getItemById(id);
      if (!item) {
        return error(res, 404, "NOT_FOUND", "Item not found");
      }
      return success(res, 200, item);
    }
    if (req.method === "POST") {
      try {
        const { name, quantity, purchasedStatus } = await readJson<any>(req);
        if (!name || typeof name !== "string") {
          return error(res, 400, "VALIDATION_ERROR", "Name is required");
        }
        if (quantity === undefined || typeof quantity !== "number") {
          return error(
            res,
            400,
            "VALIDATION_ERROR",
            "Quantity is required and must be a number"
          );
        }
        if (
          purchasedStatus === undefined ||
          typeof purchasedStatus !== "boolean"
        ) {
          return error(
            res,
            400,
            "VALIDATION_ERROR",
            "Purchased status is required and must be a boolean"
          );
        }

        const newItem = addItem(name, quantity, purchasedStatus);
        return created(res, newItem);
      } catch (e) {
        return error(res, 400, "INVALID_JSON", "Invalid JSON payload");
      }
    }

    if (req.method === "PUT" && id) {
      if (isNaN(id)) {
        return error(res, 400, "INVALID_ID", "Invalid item ID");
      }

      try {
        const { name, quantity, purchasedStatus } = await readJson<any>(req);

        // Validation section
        if (name !== undefined && typeof name !== "string") {
          return error(res, 400, "VALIDATION_ERROR", "Name must be a string");
        }
        if (quantity !== undefined && typeof quantity !== "number") {
          return error(
            res,
            400,
            "VALIDATION_ERROR",
            "Quantity must be a number"
          );
        }
        if (
          purchasedStatus !== undefined &&
          typeof purchasedStatus !== "boolean"
        ) {
          return error(
            res,
            400,
            "VALIDATION_ERROR",
            "Purchased status must be a boolean"
          );
        }

        const updatedItem = updateItem(id, name, quantity, purchasedStatus);

        if (!updatedItem) {
          return error(res, 404, "NOT_FOUND", "Item not found");
        }

        return success(res, 200, updatedItem);
      } catch (e) {
        return error(res, 400, "INVALID_JSON", "Invalid JSON payload");
      }
    }

    if (req.method === "DELETE" && id) {
      if (isNaN(id)) {
        return error(res, 400, "INVALID_ID", "Invalid item ID");
      }

      const deleted = deleteItem(id);

      if (!deleted) {
        return error(res, 404, "NOT_FOUND", "Item not found");
      }

      return noContent(res);
    }

    return error(
      res,
      405,
      "METHOD_NOT_ALLOWED",
      "Method Not Allowed on /items"
    );
  }
};
