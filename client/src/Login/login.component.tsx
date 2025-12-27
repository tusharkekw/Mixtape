import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const LoginScreen = () => {
  const handleGoogleSignIn = async () => {
    window.location.href = `http://localhost:3001/auth/google/`;
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
          fontWeight={700} 
          sx={{ 
            mb: 2,
            color: '#1f2937',
            letterSpacing: '-0.02em',
          }}
        >
          Welcome Back!
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
          Log in to access and transfer your playlists.
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          size="large"
          sx={{
            bgcolor: '#4285F4',
            color: '#fff',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            boxShadow: '0 4px 6px -1px rgba(66, 133, 244, 0.3)',
            '&:hover': {
              bgcolor: '#357ae8',
              boxShadow: '0 10px 15px -3px rgba(66, 133, 244, 0.4)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Sign In with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginScreen;
