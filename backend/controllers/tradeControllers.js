import { uuid } from "uuidv4";
import expressAsyncHandler from "express-async-handler";
import Trade from "../models/Trade.js";
import User from "../models/User.js";
import Review from "../models/Review.js";
import {
  adminCancelEth,
  adminCompleteEth,
  cancel,
  depositEth,
  depositUsdt,
  withdrawEth,
} from "../utils/ethTrades.js";
import {
  depositBnb,
  depositBusd,
  cancel as cancelBsc,
  withdrawBnb,
  adminCancelBnb,
  adminCompleteBnb,
} from "../utils/bnbTrades.js";

export const showTrade = expressAsyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.page) || 1;
  const count = await Trade.countDocuments();

  console.log(page);

  const user = req.user;
  const trades = await Trade.find({
    $or: [{ buyer: user._id }, { seller: user._id }], //Or operator body finishes
  })
    .sort("-updatedAt")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ trades, page, pages: Math.ceil(count / pageSize) });
});

export const showSingleTrade = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const trade = await Trade.findOne({ tradeId: req.params.id })
    .populate("buyer", "_id email name")
    .populate("seller", "_id email name");

  console.log(trade);

  // const reviews = await Review.find({ tradeId: trade._id });

  if (
    user._id.equals(trade.seller._id) ||
    user._id.equals(trade.buyer._id) ||
    (user.isAdmin && trade.status === "on dispute")
  ) {
    res.json(trade);
  } else {
    throw new Error("You are unauthorized");
  }
});
export const createTrade = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { amount, currency, description, buyerEmail } = req.body;
  const buyer = await User.findOne({ email: buyerEmail }).select("-password");
  if (!buyer) {
    throw Error("Buyer not found");
  }
  let curr = currency;
  if (!currency) {
    curr = "eth";
  }
  const trade = await Trade.create({
    amount,
    currency: curr,
    description,
    buyer: buyer._id,
    seller: user._id,
    tradeId: uuid(),
    status: "pending",
  });
  res.status(200).json(trade);
});

export const startTrade = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { password } = req.body;
  const trade = await Trade.findOne({ tradeId: id });
  if (!trade) {
    throw Error("Trade not found");
  }
  if (trade.status != "pending") {
    throw Error("Already started");
  }
  if (req.user._id.equals(trade.buyer)) {
    let result;
    if (!trade.currency) throw Error("Invalid Currency");
    switch (trade.currency) {
      case "eth":
        result = await depositEth(trade.tradeId, password);
        break;
      case "usdt":
        result = await depositUsdt(trade.tradeId, password);
        break;
      case "bnb":
        result = await depositBnb(trade.tradeId, password);
        break;
      case "busd":
        result = await depositBusd(trade.tradeId, password);
        break;
      default:
        result = null;
    }

    if (result) {
      trade.status = "processing";
      trade.transactions.push(result.transactionHash);
      trade.save();
      res.status(200).json(trade);
    } else {
      throw Error("Transaction failed");
    }
  } else {
    throw Error("You are not a buyer");
  }
});

export const cancelTrade = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const trade = await Trade.findOne({ tradeId: id });
  if (!trade) {
    throw Error("Trade not found");
  }
  if (
    req.user._id.equals(trade.seller) ||
    (req.user._id.equals(trade.buyer) && trade.status === "pending")
  ) {
    if (trade.status !== "pending") {
      const { password } = req.body;
      let result;
      if (!trade.currency) throw Error("Invalid Currency");
      switch (trade.currency) {
        case "eth":
          result = await cancel(trade.tradeId, password);
          break;
        case "usdt":
          result = await cancel(trade.tradeId, password);
          break;
        case "bnb":
          result = await cancelBsc(trade.tradeId, password);
          break;
        case "busd":
          result = await cancelBsc(trade.tradeId, password);
          break;
        default:
          result = null;
      }
      trade.transactions.push(result.transactionHash);
    }

    trade.status = "cancelled";
    trade.save();
  } else {
    throw Error("You are not a seller");
  }
  res.status(200).json(trade);
});

export const markAsPaid = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const trade = await Trade.findOne({ tradeId: id });
  if (!trade) {
    throw Error("Trade not found");
  }

  if (trade.status != "processing") {
    throw Error("Trade Not started");
  }

  if (req.user._id.equals(trade.seller)) {
    trade.status = "marked paid";
    trade.save();
  } else {
    throw Error("You are not a seller");
  }
  res.status(200).json(trade);
});

export const completeTrade = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { password } = req.body;

  const trade = await Trade.findOne({ tradeId: id });
  if (!trade) {
    throw Error("Trade not found");
  }

  if (trade.status != "marked paid") {
    throw Error("Seller did not marked the trade as paid");
  }

  if (req.user._id.equals(trade.buyer)) {
    let result;
    switch (trade.currency) {
      case "eth":
        result = await withdrawEth(trade.tradeId, password);
        break;
      case "usdt":
        result = await withdrawEth(trade.tradeId, password);
        break;
      case "bnb":
        result = await withdrawBnb(trade.tradeId, password);
        break;
      case "busd":
        result = await withdrawBnb(trade.tradeId, password);
        break;
      default:
        result = null;
    }

    if (result) {
      trade.status = "completed";
      trade.save();
      res.status(200).json(trade);
    }
  } else {
    throw Error("You are not a Buyer");
  }
});

export const disputeTrade = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const trade = await Trade.findOne({ tradeId: id });
  if (!trade) {
    throw Error("Trade not found");
  }

  if (trade.status == "completed" || trade.status == "cancelled") {
    throw Error("Trade is already completed / cancelled");
  }

  if (req.user._id.equals(trade.buyer) || req.user._id.equals(trade.seller)) {
    trade.status = "on dispute";
    trade.save();
  } else {
    throw Error("You are not a Buyer or seller");
  }
  res.status(200).json(trade);
});

export const adminCancel = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const trade = await Trade.findOne({ tradeId: id });
  if (!trade) {
    throw Error("Trade not found");
  }

  if (trade.status != "on dispute") {
    throw Error("Trade not placed on dispute");
  }

  if (req.user.isAdmin) {
    let result;
    if (!trade.currency) throw Error("Invalid Currency");
    switch (trade.currency) {
      case "eth":
        result = await adminCancelEth(trade.tradeId, password);
        break;
      case "usdt":
        result = await adminCancelEth(trade.tradeId, password);
        break;
      case "bnb":
        result = await adminCancelBnb(trade.tradeId, password);
        break;
      case "busd":
        result = await adminCancelBnb(trade.tradeId, password);
        break;
      default:
        result = null;
    }

    if (result) {
      trade.status = "cancelled";
      trade.transactions.push(result.transactionHash);
      trade.save();
      res.status(200).json(trade);
    }
  } else {
    throw new Error("You are not Admin");
  }
});

export const adminComplete = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const trade = await Trade.findOne({ tradeId: id });
  if (!trade) {
    throw Error("Trade not found");
  }

  if (trade.status != "on dispute") {
    throw Error("Trade not placed on dispute");
  }

  if (req.user.isAdmin) {
    let result;
    if (!trade.currency) throw Error("Invalid Currency");
    switch (trade.currency) {
      case "eth":
        result = await adminCompleteEth(trade.tradeId, password);
        break;
      case "usdt":
        result = await adminCompleteEth(trade.tradeId, password);
        break;
      case "bnb":
        result = await adminCompleteBnb(trade.tradeId, password);
        break;
      case "busd":
        result = await adminCompleteBnb(trade.tradeId, password);
        break;
      default:
        result = null;
    }

    if (result) {
      trade.status = "completed";
      trade.transactions.push(result.transactionHash);
      trade.save();
      res.status(200).json(trade);
    }
  } else {
    throw new Error("You are not Admin");
  }
});

export const allTrades = expressAsyncHandler(async (req, res) => {
  const pageSize = 7;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.status
    ? {
        status: req.query.status,
      }
    : {};

  const count = await Trade.countDocuments({ ...keyword });
  const trades = await Trade.find({ ...keyword })
    .sort("-updatedAt")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ trades, page, pages: Math.ceil(count / pageSize) });
});

export const count = expressAsyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();
  const count = await Trade.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const countObj = {
    users: userCount,
    total: 0,
  };

  count.forEach((el) => {
    countObj["total"] += el.count;
    countObj[el._id] = el.count;
  });
  res.json(countObj);
});
