import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import JobReducer from './reducer_job';
import studentReducer from './reducer_student';
<<<<<<< HEAD
// import caseReducer from './reducerCase';
=======
import caseReducer from './reducer_case';
>>>>>>> 2bf91f6db7de3b80a7f585431b82abc6f65b94f2

const rootReducer = combineReducers({
  form, //form: form
  auth: authReducer,
  job : JobReducer,
<<<<<<< HEAD
  student: studentReducer
  // case: caseReducer
=======
  student: studentReducer,
  Case: caseReducer
>>>>>>> 2bf91f6db7de3b80a7f585431b82abc6f65b94f2

});

export default rootReducer;
