import React, { Component } from 'react';
import { throttle } from 'lodash';
import '../CSS/solarSystemMap.css';
import { sceneObjects } from '../sceneObjects';
import SatelliteInfo from './satelliteInfo';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

class SolarSystemMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: (Date.now()) / 86400000,
            julianEphemerisDate: (Date.now() / 86400000) + 2440587,
            distance: null
        };
        this.julian1970Date = 2440587;

        this.objectNames = ["Sun", "Mercury", "Venus", "Mars", "Earth", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

        this.sphereObjects = [];
        
        this.handleZoom = this.handleZoom.bind(this);

        //this.dwarfPlanets= [];

        //this.moons = [];

        //this.comets = [];
    };

    componentDidMount() {
        this.cameraSetup();
        this.sceneSetup();
        this.addSceneObjects();
        this.zoomToObject(this.planetSphereObjects);
        this.startAnimationLoop();
        window.addEventListener("resize", throttle(this.handleWindowResize, 350));
        //window.addEventListener("wheel", throttle(this.handleZoom, 350));
    };

    cameraSetup = () => {
        let aspectRatio = this.mount.clientWidth / this.mount.clientHeight;

        //We need to have small fov values because of the scales we are working with
        // -- otherwise our image will be stretch if resized
        //Also, very small fov allows us to zoom into very small areas
        this.camera = new THREE.PerspectiveCamera(
            0.25, // fov = field of view
            aspectRatio, // aspect ratio
            0.01, // near plane
            10000000 // far plane
        );

        //Set initial camera positions
        this.camera.position.z = 1000;
        this.camera.zoomSpeed = 1;

        //Set distance to related zoom level
        this.setState({distance: this.camera.zoom});
    };

    sceneSetup = () => {
        //Initialize
        this.scene = new THREE.Scene();

        //Set 3D Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true });
        this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
        this.mount.appendChild(this.renderer.domElement); // mount using React ref

        //Set 2D Renderer for satellite labels
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.domElement.className = 'twoDRenderer';
        this.labelRenderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
        this.mount.appendChild(this.labelRenderer.domElement);
        
        // OrbitControls allow a camera to orbit around the object -- https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);

        //Check zoom level to update distance meter, update rotate speed based on zoom
        this.controls.addEventListener("change", throttle(this.handleZoom, 350));
        this.controls.zoomSpeed = 2;
    };

    addSceneObjects = async () => {
        //Build the planets, the sun, and their corresponding orbits
        this.objectNames.forEach(async object => {
            if (object !== "Sun") {
                let planetOrbitObject = sceneObjects.buildOrbitObject(object, this.state.julianEphemerisDate);
                this.scene.add(planetOrbitObject);
            }
            //We need to await the asynchronous return value that loads in the texture
            let sphereObject = await sceneObjects.buildSphereObject(object);
            this.sphereObjects.push(sphereObject);
            this.scene.add(sphereObject);
        });

    };

    zoomToObject(sphereObjects) {
        let satelliteLabel = document.getElementsByClassName("satelliteLabel");

        //We have to listen to DOMContentLoaded otherwise our other code will run before our HTML Collection has loaded -- i.e. it is asynchronous
        document.addEventListener("DOMContentLoaded", () => {
            //Attach event listener to each label and apply appropriate camera positions -- NOTE -- We cannot use forEach in an HTMLCollection    
            for (let i = 0; i < satelliteLabel.length; i++) {
                satelliteLabel[i].addEventListener("click", () => {
                    //Reset camera position to appropriate object
                    this.camera.position.x = sphereObjects[i].geometry.boundingSphere.center.x;
                    this.camera.position.y = sphereObjects[i].geometry.boundingSphere.center.y;
                    this.camera.position.z = sphereObjects[i].geometry.boundingSphere.center.z + 10;

                    //Must be called everytime the camera object is updated
                    this.camera.updateProjectionMatrix();
                });  
            }
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

    //If browser window size is changed, we need to change our camera and scene settings to fit accordingly
    handleWindowResize = () => {
        //Update camera aspect ratio
        this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight; 

        //Must be called everytime the camera object is updated
        this.camera.updateProjectionMatrix();

        //Update 2D & 3D Renderers
        this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
        this.labelRenderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    };

    //Change rotational speed based on what object we are looking at and how close we are to it
    handleZoom = () => {
        //console.log("handleZoom()");
        //console.log("rotateSpeed: " + this.controls.rotateSpeed);
        //this.setState({distance: this.camera.position.z});
        //this.controls.rotateSpeed = something;
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        this.controls.removeEventListener("change", this.handleZoom);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    };

    render() {
        return <div className="solarSystemMap" ref={(ref) => (this.mount = ref)}>
                <SatelliteInfo distance={this.state.distance}/>
            </div>
    }
}

export default SolarSystemMap;