import React, {Component} from 'react';
import {Link} from 'react-router';
 

class TmDashboard extends Component {
  render() {
    return (
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/students">Students</Link>
                </li> 
                <li className="nav-item">
                    <Link className="nav-link" to="/invite">Invite</Link>
                  </li>   
                <li className="nav-item">
                  <Link className="nav-link" to="/admincases">Cases</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/"> Job Titles and Keywords</Link>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link" to="/">Approve Access To Jobs</Link>
                </li>
              </ul>        
    );
  }
}

export default TmDashboard;

                  