import mongoose from "mongoose";

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    dob: {
      type: String,
    },
    profile: {
      type: String,
    },
    password: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
