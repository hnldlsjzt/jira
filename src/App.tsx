import React from 'react';
import logo from './logo.svg';
import './App.css';

import ProjectListScreens from './screens/project-list';
import { LoginScreen } from 'screens/login';

function App() {
    const test = 'hello';
    return (
        <div className="App">
            {/* <ProjectListScreens /> */}
            <LoginScreen />
        </div>
    );
}

export default App;
