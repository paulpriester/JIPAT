import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component	{
	renderLinks()	{
		if (this.props.type == 'student' && this.props.authenticated) {
			return	(
				<div>
					<li className="nav-item">
						<Link className="nav-link right" to="/signout">Sign Out</Link>
					</li>
					<li className="nav-item left">
						<Link className="nav-link" to="/feature">Jobs</Link>
					</li>	
					<li className="nav-item">
						<Link className="nav-link" to="/dashboard">Dashboard</Link>
					</li>	
					<li className="nav-item">
						<Link className="nav-link" to="/profile">Profile</Link>
					</li>
				</div>	
			);
		} else if (this.props.type == 'admin' && this.props.authenticated){
			return	(
				<div>
				<li className="nav-item">
					<Link className="nav-link" to="/joblist_admin">Jobs</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/tmdashboard">Dashboard</Link>
				</li>	
				<li className="nav-item">
					<Link className="nav-link" to="/admincases">Cases</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
     		<li className="nav-item">
					<Link className="nav-link" to="/students">Students</Link>
				</li>
				</div>		
			);

		} else	{
			return [
				<li className="nav-item navLinks" key={1}>
					<Link className="nav-link" to="/signin">Sign In</Link>
				</li>
			];
		}
	}

	render() {
		return (
			<Navbar fluid>
				<h2 className="navbar-brand">jklfsklfskdsfkl; lafsdkl;sdfkl;sdfkl;dfsl;sdfl;</h2>

				<ul className="nav navbar-nav">
					{this.renderLinks()}			
				</ul>
			</Navbar>
		);
	}
}

function mapStateToProps(state){
	return{
		type: state.auth.type,
		authenticated: state.auth.authenticated
	};
}
export default connect(mapStateToProps)(Header);