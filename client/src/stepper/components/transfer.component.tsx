import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react';
import SelectProviders from './select-provider.components';
import PlaylistSelector from './playlist-selector.component';
import { Playlist, PlaylistItemType } from 'types/playlist-item.types';

type SelectionState = {
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
        return <></>;
      // return <FinalizeTransfer transferState={transferState} />;
      case 4:
        return <>Enter New Playlist Name</>;
    }
  };

  return (
    <Box>
      <Typography variant="h4">Transfer Playlists</Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box>
        <Button onClick={handleBack}>Back</Button>
      </Box>
      <Box sx={{ width: '50%', mx: 'auto' }}>{renderStepContent()}</Box>
    </Box>
  );
};

export default TransferComponent;
