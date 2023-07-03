import PostModel from "../Model/postModel.js";
import UserModel from "../Model/userModel.js";
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

//Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === currentUserId) {
      await post.deleteOne();
      res.status(200).json("Post deleted Successfully...");
    } else {
      res.status(403).json("You can delete only your post...");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Like and Dislike

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { currentUserId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(currentUserId)) {
      await post.updateOne({ $push: { likes: currentUserId } });
      res.status(200).json("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: currentUserId } });
      res.status(200).json("Post Disliked");
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Fetching post of the user and thier followers post

export const getTimelinePost = async (req, res) => {
  const { currentUserId } = req.params;
  try {
    const currentUserPosts = await PostModel.find({ userId: currentUserId });
    const followersPost = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(currentUserId),
        },
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followerspost",
        },
        $project: {
          followersPost: 1,
          _id: 0,
        },
      },
    ]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
