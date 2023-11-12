import Post from "./Post/Post";

import useStyles from "./posts-style";

export default function Posts() {
  const classes = useStyles();
  return (
    <>
      <h1 className={classes.mainContainer}>Posts</h1>
      <Post />
      <Post />
    </>
  );
}
