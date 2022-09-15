//Measurement AU overlay on solar system map

//https://riptutorial.com/reactjs/example/3846/nesting-components

//Nesting using props -- distanceNav is child of solarSystemMap

import React, { Component } from 'react';
import '../CSS/satelliteInfo.css';

class SatelliteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: props
        };
    }
    render() {
        return <div className="distance">
                    <p>{this.props.distance} AU</p>
                    <hr></hr>
               </div>;
    }


}

export default SatelliteInfo;