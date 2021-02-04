import React, { Component } from 'react';
import './CSS/solarSystemMap.css';
import { planetPositions } from './calcPlanetPos';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
//import { Mesh, SphereBufferGeometry } from 'three';
//import { Canvas } from 'react-three-fiber';

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
        //get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        window.addEventListener("resize", this.handleWindowResize);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.0000001, // near plane
            10000 // far plane
        );
        this.camera.position.z = 9;
        this.camera.zoom = 0.25;
    
        //Set 3D Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement); // mount using React ref

        //Set 2D Renderer
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.domElement.className = 'twoDRenderer';
        this.labelRenderer.setSize(width, height);
        this.mount.appendChild(this.labelRenderer.domElement);

        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
        this.controls.zoomSpeed = 2;
    };
    addCustomSceneObjects = () => {
        //Build the sun
        let geometry = new THREE.SphereBufferGeometry(0.009304945274, 32, 32);
        geometry.translate(0, 0, 0);
        let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        let sphere = new THREE.Mesh(geometry, sphereMaterial);
        this.scene.add(sphere);

        //Call render function for each planet
        let index = 0;
        this.planets.forEach(planet => {
            //this.renderOrbitAndPlanet(planet.name, planet.orbit, planet.planetCenter, planet.yearLength, index);
            let tempPlanetCenter = this.renderOrbitPath(planet.name, planet.orbit, planet.planetCenter, planet.yearLength, index);
            this.renderPlanet(planet.name, tempPlanetCenter);
            index++;
        });
    };
    startAnimationLoop = () => {
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };
    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize(width, height);
        this.labelRenderer.setSize(width, height);
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    };
    renderOrbitPath(planetName, orbitPath, planetCenter, yearLength, planetIndex) {
        //Gather the planet's orbit coordinates
        let tempDate = this.state.julianEphemerisDate;
        let tempPlanetCenter = null;
        let orbitMaterial = null;
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
        //Call calculation functions to determine planet orbit position on each day
        for (let i = 0; i < yearLength; i++) {
            planetPositions.trueKeplerianValues(planetIndex, tempDate);
            planetPositions.calculateMeanAnomaly();
            planetPositions.calculateEccentricAnomaly();
            planetCenter = planetPositions.calculatePlanetCoordinates(planetName);
            orbitPath.push(new THREE.Vector3(planetCenter[0], planetCenter[1], planetCenter[2]));
            if (i === 0) {
                tempPlanetCenter = planetCenter;
            }
            tempDate++;
        }

        //Render the orbit
        let orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPath);
        //Add orbit
        let planetLine = new THREE.Line(orbitGeometry, orbitMaterial);
        this.scene.add(planetLine);
        return tempPlanetCenter;
    };
    renderPlanet(planetName, planetCenter) {
        //Planet Diameters
        //Sun -- 1,392,000 km -- 0.009304945274
        //Mercury -- 4879 km -- 3.26141e-5
        //Venus -- 12,104 km -- 8.0910243e-5
        //Earth -- 12,742 km -- 8.5175009e-5
        //Mars -- 6779 km -- 4.53148e-5
        //Jupiter -- 139,822 km -- 0.0009346523406
        //Saturn -- 116,464 km -- 0.0007785137546
        //Uranus -- 50,724 km -- 0.000339068997
        //Neptune -- 49,244 km -- 0.000329175808
        //Pluto -- 2376 km -- 1.58826e-5
        const div = document.createElement("div");
        let planetGeometry = null;
        //Depending on which planet, set our orbit color, sphere planet size, and planet label
        switch (planetName) {
            case "mercury":
                planetGeometry = new THREE.SphereBufferGeometry(.0000326141, 32, 32);
                div.textContent = "Mercury";
                break;
            case "venus":
                planetGeometry = new THREE.SphereBufferGeometry(8.0910243e-5, 32, 32);
                div.textContent = "Venus";
                break;
            case "mars":
                planetGeometry = new THREE.SphereBufferGeometry(4.53148e-5, 32, 32);
                div.textContent = "Mars";
                break;
            case "earth":
                planetGeometry = new THREE.SphereBufferGeometry(8.5175009e-5, 32, 32);
                div.textContent = "Earth";
                break;
            case "jupiter":
                planetGeometry = new THREE.SphereBufferGeometry(0.0009346523406, 32, 32);
                div.textContent = "Jupiter";
                break;
            case "saturn":
                planetGeometry = new THREE.SphereBufferGeometry(0.0007785137546, 32, 32);
                div.textContent = "Saturn";
                break;
            case "uranus":
                planetGeometry = new THREE.SphereBufferGeometry(0.000339068997, 32, 32);
                div.textContent = "Uranus";
                break;
            case "neptune":
                planetGeometry = new THREE.SphereBufferGeometry(0.000329175808, 32, 32);
                div.textContent = "Neptune";
                break;
            case "pluto":
                planetGeometry = new THREE.SphereBufferGeometry(1.58826e-5, 32, 32);
                div.textContent = "Pluto";
                break;
            default:
                break;
        }
        div.className = 'planetLabel';
        div.style.marginTop = '-1em';
        const planetLabel = new CSS2DObject(div);
        planetLabel.position.set(planetCenter[0], planetCenter[1], planetCenter[2]);

        //Render the planet
        planetGeometry.translate(planetCenter[0], planetCenter[1], planetCenter[2]);
        let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        let sphere = new THREE.Mesh(planetGeometry, sphereMaterial);
        sphere.add(planetLabel);
        this.scene.add(sphere);
    };

    render() {
        console.log("render");
        return <div className="solarSystemMap" ref={(ref) => (this.mount = ref)} />
    }
}

export default solarSystemMap;