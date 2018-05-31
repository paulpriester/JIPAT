import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button,ButtonToolbar, Table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchCases, updateCase} from '../../actions'


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
      console.log(Case)
      dispatch({
        type: 'SELECT_CASE',
        payload: Case
      })
    }

    return (
      <tr key={caseData.jobTitle}>
           <td><Link className='detail' to='/casedetail' onClick={()=> selectCase(caseData)}>{caseData.jobTitle}</Link></td>
          <td>{caseData.company}</td> 
          <td>{caseData.job_location}</td>  
          <td>
            <select id="case-status"
                onChange={e => this.updateCase(caseData._id, e.target.value)}>
          <option value="Open" selected={caseData.openCase=="Open" ? true : false}>
            Open
          </option>
          <option value="Interview" selected={caseData.openCase=="Interview 1" ? true : false}>
            Interview 1
          </option>
          <option value="Interview"selected= {caseData.openCase=="Interview 2"? true : false}>
            Interview 2
          </option>
          <option value="Salary Negotation" selected={caseData.openCase=="Salary Negotation" ? true : false}>
            Salary Negotation
          </option>
          <option value="Close" selected={caseData.openCase=="Close" ? true : false}>
            Close
          </option>
          <option value="Place" selected={caseData.openCase=="Place" ? true : false}>
            Place
          </option>
        </select>
          </td>
          <td>{caseData.date}</td>
      </tr>
    )
  }

  render () {
    // console.log(this.state.type)
    return (
      <div className="container">
      <ButtonToolbar className='tabs' justified bsSize="large">
        <Button onClick= {() => this.changeType('Open')}>Open</Button>
        <Button onClick= {() => this.changeType('Close')}>Close</Button>
        <Button onClick= {() => this.changeType('Place')}>Place</Button>
        <Button onClick= {() => this.changeType('Interview')}>Interview</Button>
        <Button onClick= {() => this.changeType('Salary Negotation')}>Salary Negotation</Button>
      </ButtonToolbar>
      <Table responsive className ='table table-hover'>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {this.props.allCases.length != 0 && this.props.allCases.filter(i=>i.openCase==this.state.type).map(i=>this.renderCase(i,this.props.dispatch))}
          </tbody>
      </Table>
      </div>
    )
  }
}

function mapStateToProps({Case} ) {
  console.log(Case)
  return  Case ;
}

export default connect (mapStateToProps)(Dashboard);