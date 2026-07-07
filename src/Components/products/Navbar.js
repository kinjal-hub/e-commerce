import React, { useState } from 'react';
import { AppBar, Container, Typography, Button, List, ListItem, Toolbar, Box, Drawer, IconButton, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from '../products/Searchbar';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation(); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  

  const navLinks = [
    { name: 'Products', path: '/' },
    { name: 'Cart', path: '/cart' },
    { name: 'Button', path: '/button' },
    {name: 'order', path: '/order'}
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
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
              ShopHub
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1,  ml: { xs: 0, md: '240px' }, justifyContent: 'center' }} >
              <Searchbar placeholder='Serach...'/>
            </Box>
          {isMobile ? (
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: 'text.secondary' }} />
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
                        color: 'text.secondary', 
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
      <Toolbar />
    </>
  );
};

export default Navbar;


