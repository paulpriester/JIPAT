import React from 'react';


class TM_Keyword extends React.Component{
  constructor(){
    super();
    this.state={
      complete: false,
      newInput: "",
      showUpdateField: false
    }
    // manualling bind your functions here
    this.updateInput = this.updateInput.bind(this);
    this.updateProp = this.updateProp.bind(this);

  }

  updateInput(event){
    event.preventDefault()
    this.setState({
      newInput: event.target.value
    })
  }

  updateProp(event){
    event.preventDefault()
    this.props.update([this.props.task, this.state.newInput]);
    this.setState({
      showUpdateField: false
    })
  }

shouldComponentUpdate(nextProps, nextState){
  console.log('a');
  return true
}

componentWillUpdate(nextProps, nextState){
  console.log('b)');
}

componentDidUpdate(prevProps, prevState){
  console.log('c');
}

// Don't worry about the code below.
// There was a bug in the app where if you click complete on a task and then
// delete the task, the following task was marked complete.
// This function below prevents that behaviour from happenning.
// to learn more about how this method works below, check out react lifecycles.
// Docs-----
// https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops
componentWillReceiveProps(nextProps){
  console.log('d');  
  if(nextProps !== this.props){
    this.setState({
      complete: false
    })
  }
}

componentWillMount(){
  console.log('e')
}

componentDidMount(){
  console.log('f')
}

render(){
  
  return(

    <div>
      <li>{this.props.task}</li>
            <button onClick={ ()=>this.props.del(this.props.task) }>Delete</button>
            {/* Based on the boolean of complete, we activate the string of
              "misson complete" or "mission not complete". By clicking, we are
              changing the states inline
           */}
            {this.state.complete ?
              <button onClick={ ()=> this.setState({complete: false})}>Not Complete</button> :
              <button onClick={ ()=> this.setState({complete: true}) }>
              complete</button>
            }
      <br></br>
        {/* Based on the boolean of showUpdateField, we can edit the original task
          to a new task */}
        {this.state.showUpdateField ?
          <button onClick={this.updateProp}>Done updating</button> :
          <button onClick={ ()=> this.setState({ showUpdateField: true }) }>
          Update</button>
        }
      <br></br>
        {/* Here we are showing the input field based on the boolean of showUpdateField */}
        {this.state.showUpdateField ?
          <form onSubmit={ this.updateProp }>
          <input placeholder={this.props.task} onChange={ this.updateInput }/>
          </form>
          :
          ""
        }
        {this.state.complete ? "mission complete" : "Mission NOT Complete"}
      <br></br>
      <br></br>

    </div>
    )
  }
}



export default TM_Keyord;
