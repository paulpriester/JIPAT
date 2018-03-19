import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar} from 'react-bootstrap';

class Header extends Component	{
	renderLinks()	{
		if (this.props.authenticated) {
			return	(
				<div className="navLinks">
					<li className="nav-item">
						<Link className="nav-link" to="/signout">Sign Out</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/profile">Profile</Link>
					</li>	
				</div>		
				
			);

		} else	{
			return (
				<li className="nav-item navLinks" key={1}>
					<Link className="nav-link" to="/signin">Sign In</Link>
				</li>
			);
		}
	}

	render() {
		return (
			<Navbar>
				<Link to="/feature" className="navbar-brand">The Knowledge House</Link>
				<ul className="nav navbar-nav">
					{this.renderLinks()}			
				</ul>
			</Navbar>
		);
	}
}
function mapStateToProps(state){
	return{
		authenticated: state.auth.authenticated
	};
}
export default connect(mapStateToProps)(Header);