import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Menu from './Components/menu';
import BottomInfo from './Components/bottomInfo';
import SolarSystemMap from './Components/solarSystemMap';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <Menu />
    <SolarSystemMap />
    <BottomInfo />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
