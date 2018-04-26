import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import JobReducer from './reducer_job';
import studentReducer from './reducer_student';
import caseReducer from './reducer_case';

const rootReducer = combineReducers({
  auth: authReducer,
  job : JobReducer,
  student: studentReducer,
  Case: caseReducer
});

export default rootReducer;
