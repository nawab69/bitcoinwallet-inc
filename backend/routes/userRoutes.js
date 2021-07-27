import express from "express";
import {
  authUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserById,
  registerUser,
  resetPassword,
  userProfile,
  userUpdate,
  userUpdate_admin,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { rateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";
const userRouter = express.Router();

userRouter.route("/").post(registerUser).get(protect, admin, getAllUsers);
userRouter.route("/login").post(authUser);
userRouter.route("/profile").get(protect, userProfile).put(protect, userUpdate);
userRouter
  .route("/:email")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, userUpdate_admin);

userRouter.post("/forgot-password", rateLimitMiddleware, forgotPassword);

userRouter.post("/reset-password", resetPassword);

export default userRouter;
