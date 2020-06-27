import React from 'react';
import { Map, Circle, Polyline, L } from 'react-leaflet';
import './CSS/solarSystemMap.css';
import { planetPositions } from './calcPlanetPos';

let mercuryOrbit = [];

function SolarMap() {
    let planets = ["mercury", "venus", "mars", "earth", "jupiter", "saturn", "uranus", "neptune", "pluto"];
    let mercuryCenter = null;
    let venusCenter = null;
    let marsCenter = null;
    let earthCenter = null;
    let jupiterCenter = null;
    let saturnCenter = null;
    let uranusCenter = null;
    let neptuneCenter = null;
    let plutoCenter = null;

    let venusOrbit = [];
    let marsOrbit = [];
    let earthOrbit = [];
    let jupiterOrbit = [];
    let saturnOrbit = [];
    let uranusOrbit = [];
    let neptuneOrbit = [];
    let plutoOrbit = [];
    let y = 0;

    //Plot the elleptical orbits for each planet
    /*     for (let x = 1; x < 100; x++) {
            y = (Math.sqrt(1) - (x / 57.9)) * 56.6703
            console.log(y);
            mercuryOrbit.push([x, y]);
        } */
    let julianEphemerisDate = 2459025;
    console.log(mercuryOrbit);
    //Calcuate each of the planet coordinates relative to the sun
    planets.forEach(planet => {
        for (let i = 0; i < 1000; i++) {
            planetPositions.trueKeplerianValues(planet, julianEphemerisDate);
            planetPositions.calculateMeanAnomaly();
            planetPositions.calculateEccentricAnomaly();
            switch (planet) {
                case "mercury":
                    mercuryCenter = planetPositions.calculatePlanetCoordinates();
                    console.log(mercuryCenter);
                    mercuryOrbit.push(mercuryCenter);
                    console.log();
                    break;
                case "venus":
                    venusCenter = planetPositions.calculatePlanetCoordinates();
                    venusOrbit.push(venusCenter);
                    break;
                case "mars":
                    marsCenter = planetPositions.calculatePlanetCoordinates();
                    marsOrbit.push(marsCenter);
                    break;
                case "earth":
                    earthCenter = planetPositions.calculatePlanetCoordinates();
                    earthOrbit.push(earthCenter);
                    break;
                case "jupiter":
                    jupiterCenter = planetPositions.calculatePlanetCoordinates();
                    jupiterOrbit.push(jupiterCenter);
                    break;
                case "saturn":
                    saturnCenter = planetPositions.calculatePlanetCoordinates();
                    saturnOrbit.push(saturnCenter);
                    break;
                case "uranus":
                    uranusCenter = planetPositions.calculatePlanetCoordinates();
                    uranusOrbit.push(uranusCenter);
                    break;
                case "neptune":
                    neptuneCenter = planetPositions.calculatePlanetCoordinates();
                    neptuneOrbit.push(neptuneCenter);
                    break;
                case "pluto":
                    plutoCenter = planetPositions.calculatePlanetCoordinates();
                    plutoOrbit.push(plutoCenter);
                    break;
                default:
                    break;
            }
            julianEphemerisDate++;
        }
        console.log(mercuryCenter);
        console.log(mercuryOrbit);
    });
    return <Map id="solarSystemMapID" zoom="10" center={[0, 0]}>
        <Circle center={[0, 0]} fillColor="yellow" opacity="0.5" radius={592} />
        <Circle center={mercuryCenter} fillColor="red" opacity="0.5" radius={2} />
        <Circle center={venusCenter} fillColor="red" opacity="0.5" radius={5} />
        <Circle center={marsCenter} fillColor="red" opacity="0.5" radius={3} />
        <Circle center={earthCenter} fillColor="red" opacity="0.5" radius={5.42} />
        <Circle center={jupiterCenter} fillColor="red" opacity="0.5" radius={61} />
        <Circle center={saturnCenter} fillColor="red" opacity="0.5" radius={51} />
        <Circle center={uranusCenter} fillColor="red" opacity="0.5" radius={22} />
        <Circle center={neptuneCenter} fillColor="red" opacity="0.5" radius={21} />
        <Circle center={plutoCenter} fillColor="red" opacity="0.5" radius={1} />
        <Polyline positions={mercuryOrbit} color="blue" />
        <Polyline positions={venusOrbit} color="blue" />
        <Polyline positions={marsOrbit} color="blue" />
        <Polyline positions={earthOrbit} color="blue" />
        <Polyline positions={jupiterOrbit} color="blue" />
        <Polyline positions={saturnOrbit} color="blue" />
        <Polyline positions={uranusOrbit} color="blue" />
        <Polyline positions={neptuneOrbit} color="blue" />
        <Polyline positions={plutoOrbit} color="blue" />
    </Map>
}



//Sun = 696,340 Jupiter = 71492, Saturn = 60268, Uranus = 25559, Neptune = 24764, Earth = 6378.1, Venus = 6051.8, Mars = 3396.2, Mercury = 2439.7, Moon = 1738.1, Pluto = 1195
//MercuryCenter = [-0.3296486244787554, -0.4179069554517351]
//Distance from Sun to Mercury --> 69.661 million km + 
//OR 0.5322729 from center to center

//0.5322729 / 1 * 
//0.00084983 conversion rate (times by planets km radius to get circle radius)
//About 130,874,595 km per 1 on the grid
//About 59,200R to 69.661 million km

//  59.200R      *    696, 340km = 
//69,661,000km

export default SolarMap;