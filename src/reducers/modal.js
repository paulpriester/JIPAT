const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const ADD_JOB = 'ADD_JOB;'

function openModal () {
	return {
		type: OPEN_MODAL
	}
}

function closeModal () {
	return {
		type: CLOSE_MODAL
	}
}

function addJob (addedJob) {
	return {
		type: ADD_JOB,
		addedJob
	}
}

const initialState = {
	title: "",
	date: "",
	link: "",
	desc: "",
	isOpen: false
}

export default function modal (state = initialState, action) {
	switch (action.type) {
		case OPEN.MODAL :
		return {
			...state,
			isOpen: true
		}
		case CLOSE.MODAL :
		return {
			...state,
			title: "",
			date: "",
			link: "",
			desc: "",
			isOpen: false
		}
		case ADD.JOB :
		return {
			...state,
			title: action.addedJob,
			date: action.addedJob,
			link: action.addedJob,
			desc: action.addedJob
		}
		default :
		return state
	}
}