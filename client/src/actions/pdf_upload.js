import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_PDFS, 
  PDF_ERROR
} from './types';

export const getPDFs = () => async dispatch =>{
  try {
    const res = await api.get('/pdfs');
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

export const upload_pdf = (file, content, history, auth) => async dispatch => {
  console.log("uploading started....")
  content['uploader'] = auth.name
  console.log(content)
  const data = new FormData() 
  data.append('pdf_file', file)
  data.append('data', JSON.stringify(content))
  try {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
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

