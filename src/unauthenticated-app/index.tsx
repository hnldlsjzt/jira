import { useState } from 'react';
import { LoginScreen } from './login';
import { RegistryScreen } from './register';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <>
            {isRegister ? <RegistryScreen /> : <LoginScreen />}
            <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</button>
        </>
    );
};
