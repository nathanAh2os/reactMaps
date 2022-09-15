import React from 'react';
import logo from '../CSS/logo.svg';
import '../CSS/bottomInfo.css';

function poweredBy() {
    return (
        <div className="bottom-bar">
            <div className="bottom-content">
                <div className="bottom-header">Created by Nathan Watters</div>
                <div className="bottom-header">Powered by React</div>
                <div className="bottom-header"><img src={logo} className="App-logo" alt="logo" /></div>
            </div>
        </div>
    );
}

export default poweredBy;