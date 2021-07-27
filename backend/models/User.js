import mongoose from "mongoose";
import pkg from "bcryptjs";
const { compare, genSalt, hash } = pkg;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//   @ MIDDLEWARES

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
