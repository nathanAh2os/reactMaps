import React from 'react';
import { Map, Circle, Polyline } from 'react-leaflet';
import './CSS/solarSystemMap.css';
import { planetPositions } from './calcPlanetPos';
import fb from './initFirebase';
import "leaflet/dist/leaflet.css";
//import fb from 'firebase';

class solarSystemMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: (Date.now()) / 86400000,
            julianEphemerisDate: (Date.now() / 86400000) + 2440587,
            mercuryOrbit: [[0, 0]],
            venusOrbit: [[0, 0]],
            marsOrbit: [[0, 0]],
            earthOrbit: [[0, 0]],
            jupiterOrbit: [[0, 0]],
            saturnOrbit: [[0, 0]],
            uranusOrbit: [[0, 0]],
            neptuneOrbit: [[0, 0]],
            plutoOrbit: [[0, 0]],
            loading: false
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
            planetPositions.orderedCalculations(planet, this.state.julianEphemerisDate);
            //Calculate initial planet positions based on current date
            switch (planet) {
                case "mercury":
                    this.mercuryCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "venus":
                    this.venusCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "earth":
                    this.earthCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "mars":
                    this.marsCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "jupiter":
                    this.jupiterCenter = planetPositions.calculatePlanetCoordinates();
                    break;
                case "saturn":
                    this.saturnCenter = planetPositions.calculatePlanetCoordinates();
                    //planetYearLength = 10753;
                    break;
                case "uranus":
                    this.uranusCenter = planetPositions.calculatePlanetCoordinates();
                    //planetYearLength = 30664;
                    break;
                case "neptune":
                    this.neptuneCenter = planetPositions.calculatePlanetCoordinates();
                    //planetYearLength = 60148;
                    break;
                case "pluto":
                    this.plutoCenter = planetPositions.calculatePlanetCoordinates();
                    //planetYearLength = 90735;
                    break;
                default:
                    break;
            }
        });
    }
    async componentDidMount() {
        console.log('componentDidUpdate()');
        this.setState((state) => ({ julianEphemerisDate: state.julianEphemerisDate + 1 }));
        this.planets.forEach(planet => {
            let tempDate = this.state.julianEphemerisDate;
            switch (planet) {
                case "mercury":
                    let mercuryDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("mercury");
                    this.getOrbitValues(mercuryDoc, "mercury");

                    /*                     let fbMercuryOrbit = [];
                                        for (let i = 0; i < 89; i++) {
                                            planetPositions.orderedCalculations(planet, tempDate);
                                            this.mercuryCenter = planetPositions.calculatePlanetCoordinates();
                                            //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                            let mercuryCenterObj = { x: this.mercuryCenter[0], y: this.mercuryCenter[1], julianEphemerisDate: tempDate };
                                            fbMercuryOrbit.push(mercuryCenterObj);
                                            tempDate++;
                                            console.log(tempDate);
                                        }
                                        fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("mercury").set({ orbitalValues: fbMercuryOrbit })
                                            .then(() => {
                                                console.log("Successfully added mercuryOrbitalValues!");
                                            })
                                            .catch((error) => {
                                                console.error("Error adding mercuryOrbitalValues: ", error)
                                            }); */
                    break;
                case "venus":
                    let venusDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("venus");
                    this.getOrbitValues(venusDoc, "venus");
                    /*    let fbVenusOrbit = [];
                       for (let i = 0; i < 226; i++) {
                           planetPositions.orderedCalculations(planet, tempDate);
                           this.venusCenter = planetPositions.calculatePlanetCoordinates();
                           //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                           let venusCenterObj = { x: this.venusCenter[0], y: this.venusCenter[1], julianEphemerisDate: tempDate };
                           fbVenusOrbit.push(venusCenterObj);
                           tempDate++;
                           console.log(tempDate);
                       }
                       fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("venus").set({ orbitalValues: fbVenusOrbit })
                           .then(() => {
                               console.log("Successfully added venusOrbitalValues!");
                           })
                           .catch((error) => {
                               console.error("Error adding venusOrbitalValues: ", error)
                           });  */
                    break;
                case "earth":
                    let earthDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("earth");
                    this.getOrbitValues(earthDoc, "earth");
                    /*                     let fbEarthOrbit = [];
                                        for (let i = 0; i < 367; i++) {
                                            planetPositions.orderedCalculations(planet, tempDate);
                                            this.earthCenter = planetPositions.calculatePlanetCoordinates();
                                            //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                            let earthCenterObj = { x: this.earthCenter[0], y: this.earthCenter[1], julianEphemerisDate: tempDate };
                                            fbEarthOrbit.push(earthCenterObj);
                                            tempDate++;
                                            console.log(tempDate);
                                        }
                                        fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("earth").set({ orbitalValues: fbEarthOrbit })
                                            .then(() => {
                                                console.log("Successfully added earthOrbitalValues!");
                                            })
                                            .catch((error) => {
                                                console.error("Error adding earthOrbitalValues: ", error)
                                            }); */
                    break;
                case "mars":
                    let marsDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("mars");
                    this.getOrbitValues(marsDoc, "mars");
                    /*                     let fbMarsOrbit = [];
                                        for (let i = 0; i < 688; i++) {
                                            planetPositions.orderedCalculations(planet, tempDate);
                                            this.marsCenter = planetPositions.calculatePlanetCoordinates();
                                            //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                            let marsCenterObj = { x: this.marsCenter[0], y: this.marsCenter[1], julianEphemerisDate: tempDate };
                                            fbMarsOrbit.push(marsCenterObj);
                                            tempDate++;
                                            console.log(tempDate);
                                        }
                                        fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("mars").set({ orbitalValues: fbMarsOrbit })
                                            .then(() => {
                                                console.log("Successfully added marsOrbitalValues!");
                                            })
                                            .catch((error) => {
                                                console.error("Error adding marsOrbitalValues: ", error)
                                            }); */
                    break;
                case "jupiter":
                    let jupiterDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("jupiter");
                    this.getOrbitValues(jupiterDoc, "jupiter");
                    /*                    let fbJupiterOrbit = [];
                                       for (let i = 0; i < 4333; i++) {
                                           planetPositions.orderedCalculations(planet, tempDate);
                                           this.jupiterCenter = planetPositions.calculatePlanetCoordinates();
                                           //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                           let jupiterCenterObj = { x: this.jupiterCenter[0], y: this.jupiterCenter[1], julianEphemerisDate: tempDate };
                                           fbJupiterOrbit.push(jupiterCenterObj);
                                           tempDate++;
                                           console.log(tempDate);
                                       }
                                       fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("jupiter").set({ orbitalValues: fbJupiterOrbit })
                                           .then(() => {
                                               console.log("Successfully added jupiterOrbitalValues!");
                                           })
                                           .catch((error) => {
                                               console.error("Error adding jupiterOrbitalValues: ", error)
                                           }); */
                    break;
                case "saturn":
                    let saturnDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("saturn");
                    this.getOrbitValues(saturnDoc, "saturn");
                    /*                     let fbSaturnOrbit = [];
                                        for (let i = 0; i < 5377; i++) {
                                            planetPositions.orderedCalculations(planet, tempDate);
                                            this.saturnCenter = planetPositions.calculatePlanetCoordinates();
                                            //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                            let saturnCenterObj = { x: this.saturnCenter[0], y: this.saturnCenter[1], julianEphemerisDate: tempDate };
                                            fbSaturnOrbit.push(saturnCenterObj);
                                            tempDate = tempDate + 2;
                                            console.log(tempDate);
                                        }
                                        fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("saturn").set({ orbitalValues: fbSaturnOrbit })
                                            .then(() => {
                                                console.log("Successfully added saturnOrbitalValues!");
                                            })
                                            .catch((error) => {
                                                console.error("Error adding saturnOrbitalValues: ", error)
                                            });
                                        //planetYearLength = 10753; */
                    break;
                case "uranus":
                    let uranusDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("uranus");
                    this.getOrbitValues(uranusDoc, "uranus");
                    /*                     let fbUranusOrbit = [];
                                        for (let i = 0; i < 4382; i++) {
                                            planetPositions.orderedCalculations(planet, tempDate);
                                            this.uranusCenter = planetPositions.calculatePlanetCoordinates();
                                            //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                            let uranusCenterObj = { x: this.uranusCenter[0], y: this.uranusCenter[1], julianEphemerisDate: tempDate };
                                            fbUranusOrbit.push(uranusCenterObj);
                                            tempDate = tempDate + 7;
                                            console.log(tempDate);
                                        }
                                        fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("uranus").set({ orbitalValues: fbUranusOrbit })
                                            .then(() => {
                                                console.log("Successfully added uranusOrbitalValues!");
                                            })
                                            .catch((error) => {
                                                console.error("Error adding uranusOrbitalValues: ", error)
                                            });
                                        //planetYearLength = 30664; */
                    break;
                case "neptune":
                    let neptuneDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("neptune");
                    this.getOrbitValues(neptuneDoc, "neptune");
                    /*                     let fbNeptuneOrbit = [];
                                        for (let i = 0; i < 4298; i++) {
                                            planetPositions.orderedCalculations(planet, tempDate);
                                            this.neptuneCenter = planetPositions.calculatePlanetCoordinates();
                                            //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                            let neptuneCenterObj = { x: this.neptuneCenter[0], y: this.neptuneCenter[1], julianEphemerisDate: tempDate };
                                            fbNeptuneOrbit.push(neptuneCenterObj);
                                            tempDate = tempDate + 14;
                                            console.log(tempDate);
                                        }
                                        fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("neptune").set({ orbitalValues: fbNeptuneOrbit })
                                            .then(() => {
                                                console.log("Successfully added neptuneOrbitalValues!");
                                            })
                                            .catch((error) => {
                                                console.error("Error adding neptuneOrbitalValues: ", error)
                                            });
                                        //planetYearLength = 60148; */
                    break;
                case "pluto":
                    let plutoDoc = fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("pluto");
                    this.getOrbitValues(plutoDoc, "pluto");
                    /*                     let fbPlutoOrbit = [];
                                        for (let i = 0; i < 6482; i++) {
                                            planetPositions.orderedCalculations(planet, tempDate);
                                            this.plutoCenter = planetPositions.calculatePlanetCoordinates();
                                            //We need to have array form for the circle positions, but eventually to push into firebase, we need instead an object
                                            let plutoCenterObj = { x: this.plutoCenter[0], y: this.plutoCenter[1], julianEphemerisDate: tempDate };
                                            fbPlutoOrbit.push(plutoCenterObj);
                                            tempDate = tempDate + 14;
                                            console.log(tempDate);
                                        }
                                        fb.collection("solarSystemMap").doc("solarSystem").collection("planets").doc("pluto").set({ orbitalValues: fbPlutoOrbit })
                                            .then(() => {
                                                console.log("Successfully added plutoOrbitalValues!");
                                            })
                                            .catch((error) => {
                                                console.error("Error adding plutoOrbitalValues: ", error)
                                            });
                                        //planetYearLength = 90735; */
                    break;
                default:
                    break;
            }
        });
    }
    /*     componentWillUnmount() {
            this.setState({ state: this.state });
        } */
    calculateCurrentJulianTime() {
        console.log('Incrementing Current Julian Time!');
        this.setState((state, props) => ({ julianEphemerisDate: state.julianEphemerisDate + props.increment }));
        console.log(this.state.julianEphemerisDate);
    }
    getOrbitValues(planetDoc, planet) {
        console.log("getOrbitValues");
        let docOrbitValues = null;
        planetDoc.get().then((doc) => {
            docOrbitValues = doc.data().orbitalValues;
            let tempArray = [];
            for (var i = 0; i < docOrbitValues.length; i++) {
                let pair = [];
                pair.push(docOrbitValues[i].x);
                pair.push(docOrbitValues[i].y);
                tempArray.push(pair);
            }
            switch (planet) {
                case "mercury":
                    this.setState({ mercuryOrbit: tempArray });
                    break;
                case "venus":
                    this.setState({ venusOrbit: tempArray });
                    break;
                case "earth":
                    this.setState({ earthOrbit: tempArray });
                    break;
                case "mars":
                    this.setState({ marsOrbit: tempArray });
                    break;
                case "saturn":
                    this.setState({ saturnOrbit: tempArray });
                    break;
                case "jupiter":
                    this.setState({ jupiterOrbit: tempArray });
                    break;
                case "neptune":
                    this.setState({ neptuneOrbit: tempArray });
                    break;
                case "uranus":
                    this.setState({ uranusOrbit: tempArray });
                    break;
                case "pluto":
                    this.setState({ plutoOrbit: tempArray });
                    break;
                default:
                    break;
            }
        })
            .catch(error => {
                console.log("Error getting document: ", error);
            });
    }
    render() {
        console.log("render");
        //Eventually try to make CSS classes for these so we don't have repeating style values
        return (<Map id="solarSystemMapID" zoom="5" center={[0, 0]} >
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
            <Polyline positions={this.state.mercuryOrbit} color="blue" weight="1" />
            <Polyline positions={this.state.venusOrbit} color="blue" weight="1" />
            <Polyline positions={this.state.marsOrbit} color="blue" weight="1" />
            <Polyline positions={this.state.earthOrbit} color="blue" weight="1" />
            <Polyline positions={this.state.jupiterOrbit} color="blue" weight="1" />
            <Polyline positions={this.state.saturnOrbit} color="blue" weight="1" />
            <Polyline positions={this.state.uranusOrbit} color="blue" weight="1" />
            <Polyline positions={this.state.neptuneOrbit} color="blue" weight="1" />
            <Polyline positions={this.state.plutoOrbit} color="blue" weight="1" smoothFactor="0.1" />
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