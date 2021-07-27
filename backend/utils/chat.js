
import Message from "../models/Message.js"


export const createMessage = async (userId, tradeId, message , attachment = null) => {
      
      await Message.create({
            user : userId,
            tradeId,
            message,
            attachment
      })
      
}