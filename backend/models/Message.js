import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.Types.ObjectId,
  },
  tradeId: {
    type: String,
  },
  message: {
    type: String,
  },
  attachment: {
    type: String,
  },
},
{
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
