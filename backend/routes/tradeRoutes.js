import express from "express";
import {
  adminCancel,
  adminComplete,
  cancelTrade,
  completeTrade,
  createTrade,
  disputeTrade,
  markAsPaid,
  showSingleTrade,
  showTrade,
  startTrade,
} from "../controllers/tradeControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const tradeRouter = express.Router();

tradeRouter.route("/").post(protect, createTrade);
tradeRouter.route("/show").get(protect, showTrade);
tradeRouter.route("/:id").get(protect, showSingleTrade);
tradeRouter.route("/start/:id").post(protect, startTrade);
tradeRouter.route("/cancel/:id").post(protect, cancelTrade);
tradeRouter.route("/mark-as-paid/:id").post(protect, markAsPaid);
tradeRouter.route("/complete/:id").post(protect, completeTrade);
tradeRouter.route("/dispute/:id").post(protect, disputeTrade);
tradeRouter.route("/admin-cancel/:id").post(protect, admin, adminCancel);
tradeRouter.route("/admin-complete/:id").post(protect, admin, adminComplete);

export default tradeRouter;
