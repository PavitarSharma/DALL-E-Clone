import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.json({ message: "Hello from DALL-E!" });
});

app.use("*", async (req, res) => {
  res.status(404).send("Route not found");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
