import axios from "axios";

const url = "http://localhost:5000/posts";

export async function fetchPosts() {
  try {
    console.log("in");
    const res = await axios.get(url);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
