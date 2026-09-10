import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
    loading: false,
    error: null,
};
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers:{
        addTowishlist: (state, action) => {
           const productId = action.payload;
           console.log(action.payload);
           if (!state.items.includes(productId)) {
              state.items.push(productId);
          }
        },
        removeFromwishList: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item !== productId);
            console.log(state.item);
            
        }

    },
});
export const {addTowishlist, removeFromwishList} = wishlistSlice.actions;
export default wishlistSlice.reducer;