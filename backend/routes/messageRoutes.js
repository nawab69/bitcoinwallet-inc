import express from 'express';
import { createMessage, fetchMessages } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const messageRouter = express.Router();

messageRouter.get('/:id', protect, fetchMessages);
messageRouter.post('/:id', protect, createMessage);

export default messageRouter;