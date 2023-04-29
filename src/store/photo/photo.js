import { PHOTO_GET } from '../../api';

const FETCH_STARTED = 'photo/fetchStarted';
const FETCH_SUCCESS = 'photo/fetchSuccess';
const FETCH_ERROR = 'photo/fetchError';

const fetchStarted = () => ({ type: FETCH_STARTED });
const fetchSuccess = (payload) => ({ type: FETCH_SUCCESS, payload });
const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

const initialState = {
	loading: false,
	data: null,
	error: null
};

export default function photo(state = initialState, action) {
	switch (action.type) {
		case FETCH_STARTED:
			return { ...state, loading: true };
		case FETCH_SUCCESS:
			return { ...state, loading: false, data: action.payload, error: null };
		case FETCH_ERROR:
			return { ...state, loading: false, data: null, error: action.payload };
		default:
			return state;
	}
}

export const fetchPhoto = (id) => async (dispatch) => {
	try {
		dispatch(fetchStarted());

		const { url, options } = PHOTO_GET(id);
		const response = await fetch(url, options);
		const json = await response.json();

		if (!response.ok) throw new Error(json.message);

		dispatch(fetchSuccess(json));
	} catch (error) {
		dispatch(fetchError(error.message));
	}
};
