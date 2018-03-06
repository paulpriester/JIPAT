import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import JobReducer from './reducer_job';
import studentReducer from './reducer_student';

const rootReducer = combineReducers({
  form, //form: form
  auth: authReducer,
  job : JobReducer,
  student: studentReducer

});

export default rootReducer;
