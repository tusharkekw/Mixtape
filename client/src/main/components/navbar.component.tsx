import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        {/* Left side: Logo */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h5" 
            fontWeight={700}
            sx={{ 
              color: '#1f2937',
              letterSpacing: '-0.02em',
            }}
          >
            Mixtape
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
