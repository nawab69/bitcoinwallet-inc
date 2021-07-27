import express from "express";
import { importAdminAccount } from "../controllers/adminController.js";
import { allTrades, count } from "../controllers/tradeControllers.js";

import { protect, admin } from "../middleware/authMiddleware.js";
const adminRouter = express.Router();

adminRouter.post('/import',protect,admin,importAdminAccount);
adminRouter.get('/trades',protect,admin,allTrades);
adminRouter.get('/count',protect,admin,count);

export default adminRouter;