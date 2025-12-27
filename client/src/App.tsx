import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { colors } from 'colors';

import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'app-router.component';
import Navbar from 'main/components/navbar.component';
import { AuthContextProvider } from 'context/AuthContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const theme = createTheme({
    palette: {
      ...colors,
      primary: {
        main: '#3b82f6',
      },
      secondary: {
        main: '#6366f1',
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff',
      },
      text: {
        primary: '#1f2937',
        secondary: '#6b7280',
      },
    },
    typography: {
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      h4: {
        fontWeight: 700,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ],
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthContextProvider>
            <Navbar />
            <AppRouter />
          </AuthContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
