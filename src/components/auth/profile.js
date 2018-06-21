import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import {profileImage, fetchProfile, fetchcaselength, fetchSavedSkills} from '../../actions';
import Dashboard from '../student/dashboard';
import ModalProfile from '../modal_profile';
import ModalSkill from '../modal_skill';
import { Row, Col } from 'reactstrap';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { config } from '../../../config'

class Profile extends Component{

  constructor(props){

    super(props)

    this.state = {

      showUpload:false,
      uploadText: 'Edit'

    }
  }

  componentWillMount () {
    let id = this.props.location.query.id?this.props.location.query.id : ''

    this.props.dispatch(fetchcaselength(id));
    this.props.dispatch(fetchProfile(id));
    this.props.dispatch(fetchSavedSkills());
  }

  componentWillUnmount () {
    this.props.dispatch({type: 'CLEAR_CASELENGTH'})
  }


   renderSkill(skillData,dispatch) {
    return (
      <ul key={skillData.id}>
          <li>{skillData.skill}</li>
      </ul>
    )
  }

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", config.name); // Replace the preset name with your own
      formData.append("api_key", config.key); // Replace API key with your own Cloudinary key
      
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      axios.post("https://api.cloudinary.com/v1_1/dxpck5nb2/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then(res => {
        const image = res.data.secure_url;
        this.props.dispatch(profileImage(image));
      })     
    })
  }

 
  
  render(){
        console.log(this.props)

    return(
      <div className="edit-profile">
            <Row className="width-row">
              <Col className="border-profile" sm="3">                
                <img src={this.props.information.image}/>                
                {this.state.showUpload ?
                <Col md={{offset:3}}>
                  <Dropzone 
                    onDrop={this.handleDrop} 
                    accept="image/*" 
                    // style={styles.dropzone}
                  >
                    <p>Drop your files or click here to upload</p>
                  </Dropzone>
                  </Col>
                  :
                  null
                }
                <a href="#"
                  onClick={()=>this.setState(prev =>({
                    showUpload:!prev.showUpload
                  }))}>Edit</a>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>Name: <ModalProfile profile={this.props.information} /></h3>
                <p>{this.props.information.firstName} {this.props.information.lastName}</p>
                <h3>W.R. Score:</h3>
                <p>{this.props.information.score}</p>
              </Col>
              
              <Col className="border-profile" sm="3">
                <h3>Github:</h3>
                <a href={this.props.information.github}>{this.props.information.github}</a>
                <h3>Portfolio:</h3>
                <a href={this.props.information.portfolio}>{this.props.information.portfolio}</a>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>LinkedIn:</h3>
                <a className="link-width" href={this.props.information.linkedin}>{this.props.information.linkedin}</a>
                <h3>Resume:</h3>
                <a className="link-width" href={this.props.information.resume}>{this.props.information.resume}</a>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>Jobs Applied:</h3>
                <p className="jobs">{this.props.caselength.length}</p>
              </Col>
            </Row>
            <Row className="width-row">
            <Col className="border-profile" sm="4">
              <h3>About Me</h3>  
              <p>{this.props.information.about}</p>
            </Col>
            <Col className="border-profile" sm="4">
              <h3>Skills</h3>
              {this.props.information.skills && this.props.information.skills.map(i => <p>{i}</p>)}
              <ModalProfile />
              <ModalSkill />
            </Col>
            <Col className="border-profile" sm="4">
              <h3>Career Goals</h3>
              <p> {this.props.information.careergoals}</p>
            </Col>
          </Row>
          <Row className="width-row">
          <Col className="border-profile">
            <h3>Jobs Open:</h3>
            <p>{this.props.case.filter(i => i.openCase == 'Open').length}</p>
          </Col>
          <Col className="border-profile">
            <h3>Jobs Closed:</h3>
            <p>{this.props.case.filter(i => i.openCase == 'Close').length}</p>
          </Col>
          <Col className="border-profile">
            <h2>Jobs Interview</h2>
            <p>{this.props.case.filter(i => i.openCase == 'Interview').length}</p>
          </Col>
          <Col className="border-profile">
            <h2>Salary Negotation</h2>
            <p>{this.props.case.filter(i => i.openCase == 'Salary Negotation').length}</p>
          </Col>
          <Col className="border-profile">
            <h2>Jobs Placed</h2>
              <p>{this.props.case.filter(i => i.openCase == 'Place').length}</p>
          </Col>
          </Row>
            <br></br>
              <h3>Cases</h3>
              <Dashboard profile = {true} id = {this.props.location.query.id?this.props.location.query.id : ''}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error,
    information: state.student.profile,
    skill: state.student.skills,
    case: state.student.cases,
    caselength: state.student.caselength
  }
}

export default connect(mapStateToProps) (Profile);