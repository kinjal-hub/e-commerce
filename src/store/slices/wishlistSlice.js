import { createSlice } from "@reduxjs/toolkit";

// Load wishlist state from localStorage on initialization
const loadWishlistState = () => {
  try {
    const serializedState = localStorage.getItem("wishlist");
    if (serializedState === null) {
      return { items: [], loading: false, error: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading wishlist from localStorage', err);
    return { items: [], loading: false, error: null };
  }
};

const initialState = loadWishlistState();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addTowishlist: (state, action) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },
    removeFromwishList: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item !== productId);
    }
  },
});

export const { addTowishlist, removeFromwishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
