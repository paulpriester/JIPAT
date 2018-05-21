import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table, Button, ButtonGroup, ButtonToolbar, SplitButton,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchAllCases, updateCase} from '../../actions';
import SearchCases from './searchCases';
import Moment from 'react-moment';

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
           <td><Link className='detail' to='/casedetail' onClick={()=> selectCase(caseData)}>{caseData._id}</Link></td>
          <td>{caseData.studentName}</td>
          <td>{caseData.company}</td>   
          <td>
            <select id="case-status"
                onChange={e => this.updateCase(caseData._id, e.target.value)}>
          <option value="Open" selected={caseData.openCase=="Open" ? true : false}>
            Open
          </option>
          <option value="Interview" selected={caseData.openCase=="Interview" ? true : false}>
            Interview 
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
          <td><Moment date= {caseData.date} /></td>
      </tr>
    )
  }

  render () {
    console.log(this.props)
    return (
      
      !this.props.isTyping ?
      <div>
      <ButtonToolbar className='tabs' justified bsSize="large">
        <Button onClick= {() => this.changeType('Open')}>Open</Button>
        <Button onClick= {() => this.changeType('Close')}>Close</Button>
        <Button onClick= {() => this.changeType('Place')}>Place</Button>
        <Button onClick= {() => this.changeType('Interview')}>Interview</Button>
        <Button onClick= {() => this.changeType('Salary Negotation')}>Salary Negotation</Button>
      </ButtonToolbar>
      <SearchCases 
      cases={this.props.allCases}/>
      <table className ='table table-hover'>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Student Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Date added</th>
            </tr>
          </thead>
          <tbody>
            {this.props.filteredCases.length != 0 && this.props.filteredCases
            .filter(i=>i.openCase==this.state.type)
              .map(i=>this.renderCase(i,this.props.dispatch))}
          </tbody>
      </table>
      <p>Conversion Rate from Open to Interview</p>
        <p>    {((this.props.filteredCases.filter(i => i.openCase == 'Interview').map(this.renderCase).length) /
                 (this.props.filteredCases.filter(i => i.openCase =='Open').map(this.renderCase).length
                +(this.props.filteredCases.filter(i => i.openCase == 'Interview').map(this.renderCase).length))*100).toFixed(1) + '%'}
        </p>

     <p>Conversion Rate from Interview to Close</p>
        <p>    {((this.props.filteredCases.filter(i => i.openCase == 'Close').map(this.renderCase).length) /
                 (this.props.filteredCases.filter(i => i.openCase =='Close').map(this.renderCase).length
                +(this.props.filteredCases.filter(i => i.openCase == 'Interview').map(this.renderCase).length))*100).toFixed(1) + '%'}
        </p>

        <p>Conversion Rate from Interview to Place</p>
      <p>    {((this.props.filteredCases.filter(i => i.openCase == 'Place').map(this.renderCase).length) /
               (this.props.filteredCases.filter(i => i.openCase =='Place').map(this.renderCase).length
              +(this.props.filteredCases.filter(i => i.openCase == 'Interview').map(this.renderCase).length))*100).toFixed(1) + '%'}
      </p>
      </div>

      : <div><SearchCases
      cases={this.props.allCases}/>
      <table className ='table table-hover'>
      <thead>
        <tr>
          <th>Case ID</th>
          <th>Student Name</th>
         </tr>
      </thead>
      <tbody>
        {}
      </tbody>
    </table> </div>
    ) 
  }
}

function mapStateToProps({Case}) {
  return  Case 
}

export default connect (mapStateToProps)(Cases);