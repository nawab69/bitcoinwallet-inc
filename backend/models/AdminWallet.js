import mongoose from "mongoose";

const AdminWalletSchema = mongoose.Schema(
  {
    eth: {
      address: {
        type: String,
      },
      privateKey: {
        type: String,
      },
    },
    bnb: {
      address: {
        type: String,
      },
      privateKey: {
        type: String,
      },
    },
    uid: {
      type: Number,
      unique: true,
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

const AdminWallet = mongoose.model("AdminWallet", AdminWalletSchema);
export default AdminWallet;
