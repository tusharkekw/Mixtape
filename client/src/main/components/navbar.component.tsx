import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        {/* Left side: Logo */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Typography fontSize="h3" fontWeight={800}>
            Mixtape
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
