import React from 'react';
import logo from './logo.svg';
import './App.css';

import ProjectListScreens from './screens/index';

function App() {
    const test = 'hello';
    return (
        <div className="App">
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <p>
                    Edit <code>src/App.tsx</code>
                    and save to reload. sdf
                </p>

                <div>我来加一行 试试它的格式化{test} world</div>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header> */}
            <ProjectListScreens />
        </div>
    );
}

export default App;
