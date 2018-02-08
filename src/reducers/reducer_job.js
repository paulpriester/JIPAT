import { FETCH_JOB} from '../components/utils/api'

export default function (state = [], action) {
	switch (action.type) {
	case FETCH_JOB:
		// return state.concat([ action.payload.data ]);
		// better method of writing the above line
		return [ action.payload.data, ...state  ];
	}
	return state;
}