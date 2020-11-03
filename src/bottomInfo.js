import React from 'react';
import logo from './CSS/logo.svg';
import './CSS/bottomInfo.css';

function poweredBy() {
    return (
        <div className="bottominfo">
            <div className="bottominfo-header">Powered by React<img src={logo} className="App-logo" alt="logo" /></div>
        </div>
    );
}

export default poweredBy;