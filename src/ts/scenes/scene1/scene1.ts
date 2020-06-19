import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import gsap from "gsap";

import { BaseScene } from '../../interfaces/masterScene';


class ExampleScene implements BaseScene {

    renderer      : THREE.WebGLRenderer;
    camera        : THREE.PerspectiveCamera;
    scene         : THREE.Scene;
    cameraControls: OrbitControls;

    constructor( private sceneHtmlElement: Element, 
                 private renderWith: number, 
                 private rederHeight: number 
    ){
        this.sceneHtmlElement = sceneHtmlElement;
    }


}

const sceneHtmlElement = document.querySelector('#cajonScene');
const exampleScene     = new ExampleScene( sceneHtmlElement, window.innerWidth , window.innerHeight );