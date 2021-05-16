import { useEffect, useState } from 'react';
export const isFalsy = (value) => (value === 0 ? false : !value);

// 传入函数，过滤掉value为空的值，并返回这个对象的copy值
export const clearObject = (object) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isFalsy(value)) {
            delete result[key];
        }
    });
    return result;
};

/**
 * Custom Hook
 * 自定义Hook必需以use开头
 * hook只能在组件或者其他hook中使用
 */

// 提取useEffeck依赖为空的封装
export const useMount = (callback) => {
    useEffect(() => {
        callback && callback();
    }, []);
};

// 防抖
export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        // 在下次effect执行前，会先执行return里面的内容
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debounceValue;
};
