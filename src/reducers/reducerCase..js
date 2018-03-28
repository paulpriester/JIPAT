// export default function caseReducer (state = {selectedCase: '', allCases:[]}, action) {
// 	switch (action.type) {
// 	case 'FETCH_CASES':
// 				console.log(action)
// 		return {
// 			...state,
// 			allCases: action.response.data.concat(state.allCases)
// 		}
// 	case 'SELECT_CASE':
// 		return {
// 			...state,
// 			selectedCase: action.payload
// 		}
// 	}
	
// 	return state;
// }