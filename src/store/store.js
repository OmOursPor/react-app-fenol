import { combineReducers, legacy_createStore as createStore} from 'redux'
import { configureStore as ConfigureStore } from "@reduxjs/toolkit";
import userSlice from './reducers/user'
import authSlice from './reducers/auth'
import user from './reducers/user'
import auth from './reducers/auth';

const allReducers = combineReducers({
    user,
    auth
})

function configureStore(initialState) {
    return createStore(allReducers, initialState)
}

export default configureStore({
    user: {users: []},
    auth: {token: ""}
})


export const store = ConfigureStore({
    reducer: {
        user: userSlice,
        auth: authSlice
    }
})