import React from 'react';
import { Button, Stack } from '@mui/material';
import useSession from 'main/hooks/useSession';
import SelectableCard from './selectable-card.component';

export const platforms = [
  {
    id: 'spotify',
    name: 'Spotify',
    logoName: 'Spotify.svg',
    isDisabled: false,
    color: '#1DB954',
  },
  {
    id: 'google',
    name: 'Youtube',
    logoName: 'Youtube.svg',
    isDisabled: false,
    color: '#CD201F',
  },
  { id: 'apple', name: 'Apple', logoName: 'Apple.svg', isDisabled: true },
];

const SelectProviders: React.FC<{
  onSelect: (platform: any) => void;
  title: string;
}> = ({ onSelect, title }) => {
  const { user } = useSession();

  const handleProviderClick = (platformId: string) => {
    const isConnected = user?.providers?.some((p: any) => p.platform === platformId) ?? false;
    if (isConnected) {
      onSelect(platformId);
    } else {
      window.location.href = `http://127.0.0.1:3001/connect/${platformId}/`;
    }
  };

  return (
    <>
      {title}
      <Stack direction="row" spacing={2}>
        {platforms.map((platform) => {
          return (
            <SelectableCard
              platform={platform}
              isSelected={false}
              onSelect={(id: string) => {
                onSelect(id);
                handleProviderClick(id);
              }}
            ></SelectableCard>
          );
        })}
      </Stack>
    </>
  );
};

export default SelectProviders;
