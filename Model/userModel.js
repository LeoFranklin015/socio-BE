import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: String,
    coverPicture: String,
    about: String,
    followers: [],
    following: [],
    worksAt: String,
    livesIn: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
