import expressAsyncHandler from "express-async-handler";
import pkg from "jsonwebtoken";
import User from "../models/User.js";
const { verify } = pkg;

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw new Error("Invalid token");
      } else {
        const decoded = verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();
      }
    } catch (error) {
      res.status(401);
      res.send("token error");
    }
  } else {
    throw new Error("You are not logged in");
  }
});

export const admin = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Authorization failed as admin");
  }
});
