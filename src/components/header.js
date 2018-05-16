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
				<div>
					<NavItem>
						<NavLink><Link className="nav-link" to="/signout">Sign Out</Link></NavLink>
					</NavItem>
					<NavItem>
						<NavLink><Link className="nav-link" to="/feature">Jobs</Link></NavLink>
					</NavItem>	
					<NavItem>
						<NavLink><Link className="nav-link" to="/dashboard">Dashboard</Link></NavLink>
					</NavItem>	
					<NavItem>
						<NavLink><Link className="nav-link" to="/profile">Profile</Link></NavLink>
					</NavItem>
				</div>	
			);
		} else if (this.props.type == 'admin' && this.props.authenticated){
			return	(
				<div>
				<NavItem>
					<NavLink><Link to="/joblist_admin">Jobs</Link></NavLink>
				</NavItem>
				<NavItem>
					<NavLink><Link to="/tmdashboard">Dashboard</Link></NavLink>
				</NavItem>	
				<NavItem>
					<NavLink><Link to="/admincases">Cases</Link></NavLink>
				</NavItem>
				<NavItem>
					<NavLink><Link to="/signout">Sign Out</Link></NavLink>
        		</NavItem>
     			<NavItem>
					<NavLink><Link to="/students">Students</Link></NavLink>
				</NavItem>
				</div>		
			);

		} else	{
			return [
				<NavItem key={1}>
					<NavLink><Link to="/signin">Sign In</Link></NavLink>
				</NavItem>
			];
		}
	}

	render() {
		return (
        <Navbar light expand="md">
          <NavbarBrand>The Knowledge House</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              	{this.renderLinks()}
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
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