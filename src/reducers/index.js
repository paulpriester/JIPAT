import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import JobReducer from './reducer_job';
import studentReducer from './reducer_student';
// import caseReducer from './reducerCase';

const rootReducer = combineReducers({
  form, //form: form
  auth: authReducer,
  job : JobReducer,
  student: studentReducer
  // case: caseReducer

});

export default rootReducer;
