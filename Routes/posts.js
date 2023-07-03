import express from "express";
import {
  createPost,
  getPost,
  updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/createPost", createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
export default router;
