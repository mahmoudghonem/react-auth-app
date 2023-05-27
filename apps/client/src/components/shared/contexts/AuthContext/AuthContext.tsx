import { createContext, useContext, useEffect, useState } from 'react';
import { TokenData, User } from '../../types/user';
import authService from '../../../../services/auth.service';
import userService from '../../../../services/user.service';

const AuthContext = createContext<AuthContextProps>({
  authState: { user: null, data: null },
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider = (props: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    data: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && authService.verifyToken(token)) {
      const decodedToken = authService.decodeToken(token);
      (async function loadUserData() {
        const userData = await userService.getUserData();
        setAuthState({ user: decodedToken, data: userData });
      })();
    }
  }, []);

  const login = async (email: string, password: string) => {
    const token = await authService.login(email, password);
    localStorage.setItem('token', token);
    const decodedToken = authService.decodeToken(token);
    const userData = await userService.getUserData();
    setAuthState({ user: decodedToken, data: userData });
  };

  const register = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    const token = await authService.register(
      first_name,
      last_name,
      email,
      password
    );
    localStorage.setItem('token', token);
    const decodedToken = authService.decodeToken(token);
    const userData = await userService.getUserData();
    setAuthState({ user: decodedToken, data: userData });
  };

  const logout = () => {
    authService.logout();
    setAuthState({ user: null, data: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

export interface AuthState {
  user: TokenData | null;
  data: User | null;
}
