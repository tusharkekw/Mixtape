import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const LoginScreen = () => {
  const handleGoogleSignIn = async () => {
    window.location.href = `http://localhost:3001/auth/google/`;
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Welcome Back!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Log in to access and transfer your playlists.
      </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{
            mt: 3,
            bgcolor: '#4285F4',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#357ae8',
            },
          }}
        >
          Sign In with Google
        </Button>
    </Container>
  );
};

export default LoginScreen;
