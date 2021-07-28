import mongoose from "mongoose";

const WalletSchema = mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    ethWallet: {
      address: {
        type: String,
      },
      privateKey: {
        type: String,
      },
    },
    bnbWallet: {
      address: {
        type: String,
      },
      privateKey: {
        type: String,
      },
    },
    btcWallet: {
      address: {
        type: String,
      },
      privateKey: {
        type: String,
      },
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

const Wallet = mongoose.model("Wallet", WalletSchema);
export default Wallet;
