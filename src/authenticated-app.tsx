/**
 * 登录后的页面
 */
import { useAuth } from 'context/auth-context';
import ProjectListScreens from 'screens/project-list/index';
export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <>
            <div onClick={logout}>登出</div>
            <ProjectListScreens />
        </>
    );
};
