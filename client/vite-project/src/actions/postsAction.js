import * as api from "../api";

import { actionTypes } from "../const/actionTypes.js";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    const { data } = await api.fetchPosts(page);
    // console.log("post action getposts calling dispatch fetchall");
    // console.log(data);

    dispatch({
      type: actionTypes.FETCH_ALL,
      payload: data,
    });

    dispatch({ type: actionTypes.END_LOADING });
  } catch (err) {
    console.log(err);
  }
  //   const action = { type: "FETCH_ALL", payload: [] };
  //   dispatch(action);
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: actionTypes.FETCH_POST, payload: { data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: actionTypes.FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (error) {
    console.log(error);
  }
  //   const action = { type: "FETCH_ALL", payload: [] };
  //   dispatch(action);
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    // console.log("data");
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.createPost(post);
    // console.log(data);

    navigate(`/posts/${data._id}`);

    dispatch({
      type: actionTypes.CREATE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    // console.log("post action updateposts calling dispatch update");
    const { data } = await api.updatePost(id, post);
    // console.log(data);
    dispatch({
      type: actionTypes.UPDATE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    // console.log("post action deletePosts calling dispatch delete");
    await api.deletePost(id);

    dispatch({
      type: actionTypes.DELETE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    // console.log("post action likePosts calling dispatch update");
    const { data } = await api.likePost(id);
    // console.log(data);
    dispatch({
      type: actionTypes.LIKE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    // console.log("post action commentPosts calling dispatch update");
    const { data } = await api.comment(value, id);
    // console.log(data);
    dispatch({
      type: actionTypes.COMMENT,
      payload: data,
    });
    return data.comments;
  } catch (err) {
    console.log(err);
  }
};
