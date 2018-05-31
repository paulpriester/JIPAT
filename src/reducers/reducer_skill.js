export default function (state = {selectedSkill: '', allSkills:[]}, action) {
	switch (action.type) {
	case 'FETCH_SKILL':
		console.log(action)
		return {
			...state,
			allSkills: action.response.data
		}
	case 'SELECT_SKILL':
		return {
			...state,
			selectedSkill: action.payload
		}
	case 'ADD_SKILL': 
		return{
			...state,
			allSkills: [action.response.data, ...state.allSkills]
		}
    case 'RETURN_SKILL': 
		return{
			...state,
			allSkills: action.response.data
		}
	}
	
	return state;
}