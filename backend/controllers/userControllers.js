import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import JWT from "../utils/JWT.js";
import { CreateWallet } from "../utils/wallet.js";
import moment from "moment";
import passwordResetMail from "../mail/passwordResetMail.js";
import PasswordReset from "../models/PasswordReset.js";
import { encryptPrivateKey } from "../utils/encryption.js";

export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: JWT(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, walletPassword } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const wallet = await CreateWallet(user._id, walletPassword);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: JWT(user._id),
        message: "Created Succesfully",
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  }
});

export const userProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const userUpdate = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: JWT(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error("Users not Found");
  }
});

export const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select(
    "-password"
  );
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not Found");
  }
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export const userUpdate_admin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || false;
    user.save();
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const forgotPassword = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const resetPassword = await PasswordReset.findOne({ user: user._id });
    const generateCode = Math.floor(100000 + Math.random() * 900000);
    const token = await encryptPrivateKey(
      user._id.toString(),
      generateCode.toString()
    );
    if (resetPassword) {
      await resetPassword.delete();
    }
    await PasswordReset.create({
      user: user._id,
      code: token,
    });

    await passwordResetMail(user.email, token);
    res.json({ message: "A code has been sent" });
  } else {
    res.json({ message: "A code has been sent" });
  }
});

export const resetPassword = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const resetData = await PasswordReset.findOne({ code: token });

  if (resetData) {
    const user = await User.findById(resetData.user);
    user.password = password;
    await user.save();
    resetData.delete();
    res.json({ message: "Password changed successfully" });
  } else {
    res.status(404);
    throw new Error("Link expired or not found");
  }
});
