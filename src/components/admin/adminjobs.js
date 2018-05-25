import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import SearchBar from '../search_bar';
import JobList_Admin from './joblist_admin';
import ModalButton from '../modal_addjob';

export default class AdminJobs extends Component{
	render(){
		return(
			<div className='container'>
			<SearchBar />
			<JobList_Admin />
			</div>
		);
	}
}

