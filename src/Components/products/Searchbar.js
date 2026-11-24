import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Searchbar = ({ value, onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState(value ?? '');

 
  useEffect(() => {
    if (value === '') {
      setSearchTerm('');
    }
  }, [value]);

  // Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      size="small"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon aria-label="Clear search" fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        width: '100%',
        maxWidth: { md: 480 },
        '& .MuiOutlinedInput-root': {
          bgcolor: 'background.paper',
          borderRadius: 999,
          '& fieldset': { border: 'none' },
        },
      }}
    />
  );
};

export default Searchbar;
