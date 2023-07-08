import express from "express";
import { searchUser } from "../Controllers/UserController.js";

const router = express.Router();

router.get("/", searchUser);
export default router;
