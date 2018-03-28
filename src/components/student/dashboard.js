import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchCases, openCase, removeCase} from '../../actions'


 class Dashboard extends Component {
  constructor (props) {
    super(props);

    // this.state = {
    //   status: this.handleChange()
    // };

    this.updateCase = this.updateCase.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //   const status = e.target.value;
  //   this.props.onChange(status);
  // }

  componentDidMount() {
    this.props.dispatch(fetchCases())
  }

  updateCase(id) {
    this.props.dispatch(openCase(id))
    // const caseToggle = this.state.button == 'open' ? 'close' : 'open';
    // this.setState({status: this.handleChange()})
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
          <select>
                <option value='open' onClick={()=> this.updateCase(caseData._id)}> Open </option>
                <option value='close'  onClick={()=> this.updateCase(caseData._id)} eventKey="2"> Close </option>
                <option value='placed'  onClick={()=> this.updateCase(caseData._id)} eventKey="3" active> Placed </option>
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

export default connect (mapStateToProps)(Dashboard);