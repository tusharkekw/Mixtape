import { TransferMode } from 'stepper/components/finalize-transfer.component';
import { SelectionState } from 'stepper/components/transfer.component';

export type User = {
  id: string;
  name?: string;
  email: string;
  providers: Provider[];
};

export type Provider = {
  id: string;
  provider: string;
};

export type AccountResponse = {
  isAuthenticated: boolean;
  user: User;
};

export type TransferPayload = {
  source: string;
  destination: string;
  selectedPlaylist: SelectionState;
  transferMode: TransferMode;
  playlistName?: string;
};

export type TransferProgress = {
  jobId: string;
  progress: number;
  isJobCompleted: boolean;
  responseJobData: Record<string, any>;
};
