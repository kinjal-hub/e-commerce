import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Chip, Button, Badge } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  selectFilteredProducts,
  selectActiveFilterCount,
  setSearchFilter,
  setCategoryFilter,
  setPriceRange,
  setInStockOnly,
  clearFilters,
} from '../../store/slices/productsSlice'; 

// Pure helper function 
export const formatPriceRangeLabel = ({ min, max }) => {
  const hasMin = min !== null && min !== '';
  const hasMax = max !== null && max !== '';

  if (hasMin && hasMax) return `$${min} – $${max}`;
  if (hasMin) return `From $${min}`;
  if (hasMax) return `Up to $${max}`;
  return null;
};

const ResultSummary = ({ onOpenMobileFilters }) => {
  const dispatch = useDispatch();

  const total = useSelector((state) => state.products.items.length);
  const shown = useSelector(selectFilteredProducts).length;
  const activeFilterCount = useSelector(selectActiveFilterCount);
  const { search, category, priceRange, inStockOnly } = useSelector(
    (state) => state.products.filters
  );

  const priceLabel = formatPriceRangeLabel(priceRange);
  const hasCategory = Boolean(category && category !== 'All');

  return (
    <>
      
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        display='flex'
        spacing={1.5}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
        
      >
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
          Showing {shown} of {total} products
        </Typography>

        {onOpenMobileFilters && (
          <Badge
            badgeContent={activeFilterCount}
            color="primary"
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <Button
              size="small"
              variant="outlined"
              color='text.secondary'
              startIcon={<FilterListIcon />}
              onClick={onOpenMobileFilters}
            >
              Filters
            </Button>
          </Badge>
        )}
      </Stack>

      
      <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={1.5}>
        {search.trim() && (
          <Chip
            size="small"
            label={`"${search.trim()}"`}
            onDelete={() => dispatch(setSearchFilter(''))}
          />
        )}

        {hasCategory && (
          <Chip
            size="small"
            label={category}
            onDelete={() => dispatch(setCategoryFilter(''))}
            sx={{ textTransform: 'capitalize' }}
          />
        )}

        {priceLabel && (
          <Chip
            size="small"
            label={priceLabel}
            onDelete={() => dispatch(setPriceRange({ min: null, max: null }))}
          />
        )}

        {inStockOnly && (
          <Chip
            size="small"
            label="In stock only"
            onDelete={() => dispatch(setInStockOnly(false))}
          />
        )}

        {activeFilterCount > 0 && (
          <Button
            size="small"
            onClick={() => dispatch(clearFilters())}
            sx={{ textTransform: 'none', minWidth: 'auto', px: 1 }}
          >
            Clear all
          </Button>
        )}
      </Stack>
    </>
  );
};

export default ResultSummary;
