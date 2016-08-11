

import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], post: {}, loginfo: {} };

const Reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionTypes.LOGIN :
      return Object.assign({}, state, {
        loginfo: action.loginfo
      });

    case ActionTypes.ADD_POST :
      return Object.assign({}, state, {
        posts: [{
          name: action.name,
          title: action.title,
          content: action.content,
          slug: action.slug,
          cuid: action.cuid,
          _id: action._id
        }, ...state.posts]
      });

    case ActionTypes.CHANGE_SELECTED_POST :
      return Object.assign({}, state, {
        post: action.slug
      });


    case ActionTypes.ADD_POSTS :
      return Object.assign({}, state, {
        posts: action.posts
      });

    case ActionTypes.ADD_SELECTED_POST :
      return Object.assign({}, state, {
        post: action.post
      });

    case ActionTypes.DELETE_POST :
      return Object.assign({}, state, {
        posts: state.posts.filter((post) => post._id !== action.post._id)
      });

    default:
      return state;
  }
};



export default Reducer;
