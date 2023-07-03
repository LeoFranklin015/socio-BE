import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  unFollowUser,
  updateUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/:id", getUser);
router.patch("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);
router.patch("/:id/follow", followUser);
router.patch("/:id/unfollow", unFollowUser);
export default router;
