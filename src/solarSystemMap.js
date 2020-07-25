import React from 'react';
import { Map, Circle, Polyline } from 'react-leaflet';
import './CSS/solarSystemMap.css';
import { planetPositions } from './calcPlanetPos';
import fb from './initFirebase';
//import fb from 'firebase';

class solarSystemMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: (Date.now()) / 86400000,
            julianEphemerisDate: (Date.now() / 86400000) + 2440587,
        };
        this.increment = 1;
        this.julian1970Date = 2440587;
        this.planets = ["mercury", "venus", "mars", "earth", "jupiter", "saturn", "uranus", "neptune", "pluto"];

        //Each planet's coordinate values
        this.mercuryCenter = null;
        this.venusCenter = null;
        this.marsCenter = null;
        this.earthCenter = null;
        this.jupiterCenter = null;
        this.saturnCenter = null;
        this.uranusCenter = null;
        this.neptuneCenter = null;
        this.plutoCenter = null;

        //Originally in componentWillMount(), but better in constructor? -- Apparently componentWillMount() is legacy, and best avoided now
        //We can pull this information from the firebase data, but may be quicker to just quickly calculate the data based on current date
        //Otherwise we would have to look through loads of information to find the correct date
        this.planets.forEach(planet => {
            //Calculate initial planet positions based on current date
            switch (planet) {
                case "mercury":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.mercuryCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "venus":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.venusCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "earth":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.earthCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "mars":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.marsCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "jupiter":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.jupiterCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "saturn":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.saturnCenter = planetPositions.calculatePlanetCoordinates();
                    //planetYearLength = 10753;
                    break;
                case "uranus":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.uranusCenter = planetPositions.calculatePlanetCoordinates();
                    //planetYearLength = 30664;
                    break;
                case "neptune":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.neptuneCenter = planetPositions.calculatePlanetCoordinates();
                    //planetYearLength = 60148;
                    break;
                case "pluto":
                    planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
                    this.plutoCenter = planetPositions.calculatePlanetCoordinates();
                    //planetYearLength = 90735;
                    break;
                default:
                    break;
            }
        });
        //Plotted values for each planet's orbit
        this.mercuryOrbit = [];
        this.venusOrbit = [];
        this.marsOrbit = [];
        this.earthOrbit = [];
        this.jupiterOrbit = [];
        this.saturnOrbit = [];
        this.uranusOrbit = [];
        this.neptuneOrbit = [];
        this.plutoOrbit = [];
    }
    componentDidMount() {
        console.log('componentDidUpdate()');
        let increment = 1;
        this.setState((state) => ({ julianEphemerisDate: state.julianEphemerisDate + 1 }));
        let tempDate = this.state.julianEphemerisDate;
        this.planets.forEach(planet => {
            switch (planet) {
                case "mercury":
                    let fbMercuryOrbit = [];
                    for (let i = 0; i < 89; i++) {
                        planetPositions.orderedCalculations(planet, tempDate);
                        this.mercuryCenter = planetPositions.calculatePlanetCoordinates();
                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                        let mercuryCenterObj = { x: this.mercuryCenter[0], y: this.mercuryCenter[1], julianEphemerisDate: tempDate };
                        fbMercuryOrbit.push(mercuryCenterObj);
                        this.mercuryOrbit.push(this.mercuryCenter);
                        tempDate++;
                        console.log(tempDate);
                    }
                    console.log(fbMercuryOrbit);
                    //fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("mercury").
                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("mercury").set({ mercuryOrbitalValues: fbMercuryOrbit })
                        .then(() => {
                            console.log("Successfully added mercuryOrbitalValues!");
                        })
                        .catch((error) => {
                            console.error("Error adding mercuryOrbitalValues: ", error)
                        });
                    break;
                /*                 case "venus":
                                    let fbVenusOrbit = [];
                                    for (let i = 0; i < 226; i++) {
                                        planetPositions.orderedCalculations(planet, tempDate);
                                        this.venusCenter = planetPositions.calculatePlanetCoordinates();
                                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                        let venusCenterObj = { x: this.venusCenter[0], y: this.venusCenter[1], julianEphemerisDate: tempDate };
                                        fbVenusOrbit.push(venusCenterObj);
                                        this.venusOrbit.push(this.venusCenter);
                                        tempDate++;
                                        console.log(tempDate);
                                    }
                                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("venus").set({ venusOrbitalValues: fbVenusOrbit })
                                        .then(() => {
                                            console.log("Successfully added venusOrbitalValues!");
                                        })
                                        .catch((error) => {
                                            console.error("Error adding venusOrbitalValues: ", error)
                                        });
                                    break; */
                /*                 case "earth":
                                    let fbEarthOrbit = [];
                                    for (let i = 0; i < 367; i++) {
                                        planetPositions.orderedCalculations(planet, tempDate);
                                        this.earthCenter = planetPositions.calculatePlanetCoordinates();
                                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                        let earthCenterObj = { x: this.earthCenter[0], y: this.earthCenter[1], julianEphemerisDate: tempDate };
                                        fbEarthOrbit.push(earthCenterObj);
                                        this.earthOrbit.push(this.earthCenter);
                                        tempDate++;
                                        console.log(tempDate);
                                    }
                                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("earth").set({ earthOrbitalValues: fbEarthOrbit })
                                        .then(() => {
                                            console.log("Successfully added earthOrbitalValues!");
                                        })
                                        .catch((error) => {
                                            console.error("Error adding earthOrbitalValues: ", error)
                                        });
                                    break; */
                /*                 case "mars":
                                    let fbMarsOrbit = [];
                                    for (let i = 0; i < 688; i++) {
                                        planetPositions.orderedCalculations(planet, tempDate);
                                        this.marsCenter = planetPositions.calculatePlanetCoordinates();
                                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                        let marsCenterObj = { x: this.marsCenter[0], y: this.marsCenter[1], julianEphemerisDate: tempDate };
                                        fbMarsOrbit.push(marsCenterObj);
                                        this.marsOrbit.push(this.marsCenter);
                                        tempDate++;
                                        console.log(tempDate);
                                    }
                                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("mars").set({ marsOrbitalValues: fbMarsOrbit })
                                        .then(() => {
                                            console.log("Successfully added marsOrbitalValues!");
                                        })
                                        .catch((error) => {
                                            console.error("Error adding marsOrbitalValues: ", error)
                                        });
                                    break; */
                /*                 case "jupiter":
                                    let fbJupiterOrbit = [];
                                    for (let i = 0; i < 4333; i++) {
                                        planetPositions.orderedCalculations(planet, tempDate);
                                        this.jupiterCenter = planetPositions.calculatePlanetCoordinates();
                                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                        let jupiterCenterObj = { x: this.jupiterCenter[0], y: this.jupiterCenter[1], julianEphemerisDate: tempDate };
                                        fbJupiterOrbit.push(jupiterCenterObj);
                                        this.jupiterOrbit.push(this.jupiterCenter);
                                        tempDate++;
                                        console.log(tempDate);
                                    }
                                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("jupiter").set({ jupiterOrbitalValues: fbJupiterOrbit })
                                        .then(() => {
                                            console.log("Successfully added jupiterOrbitalValues!");
                                        })
                                        .catch((error) => {
                                            console.error("Error adding jupiterOrbitalValues: ", error)
                                        });
                                    break; */
                /*                 case "saturn":
                                    let fbSaturnOrbit = [];
                                    for (let i = 0; i < 5377; i++) {
                                        planetPositions.orderedCalculations(planet, tempDate);
                                        this.saturnCenter = planetPositions.calculatePlanetCoordinates();
                                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                        let saturnCenterObj = { x: this.saturnCenter[0], y: this.saturnCenter[1], julianEphemerisDate: tempDate };
                                        fbSaturnOrbit.push(saturnCenterObj);
                                        this.saturnOrbit.push(this.saturnCenter);
                                        tempDate = tempDate + 2;
                                        console.log(tempDate);
                                    }
                                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("saturn").set({ saturnOrbitalValues: fbSaturnOrbit })
                                        .then(() => {
                                            console.log("Successfully added saturnOrbitalValues!");
                                        })
                                        .catch((error) => {
                                            console.error("Error adding saturnOrbitalValues: ", error)
                                        });
                                    //planetYearLength = 10753;
                                    break; */
                /*                  case "uranus":
                                    let fbUranusOrbit = [];
                                    for (let i = 0; i < 4382; i++) {
                                        planetPositions.orderedCalculations(planet, tempDate);
                                        this.uranusCenter = planetPositions.calculatePlanetCoordinates();
                                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                        let uranusCenterObj = { x: this.uranusCenter[0], y: this.uranusCenter[1], julianEphemerisDate: tempDate };
                                        fbUranusOrbit.push(uranusCenterObj);
                                        this.uranusOrbit.push(this.uranusCenter);
                                        tempDate = tempDate + 7;
                                        console.log(tempDate);
                                    }
                                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("uranus").set({ uranusOrbitalValues: fbUranusOrbit })
                                        .then(() => {
                                            console.log("Successfully added uranusOrbitalValues!");
                                        })
                                        .catch((error) => {
                                            console.error("Error adding uranusOrbitalValues: ", error)
                                        }); 
                                    //planetYearLength = 30664;
                                    break; */
                /*                 case "neptune":
                                    let fbNeptuneOrbit = [];
                                    for (let i = 0; i < 4298; i++) {
                                        planetPositions.orderedCalculations(planet, tempDate);
                                        this.neptuneCenter = planetPositions.calculatePlanetCoordinates();
                                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                        let neptuneCenterObj = { x: this.neptuneCenter[0], y: this.neptuneCenter[1], julianEphemerisDate: tempDate };
                                        fbNeptuneOrbit.push(neptuneCenterObj);
                                        this.neptuneOrbit.push(this.neptuneCenter);
                                        tempDate = tempDate + 14;
                                        console.log(tempDate);
                                    }
                                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("neptune").set({ neptuneOrbitalValues: fbNeptuneOrbit })
                                        .then(() => {
                                            console.log("Successfully added neptuneOrbitalValues!");
                                        })
                                        .catch((error) => {
                                            console.error("Error adding neptuneOrbitalValues: ", error)
                                        });
                                    //planetYearLength = 60148;
                                    break; */
                /*                 case "pluto":
                                    let fbPlutoOrbit = [];
                                    for (let i = 0; i < 6482; i++) {
                                        planetPositions.orderedCalculations(planet, tempDate);
                                        this.plutoCenter = planetPositions.calculatePlanetCoordinates();
                                        //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                        let plutoCenterObj = { x: this.plutoCenter[0], y: this.plutoCenter[1], julianEphemerisDate: tempDate };
                                        fbPlutoOrbit.push(plutoCenterObj);
                                        this.plutoOrbit.push(this.plutoCenter);
                                        tempDate = tempDate + 14;
                                        console.log(tempDate);
                                    }
                                    fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("pluto").set({ plutoOrbitalValues: fbPlutoOrbit })
                                        .then(() => {
                                            console.log("Successfully added plutoOrbitalValues!");
                                        })
                                        .catch((error) => {
                                            console.error("Error adding plutoOrbitalValues: ", error)
                                        });
                                    //planetYearLength = 90735;
                                    break; */
                default:
                    break;
            }
        });
        /*         console.log(this.mercuryOrbit);
                console.log(this.venusOrbit);
                console.log(this.earthOrbit);
                console.log(this.marsOrbit);
                console.log(this.jupiterOrbit);
                console.log(this.saturnOrbit);
                console.log(this.neptuneOrbit);
                console.log(this.uranusOrbit);
                console.log(this.plutoOrbit); */
    }
    calculateCurrentJulianTime() {
        console.log('Incrementing Current Julian Time!');

        this.setState((state, props) => ({ julianEphemerisDate: state.julianEphemerisDate + props.increment }));
        console.log(this.state.julianEphemerisDate);
    }
    render() {
        /*         console.log(this.mercuryOrbit);
                console.log(this.venusOrbit);
                console.log(this.earthOrbit);
                console.log(this.marsOrbit);
                console.log(this.jupiterOrbit);
                console.log(this.saturnOrbit);
                console.log(this.neptuneOrbit);
                console.log(this.uranusOrbit);
                console.log(this.plutoOrbit) */
        console.log(this.mercuryCenter);
        console.log(this.mercuryOrbit);
        //Eventually try to make CSS classes for these so we don't have repeating style values
        return (<Map id="solarSystemMapID" zoom="10" center={[0, 0]}>
            <Circle center={[0, 0]} fillColor="yellow" opacity="0.5" radius={592} />
            <Circle center={this.mercuryCenter} fillColor="red" opacity="0.5" radius={2} />
            <Circle center={this.venusCenter} fillColor="red" opacity="0.5" radius={5} />
            <Circle center={this.marsCenter} fillColor="red" opacity="0.5" radius={3} />
            <Circle center={this.earthCenter} fillColor="red" opacity="0.5" radius={5.42} />
            <Circle center={this.jupiterCenter} fillColor="red" opacity="0.5" radius={61} />
            <Circle center={this.saturnCenter} fillColor="red" opacity="0.5" radius={51} />
            <Circle center={this.uranusCenter} fillColor="red" opacity="0.5" radius={22} />
            <Circle center={this.neptuneCenter} fillColor="red" opacity="0.5" radius={21} />
            <Circle center={this.plutoCenter} fillColor="red" opacity="0.5" radius={1} />
            <Polyline positions={this.mercuryOrbit} color="blue" weight="1" />
            <Polyline positions={this.venusOrbit} color="blue" weight="1" />
            <Polyline positions={this.marsOrbit} color="blue" weight="1" />
            <Polyline positions={this.earthOrbit} color="blue" weight="1" />
            <Polyline positions={this.jupiterOrbit} color="blue" weight="1" />
            <Polyline positions={this.saturnOrbit} color="blue" weight="1" />
            <Polyline positions={this.uranusOrbit} color="blue" weight="1" />
            <Polyline positions={this.neptuneOrbit} color="blue" weight="1" />
            <Polyline positions={this.plutoOrbit} color="blue" weight="1" />
        </Map>);
    }
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

export default solarSystemMap;