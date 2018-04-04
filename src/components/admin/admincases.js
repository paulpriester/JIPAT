import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchAllCases, updateCase, removeCase} from '../../actions';

class Cases extends Component {

  constructor(props) {
    super(props);

    this.state = { type: 'Open'};
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

  removeCase(id) {
    console.log(id)
    this.props.dispatch(removeCase(id))
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
          <td>
            <select id="case-status"
                onChange={e => this.updateCase(caseData._id, e.target.value)}>
          <option value="Open">
            Open
          </option>
          <option value="Applied">
            Applied
          </option>
          <option value="Interview 1">
            Interview 1
          </option>
          <option value="Interview 2">
            Interview 2
          </option>
          <option value="Salary Negotation">
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
          <td><button onClick={()=> this.removeCase(caseData._id)}> Remove Case</button></td>
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
              <th></th>
              <th>Status</th>
              <th>Remove</th>
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