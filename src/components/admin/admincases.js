import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table, Button, ButtonGroup, ButtonToolbar, SplitButton,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchAllCases, updateCase} from '../../actions';
import SearchCases from './searchCases';

class Cases extends Component {

  constructor(props) {
    super(props);

    this.state = { type: 'Open'};

    this.updateCase = this.updateCase.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchAllCases())
  }

   changeType(type) {
    //function used to record the state of the case status.
    this.setState({type: type})
  }

  updateCase(id,value) {
    this.props.dispatch(updateCase(id,value))
    console.log(value)
  }

  renderCase(caseData,dispatch) {
    var selectCase = function(Case) {
      dispatch({
        type: 'SELECT_CASE',
        payload: Case
      })
    }

    return (
         <tr key={caseData._id}>
          <td><Link className='detail' to='/casedetail' onClick={()=> selectCase(caseData)}>{caseData.jobTitle}</Link></td>
          <td>{caseData.studentName}</td>
          <td>{caseData.company}</td>   
          <td>
            <select id="case-status"
                onChange={e => this.updateCase(caseData._id, e.target.value)}>
          <option value="Open" selected={caseData.openCase=="Open" ? true : false}>
            Open
          </option>
          <option value="Applied" selected={caseData.openCase=="Applied" ? true : false}>
            Applied
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
    return (
      <div>
      <ButtonToolbar className='tabs' justified bsSize="large">
        <Button onClick= {() => this.changeType('Open')}>Open</Button>
        <Button onClick= {() => this.changeType('Close')}>Close</Button>
        <Button onClick= {() => this.changeType('Place')}>Place</Button>
        <Button onClick= {() => this.changeType('Applied')}>Applied</Button>
        <Button onClick= {() => this.changeType('Interview')}>Interview</Button>
        <Button onClick= {() => this.changeType('Salary Negotation')}>Salary Negotation</Button>
      </ButtonToolbar>
      <SearchCases />
      <table className ='table table-hover'>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Student Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Date added</th>
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

export default connect (mapStateToProps)(Cases);

