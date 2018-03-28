export default function studentReducer (state = {selectedStudent: '', allStudents:[]}, action) {
	switch (action.type) {
	case 'FETCH_STUDENT':
				console.log(action)
		return {
			...state,
			allStudents: action.response.data.concat(state.allStudents)
		}
	case 'SELECT_STUDENT':
		return {
			...state,
			selectedStudent: action.payload
		}
	}
	
	return state;
}