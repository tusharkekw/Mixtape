import React from 'react';
import { Card, Box, Typography } from '@mui/material';

const SelectableCard: React.FC<{
  platform: Record<string, any>;
  isSelected: boolean;
  onSelect: (id: string) => void;
}> = ({ platform, isSelected, onSelect }) => {
  const { isDisabled, logoName, name, id, color } = platform;
  return (
    <Card
      variant="outlined"
      sx={{
        width: 160,
        height: 140,
        borderRadius: 3,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        border: isSelected ? '2px solid #3b82f6' : '2px solid #e5e7eb',
        backgroundColor: isDisabled ? '#f3f4f6' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        transition: 'all 0.2s ease',
        opacity: isDisabled ? 0.5 : 1,
        boxShadow: isSelected 
          ? '0 4px 6px -1px rgba(59, 130, 246, 0.3)' 
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: isDisabled ? 'none' : 'translateY(-2px)',
          boxShadow: isDisabled 
            ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
          borderColor: isDisabled ? '#e5e7eb' : isSelected ? '#3b82f6' : '#d1d5db',
        },
      }}
      onClick={() => !isDisabled && onSelect(id)}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          backgroundColor: color || '#f3f4f6',
          p: 1.5,
        }}
      >
        <img 
          src={logoName} 
          alt={name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain' 
          }} 
        />
      </Box>
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 600,
          color: '#1f2937',
        }}
      >
        {name}
      </Typography>
    </Card>
  );
};

export default SelectableCard;
