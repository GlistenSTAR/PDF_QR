import {
  GET_PDFS,
  PDF_ERROR,
  UPLOAD_SUCCESS,
  LOADING
} from '../actions/types';

const initialState = {
  pdfs: [],
  pdf: [],
  loading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PDFS:
      return {
        ...state,
        pdfs: payload,
        loading: false
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        // posts: [payload, ...state.posts],
        loading: true
      };
    // case DELETE_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.filter((post) => post._id !== payload),
    //     loading: false
    //   };
    case PDF_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // case UPDATE_LIKES:
    //   return {
    //     ...state,
    //     posts: state.posts.map((post) =>
    //       post._id === payload.id ? { ...post, likes: payload.likes } : post
    //     ),
    //     loading: false
    //   };
    // case ADD_COMMENT:
    //   return {
    //     ...state,
    //     post: { ...state.post, comments: payload },
    //     loading: false
    //   };
    // case REMOVE_COMMENT:
    //   return {
    //     ...state,
    //     post: {
    //       ...state.post,
    //       comments: state.post.comments.filter(
    //         (comment) => comment._id !== payload
    //       )
    //     },
    //     loading: false
    //   };
    default:
      return state;
  }
}

export default postReducer;
