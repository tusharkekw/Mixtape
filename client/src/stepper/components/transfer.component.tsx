import { Box, Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react';
import SelectProviders from './select-provider.components';
import PlaylistSelector from './playlist-selector.component';
import { Playlist, PlaylistItemType } from 'types/playlist-item.types';
import FinalizeTransfer from './finalize-transfer.component';

export type SelectionState = {
  [playlistId: string]: {
    playlistData: Playlist;
    isPlaylistSelected: boolean;
    selectedItems: PlaylistItemType[];
  };
};

export type TransferState = {
  sourcePlatform: string | null;
  destinationPlatform: string | null;
  selectedPlaylist: SelectionState;
  newPlaylistName: string | null;
};

const TransferComponent = () => {
  const sourcePlatform = sessionStorage.getItem('sourcePlatform');
  const destinationPlatform = sessionStorage.getItem('destinationPlatform');

  const [activeStep, setActiveStep] = useState(
    parseInt(sessionStorage.getItem('activeStep') || '0', 10),
  );

  const [transferState, setTransferState] = useState<TransferState>({
    sourcePlatform: sourcePlatform ? JSON.parse(sourcePlatform) : null,
    destinationPlatform: destinationPlatform ? JSON.parse(destinationPlatform) : null,
    selectedPlaylist: {},
    newPlaylistName: '',
  });

  const steps = ['Select Source', 'Select Destination', 'Choose Playlist', 'Create Playlist'];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      const next = activeStep + 1;
      setActiveStep(next);
      sessionStorage.setItem('activeStep', next.toString());
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      const prev = activeStep - 1;
      setActiveStep(prev);
      sessionStorage.setItem('activeStep', prev.toString());
    }
  };

  const updateTransferState = (update: any) => {
    setTransferState((prev) => ({ ...prev, ...update }));
  };

  const handleSourceSelect = (platform: any) => {
    updateTransferState({ sourcePlatform: platform });
    sessionStorage.setItem('sourcePlatform', JSON.stringify(platform));
    handleNext();
  };

  const handleDestinationSelect = (platform: any) => {
    //need to add condition that source destination can't be same
    updateTransferState({ destinationPlatform: platform });
    sessionStorage.setItem('destinationPlatform', JSON.stringify(platform));
    handleNext();
  };
  const handleTransferStateChange = (changes: Partial<TransferState>) => {
    setTransferState((prev) => ({
      ...prev,
      ...changes,
    }));
  };

  // Handle new playlist name change
  const handlePlaylistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleTransferStateChange({ newPlaylistName: event.target.value });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <SelectProviders onSelect={handleSourceSelect} title="Select Source Platform" />
        );
      case 1:
        return (
          <SelectProviders
            onSelect={handleDestinationSelect}
            title="Select Destination Platform"
          />
        );
      case 2:
        return (
          <PlaylistSelector
            platform={transferState.sourcePlatform!}
            transferState={transferState}
            onTransferStateChange={handleTransferStateChange}
          />
        );
      case 3:
        return <FinalizeTransfer transferState={transferState} />;
      case 4:
        return <>Enter New Playlist Name</>;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto', mt: 4, px: 3 }}>
      <Box 
        sx={{ 
          backgroundColor: '#ffffff',
          borderRadius: 3,
          p: 4,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        }}
      >
        <Stepper 
          activeStep={activeStep}
          sx={{
            mb: 4,
            '& .MuiStepLabel-label': {
              fontSize: '0.95rem',
              fontWeight: 500,
            },
            '& .MuiStepIcon-root': {
              fontSize: '1.75rem',
            },
          }}
        >
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        
        {renderStepContent()}
        
        <Stack 
          direction="row" 
          justifyContent="space-between"
          sx={{ mt: 4 }}
        >
          <Button 
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              px: 3,
              py: 1,
              color: '#6b7280',
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            variant="contained"
            sx={{
              px: 3,
              py: 1,
            }}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default TransferComponent;
