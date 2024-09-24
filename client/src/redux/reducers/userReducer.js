import { createSlice } from '@reduxjs/toolkit';


const userReducer = createSlice({
    name: 'user',
    initialState: {
        username: '',
        status: false,
        userType: 'buyer',
        user_id: null
    },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.status = action.payload.status;
            state.userType = action.payload.userType;
            state.user_id = action.payload.user_id;
        }
    }
})

export const { setUser } = userReducer.actions;

export default userReducer.reducer;