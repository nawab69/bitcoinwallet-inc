import userRoutes from "./routes/userRoutes.js";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import database from "./connectDB.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import walletRouter from "./routes/walletRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import http from "http";
import * as socketio from "socket.io";
import { createMessage } from "./utils/chat.js";
import adminRouter from "./routes/adminRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
dotenv.config();
database();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(process.cwd(), "./static/comingsoon")));
app.use(express.static(path.join(process.cwd(), "../client/build")));
app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRouter);
app.use("/api/admin", adminRouter);
app.use("/api/profile", profileRouter);
app.use(errorHandler);
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../client/build/index.html"));
});

const server = app.listen(8000, () => console.log("Server is running"));
