import React from 'react';
import '../CSS/displayMenu.css'

function displayMenu() {
    return (
        <div className='displayMenu'>
            <button>
                Planets
            </button>
            <button>
                Dwarf Planets
            </button>
            <button>
                Moons
            </button>
            <button>
                Comets
            </button>
            <button>
                Artificial Satellites
            </button>
        </div>
    );
}

export default displayMenu;