import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Feature from './components/feature';
import Welcome from './components/welcome';
import Profile from './components/profile';
import Profile_2 from './components/profile_2';
import Profile_3 from './components/profile_3';

import requireAuth from './components/auth/require_auth';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store=createStoreWithMiddleware(reducers);

const token=localStorage.getItem('token');
//If we have a token,consider the user to be signed in
if(token){
	//we need to update application state
	store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
  	<Router history={browserHistory}>
  		<Route path="/" component={App}>
  			<IndexRoute component={Welcome}/>
  			<Route path="signin" component={SignIn}/>
  			<Route path="signout" component={SignOut}/>
  			<Route path="signup" component={SignUp}/>
  			<Route path="feature" component={requireAuth(Feature)}/>
        <Route path="profile" component={requireAuth(Profile)}/>
        <Route path="profile_2" component={requireAuth(Profile_2)}/>
        <Route path="profile_3" component={requireAuth(Profile_3)}/>
  		</Route>
  	</Router>
  </Provider>
  , document.querySelector('.container'));
