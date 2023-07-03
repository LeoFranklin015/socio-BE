import express from "express";
import { registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.get("/", async (req, res) => res.send("Auth Page"));
router.post("/register", registerUser);

export default router;
