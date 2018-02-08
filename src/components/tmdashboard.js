import React, {Component} from 'react';
import {Link} from 'react-router';


class TmDashboard extends Component {

  render() {
    return (
        <nav className="navbar navbar-light">
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/invite">Invite</Link>
                </li>       
                <li className="nav-item">
                  <Link className="nav-link" to="/">Approve Access To Jobs</Link>
               </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Manage Case Information</Link>
               </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Manage Job Titles and Keywords</Link>
               </li>
              </ul>        
        </nav> 
    );
  }
}

export default TmDashboard;