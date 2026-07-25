import './App.css';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkTheme } from './theme/DarkTheme';
import { Navbar } from './component/Navbar/Navbar';
import { Home } from './component/Home/Home';
import { Restaurant } from './component/Restaurant/Restaurant';

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
