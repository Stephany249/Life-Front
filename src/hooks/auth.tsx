import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import { Alert } from 'react-native';

interface User {
  id: string;
  name: string;
  cpf: string;
  specialist: {
    crm: string;
  }
  birthday: string;
  email: string;
  avatar: string;
  role: string;
  crm: string;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface AuthState {
  user: User;
  specialist: Specialist;
  token: string;
}

interface Specialist {
  crm: string;
  userId: string;
}

interface AuthContextData {
  user: User;
  specialist: Specialist;
  loading: boolean;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user, specialist] = await AsyncStorage.multiGet([
        '@Life:token',
        '@Life:user',
        '@Life:specialist',
      ]);

      if (token[1] && user[1] && specialist[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]), specialist: JSON.parse(specialist[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try{

      console.log("authh", email, password);

      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { user, specialist, token } = response.data;


      console.log('aasss', specialist)

      await AsyncStorage.multiSet([
        ['@Life:token', token],
        ['@Life:user', JSON.stringify(user)],
        ['@Life:specialist', JSON.stringify(specialist)],
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({
        user,
        specialist,
        token,
      });
    }catch (err) {
      console.log(err);
      Alert.alert(
        'Erro na autenticação',
        `${err.response.data.message}`
      );
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Life:token', '@Life:user', '@Life:specialist']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@Life:user', JSON.stringify(user));

      setData({
        token: data.token,
        specialist: data.specialist,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, specialist: data.specialist, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
