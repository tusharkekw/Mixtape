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
