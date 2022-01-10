import React from 'react';
import '../CSS/menu.css';

function Menu() {
    return <div className="topMenu">
        <p>Solar System Map</p>
        <button className="topMenuButtons">Planets</button>
        <button className="topMenuButtons">Dwarf Planets</button>
        <button className="topMenuButtons">Comets</button>
        <button className="topMenuButtons">Moons</button>
    </div>
}

export default Menu;
