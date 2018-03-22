import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchCases} from '../../actions'


 class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCases())
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
            </tr>
    )
  }

  render () {
    return (
      <div className="container">
        <table className ='table table-hover'>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Status</th>

              </tr>
            </thead>
            <tbody>
              {this.props.allCases.length != 0 && this.props.allCases.map(i=>this.renderCase(i,this.props.dispatch))}
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