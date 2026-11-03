import { Box, Select, MenuItem, TextField, Switch, Button, IconButton, Drawer, Typography, FormControlLabel, useMediaQuery, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useState } from 'react';
import { clearFilters, setCategoryFilter, setInStockOnly, setPriceRange } from '../../store/slices/productsSlice';



const FilterFields = ({ 
  isMobile, 
  category, 
  categories, 
  priceRange, 
  inStockOnly, 
  handleChange, 
  handleMinPriceChange, 
  handleMaxPriceChange, 
  handleInStockChange, 
  handleClearFilters 
}) => (
  <>
    <Box sx={{ minWidth: 120, width: isMobile ? '100%' : 'auto' }}>
      <Select 
        value={category || 'All'} 
        onChange={handleChange} 
        fullWidth={isMobile} 
        size="small"
      >
        <MenuItem value={'All'}>All</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </Select>
    </Box>
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
      <TextField 
        value={priceRange.min ?? ''} 
        label='Min Price' 
        size='small' 
        sx={{ width: isMobile ? '100%' : 100 }} 
        onChange={handleMinPriceChange} 
      />
      <TextField 
        value={priceRange.max ?? ''} 
        label='Max Price' 
        size='small' 
        sx={{ width: isMobile ? '100%' : 100 }} 
        onChange={handleMaxPriceChange} 
      />
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: isMobile ? '100%' : 'auto', gap: 2 }}>
      <FormControlLabel 
        control={
          <Switch 
            checked={inStockOnly ?? false} 
            onChange={handleInStockChange} 
            inputProps={{ 'aria-label': 'In stock only toggle' }} 
          />
        } 
        label="In Stock Only" 
        sx={{ margin: 0 }} 
      />
      <Button 
        size='medium' 
        variant='outlined' 
        color='error' 
        fullWidth={isMobile} 
        onClick={handleClearFilters}
      >
        Clear filters
      </Button>
    </Box>
  </>
);

const ProductsFilter = () => {
  const { filters, items } = useSelector((state) => state.products);
  const { category, priceRange, inStockOnly } = filters;
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const categories = useMemo(() => {
    return [...new Set(items?.map(item => item.category).filter(Boolean))];
  }, [items]);

  const handleChange = (e) => dispatch(setCategoryFilter(e.target.value));
  const handleMinPriceChange = (e) => dispatch(setPriceRange({ ...priceRange, min: e.target.value }));
  const handleMaxPriceChange = (e) => dispatch(setPriceRange({ ...priceRange, max: e.target.value }));
  const handleInStockChange = (e) => dispatch(setInStockOnly(e.target.checked));
  const handleClearFilters = () => dispatch(clearFilters());
  const toggleDrawer = (open) => () => setMobileOpen(open);

 
  const fieldProps = {
    isMobile,
    category,
    categories,
    priceRange,
    inStockOnly,
    handleChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleInStockChange,
    handleClearFilters
  };

  return (
    <Box sx={{ py: 2 }}>
      {isMobile ? (
        <>
          <Button size= 'small' variant="contained" startIcon={<FilterListIcon />} onClick={toggleDrawer(true)}>
            Filters
          </Button>
          <Drawer 
            anchor="left" 
            open={mobileOpen} 
            onClose={toggleDrawer(false)} 
            PaperProps={{ sx: { width: 120, height: 30, p: 2 } }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ ml: '8px'}}>Filters</Typography>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '5px', mr: '5px', gap: 2 }}>
              <FilterFields {...fieldProps} />
            </Box>
          </Drawer>
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center', flexWrap: 'wrap', p: 2, backgroundColor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
          <FilterFields {...fieldProps} />
        </Box>
      )}
    </Box>
  );
};

export default ProductsFilter;
