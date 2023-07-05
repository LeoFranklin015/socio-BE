import mongoose from "mongoose";
import UserModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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
    const oldUser = await UserModel.findOne({ username: username });
    if (oldUser) {
      return res
        .status(400)
        .json("Username already exist try using another username");
    }
    const user = await newUser.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGIN

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (validity) {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
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
