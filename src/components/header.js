import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar, Nav} from 'react-bootstrap';

class Header extends Component{
	renderLinks(){
		if(this.props.authenticated){
			return(
				<div>
				<li className="nav-item">
					<Link className="nav-link" to="/signout">Sign Out</Link>
<<<<<<< HEAD
					<Link className="nav-link" to="/profile">Profile</Link>
					<Link className="nav-link" to="/settings">Settings</Link>
=======
				</li>				
				<li className="nav-item">
					<Link className="nav-link" to="/profile">Profile</Link>
>>>>>>> 0e3b8d153e75d6f3f4cfb35e585511bbf1dc53ff
				</li>
				</div>
				);
		}
		else{
			return[
				<li className="nav-item" key={1}>
					<Link className="nav-link" to="/signin">Sign In</Link>
				</li>
			];
		}
	}

	render(){
		return (
			<nav className="navbar navbar-light">
				<Link to="/" className="navbar navbar-brand">The Knowledge House</Link>
				<ul className="nav navbar-nav">
					{this.renderLinks()}			
				</ul>
			</nav>
			);
	}
}
function mapStateToProps(state){
	return{
		authenticated: state.auth.authenticated
	};
}
export default connect(mapStateToProps)(Header);