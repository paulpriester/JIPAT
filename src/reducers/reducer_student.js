
export default function (state = {selectedStudent: '', allStudents:[]}, action) {
	switch (action.type) {
	case 'FETCH_STUDENT':
		return {
			...state,
			allStudents: action.payload.data.concat(state.allStudents)
		}
	case 'SELECT_STUDENT':
		return {
			...state,
			selectedStudent: action.payload
		}
	}
	
	return state;
}