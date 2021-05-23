import { useState } from 'react';
import { LoginScreen } from './login';
import { RegistryScreen } from './register';
import { Button, Card } from 'antd';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card>
                {isRegister ? <RegistryScreen /> : <LoginScreen />}
                <Button type="primary" onClick={() => setIsRegister(!isRegister)}>
                    切换到{isRegister ? '登录' : '注册'}
                </Button>
            </Card>
        </div>
    );
};
