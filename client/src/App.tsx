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
        main: '#2a9461',
      },
      secondary: {
        main: '#2a9461',
      },
    },
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
