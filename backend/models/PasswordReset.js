import mongoose from "mongoose";

const ResetSchema = mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });

const PasswordReset = mongoose.model("PasswordReset", ResetSchema);
export default PasswordReset;
