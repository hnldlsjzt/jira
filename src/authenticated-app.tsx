/**
 * 登录后的页面
 */
import { Button } from 'antd';
import { useAuth } from 'context/auth-context';
import ProjectListScreens from 'screens/project-list/index';
export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <>
            <Button type="primary" onClick={logout}>
                登出
            </Button>
            <ProjectListScreens />
        </>
    );
};
