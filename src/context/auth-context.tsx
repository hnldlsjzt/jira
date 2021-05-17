import React, { createContext, useState, useContext, ReactNode } from 'react';
import * as auth from 'auth-provider';
import { Users } from 'screens/project-list/interface';
interface AuthForm {
    username: string;
    password: string;
}

const AuthContext =
    createContext<
        | {
              user: Users | null;
              login: (form: AuthForm) => Promise<void>;
              register: (form: AuthForm) => Promise<void>;
              logout: () => Promise<void>;
          }
        | undefined
    >(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Users | null>(null);

    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log('context', context);
    if (!context) {
        console.log('报错了还能走吗');
        throw new Error('useAuth必须在AuthProider中使用');
    }

    return context;
};
