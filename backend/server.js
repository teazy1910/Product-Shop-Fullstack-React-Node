import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import express from "express";
import productRoutes from "./routes/product.route.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(express.json()); // ermöglicht JSON direkt in der Anfrage im req.body zu aktzeptiern
// Middleware (Funktion) die ausgeführt wird und die Antwort an den Client zurücksendet

app.use("/api/products", productRoutes);

app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  // console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
