import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import Navbar from './Components/products/Navbar';
import ProductDetailPage from './pages/ProductDetailPage';
import NotificationSnackbar  from './Components/products/NotificationSnackbar';
import Products from './pages/ProductPage';
import CartPage from './pages/CartPage';




function App() {
 

 
  return (
    
    <Router>
    <div className="App">
      
      <ThemeProvider theme={theme}>
        
         <Navbar />
         <NotificationSnackbar />
          <Routes>
            <Route path='/products/:id' element={<ProductDetailPage />} />
            <Route path='/' element={<Products />} />
            <Route path='/cart' element={<CartPage />} />
            
            
          </Routes>
      </ThemeProvider>
    </div>
    </Router>
  );
}

export default App;
