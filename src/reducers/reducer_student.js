const initialState = {
	selectedStudent: '', 
	allStudents:[], 
	filteredStudents: [],
	profile:{},
	skills:[],
	caselength: {}
}

export default function studentReducer (state = initialState, action) {
	switch (action.type) {
	case 'FETCH_STUDENT':
				console.log(action)
		return {
			...state,
			allStudents: action.response.data,
			filteredStudents: action.response.data
		}
	case 'SELECT_STUDENT':
		return {
			...state,
			selectedStudent: action.payload
		}
	case 'FETCH_PROFILE': 
		return {
			...state,
			profile: action.response.data
		}
	case 'FETCH_SAVED_SKILLS': 
		return {
			...state,
			skills: action.response.data
		}
	case 'FETCH_CASELENGTH': 
		return {
			...state,
			caselength: action.response.data
		}
	case 'FILTERED_STUDENTS':
		return{
			...state,
			filteredStudents:action.payload,
			typing: action.typing
		}
	}
	
	return state;
}