import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./Routes/auth.js";

const app = express();
app.use(express.json({ limit: "30mb", extebded: true }));
app.use(express.urlencoded({ limitt: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("This is a Social Media Platform");
});

app.use("/auth", AuthRoute);

const PORT = process.env.PORT || 4000;

const Connection_URL = process.env.CONNECTION_URL;

mongoose
  .connect(Connection_URL, { useNewURLParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
