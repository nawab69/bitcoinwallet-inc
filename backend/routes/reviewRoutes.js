import { Router } from "express";
import { createReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

// import all controllers

const reviewRoutes = new Router();

reviewRoutes.post("/create", protect, createReview);

export default reviewRoutes;
