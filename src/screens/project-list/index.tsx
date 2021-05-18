import { useState, useEffect } from 'react';
import * as qs from 'qs';
import SearchPanel from './search-panel';
import List from './list';
import { clearObject, useMount, useDebounce } from 'utils';
import { useHttp } from 'utils/http';
// yarn start 时会去读取.env.development中的变量
// yarn build 读取.env的变量
const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreens = () => {
    const [param, setParam] = useState({
        name: '',
        personId: '',
    });

    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    // 使用useDebounce来防抖param的值,很巧妙啊
    const debounceParam = useDebounce(param, 500);
    const client = useHttp();
    // 当搜索项改变时请求list
    useEffect(() => {
        client('projects', { data: clearObject(debounceParam) }).then(setList);
    }, [debounceParam]);

    useMount(() => {
        client('users').then(setUsers);
    });

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );
};
export default ProjectListScreens;
