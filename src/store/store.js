import { configureStore, combineReducers } from '@reduxjs/toolkit';
import photo from './photo/photo';
import token from './token/token';
import user from './user/user';
import feed from './feed/feed';
import ui from './ui/ui';

const reducer = combineReducers({ photo, token, user, feed, ui });
const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

export default store;
