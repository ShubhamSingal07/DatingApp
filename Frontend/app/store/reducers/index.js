import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer'

const Reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
});

export default Reducer;