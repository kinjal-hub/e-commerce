import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import Navbar from './Components/products/Navbar';
import Home from './Components/products/Home'
import Cart from './Components/products/Cart'

function App() {
 
   
  return (
    <Router>
    <div className="App">
      <ThemeProvider theme={theme}>
         <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
      </ThemeProvider>
    </div>
    </Router>
  );
}

export default App;
