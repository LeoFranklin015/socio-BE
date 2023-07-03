import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  updateUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/:id", getUser);
router.patch("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);
router.patch("/:id/follow", followUser);
export default router;
