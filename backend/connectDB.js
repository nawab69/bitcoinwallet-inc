import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://127.0.0.1:27017/bitcoin", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDB;
