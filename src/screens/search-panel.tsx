// @ts-nocheck
import React, { useState, useEffect } from 'react';
const SearchPanel = ({ users, param, setParam }) => {
    return (
        <from>
            <input value={param.name} onChange={(evt) => setParam({ ...param, name: evt?.target.value })} />
            <select value={param.personId} onChange={(evt) => setParam({ ...param, personId: evt?.target?.value })}>
                <option value="">负责人</option>
                {(users || []).map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </from>
    );
};

export default SearchPanel;
