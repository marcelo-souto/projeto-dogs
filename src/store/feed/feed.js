import { PHOTOS_GET } from '../../api';
import createAsyncSlice from '../helper/createAsyncSlice';

const slice = createAsyncSlice({
	name: 'feed',
	initialState: {
		list: [],
		pages: 1,
		infinite: true
	},
	reducers: {
		addPhotos: (state, action) => {
			state.list.push(...action.payload);
			if (action.payload.length === 0) state.infinite = false;
		},
		addPage: (state) => {
			state.pages++;
		},
		resetState: (state, action) => {
			state.pages = 1;
			state.infinite = true;
			state.data = null;
			state.loading = false;
			state.error = null;
			state.list = [];
		}
	},
	fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page, total, user })
});

export const fetchFeed = slice.asyncAction;

export const { addPage, addPhotos, resetState: resetFeedState } = slice.actions;

export const loadNewPhotos =
	({ user, total = 6 }) =>
	async (dispatch, getState) => {
		const { feed } = getState();
		dispatch(addPage());
		const { payload } = await dispatch(fetchFeed({ page: feed.pages, user, total }));
		dispatch(addPhotos(payload));
	};

export default slice.reducer;
