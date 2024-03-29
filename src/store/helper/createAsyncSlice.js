import { createSlice } from '@reduxjs/toolkit';

/**
 * Cria um slice com uma função assíncrona
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 * */

const createAsyncSlice = (config) => {
	const slice = createSlice({
		name: config.name,
		initialState: {
			loading: false,
			data: null,
			error: null,
			...config.initialState
		},
		reducers: {
			fetchStarted: (state, action) => {
				state.loading = true;
			},
			fetchSuccess: (state, action) => {
				state.loading = false;
				state.data = action.payload;
				state.error = null;
			},
			fetchError: (state, action) => {
				state.loading = false;
				state.data = null;
				state.error = action.payload;
			},
			resetState: (state) => {
				state.loading = false;
				state.data = null;
				state.error = null;
			},
			...config.reducers
		}
	});

	const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

	const asyncAction = (payload) => async (dispatch) => {
		try {
			dispatch(fetchStarted());

			const { url, options } = config.fetchConfig(payload);
			const response = await fetch(url, options);
			const json = await response.json();
			if (!response.ok) throw new Error(json.message);

			return dispatch(fetchSuccess(json));
		} catch (error) {
			return dispatch(fetchError(error.message));
		}
	};

	return { ...slice, asyncAction };
};

export default createAsyncSlice;
