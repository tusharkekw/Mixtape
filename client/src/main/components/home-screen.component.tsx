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
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Box 
        sx={{ 
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 3,
          p: 6,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            color: '#1f2937',
            letterSpacing: '-0.02em',
          }} 
        >
          Transfer Your Playlists Seamlessly
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#6b7280',
            mb: 4,
            fontSize: '1.05rem',
            lineHeight: 1.6,
          }}
        >
          Connect to your favorite music services and move playlists in just a few clicks.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLogin} 
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
            '&:hover': {
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Log In to Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default MainScreen;
