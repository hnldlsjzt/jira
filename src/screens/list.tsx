// @ts-nocheck
import React, { useState } from 'react';
const List = ({ users, list }) => {
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
                        <td>{users.find((users) => users.id === item.id)?.name || '未知'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default List;
