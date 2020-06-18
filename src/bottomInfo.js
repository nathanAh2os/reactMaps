import React from 'react';
import logo from './logo.svg';
import './App.css';

function poweredBy() {
    return (
        <div class="App">
            <header className="App-header">
                <p>Powered by React<img src={logo} className="App-logo" alt="logo" /></p>
            </header>
        </div>
    );
}

export default poweredBy;