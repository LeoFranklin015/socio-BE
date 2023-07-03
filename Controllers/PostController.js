import PostModel from "../Model/postModel.js";
import mongoose from "mongoose";

//Create new post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a post

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update the post

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === currentUserId) {
      const updatedPost = await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated Successfully...");
    } else {
      res.status(403).json("You can only update your post...");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
