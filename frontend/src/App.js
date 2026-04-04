import './App.css';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { DarkTheme } from './theme/DarkTheme';
import { Navbar } from './component/Navbar/Navbar';
import { Home } from './component/Home/Home';

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <Navbar />
      <Home />
    </ThemeProvider>
  );
}

export default App;
