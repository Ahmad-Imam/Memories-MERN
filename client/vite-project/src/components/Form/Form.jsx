import { useState, useEffect } from "react";
import useStyles from "./form-styles";
// import { fetchPosts } from "../../api";
import FileBase from "react-file-base64";

import { useDispatch, useSelector } from "react-redux";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { createPost, updatePost } from "../../actions/postsAction";
import { useNavigate } from "react-router-dom";

export default function Form({ currentId, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.postsReducer.posts.find((p) => p._id === currentId) : null
  );
  // console.log("form " + post);
  useEffect(() => {
    // console.log("form use effect [post]");
    if (post) setPostData(post);
  }, [post]);

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(postData);
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));

      clearForm();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clearForm();
    }
  }

  // console.log("user?.result?.name");
  // console.log(user?.result?.name);
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6">
          Please Sign In to create your own memories and like other memories.
        </Typography>
      </Paper>
    );
  }

  function clearForm() {
    setCurrentId(null);
    setPostData({
      // creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  }

  // fetchPosts();
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Updating" : "Creating"} a memory
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          className="TextField"
          onChange={(e) => {
            setPostData({ ...postData, creator: e.target.value });
          }}
        ></TextField> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          className="TextField"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          className="TextField"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
          margin=""
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          className="TextField"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(",") });
          }}
        ></TextField>

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearForm}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
