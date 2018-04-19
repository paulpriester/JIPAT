export default function skillReducer (state = {selectedSkill: '', allSkills:[]}, action) {
	switch (action.type) {
	case 'FETCH_SKILL':
		return {
			...state,
			allSkills: action.payload.data.concat(state.allSkills)
		}
	case 'SELECT_SKILL':
		return {
			...state,
			selectedSkill: action.payload
		}
	}
	
	return state;
}