import express from "express";
import { getWallet, sendCrypto } from "../controllers/walletControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const walletRouter = express.Router();

walletRouter.get("/", protect, getWallet);
walletRouter.post("/send", protect, sendCrypto);

export default walletRouter;
