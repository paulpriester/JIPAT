// import React, { Component } from "react";
// import { Link } from "react-router";
// import { connect } from "react-redux";
// import { Grid, Row, Col, Table } from 'react-bootstrap';
// import * as actions from '../../actions';
// import ModalButtonEdit from '../modalButtonEdit';

// class Profile extends Component{
//   render(){
//     return(
//       <div>
//         <Grid fluid className="grid">
//           <Row className="show-grid-head">
//             <Col className="col-box" xs={3} md={3}>
//               <img className="profile-pic" src="https://www.bing.com/th?id=A5e81ae1f568f729aa4810dde8c952a58&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1" />
//             </Col>
//             <Col className="col-box" xs={3} md={3}>
//               <h3>Info</h3>
//             </Col>
//             <Col className="col-box" xs={3} md={3}>
//               <h3>Info #2</h3>
//             </Col>
//             <Col className="col-box" xs={3} md={3}>
//               <h3>Jobs Applied</h3>
//               <div className="jobs col-box"></div>
//             </Col>
//           </Row>
//           <Row className="show-grid">
//             <Col xs={6} md={6} className="right-border">
//               <h3>About Me</h3>
//               <p>
//                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
//                 sed do eiusmod tempor incididunt ut labore et dolore magna ali
//                 qua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
//                 laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
//                 dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
//                 nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
//                 culpa qui officia deserunt mollit anim id est laborum."
//               </p>
//               <ModalButtonEdit />
//             </Col>
//             <Col xs={6} md={6}>
//               <h3>Career Goals</h3>
//               <p>
//                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
//                 sed do eiusmod tempor incididunt ut labore et dolore magna ali
//                 qua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
//                 laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
//                 dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
//                 nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
//                 culpa qui officia deserunt mollit anim id est laborum."
//               </p>
//             </Col>
//           </Row>
//           <Row className="show-grid">
//             <Col xs={12} md={12}>
//               <h3>Cases</h3>
//               <Table responsive>
//                 <thead>
//                   <tr>
//                     <th>Role</th>
//                     <th>Company</th>
//                     <th>Location</th>
//                     <th>Job Type</th>
//                     <th>Status</th>
//                     <th>Date Added</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                   </tr>
//                   <tr>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                   </tr>
//                   <tr>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Col>
//           </Row>
//         </Grid>
//       </div>
//     )
//   }
// }

// export default Profile;

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";
import { connect } from "react-redux";
import * as actions from '../../actions';


const renderInput=field=>{
  const {meta: {touched,error}}=field;
  return(
    <div>
      <input {...field.input} type={field.type} placeholder='' className="form-control" />
      <div className="error">{touched?error:''}</div>
    </div>
    );  
  
};

class Profile extends Component{
  handleFormSubmit(formProps){
    this.props.profile(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
        );
    }
  }
  render(){
    const {handleSubmit}=this.props;
          console.log({handleSubmit})

    return(
        <form className="container" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>First Name:</label>
            <Field
              name="firstName"
              placeholder= 'test'
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Last Name:</label>
            <Field
              name="lastName"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>About:</label>
            <Field
              name="about"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Linkedin:</label>
            <Field
              name="linkedin"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Github:</label>
            <Field
              name="github"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Portfolio:</label>
            <Field
              name="portfolio"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Resume:</label>
            <Field
              name="resume"
              component={renderInput}
              type="text"
            />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Submit</button>
        </form>
    );
  }
}
function validate(formProps){
  const errors={};
  if(!formProps.firstName)
    errors.firstName="Please Enter firstName";
  if(!formProps.lastName)
    errors.lastName="Please Enter a Password";
  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  validate,
  form: 'profile'
})(
  connect(mapStateToProps,actions)(Profile)
);