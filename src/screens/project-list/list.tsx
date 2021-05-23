import { Table } from 'antd';
import { Users, List } from './interface';
interface Iprops {
    users: Users[];
    list: List[];
}

const ProjectList = ({ users, list }: Iprops) => {
    const colunms = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: List, b: List) => a.name.localeCompare(b.name),
        },
        {
            title: '负责人',
            render(text: string, record: List) {
                return <div>{users.find((user: Users) => user.id === record.id)?.name || '未知'}</div>;
            },
        },
    ];
    return <Table pagination={false} columns={colunms} dataSource={list} />;
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {(list || []).map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{users.find((user) => user.id === item.id)?.name || '未知'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default ProjectList;
