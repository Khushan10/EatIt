import './App.css';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkTheme } from './theme/DarkTheme';
import { CartProvider } from './context/CartContext';
import { Navbar } from './component/Navbar/Navbar';
import { Home } from './component/Home/Home';
import { Restaurant } from './component/Restaurant/Restaurant';
import { Cart } from './component/Cart/Cart';

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
