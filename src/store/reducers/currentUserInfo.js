import { createSlice } from "@reduxjs/toolkit"

const curentUserInfoSlice = createSlice({
    name: 'currentUserInfo',
    initialState: {
        currentUserInfo: {id: 0, email: "", nickname: ""}
    },
    reducers: {
        setCurrentUserInfo: (state, action) => {
            state.currentUserInfo = action.payload
        }
    }
})

export const { setCurrentUserInfo } = curentUserInfoSlice.actions

export default curentUserInfoSlice.reducer

