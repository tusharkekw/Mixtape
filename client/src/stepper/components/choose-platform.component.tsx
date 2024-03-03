// choose-platform.component.js
import React from 'react';
import SelectableCard from './selectable-card.component';
import { platforms } from 'stepper/transfer.utils';
import { Box, Stack, Typography } from '@mui/material';
import { Platform } from './stepper.component';

export type ChoosePlatformProps = {
  onSelect: (platformId: string) => void;
  handleNextStep: () => void;
  selectedPlatform?: Platform;
};

export const ChoosePlatform: React.FC<ChoosePlatformProps> = ({
  onSelect,
  selectedPlatform,
  handleNextStep,
}) => {
  const handleSelect = (platform: Platform) => {
    onSelect(platform.id);
    handleNextStep();
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Select the Source
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        {platforms.map((platform) => (
          <SelectableCard
            key={platform.id}
            isSelected={selectedPlatform?.id === platform.id}
            platform={platform}
            onSelect={() => handleSelect(platform)}
          />
        ))}
      </Box>
    </Stack>
  );
};
