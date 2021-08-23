import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_PDFS, 
  PDF_ERROR,
  LOADING,
  GET_ALLPDFS,
} from './types';

export const getPDFs = (name) => async dispatch =>{
  try {
    const uploader_name = {name : name};
    const res = await api.post('/pdfs', uploader_name);
    dispatch({
      type: GET_PDFS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PDF_ERROR,
      payload: { msg: err.response }
    });
  }
}

export const getAllPDFS = () => async dispatch => {
  try{
    const res = await api.get('/pdfs/getAllPDFS');
    dispatch({
      type: GET_ALLPDFS,
      payload:res.data
    });
  } catch (err){
    dispatch({
      type: PDF_ERROR
    })
  }
}

export const upload_pdf = (file, content, history, auth) => async dispatch => {
  console.log("uploading started....")
  content['uploader'] = auth.name;
  content['id'] = auth._id;
  const data = new FormData() 
  data.append('pdf_file', file)
  data.append('data', JSON.stringify(content))
  try {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    dispatch({
      type: LOADING
    })
    await api.post('/pdf_upload', data, config);
    dispatch(setAlert('uploaded successfully', 'success'));
    history.push('/');
  } catch (err) {
    dispatch({
      type: PDF_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addViews = (id, history) => async dispatch =>{
  try {
    const res = await api.post('/pdfs/addViews', id);
    history.push('/');
    dispatch({
      type: GET_PDFS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PDF_ERROR,
      payload: { msg: err.response }
    });
  }
}

export const changeAllowPDF = (id) => async dispatch => {
  try{
    await api.put('/pdfs', {id: id});
    dispatch(getAllPDFS());
  } catch {
    dispatch({
      type: PDF_ERROR
    })
  }
}

