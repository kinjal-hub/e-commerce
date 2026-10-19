import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedProduct: null, // 👈 Added to store the single product view data
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    priceRange: '',
  }
};
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSpecificProduct = createAsyncThunk(
  'products/fetchProductsById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product detail');
      }
      const data = await response.json();
      return data; // Make sure this returns the product object directly (or adjust based on API response structure)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    clearFilters: (state, action) => {
      state.filters = {
        search: '',
        category: '',
        priceRange: ''
      }
    },
    
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products Cases
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      
      .addCase(fetchSpecificProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload; // Saves the product into state
        state.loading = false;
      })
      .addCase(fetchSpecificProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setProducts,
  setLoading,
  setError,
  setSearchFilter,
  setCategoryFilter,
  clearFilters,
  clearSelectedProduct
} = productsSlice.actions;

export default productsSlice.reducer;
