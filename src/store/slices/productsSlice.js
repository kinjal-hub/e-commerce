import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    priceRange: {
      min: null,
      max: null,
    },
    inStockOnly: false,
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
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setInStockOnly: (state, action) => {
      state.filters.inStockOnly = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        priceRange: { min: null, max: null },
        inStockOnly: false,
      };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
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
      })
      .addCase(fetchSpecificProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpecificProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export const selectFilteredProducts = (state) => {
  const { items, filters } = state.products;
  const { search, category, priceRange, inStockOnly } = filters;

  const trimmedSearch = search.trim().toLowerCase();

  return items.filter((product) => {
    if (trimmedSearch) {
      const matchName = product.name?.toLowerCase().includes(trimmedSearch);
      const matchBrand = product.brand?.toLowerCase().includes(trimmedSearch);
      if (!matchName && !matchBrand) return false;
    }

    if (category && category !== 'All') {
      if (product.category !== category) return false;
    }

    if (priceRange.min !== null && product.price < priceRange.min) return false;
    if (priceRange.max !== null && product.price > priceRange.max) return false;
    
    if (inStockOnly && !product.inStock) return false;
    return true;
  });
};

export const {
  setProducts,
  setLoading,
  setError,
  setSearchFilter,
  setCategoryFilter,
  setPriceRange,
  setInStockOnly,
  clearFilters,
  clearSelectedProduct
} = productsSlice.actions;

export default productsSlice.reducer;
