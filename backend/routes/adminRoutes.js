import express from "express";
import { importAdminAccount } from "../controllers/adminController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
const adminRouter = express.Router();

adminRouter.post("/import", protect, admin, importAdminAccount);

export default adminRouter;
