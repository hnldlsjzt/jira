import { FormEvent } from 'react';
import { useAuth } from 'context/auth-context';

export const LoginScreen = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const { login, register, user } = useAuth();
    // const login = (param: { username: string; password: string }) => {
    //     fetch(`${apiUrl}/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(param),
    //     }).then(async (res) => {
    //         if (res?.ok) {
    //             console.log(await res.json());
    //         }
    //     });
    // };

    // const register = (param: { username: string; password: string }) => {
    //     fetch(`${apiUrl}/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(param),
    //     }).then(async (res) => {
    //         if (res?.ok) {
    //             console.log(await res.json());
    //         }
    //     });
    // };

    const hanleSubmit = (event: FormEvent<HTMLFormElement>) => {
        // 阻止默认表单提交行为
        event?.preventDefault();
        const username = (event?.currentTarget?.elements[0] as HTMLInputElement)?.value;
        const password = (event?.currentTarget?.elements[1] as HTMLInputElement)?.value;
        console.log(username, password);

        login({ username, password });
    };
    return (
        <form onSubmit={hanleSubmit}>
            {user ? (
                <div>
                    <div>name:{user.name}</div>
                    <div>token:{user.token}</div>
                </div>
            ) : null}
            <div>
                <label htmlFor="usename">用户名</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" name="" id="password" />
            </div>
            <button type="submit">登录</button>
        </form>
    );
};
