import { FormEvent } from 'react';
import { useAuth } from 'context/auth-context';

export const RegistryScreen = () => {
    const { register } = useAuth();

    const hanleSubmit = (event: FormEvent<HTMLFormElement>) => {
        // 阻止默认表单提交行为
        event?.preventDefault();
        const username = (event?.currentTarget?.elements[0] as HTMLInputElement)?.value;
        const password = (event?.currentTarget?.elements[1] as HTMLInputElement)?.value;
        console.log(username, password);

        register({ username, password });
    };
    return (
        <form onSubmit={hanleSubmit}>
            <div>
                <label htmlFor="usename">用户名</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" name="" id="password" />
            </div>
            <button type="submit">注册</button>
        </form>
    );
};
