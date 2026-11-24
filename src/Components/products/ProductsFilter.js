import { Box, Stack, Badge, InputAdornment, Paper, MenuItem, TextField, Switch, Button, IconButton, Drawer, Typography, FormControlLabel, useMediaQuery, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useState } from 'react';
import { clearFilters, setCategoryFilter, setInStockOnly, setPriceRange, selectActiveFilterCount } from '../../store/slices/productsSlice';



const FilterFields = ({ 
  category,
  categories,
  priceRange,
  inStockOnly,
  handleCategoryChange,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleInStockChange,
}) => (
  <>
    <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={2}
    alignItems={{ xs: 'stretch', md: 'center' }}
  >
    <TextField
      select
      size="small"
      label="Category"
      value={category || 'All'}
      onChange={handleCategoryChange}
      sx={{ minWidth: 180 }}
      slotProps={{
        inputLabel: { shrink: true },
        select: { displayEmpty: true },
      }}
    >
      <MenuItem value="">All</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
    </TextField>

    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        type="number"
        size="small"
        label="Min price"
        value={priceRange.min ?? ''}
        onChange={handleMinPriceChange}
        sx={{ width: { xs: '100%', md: 120 } }}
        slotProps={{
          input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          htmlInput: { min: 0 },
        }}
      />
      <TextField
        type="number"
        size="small"
        label="Max price"
        value={priceRange.max ?? ''}
        onChange={handleMaxPriceChange}
        sx={{ width: { xs: '100%', md: 120 } }}
        slotProps={{
          input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          htmlInput: { max: 0 },
        }}
      />
    </Stack>

    <FormControlLabel
      control={<Switch checked={inStockOnly} onChange={handleInStockChange} />}
      label="In stock only"
    />

    
  </Stack>


  </>
);

const ProductsFilter = () => {
  const activeCount = useSelector(selectActiveFilterCount); 
  const { filters, items } = useSelector((state) => state.products);
  const { category, priceRange, inStockOnly } = filters;
  const dispatch = useDispatch();
  const resultCount = useSelector((state) => category.length);

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const categories = useMemo(() => {
    return [...new Set(items?.map(item => item.category).filter(Boolean))];
  }, [items]);
  
  const toPriceOrNull = (value) => (value === '' ? null : Number(value));
  const handleCategoryChange = (e) => dispatch(setCategoryFilter(e.target.value));
  const handleMinPriceChange = (e) => dispatch(setPriceRange({ ...priceRange, min: toPriceOrNull(e.target.value) }));
  const handleMaxPriceChange = (e) => dispatch(setPriceRange({ ...priceRange, max: toPriceOrNull(e.target.value) }));
  const handleInStockChange = (e) => dispatch(setInStockOnly(e.target.checked));
  const handleClearFilters = () => dispatch(clearFilters());
 

 
  const fieldProps = {
    isMobile,
    category,
    categories,
    priceRange,
    inStockOnly,
    handleCategoryChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleInStockChange,
    handleClearFilters
  };

  return (
    <Box sx={{ py: 2 }}>
      {isMobile ? (
        <>
        <Badge badgeContent={activeCount} color="secondary">
  <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setMobileOpen(true)}>
    Filters
  </Button>
</Badge>

<Drawer
  anchor="bottom"
  open={mobileOpen}
  onClose={() => setMobileOpen(false)}
  slotProps={{
    paper: {
      sx: { p: 2, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '85vh' },
    },
  }}
>
  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
    <Typography variant="h6" fontWeight="bold">Filters</Typography>
    <IconButton aria-label="Close filters" onClick={() => setMobileOpen(false)}>
      <CloseIcon />
    </IconButton>
  </Stack>

  <FilterFields {...fieldProps} />

  <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
    <Button fullWidth variant="outlined" onClick={handleClearFilters} disabled={activeCount === 0}>
      Clear all
    </Button>
    <Button fullWidth variant="contained" onClick={() => setMobileOpen(false)}>
      Show {resultCount} results
    </Button>
  </Stack>
</Drawer>
</>
      ) : (
        <Paper variant="outlined" sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
                <FilterFields {...fieldProps} />
            </Box>
           <Button variant="text" onClick={handleClearFilters} disabled={activeCount === 0}>
                 Clear all
          </Button>
        </Paper>

      )}
    </Box>
  );
};

export default ProductsFilter;
