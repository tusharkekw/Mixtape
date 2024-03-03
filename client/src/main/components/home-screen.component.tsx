import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to your login route
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" sx={{fontWeight: 800}} gutterBottom>
        Transfer Your Playlists Seamlessly
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Connect to your favorite music services and move playlists in just a few clicks.
      </Typography>
      <Box mt={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLogin} 
          size="large"
        >
          Log In to Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default MainScreen;
