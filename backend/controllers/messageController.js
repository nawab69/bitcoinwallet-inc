import expressAsyncHandler from "express-async-handler";
import Message from "../models/Message.js";

export const fetchMessages = expressAsyncHandler(async (req, res) => {
    const tradeId = req.params.id;

    const messages = await Message.find({ tradeId }).populate('user', '-_id email name');

    res.json(messages);
})

export const createMessage = expressAsyncHandler(async (req, res) => {
    const tradeId = req.params.id;
    const user = req.user._id;

    const { message, attachment = null } = req.body;

    const msg = await Message.create({
        message, attachment, tradeId, user
    });

    
    res.json(msg);
})