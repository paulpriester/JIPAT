import React, {Component} from 'react';


class TmDashboard extends Component {

  render() {
    return (

     <div>
        <div>
{//        Header For Page
}
          <h1>The Knowledge House</h1><br />
           <h2>Talent Manager Dashboard</h2>
        </div>

        <div class = "buttonMenu">
{//        Navigation Bar Buttons For Page
}          <h1>Navigation Bar Buttons</h1>
            <ul>
              <li style = "vertical-align: center;"><button type='button'>Invite Student</button></li>
              <li style = "vertical-align: center;"><button type='button'>Approve Access To Jobs</button></li>
              <li style = "vertical-align: center;"><button type='button'>Manage Case Information</button></li>
              <li style = "vertical-align: center;"><button type='button'>Manage Job Titles and Keywords</button></li>
            </ul>        </div>

        <div>
{//        Input form area to invite User, approve User access to jobs, and to view cases 
} 
{//          Invite or Approval, or Case component
}
        </div>  
      </div>
    );
  }
}

export default TmDashboard;