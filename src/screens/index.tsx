import { useState, useEffect } from 'react';
import * as qs from 'qs';
import SearchPanel from './search-panel';
import List from './list';
import { clearObject, useMount, useDebounce } from 'utils';
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

    // 当搜索项改变时请求list
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(clearObject(debounceParam))}`).then(async (res) => {
            if (res.ok) {
                console.log(res);
                setList((await res?.json()) || []);
            }
        });
    }, [debounceParam]);

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (res) => {
            if (res.ok) {
                console.log(res);
                setUsers((await res?.json()) || []);
            }
        });
    });

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );
};
export default ProjectListScreens;
