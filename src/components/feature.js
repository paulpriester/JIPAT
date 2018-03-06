import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import SearchBar from './search_bar';
import JobList from './jobs';
// import Modal from './modal';

export default class Feature extends Component{
	render(){
		return(
			<div>
			<SearchBar />
			<JobList />
			</div>
			);
	}
}

