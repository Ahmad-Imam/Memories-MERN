import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";

import cors from "cors";

import postsRoute from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRoute);

const DB_URL =
  "mongodb+srv://ahmadimam71:ahmadimam71@cluster0.di5vsic.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// mongoose.set("useFindAndModify", false);
