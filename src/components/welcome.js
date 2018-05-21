import React,{Component} from 'react';
import {Button, Jumbotron} from 'react-bootstrap';
// import '../style/welcome.css';
import {Link} from 'react-router';

const customStyles = {
	content: {
		position: "relative",
		top: "6em",
	}
}

class Welcome extends Component {
	render () {
		return (
			<div>
			  <Jumbotron className="Jumbotron">
			  	<div style={customStyles.content}>
				    <h1 className="jumbo-title">Welcome to TKH </h1>
				    <p className="jumbo-description">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
				    <Button className="sign-in-btn"><Link to='/signin'>Sign in</Link></Button>
			    </div>
			  </Jumbotron>
			  <div className='container about'>
					<h1 className="title">ABOUT US</h1>
					<p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
					enean euismod bibendum laoreet. Proin gravida dolor sit amet lac
					us accumsan et viverra justo commodo. Proin sodales pulvinar sic temp
					or. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. N
					am fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sap
					ien nunc accuan eget.</p>
					<p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
					enean euismod bibendum laoreet. Proin gravida dolor sit amet lac
					us accumsan et viverra justo commodo. Proin sodales pulvinar sic temp
					or. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. N
					am fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sap
					ien nunc accuan eget.</p>
				</div>
			  </div>
		);
	}
}

export default Welcome;