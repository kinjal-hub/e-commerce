import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    items: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        category: '',
        priceRange: '',
    }
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log(data)
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
      const response = await fetch(`http://localhost:5001/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product detail');
      }
      const data = await response.json();
      console.log(data)
      return data;
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
            state.filters = initialState.filters; 
        }
      },
      extraReducers: (builder) => {
    builder
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
      });
  }
});
export const { setProducts,
               setLoading,
               setError,
               setSearchFilter,
               setCategoryFilter,
               clearFilters
            } = productsSlice.actions;

export default productsSlice.reducer;