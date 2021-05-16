import React, { useState, useEffect } from 'react';
import { Users, List, Param } from './interface';

interface Iprops {
    users: Users[];
    param: Param;
    setParam: (param: Iprops['param']) => void;
}
const SearchPanel = ({ users, param, setParam }: Iprops) => {
    return (
        <form>
            <input value={param.name} onChange={(evt) => setParam({ ...param, name: evt?.target.value })} />
            <select value={param.personId} onChange={(evt) => setParam({ ...param, personId: evt?.target?.value })}>
                <option value="">负责人</option>
                {(users || []).map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default SearchPanel;
