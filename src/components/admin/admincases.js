import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Table, Button, ButtonGroup, ButtonToolbar, SplitButton,MenuItem} from 'reactstrap';
import {Link} from 'react-router';
import {fetchAllCases, updateCase} from '../../actions';
import SearchCases from './searchCases';
import moment from 'moment'
// import 'moment/locale/en-nz'
class Cases extends Component {
  constructor(props) {
    super(props);
    this.state = { type: 'Open'};
    this.updateCase = this.updateCase.bind(this);
    this.changeType = this.changeType.bind(this);
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
          <td><Link className='detail' to={{pathname: '/casedetail' , search: `?id=${caseData._id}`}} onClick={()=> selectCase(caseData)}>{caseData._id}</Link></td>
          <td>{caseData.studentName}</td>
          <td>{caseData.jobTitle}</td>
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
          <td>{moment(caseData.date).format('MMMM Do YYYY')}</td>
      </tr>
    )
  }
  render () {
    console.log(this.props)
    return (
      
      !this.props.isTyping ?
      <div className="container">
      <SearchCases 
        cases={this.props.allCases}
        filteredcases = {this.props.filteredCases}
        changeType = {this.changeType}
      />

      <Table responsive className ='table table-hover'>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Student Name</th>
              <th>Job Title</th>
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
      </Table>
      <p>Conversion Rate from Open to Interview</p>
        <p>    {this.props.filteredCases.filter(i => i.openCase =='Open').length != 0 ? ((this.props.filteredCases.filter(i => i.openCase == 'Interview').length) /
                 (this.props.filteredCases.filter(i => i.openCase =='Open').length
                +(this.props.filteredCases.filter(i => i.openCase == 'Interview').length))*100).toFixed(1) + '%': "No Students"}
        </p>
     <p>Conversion Rate from Interview to Close</p>
        <p>    {this.props.filteredCases.filter(i => i.openCase =='Close').length != 0 ? ((this.props.filteredCases.filter(i => i.openCase == 'Close').length) /
                 (this.props.filteredCases.filter(i => i.openCase =='Close').length
                +(this.props.filteredCases.filter(i => i.openCase == 'Interview').length))*100).toFixed(1) + '%' : "No Students"}
        </p>
        <p>Conversion Rate from Interview to Place</p>
      <p>    {this.props.filteredCases.filter(i => i.openCase =='Place').length != 0 ? ((this.props.filteredCases.filter(i => i.openCase == 'Place').length) /
               (this.props.filteredCases.filter(i => i.openCase =='Place').length
              +(this.props.filteredCases.filter(i => i.openCase == 'Interview').length))*100).toFixed(1) + '%' : "No Students"}
      </p>
      </div>
      : <div>
      <SearchCases cases={this.props.allCases}/>
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
    </table> 
    </div>
    ) 
  }
}
function mapStateToProps({Case}) {
  return  Case 
}

export default connect (mapStateToProps)(Cases);