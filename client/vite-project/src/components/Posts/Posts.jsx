import { useSelector } from "react-redux";
import Post from "./Post/Post";

import { Grid, CircularProgress } from "@material-ui/core";

import useStyles from "./posts-style";

export default function Posts({ setCurrentId }) {
  const classes = useStyles();

  const { posts, isLoading } = useSelector((state) => state.postsReducer);

  console.log("oo");
  console.log(posts);
  console.log(isLoading);

  if (!posts.length && !isLoading) return "No posts";

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post._id} xs={12} sm={12} lg={3} item>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
      <h1 className={classes.mainContainer}>Posts</h1>
      {/* <Post />
      <Post /> */}
    </>
  );
}
