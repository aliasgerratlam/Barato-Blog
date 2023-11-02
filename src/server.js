// server.js
import { create, router as _router, defaults } from "json-server";
const server = create();
const router = _router("data.json"); // Assuming your data is in db.json
const middlewares = defaults();

// Enable CORS for all routes
server.use(middlewares, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Handle image uploads
server.post("/uploads", (req, res) => {
  const imageUrl = `./uploads/${req.file.filename}`;
  res.json({ imageUrl: imageUrl });
});

// Use the router for other JSON-server routes
server.use(router);

server.listen(8000, () => {
  console.log("JSON-server is running on port 8000");
});
