import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Header extends Component	{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
	renderLinks()	{
		if (this.props.type == 'student' && this.props.authenticated) {
			return	(
				<Nav className="ml-auto" navbar>
					<NavItem>
						<Link className="nav-link" to="/feature">Jobs</Link>
					</NavItem>	
					<NavItem>
						<Link className="nav-link" to="/dashboard">Dashboard</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/profile">Profile</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/signout">Sign Out</Link>
					</NavItem>
				</Nav>	
			);
		} else if (this.props.type == 'admin' && this.props.authenticated){
			return	(
				<Nav className="ml-auto" navbar>
					<NavItem>
						<Link className="nav-link" to="/tmdashboard">Dashboard</Link>
					</NavItem>	
					<NavItem>
						<Link className="nav-link" to="/joblist_admin">Jobs</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/skills">Skills</Link>
	        		</NavItem>
					<NavItem>
						<Link className="nav-link" to="/admincases">Cases</Link>
					</NavItem>
	     			<NavItem>
						<Link className="nav-link" to="/students">Students</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/signout">Sign Out</Link>
	        		</NavItem>
				</Nav>		
			);

		} else	{
			return [
				<Nav className="ml-auto" navbar>
				<NavItem >
					<Link className="nav-link" to="/signin">Sign In</Link>
				</NavItem>
				</Nav>
			];
		}
	}

	render() {
		console.log(this.props)
		return (
        <Navbar light expand="md">
          <NavbarBrand><Link to="/feature" className="logo">The Knowledge House</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              	{this.renderLinks()}
          </Collapse>
        </Navbar>
		);
	}
}

function mapStateToProps(state){
	return{
		type: state.auth.type,
		authenticated: state.auth.authenticated,
	    information: state.student.profile
	};
}
export default connect(mapStateToProps)(Header);