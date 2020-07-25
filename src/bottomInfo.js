import React from 'react';
import logo from './CSS/logo.svg';
import './CSS/bottomInfo.css';

function poweredBy() {
    return (
        <div className="App">
            <header className="bottominfo-header">
                <p>Powered by React<img src={logo} className="App-logo" alt="logo" /></p>
            </header>
        </div>
    );
}

export default poweredBy;