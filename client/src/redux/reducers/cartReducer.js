import { createSlice } from "@reduxjs/toolkit";
const cartReducer = createSlice({
    name: 'cart',
    initialState: 0,
    reducers: {
        setCartCount: (state, action) => {
            return action.payload
        }
    }
})

export const { setCartCount } = cartReducer.actions
export default cartReducer.reducer;