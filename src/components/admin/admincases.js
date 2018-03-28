import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchAllCases, openCase, removeCase} from '../../actions'


 class Cases extends Component {
  constructor () {
    super();

    this.state = {
      button: 'open'
    };

    this.updateCase = this.updateCase.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchAllCases())
  }

  updateCase(id) {
    this.props.dispatch(openCase(id))
    // const caseToggle = this.state.button == 'open' ? 'close' : 'open';
    // this.setState({button: caseToggle})
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
          <select >
                <option value='open' onClick={()=> this.updateCase(caseData._id)}> Open </option>
                <option value='close' eventKey="2"> Close </option>
                <option value='placed' eventKey="3" active> Placed </option>
                <option divider />
                <option eventKey="4">Separated link</option>
          </select>
          </td>
          <td></td>
          <td><button onClick={()=> this.removeCase(caseData._id)}> Remove Case</button></td>
      </tr>
    )
  }

  render () {
    return (
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
            {this.props.allCases.length != 0 && this.props.allCases.map(i=>this.renderCase(i,this.props.dispatch))}
          </tbody>
      </table>
    )
  }
}

function mapStateToProps({Case} ) {
  console.log(Case)
  return  Case ;
}

export default connect (mapStateToProps)(Cases);