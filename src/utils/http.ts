import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';

interface Config extends RequestInit {
    data?: object;
    token?: string;
}

const apiUrl = process.env.REACT_APP_API_URL;
// 当函数参数有默认值时，参数会变为可选
// 当函数参数有解构时，不能使用?（参数可选符号）
export const http = async (endPoing: string, { data, token, headers, ...customConfig }: Config = {}) => {
    // 基本配置，methods为POST时 会自动覆盖GET
    const config = {
        methods: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig,
    };

    if (config.methods?.toLocaleUpperCase() === 'GET') {
        // GET HEAD请求参数一般放在URL中，HTTP规范虽然可以放在body里，但浏览器不允许这样做
        endPoing += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }
    console.log('endPoing', endPoing, config);

    // fetch 在接口状态非200时不会主动抛异常（在catch中捕获不到），想捕获的话 需要手动在 fetch中 return reject
    // axios 内部做了抛异常
    return window.fetch(`${apiUrl}/${endPoing}`, config).then(async (response) => {
        if (response.status === 401) {
            await auth.logout();
            window.location.reload();
            return Promise.reject({ message: '请重新登录' });
        }
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
    return window.fetch(`${apiUrl}/${endPoing}`, config).then(async (response) => {
        // 登录过期 或 未登录
        if (response.status === 401) {
            // 登出操作 清空token
            // const { logout } = useAuth();
            auth.logout();
            // window.location.reload();
            // return Promise.reject({
            //     message: '请重新登录',
            // });
        }
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        // 手动抛出reject 方便调用方catch捕获
        return Promise.reject(data);
    });
};

export const useHttp = () => {
    const { user } = useAuth();
    return (...[endpoint, config]: Parameters<typeof http>) => {
        return http(endpoint, { ...config, token: user?.token });
    };
};
