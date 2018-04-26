import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {addSkills, fetchSkills, removeSkill} from '../actions';
import { bindActionCreators } from 'redux';                  
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup,  ControlLabel, Jumbotron,Form, FormControl, Col } from 'react-bootstrap';


class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: ''
    };

    this.searchInputChange = this.searchInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(fetchSkills())
  }

  searchInputChange(event) {
    console.log(event.target.value)
    this.setState({
      skill: event.target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    // We need to go and fetch api data.
    this.props.dispatch(addSkills({skill: this.state.skill}));
    this.setState({ skill: '' });
    console.log(this.setState.skill)
  }

  removeSkill(id) {
    console.log(id)
    this.props.dispatch(removeSkill(id))
  }

  renderSkill(skillData,dispatch) {
    return (
      <tr key={skillData.id}>
          <td>{skillData.skill}</td>
          <td><button onClick={()=> this.removeSkill(skillData._id)}> x</button></td>

      </tr>
    )
  }

  
  render() {
    return (
    <div>
    <Form onSubmit={this.onFormSubmit}>
          <Col sm={5}>
            <input
              placeholder='Input skill'
              className='form-control'
              name="skill"
              value={this.state.skill}
              onChange={this.searchInputChange}
            />
          </Col>
          <Col sm={1}>
            <Button type="submit" className='btn btn-secondary'>Add Skill</Button>
          </Col>
    </Form>

        <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.allSkills.length != 0 && this.props.allSkills.map(i=>this.renderSkill(i,this.props.dispatch))}
              </tbody>
            </table>
      
    </div>
    )
    
  }
}

function mapStateToProps({skill} ) {
  return  skill ;
}


export default connect( mapStateToProps)(Skills);