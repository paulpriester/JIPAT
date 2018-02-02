// kcm is the abbreviation for Keyword And Category Manager
import React from 'react';
import TM_Keyword from './TM_Keyword';


class TM-kcm extends React.Component {
  constructor(){
    super();

    this.state={keywords: {id:'',keyword}
      id: '',
      keyword: '',
      category: ''
    }
    // manualling bind your functions here
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleLoadPage = this.handleLoadPage.bind(this);
  }


  handleSubmit(e){
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat([this.state.input]),
      input: '',
    })

  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      input: e.target.value
    })

  }

  handleDelete(e){
    this.setState({
      tasks: this.state.tasks.filter( (task)=> task !== e)
    })
  }

  handleUpdate(change){
  this.setState({
    tasks: this.state.tasks.map(task => task === change[0] ?
            // transform the one with a matching name
            change[1]  :
            // otherwise return original task
            task
          )
    })
  }


  onload="checkCookies()"

  render() {

    let tasks = this.state.tasks.map((task)=>
      // Add update prop with the handleUpdate function
      <Todo task={task} del={ (e)=>this.handleDelete(e)}
      update={ (e)=>this.handleUpdate(e) }/>
    )

    return (
      <div>
      {/*Change this passed in function */}
        <form onSubmit={ (event)=>this.handleSubmit(event) }>

          <input onChange={ (event)=>this.handleChange(event) } />
          <input type="submit"/>
        </form>

        { tasks }

      </div>
    );
  }
}



export default App;
