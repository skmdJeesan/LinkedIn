import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import userRoutes from "./routes/user.route.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
})

export default app;