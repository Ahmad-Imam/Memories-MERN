import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postsRoute from "./routes/postsRoute.js";
import userRoute from "./routes/usersRoute.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRoute);
app.use("/user", userRoute);

const DB_URL =
  "mongodb+srv://ahmadimam71:ahmadimam71@cluster0.di5vsic.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

console.log(process.env.DB_URL);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// mongoose.set("useFindAndModify", false);
