// components/SelectableCard.js
import React from 'react';
import { Card } from '@mui/material';

const SelectableCard: React.FC<{
  platform: Record<string, any>;
  isSelected: boolean;
  onSelect: (platformId: string) => void;
}> = ({ platform, isSelected, onSelect }) => {
  const { isDisabled, logoName, name, id } = platform;
  return (
    <Card
      variant={isSelected ? 'outlined' : 'elevation'}
      sx={{
        width: 150,
        height: 125,
        borderRadius: 8,
        cursor: isDisabled ? 'default' : 'pointer',
        borderColor: isSelected ? 'red' : 'none',
        background: isDisabled ? 'grey' : 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => !isDisabled && onSelect(id)}
    >
      <img src={logoName} alt={name} />
    </Card>
  );
};

export default SelectableCard;
