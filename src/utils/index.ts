import { useEffect, useState } from 'react';
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 传入函数，过滤掉value为空的值，并返回这个对象的copy值
export const clearObject = (object: { [key: string]: unknown }) => {
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
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback && callback();
    }, []);
};

// 防抖
export const useDebounce = <V>(value: V, delay?: number) => {
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


export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        clear: () => setValue([]),
        add: (item: T) => setValue([...value, item]),
        removeIndex: (index: number) => {
            const arr = [...value]
            arr.splice(index, 1)
            setValue(arr)
        },
    }
};