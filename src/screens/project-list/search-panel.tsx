import React, { useState, useEffect } from 'react';
import { Users, List, Param } from './interface';
import { Input, Select, Form } from 'antd';

const { Option } = Select;
interface Iprops {
    users: Users[];
    param: Param;
    setParam: (param: Iprops['param']) => void;
}
const SearchPanel = ({ users, param, setParam }: Iprops) => {
    return (
        <Form style={{ display: 'flex' }} layout="inline">
            <Form.Item>
                <Input
                    placeholder="项目名"
                    value={param.name}
                    onChange={(evt) => setParam({ ...param, name: evt?.target?.value })}
                />
            </Form.Item>
            <Form.Item>
                <Select
                    placeholder="负责人"
                    value={param.personId}
                    onChange={(value) => setParam({ ...param, personId: value })}
                >
                    <Option value="">负责人</Option>
                    {(users || []).map((item) => (
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default SearchPanel;
