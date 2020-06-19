import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from "gsap";

import { BaseScene } from '../../interfaces/masterScene';


class CustomScene implements BaseScene {

    renderer      : THREE.WebGLRenderer;
    camera        : THREE.PerspectiveCamera;
    scene         : THREE.Scene;
    cameraControls: OrbitControls;

    constructor( private sceneHtmlElement: HTMLElement, 
                 private renderWith: number, 
                 private rederHeight: number 
    ){
        this.init();
    }

    init() {
        this.setScene();
        this.showDevTools();
        this.setCamera();
        this.setControls();
        this.setRenderer();
        this.showScene();
        this.handleResponsive();
        this.startAnimation();
    }

    // =================================
    // Dev
    // =================================
    showDevTools() {
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }

    // =================================
    // Config & setters
    // =================================
    setScene() {
        this.scene = new THREE.Scene();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.renderWith, this.rederHeight );
        this.sceneHtmlElement.appendChild( this.renderer.domElement )
    }

    setCamera() {
        this.camera = new THREE.PerspectiveCamera(75, this.renderWith / this.rederHeight, .1, 20);
        this.camera.position.z = 3;
        this.scene.add( this.camera );
    }

    setControls() {
        this.cameraControls = new OrbitControls( this.camera, this.sceneHtmlElement);
    }

    startAnimation() {
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.startAnimation.bind(this) );
    }

    handleResponsive() {
        window.addEventListener('resize',() => {
            this.camera.aspect = this.sceneHtmlElement.offsetWidth / this.sceneHtmlElement.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.sceneHtmlElement.offsetWidth , this.sceneHtmlElement.offsetHeight)
        });
    }

    // =================================
    // Scene objects
    // =================================
    showScene() {
        const cubeGeometry = new THREE.BoxGeometry();
        const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
        this.scene.add( cube );
    }

}

const sceneHtmlElement = <HTMLElement>document.querySelector('#customScene');
const customScene      = new CustomScene( sceneHtmlElement, sceneHtmlElement.offsetWidth , sceneHtmlElement.offsetHeight );
