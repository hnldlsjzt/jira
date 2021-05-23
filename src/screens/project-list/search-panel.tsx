import React, { useState, useEffect } from 'react';
import { Users, List, Param } from './interface';
import { Input, Select } from 'antd';

const { Option } = Select;
interface Iprops {
    users: Users[];
    param: Param;
    setParam: (param: Iprops['param']) => void;
}
const SearchPanel = ({ users, param, setParam }: Iprops) => {
    return (
        <div style={{ display: 'flex' }}>
            <Input value={param.name} onChange={(evt) => setParam({ ...param, name: evt?.target?.value })} />
            <Select value={param.personId} onChange={(value) => setParam({ ...param, personId: value })}>
                <Option value="">负责人</Option>
                {(users || []).map((item) => (
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default SearchPanel;
