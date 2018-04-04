import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import requireAuth from './components/auth/require_auth';
import reducers from './reducers';
import {AUTH_USER, ADMIN_AUTH_USER} from './actions/types';

import App from './components/app';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import SignUpAd from './components/auth/signupad';

import Feature from './components/feature';
import AdminJobs from './components/admin/adminjobs';
import TmDashboard from './components/admin/tmdashboard';
import Cases from './components/admin/admincases';
import Welcome from './components/welcome';
import Profile from './components/auth/profile';
import Profile_2 from './components/profile_2';
import Profile_3 from './components/profile_3';

import Invite from './components/admin/invite';
import JobDetail from './components/job_detail';
import CaseDetail from './components/case_detail';
import Students from './components/admin/students';
import Dashboard from './components/student/dashboard';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, reduxThunk)(createStore);
const store=createStoreWithMiddleware(reducers);

const token=localStorage.getItem('token');
//If we have a token,consider the user to be signed in
if(token){
	//we need to update application state
	store.dispatch({type: AUTH_USER},{type: ADMIN_AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
  	<Router history={browserHistory}>
  		<Route path="/" component={App}>
  			<IndexRoute component={Welcome}/>
  			<Route path="signin" component={SignIn}/>
  			<Route path="signout" component={SignOut}/>
  			<Route path="signup" component={SignUp}/>
        <Route path="jobdetail" component={JobDetail}/>
        <Route path="casedetail" component={CaseDetail}/>
        <Route path="signupad" component={SignUpAd}/>
        <Route path="tmdashboard" component={TmDashboard}/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="invite" component={Invite}/>
        <Route path="students" component={Students}/>
        <Route path="admincases" component={Cases}/>
        <Route path="joblist_admin" component={requireAuth(AdminJobs)}/>
  			<Route path="feature" component={requireAuth(Feature)}/>
        <Route path="profile" component={Profile}/>
        <Route path="profile_2" component={requireAuth(Profile_2)}/>
        <Route path="profile_3" component={requireAuth(Profile_3)}/>
  		</Route>
  	</Router>
  </Provider>
  , document.getElementById('app'));