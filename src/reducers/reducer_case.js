export default function (state = {selectedCase: '', allCases:[],savedcases:[], filteredCases:[],typing:false,open:true}, action) {
	switch (action.type) {
	case 'FETCH_CASE':
	// console.log(action)
		return {
			...state,
			allCases: action.response.data,
			filteredCases:action.response.data,
			open: false
		}
	case 'SELECT_CASE':
	console.log(action)
		return {
			...state,
			selectedCase: action.payload,
		}
	case 'SAVE_CASE':
		return {
			...state,
			savedcases: action.response.data
		}

	case 'FILTERED_CASES':
		return{

			...state,
			filteredCases:action.payload,
			typing: action.typing
		}
	}
	
	return state;
}