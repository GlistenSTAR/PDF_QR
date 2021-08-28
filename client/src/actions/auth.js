import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USERS,
  GET_CURRENT_USER
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const getAllUsers = () => async dispatch => {
  try{
    const res = await api.get('/users/getAllUsers');
    dispatch({
      type: GET_USERS,
      payload:res.data
    });
  } catch (err){
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//change the role
export const changeAllowUser = (id) => async dispatch =>{
  try{
    const res = await api.put('/users', {id: id});
    dispatch(getAllUsers());
  } catch {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const forgot = (email) => async dispatch => {
  try{
    const res = await api.post('/auth/forgot', { email : email });
    dispatch(setAlert("We send the link to your email.", 'primary'));
  } catch (err){
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

export const getUser = (id) => async dispatch => {
  try {
    const res = await api.post('/auth/getUser', { id : id});
    dispatch({
      type: GET_CURRENT_USER,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

//Changed password
export const savePassword = (id, password, history) => async dispatch => {
  try{
    await api.post('/auth/save_password', {id: id, new_password: password})
    dispatch(setAlert("Password is changed successfully.", 'primary'));
    history.push('/login');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

// Logout
export const logout = () => ({ type: LOGOUT });
