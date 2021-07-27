import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";

export const showProfile = expressAsyncHandler(async (req, res) => {
  const { email } = req.query;

  if (email) {
    const user = await User.findOne({ email: email }).select("-password");
    res.json(user);
  } else {
    throw new Error("User not found");
  }
});
