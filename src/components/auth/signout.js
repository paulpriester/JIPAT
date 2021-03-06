import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Link} from 'react-router';

class SignOut extends Component{
	componentWillMount(){
		this.props.signOutUser();
	}
	
	render(){
		return <div className="goodbye">Goodbye...</div>;
	}
}

export default connect(null,actions)(SignOut);