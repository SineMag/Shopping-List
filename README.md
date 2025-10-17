
## API

Base URL: http://localhost:4000

All endpoints are under the /items path and use JSON. The project is a small in-memory shopping list API. The `Item` shape is:

- id: number (assigned by server)
- name: string
- quantity: number
- purchasedStatus: boolean

### Endpoints

- GET /items

  - Description: Return an array of all items.
  - Response: 200 OK
  - Body example:
    [{ "id": 1, "name": "Milk", "quantity": 2, "purchasedStatus": false }]

- GET /items/:id

  - Description: Return a single item by id.
  - Response: 200 OK with the item, or 404 if not found, or 400 if id is invalid.
  - Body example:
    { "id": 1, "name": "Milk", "quantity": 2, "purchasedStatus": false }

- POST /items

  - Description: Create a new item.
  - Required JSON body fields: name (string), quantity (number), purchasedStatus (boolean)
  - Response: 201 Created with the new item, or 400 for invalid payload.
  - Request example:
    { "name": "Bread", "quantity": 1, "purchasedStatus": false }

- PUT /items/:id

  - Description: Update an existing item. Send any subset of fields to update.
  - Accepts JSON body with name (string), quantity (number), purchasedStatus (boolean).
  - Response: 200 OK with updated item, 404 if not found, 400 for invalid payload or id.

- DELETE /items/:id
  - Description: Delete an item by id.
  - Response: 204 No Content on success, 404 if not found, 400 if id is invalid.

### Validation and errors

- 400 Bad Request: malformed JSON, invalid id, or missing/incorrect types for required fields on POST.
- 404 Not Found: requested item id does not exist.
- 405 Method Not Allowed: unsupported method on /items path.

## Run locally

Install dependencies (you likely already have these in the repo):

```powershell
npm install
```

Start server:

```powershell
npm start
```

Server listens on port 4000. If you prefer auto-reload during development use:

```powershell
npm run dev
```

## Try it (curl examples)

List items:

```powershell
curl http://localhost:4000/items
```

Get single item (id 1):

```powershell
curl http://localhost:4000/items/1
```

Create item:

```powershell
curl -X POST http://localhost:4000/items -H "Content-Type: application/json" -d '{"name":"Eggs","quantity":12,"purchasedStatus":false}'
```

Update item (id 1):

```powershell
curl -X PUT http://localhost:4000/items/1 -H "Content-Type: application/json" -d '{"purchasedStatus":true}'
```

Delete item (id 1):

```powershell
curl -X DELETE http://localhost:4000/items/1
```

## Notes

- This API uses an in-memory array for storage. Data will be lost when the server restarts.
- The server expects proper JSON bodies; invalid JSON will return 400.
---
## To Ponder:
---
### Shopping-List

npm i typescript ts-node @types/node

- npm = (node package manager) - Tool for managing JavaScript/Node.js packages
- i = (install) - Short form of install command
- typescript = TypeScript compiler that converts TypeScript code to JavaScript
- ts-node = Allows running TypeScript files directly without compiling first
- @ = Prefix for scoped packages (packages under an organization/namespace)
- types/node = TypeScript type definitions for Node.js built-in modules
