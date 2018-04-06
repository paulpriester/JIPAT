export default function (state = {selectedCase: '', allCases:[]}, action) {
	switch (action.type) {
	case 'FETCH_CASE':
				console.log(action)
		return {
			...state,
			allCases: action.response.data.concat(state.allCases)
		}
	case 'SELECT_CASE':
		return {
			...state,
			selectedCase: action.payload,
		}
	case 'SAVE_CASE':
		return {
			...state,
			allCases: action.response.data
		}
	}
	
	return state;
}