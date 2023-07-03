import UserModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
// Getting User from database

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(404).json("USER NOT FOUND :(");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the existing user

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId, password } = req.body;

  if (id === currentUserId) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(5);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json("You cant update other user details ");
  }
};

//Delete the User

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  if (id === currentUserId) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully...");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json("You cant delete others account...");
  }
};

//Follow User

export const followUser = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  if (currentUserId === id) {
    res.status(403).json("You can't follow yoursef ...");
  } else {
    try {
      const userFollowed = await UserModel.findById(id);
      const userFollowing = await UserModel.findById(currentUserId);
      if (!userFollowed.followers.includes(userFollowing._id)) {
        await userFollowed.updateOne({ $push: { followers: currentUserId } });
        await userFollowing.updateOne({ $push: { following: id } });
        res.status(200).json(`${userFollowed.username} is followed`);
      } else {
        res.status(403).json("You are already following this user...");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
