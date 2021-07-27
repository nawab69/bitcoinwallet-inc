import express from "express";
import { showProfile } from "../controllers/profileControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const profileRouter = express.Router();

profileRouter.route("/").get(protect, showProfile);

export default profileRouter;
