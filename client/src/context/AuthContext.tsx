import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from 'types/types';

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const AuthContext = createContext({} as AuthContextType);
