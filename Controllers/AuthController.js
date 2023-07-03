import mongoose from "mongoose";
import UserModel from "../Model/userModel.js";
import bcrypt, { hash } from "bcrypt";
export const registerUser = async (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;
  const salt = await bcrypt.genSalt(5);
  const hashPass = await bcrypt.hash(password, salt);
  const newUser = new UserModel({
    email,
    username,
    password: hashPass,
    firstName,
    lastName,
  });
  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
