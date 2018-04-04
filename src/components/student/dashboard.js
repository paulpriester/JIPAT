import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchCases, updateCase, removeCase} from '../../actions'


 class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { type: 'Open'};
  }

  componentDidMount() {
    this.props.dispatch(fetchCases())
  }

  updateCase(id,value) {
    this.props.dispatch(updateCase(id,value))
    console.log(value)
  }

  changeType(type) {
    //function used to record the state of the case status
    this.setState({type: type})
  }

  renderCase(caseData,dispatch) {
    var selectCase = function(Case) {
      dispatch({
        type: 'SELECT_CASE',
        payload: Case
      })
    }

    return (
      <tr key={caseData.jobTitle}>
          <td><Link className='detail' to='/casedetail' onClick={()=> selectCase(caseData)}>{caseData._id}</Link></td>
          <td>{caseData.studentName}</td>
          <td>{caseData.company}</td>   
          <td>
            <select id="case-status"
                onChange={e => this.updateCase(caseData._id, e.target.value)}>
          <option value="Open">
            Open
          </option>
          <option value="Open">
            Applied
          </option>
          <option value="Open">
            Interview 1
          </option>
          <option value="Open">
            Interview 2
          </option>
          <option value="Open">
            Salary Negotation
          </option>
          <option value="Close">
            Close
          </option>
          <option value="Place">
            Place
          </option>
        </select>
          </td>
          <td>{caseData.openCase}</td>
         
      </tr>
    )
  }

  render () {
    console.log(this.state.type)
    return (
      <div>
       <ul>
        <li onClick= {() => this.changeType('Open')}> open</li>
        <li onClick= {() => this.changeType('Close')}> close</li>
        <li onClick= {() => this.changeType('Place')}> place</li>
      </ul>
      <table className ='table table-hover'>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Student Name</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allCases.length != 0 && this.props.allCases.filter(i=>i.openCase==this.state.type).map(i=>this.renderCase(i,this.props.dispatch))}
          </tbody>
      </table>
      </div>
    )
  }
}

function mapStateToProps({Case} ) {
  console.log(Case)
  return  Case ;
}

export default connect (mapStateToProps)(Dashboard);