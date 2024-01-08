import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import useStyles from "./home-styles";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/postsAction";
import Paginate from "../Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tags, setTags] = useState([]);
  const tst = useSelector((state) => state.postsReducer);

  console.log("app js currentid");
  console.log(tst);
  console.log(currentId);

  function handleSearchPost() {
    if (searchKeyword.trim() || tags) {
      dispatch(
        getPostsBySearch({ search: searchKeyword, tags: tags.join(",") })
      );
      navigate(
        `/posts/search?searchQuery=${searchKeyword || "none"}&tags=${tags.join(
          ","
        )}`
      );
    } else {
      navigate("/");
    }
  }
  // {
  //   navigate(
  //     `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
  //   );
  // }
  function handleKeyPress(e) {
    //press enter to search
    if (e.keyCode === 13) {
      handleSearchPost();
    }
  }

  function handleAddChip(tag) {
    setTags([...tags, tag]);
    setSearchKeyword("");
  }

  function handleDeleteChip(tagToDelete) {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  }

  // useEffect(() => {
  //   console.log("app js useEffect dispatch(getPosts())");
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={searchKeyword}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  // navigate(`/posts/search?searchQuery=${e.target.value}`);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAddChip}
                onDelete={handleDeleteChip}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={handleSearchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !searchKeyword && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
