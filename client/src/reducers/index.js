import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import pdf from './pdfs';

export default combineReducers({
  alert,
  auth,
  profile,
  pdf
});
