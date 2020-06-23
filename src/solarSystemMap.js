import React from 'react';
import { Map, Circle } from 'react-leaflet';
import './CSS/solarSystemMap.css';


/* *************NOTE************* 
    Below function requires a lot of refactoring, didn't realize how much math was needed until I was done writing it
    Probably will split up into smaller functions, also too many let statements
*/
function SolarMap() {
    //https://ssd.jpl.nasa.gov/?planet_pos
    //https://ssd.jpl.nasa.gov/txt/aprx_pos_planets.pdf
    //Use this link to determine approx. positions of planets

    //https://ssd.jpl.nasa.gov/tc.cgi
    //Just set to this value for now, we can create a timer later to track real-time values
    let julianEphemerisDate = 2459023.4746991;
    let numberOfCenturiesPast = ((julianEphemerisDate - 2451545) / 36525);
    //Kepler's equation --> M = E - (e)sin(E)
    //Keplerian values are assumed off of date span of 1800AD - 2050AD
    //[0] is base value, [1] is base value / century value
    let mercuryKeplerian = {
        semiMajorAxis: [0.38709927, 0.00000037], eccentricity: [0.20563593, 0.00001906], inclination: [7.00497902, -0.00594749],
        meanLongitude: [252.25032350, 149472.67411175], longitudePerihelion: [77.45779628, 0.16047689], longitudeAscendNode: [48.33076593, -0.12534081]
    };
    //1) Compute the true value of each of the planet's six Keplerian elements based on a Julian Date
    let mercurySemiMajorAxis = mercuryKeplerian.semiMajorAxis[0] + (mercuryKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
    let mercuryEccentricity = mercuryKeplerian.eccentricity[0] + (mercuryKeplerian.eccentricity[1] * numberOfCenturiesPast);
    let mercuryInclination = mercuryKeplerian.inclination[0] + (mercuryKeplerian.inclination[1] * numberOfCenturiesPast);
    let mercuryMeanLongitude = mercuryKeplerian.meanLongitude[0] + (mercuryKeplerian.meanLongitude[1] * numberOfCenturiesPast);
    let mercuryLongitudePerihelion = mercuryKeplerian.longitudePerihelion[0] + (mercuryKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
    let mercuryLongitudeAscendNode = mercuryKeplerian.longitudeAscendNode[0] + (mercuryKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);

    //2) Compute argument of perihelion, and mean anomaly, M
    let perihelion = mercuryLongitudePerihelion - mercuryLongitudeAscendNode;
    let meanAnomaly = mercuryMeanLongitude - mercuryLongitudePerihelion;
    console.log(meanAnomaly); // 78315.54215997
    console.log(meanAnomaly % 180);

    meanAnomaly = (meanAnomaly / 360);
    //3) Modulus the meanAnomaly so that -180 <= meanAnomaly <= 180 and calculate eccentricAnomaly (calculating eccentricAnomaly cannot be solved algebraically and requires iteration)
    let modulusMeanAnomaly = (2) * (Math.PI) * (meanAnomaly - Math.floor(meanAnomaly));
    let K = Math.PI / 180;
    let maxIter = 30;
    let i = 0;
    let dp = 5; //Decimal places
    let delta = Math.pow(10, -dp);
    let E = null;
    if (mercuryEccentricity < 0.8) {
        E = modulusMeanAnomaly;
    }
    else {
        E = Math.PI;
    }
    let F = E - mercuryEccentricity * Math.sin(E) - modulusMeanAnomaly;

    while ((Math.abs(F) > delta) && (i < maxIter)) {

        E = E - F / (1.0 - mercuryEccentricity * Math.cos(E));
        F = E - mercuryEccentricity * Math.sin(E) - modulusMeanAnomaly;
        i = + 1;
    }

    E = E / K;

    let eccentricAnomaly = Math.round(E * Math.pow(10, dp)) / Math.pow(10, dp);
    //4) Compute planet's heliocentric coordinates
    let mercuryX = (mercurySemiMajorAxis) * (Math.cos(eccentricAnomaly) - mercuryEccentricity);
    let mercuryY = (mercurySemiMajorAxis) * (Math.sqrt(1 - (mercuryEccentricity) ^ 2)) * (Math.sin(eccentricAnomaly));

    console.log(mercuryX, mercuryY);

    /*     let venusKeplerian = {semiMajorAxis: 0, eccentricity: 0, inclination: 0, meanLongitude: 0, longitudePerihelion: 0, longitudeAscendNode: 0};;
        let emBaryKeplerian = {semiMajorAxis: 0, eccentricity: 0, inclination: 0, meanLongitude: 0, longitudePerihelion: 0, longitudeAscendNode: 0};;
        let marsKeplerian = {semiMajorAxis: 0, eccentricity: 0, inclination: 0, meanLongitude: 0, longitudePerihelion: 0, longitudeAscendNode: 0};;
        let jupiterKeplerian = {semiMajorAxis: 0, eccentricity: 0, inclination: 0, meanLongitude: 0, longitudePerihelion: 0, longitudeAscendNode: 0};;
        let saturnKeplerian = {semiMajorAxis: 0, eccentricity: 0, inclination: 0, meanLongitude: 0, longitudePerihelion: 0, longitudeAscendNode: 0};;
        let uranusKeplerian = {semiMajorAxis: 0, eccentricity: 0, inclination: 0, meanLongitude: 0, longitudePerihelion: 0, longitudeAscendNode: 0};;
        let neptuneKeplerian = {semiMajorAxis: 0, eccentricity: 0, inclination: 0, meanLongitude: 0, longitudePerihelion: 0, longitudeAscendNode: 0};;
        let plutoKeplerian = {semiMajorAxis: 0, eccentricity: 0, inclination: 0, meanLongitude: 0, longitudePerihelion: 0, longitudeAscendNode: 0};;
     */

    const sunCenter = [0, 0];
    const mercuryCenter = [mercuryX, mercuryY];
    /*     let mercuryCenter = null;
        let venusCenter = null;
        let marsCenter = null;
        let earthCenter = null;
        let jupiterCenter = null;
        let saturnCenter = null;
        let uranusCenter = null;
        let neptuneCenter = null; */
    return <Map id="solarSystemMapID" zoom="13" center={sunCenter}> <Circle center={sunCenter} fillColor="yellow" opacity="0.5" radius={200} />
        <Circle center={mercuryCenter} fillColor="red" opacity="0.5" radius={100} />



    </Map>
}

export default SolarMap;