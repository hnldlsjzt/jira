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
    // useContext()参数为createContex对象，并返回该Context的值。当前才Context值有上层组件中距离当前组件最近的<MyContext.Provider>的value Prop决定
    // 当上层最近的<MyContext.Provider>更新时，该Hook会触发重渲染，并使用最新值。即使祖先使用React.memo或shouldComponentUpdate也会重新渲染
    // useContext(MyContext)只是让你能够读取Context值和订阅Context的变化。仍然需要在上层组件树中使用<MyContext.Provider>为下层提供context
    const context = useContext(AuthContext);
    console.log('context', context);
    if (!context) {
        console.log('报错了还能走吗');
        // return { login: '', register: '', user: {} };
        throw new Error('useAuth必须在AuthProider中使用');
    }

    return context;
};
