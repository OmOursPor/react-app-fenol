import { combineReducers, legacy_createStore as createStore} from 'redux'
import { configureStore as ConfigureStore } from "@reduxjs/toolkit";
import userSlice from './reducers/user'
import authSlice from './reducers/auth'
import curentUserInfoSlice from './reducers/currentUserInfo'
import user from './reducers/user'
import auth from './reducers/auth';
import curentUserInfo from './reducers/currentUserInfo';

const allReducers = combineReducers({
    user,
    curentUserInfo,
    auth
})

function configureStore(initialState) {
    return createStore(allReducers, initialState)
}

export default configureStore({
    user: {users: []},
    curentUserInfo: {curentUserInfo: []},
    auth: {token: ""}
})


export const store = ConfigureStore({
    reducer: {
        user: userSlice,
        curentUserInfo: curentUserInfoSlice,
        auth: authSlice
    }
})