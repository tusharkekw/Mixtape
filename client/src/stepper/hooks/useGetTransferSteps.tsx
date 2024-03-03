// useGetTransferSteps.js
import React from 'react';
import { ChoosePlatform } from 'stepper/components/choose-platform.component';
import PlaylistsView from 'stepper/components/playlists-view.component';
import { Platform } from 'stepper/components/stepper.component';

export type Step = {
  getElement: (
    onSelect: (id: string) => void,
    selectedSourcePlatform: Platform | undefined,
    handleNext: () => void,
  ) => React.ReactElement;
};

export const useGetTransferSteps = () => {
  const steps: Step[] = [
    {
      getElement: (onSelect, selectedSourcePlatform, handleNext) => (
        <ChoosePlatform
          onSelect={onSelect}
          handleNextStep={handleNext}
          selectedPlatform={selectedSourcePlatform}
        />
      ),
    },
    {
      getElement: (onSelect, selectedSourcePlatform, handleNext) => <PlaylistsView platform={selectedSourcePlatform} />,
    },
  ];

  return steps;
};
