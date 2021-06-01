/**
 * 登录后的页面
 */
import { Button } from 'antd';
import styled from '@emotion/styled';
import { useAuth } from 'context/auth-context';
import ProjectListScreens from 'screens/project-list/index';
import { Row } from 'components/lib';
import { ReactComponent as AsoftwareLogo } from 'assets/software-logo.svg';
export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    {/* <img src={AsoftwareLogo} width="150"/> */}
                    <AsoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
                    <span>用户</span>
                </HeaderLeft>
                <HeaderRight>
                    <Button type="primary" onClick={logout}>
                        登出
                    </Button>
                </HeaderRight>
            </Header>

            <Main>
                <ProjectListScreens />
            </Main>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`;

const Header = styled(Row)``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
