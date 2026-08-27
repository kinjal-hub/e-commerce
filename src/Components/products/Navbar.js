import React, { useState } from 'react';
import { AppBar, Container, Typography, Button, List, ListItem, Toolbar, Box, Drawer, IconButton, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from '../products/Searchbar';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation(); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [ cartOpen, setCartOpen ] = useState(false);

  const navLinks = [
    { name: 'Products', path: '/' },
    { name: 'Cart', path: '/cart' },
  ];
 
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

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
      <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display:'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2}}>
            <Typography variant="h6" sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>
              ShopHub
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1,  ml: { xs: 0, md: '110px' }, justifyContent: 'center' }} >
              <Searchbar placeholder='Serach...'/>
            </Box>
            <IconButton color="inherit" onClick={() => setCartOpen(true)} sx={{ color: 'primary.contrastText' }}>
              <LocalGroceryStoreIcon />
            </IconButton>

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
        </Container>
      </AppBar>
      <Drawer anchor="right" open={isMobile && drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>{drawer}</Box>
      </Drawer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toolbar />
    </>
  );
};

export default Navbar;








