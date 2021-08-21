import {
  GET_PDFS,
  PDF_ERROR,
  UPLOAD_SUCCESS,
  LOADING,
  GET_ALLPDFS
} from '../actions/types';

const initialState = {
  pdfs: [],
  allpdfs: [],
  loading: true,
  error: {},
  pdf: []
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
        loading: true
      };
    case GET_ALLPDFS:{
      return {
        ...state,
        allpdfs : payload,
        loading: false
      }
    }
    case PDF_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default postReducer;
