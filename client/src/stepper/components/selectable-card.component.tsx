import React from 'react';
import { Card } from '@mui/material';

const SelectableCard: React.FC<{
  platform: Record<string, any>;
  isSelected: boolean;
  onSelect: (id: string) => void;
}> = ({ platform, isSelected, onSelect }) => {
  const { isDisabled, logoName, name, id, color } = platform;
  return (
    <Card
      variant={isSelected ? 'outlined' : 'elevation'}
      sx={{
        width: 125,
        height: 100,
        borderRadius: 8,
        cursor: isDisabled ? 'default' : 'pointer',
        borderColor: isSelected ? 'red' : 'none',
        background: isDisabled ? 'grey' : color,
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
