import userRoutes from "./routes/userRoutes.js";
import express from "express";
import dotenv from "dotenv";
import database from "./connectDB.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import tradeRouter from "./routes/tradeRoutes.js";
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
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});
app.use("/api/user", userRoutes);
app.use("/api/trade", tradeRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/messages", messageRouter);
app.use("/api/admin", adminRouter);
app.use("/api/profile", profileRouter);
app.use("/api/review", reviewRoutes);
app.use(errorHandler);

const server = app.listen(4000, () => console.log("Server is running"));

const io = new socketio.Server();
io.attach(server);
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("message", (tradeId, msg, userId) => {
    try {
      createMessage(userId, tradeId, msg);
    } catch (e) {
      console.log(e);
    }
    io.emit(`message-${tradeId}`, msg);
    console.log({ tradeId, msg });
  });
});
