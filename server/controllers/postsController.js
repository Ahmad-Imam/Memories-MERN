import mongoose from "mongoose";
import PostMessage from "../models/postMesseage.js";

export async function getPost(req, res) {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    // console.log("post controller getpost");
    // console.log(post);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
}

export async function getPosts(req, res) {
  const { page } = req.query;

  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await PostMessage.countDocuments({});

    const post = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    // res.send(postMesseage);
    res.status(200).json({
      data: post,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
}

export async function getPostsBySearch(req, res) {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
}

export async function createPost(req, res) {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);

    // res.send("Post created");
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}

export async function updatePost(req, res) {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with the id found");
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}

export async function deletePost(req, res) {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with the id found");

  try {
    await PostMessage.findByIdAndDelete(_id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}

export async function likePost(req, res) {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with the id found");
  try {
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    // console.log(updatePost);
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}

export async function commentPost(req, res) {
  const { id } = req.params;
  const { value } = req.body;

  try {
    const post = await PostMessage.findById(id);
    // console.log(post);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    // console.log(updatedPost);
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}
