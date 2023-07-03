import mongoose from "mongoose";
import UserModel from "../Model/userModel.js";
import bcrypt from "bcrypt";

//REGISTER

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

//LOGIN

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (validity) {
        res.status(200).json(user);
      } else {
        res.status(400).json("Wrong password");
      }
    } else {
      res.status(404).json("user not found..");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
