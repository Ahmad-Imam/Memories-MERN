import useStyles from "./form-styles";
import { fetchPosts } from "../../api";

export default function Form() {
  const classes = useStyles();
  fetchPosts();
  return <h1 className={classes.form}>FORM</h1>;
}
