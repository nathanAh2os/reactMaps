import React, { Component } from "react";
import './CSS/solarSystemMap.css';
import { planetPositions } from './calcPlanetPos';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class solarSystemMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: (Date.now()) / 86400000,
            julianEphemerisDate: (Date.now() / 86400000) + 2440587,
            loading: false
        };
        this.julian1970Date = 2440587;

        this.planets = [{ name: "mercury", orbit: [], yearLength: 89, planetCenter: null },
        { name: "venus", orbit: [], yearLength: 226, planetCenter: null },
        { name: "mars", orbit: [], yearLength: 688, planetCenter: null },
        { name: "earth", orbit: [], yearLength: 366, planetCenter: null },
        { name: "jupiter", orbit: [], yearLength: 4334, planetCenter: null },
        { name: "saturn", orbit: [], yearLength: 10757, planetCenter: null },
        { name: "uranus", orbit: [], yearLength: 30689, planetCenter: null },
        { name: "neptune", orbit: [], yearLength: 60193, planetCenter: null },
        { name: "pluto", orbit: [], yearLength: 90556, planetCenter: null }];

        //Each planet's year's length in Earth days + 1
        /*         this.mercuryYear = 89; 87.97
                this.venusYear = 226; 224.70
                this.marsYear = 688; 686.99
                this.earthYear = 366; 365.26
                this.jupiterYear = 4334; 4332.94
                this.saturnYear = 10757; 10,755.99
                this.uranusYear = 30689; 30,687.99
                this.neptuneYear = 60193; 60191.68
                this.plutoYear = 90556; 90,555.50 */

    }
    componentDidMount() {
        console.log('componentDidMount()');
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener("resize", this.handleWindowResize);
    }
    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls(this.camera, this.mount);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement); // mount using React ref
    };
    addCustomSceneObjects = () => {
        //Build the sun
        let geometry = new THREE.SphereBufferGeometry(0.009304945274, 32, 32);
        geometry.translate(0, 0, 0);
        let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        let sphere = new THREE.Mesh(geometry, sphereMaterial);
        this.scene.add(sphere);

        //Render planets and orbit
        let index = 0;
        this.planets.forEach(planet => {
            this.renderOrbitAndPlanet(planet.name, planet.orbit, planet.planetCenter, planet.yearLength, index);
            index++;
        });
    };
    startAnimationLoop = () => {
        this.renderer.render(this.scene, this.camera);

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    };
    renderOrbitAndPlanet(planetName, orbitPath, planetCenter, yearLength, planetIndex) {
        //Gather the planet's orbit coordinates
        let tempDate = this.state.julianEphemerisDate;
        let orbitMaterial = null;
        for (let i = 0; i < yearLength; i++) {
            planetPositions.trueKeplerianValues(planetIndex, tempDate);
            planetPositions.calculateMeanAnomaly();
            planetPositions.calculateEccentricAnomaly();
            planetCenter = planetPositions.calculatePlanetCoordinates(planetName);
            orbitPath.push(new THREE.Vector3(planetCenter[0], planetCenter[1], planetCenter[2]));
            tempDate++;
        }

        //Render the orbit
        let orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPath);
        switch (planetName) {
            case "mercury":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#722018" });
                break;
            case "venus":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#d23a2d" });
                break;
            case "mars":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#d2932d" });
                break;
            case "earth":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#2d35d2" });
                break;
            case "jupiter":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#ff0a0a" });
                break;
            case "saturn":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#008002" });
                break;
            case "uranus":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#800068" });
                break;
            case "neptune":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#5786ff" });
                break;
            case "pluto":
                orbitMaterial = new THREE.LineBasicMaterial({ color: "#1e9991" });
                break;
            default:
                break;
        }
        //let orbitMaterial = new THREE.LineBasicMaterial({ color: "#123455" });
        let planetLine = new THREE.Line(orbitGeometry, orbitMaterial);
        this.scene.add(planetLine);

        //Render the planet
        let planetGeometry = new THREE.SphereBufferGeometry(0.01, 32, 32);
        planetGeometry.translate(planetCenter[0], planetCenter[1], planetCenter[2]);
        let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        let sphere = new THREE.Mesh(planetGeometry, sphereMaterial);
        this.scene.add(sphere);
    }
    render() {
        console.log("render");
        return <div className="solarSystemMap" ref={(ref) => (this.mount = ref)} />;
    }
}

export default solarSystemMap;