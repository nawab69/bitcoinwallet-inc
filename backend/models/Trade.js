import mongoose from "mongoose";

const TradeSchema = mongoose.Schema(
  {
    buyer: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    seller: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    tradeId: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["eth", "usdt", "bnb", "busd"],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "marked paid",
        "completed",
        "on dispute",
        "cancelled",
      ],
    },
    transactions: [],
  },
  {
    timestamps: true,
  }
);

//   @ MIDDLEWARES
/*
userSchema.pre('save', async function (next) {   // save, validate, remove, updateOne, deleteOne
    // your code
})

*/

//   @ BINDING METHOD TO MODEL
/*
userSchema.methods.methodName = async function (params) {
     // your code
}
*/

const Trade = mongoose.model("Trade", TradeSchema);
export default Trade;
