import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SearchBar from './search_bar';
import JobList from './jobs';

export default class Feature extends Component{
	render(){
		return(
			<div className='container'>
				<SearchBar />
				<JobList />
			</div>
		);
	}
}

