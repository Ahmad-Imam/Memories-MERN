import express from "express";
import { signin, signup } from "../controllers/usersController.js";

const router = express.Router();

// router.get("/", getPosts);
router.post("/signin", signin);
router.post("/signup", signup);
// router.patch("/:id", updatePost);
// router.delete("/:id", deletePost);
// router.patch("/:id/likePost", likePost);

export default router;
