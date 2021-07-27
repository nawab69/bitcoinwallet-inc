import expressAsyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Trade from "../models/Trade.js";
import User from "../models/User.js";

export const createReview = expressAsyncHandler(async (req, res) => {
  const { tradeId, star, review } = req.body;

  if (tradeId) {
    const trade = await Trade.findById(tradeId);
    let user;
    if (trade.buyer.equals(req.user._id)) {
      user = trade.seller;
    } else {
      user = trade.buyer;
    }
    const reviewExists = await Review.findOne({
      user: user,
      tradeId: tradeId,
    });

    if (reviewExists) {
      throw new Error("Review Already exists");
    }
    const result = await Review.create({
      user: user,
      reviewer: req.user._id,
      tradeId: tradeId,
      review: review,
      star: star,
    });

    if (result) {
      res.send(result);
    }
  } else {
    throw new Error("Something went wrong !");
  }
});
