import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    reviewer: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    tradeId: {
      ref: "Trade",
      type: String,
    },
    star: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
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

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
