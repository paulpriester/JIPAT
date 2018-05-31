const initialState = {
	selectedStudent: '', 
	allStudents:[], 
	profile:{},
	skills:[],
	cases: [],
	filteredStudent: [],
	caselength: {}
}

export default function studentReducer (state = initialState, action) {
	switch (action.type) {
	case 'FETCH_STUDENT':
				console.log(action)
		return {
			...state,
			allStudents: action.response.data,
			filteredStudent: action.response.data
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
	console.log(action.response) 
		return {
			...state,
			caselength: action.response.data,
			cases: action.response.data.cases
		}
	case 'FILTERED_SKILL':
	console.log(action.response)
		return{
			...state,
			filteredStudent:action.payload
			
		}
	}
	
	return state;
}