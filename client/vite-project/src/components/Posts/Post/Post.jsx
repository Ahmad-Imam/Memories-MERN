import useStyles from "./post-style";

export default function Post() {
  const classes = useStyles();
  return <h1 className={classes.title}>Post</h1>;
}
