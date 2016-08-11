import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function checkin(loginfo) {
  return {
    type: ActionTypes.LOGIN,
    loginfo: loginfo
  };
}


export function checkinRequest(loginfo) {
  return (dispatch) => {
    fetch(`${baseURL}/api/checkin`, {
      method: 'post',
      body: JSON.stringify({
        loginfo: {
          username: loginfo.username,
          password: loginfo.password
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => res.json()).then(res => {
      const username = res.loginfo.username;
      dispatch(checkin(res.loginfo));
      if(username != "no such user" && username != "wrong password")
        browserHistory.push('/'); // if the login information match the data in db, redirect to main page
    });
  };
}


export function addPost(post) {
  return {
    type: ActionTypes.ADD_POST,
    name: post.name,
    title: post.title,
    content: post.content,
    slug: post.slug,
    cuid: post.cuid,
    _id: post._id
  };
}

export function changeSelectedPost(slug) {
  return {
    type: ActionTypes.CHANGE_SELECTED_POST,
    slug
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/addPost`, {
      method: 'post',
      body: JSON.stringify({
        post: {
          name: post.name,
          title: post.title,
          content: post.content
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => res.json()).then(res => dispatch(addPost(res.post)));
  };
}

export function addSelectedPost(post) {
  return {
    type: ActionTypes.ADD_SELECTED_POST,
    post
  };
}

export function getPostRequest(post) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPost?slug=${post}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => response.json()).then(res => dispatch(addSelectedPost(res.post)));
  };
}

export function deletePost(post) {
  return {
    type: ActionTypes.DELETE_POST,
    post
  };
}

export function addPosts(posts) {
  return {
    type: ActionTypes.ADD_POSTS,
    posts
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPosts`).
      then((response) => response.json()).
      then((response) => dispatch(addPosts(response.posts)));
  };
}

export function deletePostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/deletePost`, {
      method: 'post',
      body: JSON.stringify({
        postId: post._id
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(dispatch(deletePost(post)));
  };
}
