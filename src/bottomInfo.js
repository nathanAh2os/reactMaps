import React from 'react';
import logo from './CSS/logo.svg';
import './CSS/bottomInfo.css';

function poweredBy() {
    return (
        <header className="bottominfo-header">
            <p>Powered by React<img src={logo} className="App-logo" alt="logo" /></p>
        </header>
    );
}

export default poweredBy;