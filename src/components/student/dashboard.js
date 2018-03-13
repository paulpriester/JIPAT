import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Dashboard extends Component{
	render() {
		return (
			<ul className="nav navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/cases">Cases</Link>
                </li> 
                <li className="nav-item">
                  <Link className="nav-link" to="/feature">Jobs</Link>
                </li>
              </ul>        
		)
	}
}