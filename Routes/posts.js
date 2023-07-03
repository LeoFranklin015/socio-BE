import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePost,
  likePost,
  updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/createPost", createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.post("/delete/:id", deletePost);
router.patch("/like/:id", likePost);
router.get("/getAllPost/:id", getTimelinePost);
export default router;
