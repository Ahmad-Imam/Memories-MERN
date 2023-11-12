import PostMessage from "../models/postMesseage.js";

export async function getPosts(req, res) {
  try {
    const postMesseage = await PostMessage.find();
    // res.send(postMesseage);
    res.status(200).json(postMesseage);
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
}

export async function createPost(req, res) {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);

    // res.send("Post created");
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
}
