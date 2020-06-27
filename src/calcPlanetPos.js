//Refactor planet position calculations here
/* Useful Links ....
    https://ssd.jpl.nasa.gov/?planet_pos
    https://ssd.jpl.nasa.gov/txt/aprx_pos_planets.pdf
    https://ssd.jpl.nasa.gov/tc.cgi
*/

//https://www.newline.co/fullstack-react/articles/react-create-class-vs-es6-class-components/
export const planetPositions = {
    semiMajorAxis: null,
    eccentricity: null,
    inclination: null,
    meanLongitude: null,
    longitudePerihelion: null,
    longitudeAscendNode: null,
    meanAnomaly: null,
    eccentricAnomaly: null,
    //Just set to this value for now, we can create a timer later to track real-time values based from Date.now()
    //julianEphemerisDate: 2459025.50000, //Roughly 06/22/2020 at 3pm PST
    //Keplerian table values are assumed off of date span ranging from 1800AD - 2050AD
    //[0] is base value, [1] is base value / century value
    mercuryKeplerian: {
        semiMajorAxis: [0.38709927, 0.00000037], eccentricity: [0.20563593, 0.00001906], inclination: [7.00497902, -0.00594749],
        meanLongitude: [252.25032350, 149472.67411175], longitudePerihelion: [77.45779628, 0.16047689], longitudeAscendNode: [48.33076593, -0.12534081]
    },
    venusKeplerian: {
        semiMajorAxis: [0.72333566, 0.00000390], eccentricity: [0.00677672, -0.00004107], inclination: [3.39467605, -0.00078890],
        meanLongitude: [181.97909950, 58517.81538729], longitudePerihelion: [131.60246718, 0.00268329], longitudeAscendNode: [76.67984255, -0.27769418]
    },
    earthKeplerian: {
        semiMajorAxis: [1.00000261, 0.00000562], eccentricity: [0.01671123, -0.00004392], inclination: [-0.00001531, -0.01294668],
        meanLongitude: [100.46457166, 35999.37244981], longitudePerihelion: [102.93768193, 0.32327364], longitudeAscendNode: [0, 0]
    },
    marsKeplerian: {
        semiMajorAxis: [1.52371034, 0.00001847], eccentricity: [0.09339410, 0.00007882], inclination: [1.84969142, -0.00813131],
        meanLongitude: [-4.55343205, 19140.30268499], longitudePerihelion: [-23.94362959, 0.44441088], longitudeAscendNode: [49.55953891, -0.29257343]
    },
    jupiterKeplerian: {
        semiMajorAxis: [5.20288700, -0.00011607], eccentricity: [0.04838624, -0.00013253], inclination: [1.30439695, -0.00183714],
        meanLongitude: [34.39664051, 3034.74612775], longitudePerihelion: [14.72847983, 0.21252668], longitudeAscendNode: [100.47390909, 0.20469106]
    },
    saturnKeplerian: {
        semiMajorAxis: [9.53667594, -0.00125060], eccentricity: [0.05386179, -0.00050991], inclination: [2.48599187, 0.00193609],
        meanLongitude: [49.95424423, 1222.49362201], longitudePerihelion: [92.59887831, -0.41897216], longitudeAscendNode: [113.66242448, -0.28867794]
    },
    uranusKeplerian: {
        semiMajorAxis: [19.18916464, -0.00196176], eccentricity: [0.04725744, -0.00004397], inclination: [0.77263783, -0.00242939],
        meanLongitude: [313.23810451, 428.48202785], longitudePerihelion: [170.95427630, 0.40805281], longitudeAscendNode: [74.01692503, 0.04240589]
    },
    neptuneKeplerian: {
        semiMajorAxis: [30.06992276, 0.00026291], eccentricity: [0.00859048, 0.00005105], inclination: [1.77004347, 0.00035372],
        meanLongitude: [-55.12002969, 218.45945325], longitudePerihelion: [44.96476227, -0.32241464], longitudeAscendNode: [131.78422574, -0.00508664]
    },
    plutoKeplerian: {
        semiMajorAxis: [39.48211675, -0.00031596], eccentricity: [0.24882730, 0.00005170], inclination: [17.14001206, 0.00004818],
        meanLongitude: [238.92903833, 145.20780515], longitudePerihelion: [224.06891629, -0.04062942], longitudeAscendNode: [110.30393684, -0.01183482]
    },

    trueKeplerianValues(planet, julianEphemerisDate) {
        console.log(julianEphemerisDate);
        let numberOfCenturiesPast = ((julianEphemerisDate - 2451545) / 36525);
        console.log(numberOfCenturiesPast);
        //1) Compute the true value of each of the planet's six Keplerian elements based on a Julian Date
        switch (planet) {
            case "mercury":
                this.semiMajorAxis = this.mercuryKeplerian.semiMajorAxis[0] + (this.mercuryKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.mercuryKeplerian.eccentricity[0] + (this.mercuryKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.mercuryKeplerian.inclination[0] + (this.mercuryKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.mercuryKeplerian.meanLongitude[0] + (this.mercuryKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.mercuryKeplerian.longitudePerihelion[0] + (this.mercuryKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.mercuryKeplerian.longitudeAscendNode[0] + (this.mercuryKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            case "venus":
                this.semiMajorAxis = this.venusKeplerian.semiMajorAxis[0] + (this.venusKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.venusKeplerian.eccentricity[0] + (this.venusKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.venusKeplerian.inclination[0] + (this.venusKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.venusKeplerian.meanLongitude[0] + (this.venusKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.venusKeplerian.longitudePerihelion[0] + (this.venusKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.venusKeplerian.longitudeAscendNode[0] + (this.venusKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            case "mars":
                this.semiMajorAxis = this.marsKeplerian.semiMajorAxis[0] + (this.marsKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.marsKeplerian.eccentricity[0] + (this.marsKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.marsKeplerian.inclination[0] + (this.marsKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.marsKeplerian.meanLongitude[0] + (this.marsKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.marsKeplerian.longitudePerihelion[0] + (this.marsKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.marsKeplerian.longitudeAscendNode[0] + (this.marsKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            case "earth":
                this.semiMajorAxis = this.earthKeplerian.semiMajorAxis[0] + (this.earthKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.earthKeplerian.eccentricity[0] + (this.earthKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.earthKeplerian.inclination[0] + (this.earthKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.earthKeplerian.meanLongitude[0] + (this.earthKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.earthKeplerian.longitudePerihelion[0] + (this.earthKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.earthKeplerian.longitudeAscendNode[0] + (this.earthKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            case "jupiter":
                this.semiMajorAxis = this.jupiterKeplerian.semiMajorAxis[0] + (this.jupiterKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.jupiterKeplerian.eccentricity[0] + (this.jupiterKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.jupiterKeplerian.inclination[0] + (this.jupiterKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.jupiterKeplerian.meanLongitude[0] + (this.jupiterKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.jupiterKeplerian.longitudePerihelion[0] + (this.jupiterKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.jupiterKeplerian.longitudeAscendNode[0] + (this.jupiterKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            case "saturn":
                this.semiMajorAxis = this.saturnKeplerian.semiMajorAxis[0] + (this.saturnKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.saturnKeplerian.eccentricity[0] + (this.saturnKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.saturnKeplerian.inclination[0] + (this.saturnKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.saturnKeplerian.meanLongitude[0] + (this.saturnKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.saturnKeplerian.longitudePerihelion[0] + (this.saturnKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.saturnKeplerian.longitudeAscendNode[0] + (this.saturnKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            case "uranus":
                this.semiMajorAxis = this.uranusKeplerian.semiMajorAxis[0] + (this.uranusKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.uranusKeplerian.eccentricity[0] + (this.uranusKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.uranusKeplerian.inclination[0] + (this.uranusKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.uranusKeplerian.meanLongitude[0] + (this.uranusKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.uranusKeplerian.longitudePerihelion[0] + (this.uranusKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.uranusKeplerian.longitudeAscendNode[0] + (this.uranusKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            case "neptune":
                this.semiMajorAxis = this.neptuneKeplerian.semiMajorAxis[0] + (this.neptuneKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.neptuneKeplerian.eccentricity[0] + (this.neptuneKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.neptuneKeplerian.inclination[0] + (this.neptuneKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.neptuneKeplerian.meanLongitude[0] + (this.neptuneKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.neptuneKeplerian.longitudePerihelion[0] + (this.neptuneKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.neptuneKeplerian.longitudeAscendNode[0] + (this.neptuneKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            case "pluto":
                this.semiMajorAxis = this.plutoKeplerian.semiMajorAxis[0] + (this.plutoKeplerian.semiMajorAxis[1] * numberOfCenturiesPast);
                this.eccentricity = this.plutoKeplerian.eccentricity[0] + (this.plutoKeplerian.eccentricity[1] * numberOfCenturiesPast);
                this.inclination = this.plutoKeplerian.inclination[0] + (this.plutoKeplerian.inclination[1] * numberOfCenturiesPast);
                this.meanLongitude = this.plutoKeplerian.meanLongitude[0] + (this.plutoKeplerian.meanLongitude[1] * numberOfCenturiesPast);
                this.longitudePerihelion = this.plutoKeplerian.longitudePerihelion[0] + (this.plutoKeplerian.longitudePerihelion[1] * numberOfCenturiesPast);
                this.longitudeAscendNode = this.plutoKeplerian.longitudeAscendNode[0] + (this.plutoKeplerian.longitudeAscendNode[1] * numberOfCenturiesPast);
                break;
            default:
                break;
        }
    },

    calculateMeanAnomaly() {
        //2) Compute argument of perihelion, and mean anomaly, M
        //We obtain the modulas of the mean anomaly between -360 <= M <= 360
        //let perihelion = this.longitudePerihelion - this.longitudeAscendNode;
        this.meanAnomaly = this.meanLongitude - this.longitudePerihelion;
        this.meanAnomaly = this.meanAnomaly * Math.PI / 180;
        console.log("semiMajorAxis: " + this.semiMajorAxis);
        console.log("Eccentricity: " + this.eccentricity);
        console.log("Inclination: " + this.inclination);
        console.log("Long. Ascend Node: " + this.longitudeAscendNode);
        console.log("Long. Perihelion: " + this.longitudePerihelion);
        console.log('meanAnomaly: ' + this.meanAnomaly);
    },

    calculateEccentricAnomaly() {
        //To calculate the eccentric anomaly, we use Kepler's equation --> meanAnomaly = eccentricAnomaly - (eccentricity)sin(eccentricAnomaly) --> M = E = eSin(E)
        //However, Kepler's equation cannot be solved algebraically and requires particular iteration
        let E = null;
        let F = null;
        let dp = 5; //Decimal places
        let delta = Math.pow(10, -dp);
        let i = 0;
        let maxIter = 30;
        if (this.eccentricity < 0.8) {
            E = this.meanAnomaly;
        }
        else {
            E = Math.PI;
        }
        F = E - this.eccentricity * Math.sin(this.meanAnomaly) - this.meanAnomaly;
        while ((Math.abs(F) > delta) && (i < maxIter)) {

            E = E - F / (1.0 - this.eccentricity * Math.cos(E));
            F = E - (this.eccentricity * Math.sin(E)) - this.meanAnomaly;
            i = i + 1;
        }

        E = E / (Math.PI / 180);
        //this.eccentricAnomaly = Math.round(E * Math.pow(10, dp)) / Math.pow(10, dp);
        this.eccentricAnomaly = E;
        this.eccentricityAnomaly = Math.round(this.eccentricity * Math.pow(10, dp)) / Math.pow(10, dp);
        console.log('EccentricAnomaly ' + this.eccentricAnomaly);
        //return this.eccentricAnomaly;
    },

    calculatePlanetCoordinates() {
        //Convert from degrees to radians
        this.eccentricAnomaly = this.eccentricAnomaly * Math.PI / 180;
        console.log('semiMajorAxis: ' + this.semiMajorAxis);
        //4) Compute planet's heliocentric coordinates
        let S = Math.sin(this.eccentricAnomaly)
        let C = Math.cos(this.eccentricAnomaly);
        let x = this.semiMajorAxis * (C - this.eccentricity);
        let y = this.semiMajorAxis * Math.sqrt(1 - (this.eccentricity * this.eccentricity)) * S;
        let planetCenter = [x, y];
        console.log(planetCenter);
        return planetCenter;
    }
};