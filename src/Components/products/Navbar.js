import React, { useCallback, useState } from 'react';
import { AppBar, Container, Typography, Button, List, ListItem, Toolbar, Box, Drawer, IconButton, ListItemText, useTheme, useMediaQuery, Badge } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from '../products/Searchbar';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CartDrawer from './CartDrawer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter } from '../../store/slices/productsSlice';


const Navbar = () => {
  const theme = useTheme();
  const location = useLocation(); 
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [ cartOpen, setCartOpen ] = useState(false);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const Search = useSelector((state) => state.products.filters.search);
  const navLinks = [
    { name: 'Products', path: '/' },
    { name: 'Cart', path: '/cart' },
  ];
 
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleSerach = useCallback((term) => {
    dispatch(setSearchFilter(term));
  },[dispatch]);

  const drawer = (
    <List>
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <ListItem 
            key={link.name} 
            component={Link} 
            to={link.path} 
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
              borderLeft: isActive ? `4px solid ${theme.palette.secondary.main}` : 'none'
            }}
          >
            <ListItemText 
              primary={link.name} 
              sx={{ 
                color: isActive ? theme.palette.secondary.main : 'text.primary', 
                textAlign: 'center',
                fontWeight: isActive ? 'bold' : 'normal'
              }} 
            />
          </ListItem>
        );
      })}
    </List>
  );

  return ( 
    <>
      <AppBar position="sticky">
      <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ gap: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.contrastText' }}>
        ShopHub
      </Typography>

      {!isMobile && (
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Searchbar placeholder="Search products..." onSearch={handleSerach} value={Search} />
        </Box>
      )}
      {isMobile && <Box sx={{ flexGrow: 1 }} />}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.1 }}>
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/wishlist" 
                sx={{ color: 'primary.contrastText' }}
              >
                <Badge badgeContent={wishlistCount} color="info" >
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>

              <IconButton color="inherit" onClick={() => setCartOpen(true)} sx={{ color: 'primary.contrastText' }}>
                <LocalGroceryStoreIcon />
              </IconButton>

            </Box>

          {isMobile ? (
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: 'primary.contrastText' }} />
              </IconButton>
            ) : (
              <Box>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Button 
                      key={link.name} 
                      component={Link} 
                      to={link.path} 
                      sx={{ 
                        color: 'primary.contrastText', 
                        ml: 2,
                        // Active Styles
                        borderBottom: isActive ? `2px solid ${theme.palette.secondary.main}` : 'none',
                        borderRadius: 0,
                        opacity: isActive ? 1 : 0.7,
                        fontWeight: isActive ? 'bold' : 'medium'
                      }}
                    >
                      {link.name}
                    </Button>
                  );
                })}
              </Box>
            )}
          </Toolbar>
          {isMobile && (
            <Box sx={{ pb: 1.5 }}>
              <Searchbar placeholder="Search products..." onSearch={handleSerach} value={Search} />
           </Box>
          )}

        </Container>
      </AppBar>
      <Drawer anchor="right" open={isMobile && drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>{drawer}</Box>
      </Drawer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    
    </>
  );
};

export default Navbar;








