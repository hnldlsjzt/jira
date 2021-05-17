import { Users } from 'screens/project-list/interface';

const localStorageKey = '__auth_provider_tokey__';
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

// 接收一个user,并设置他的token值
export const handleUserResponse = ({ user }: { user: Users }) => {
    window.localStorage.setItem(localStorageKey, user.token);
    return user;
};

export const login = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (res?.ok) {
            return handleUserResponse(await res?.json());
        }
        return Promise.reject(await res.json());
    });
};

export const register = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (res?.ok) {
            return handleUserResponse(await res?.json());
        }
        return Promise.reject(await res.json());
    });
};

// 登出
export const logout = async () => {
    window.localStorage.removeItem(localStorageKey);
};
