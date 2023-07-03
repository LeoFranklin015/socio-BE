import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/:id", getUser);
router.patch("/update/:id", updateUser);
router.post("/delete/:id", deleteUser);
export default router;
