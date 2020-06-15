/*  CSS & SCSS */
import '../config/config';

import * as THREE from 'three';

// =================================
//  Projecto webpack & RxJs
// =================================
const sceneHtmlElement = document.querySelector('#cajonScene');


class CajonScene {

    renderer: THREE.WebGLRenderer;
    camera  : THREE.PerspectiveCamera;
    scene   : THREE.Scene;

    constructor( private sceneHtmlElement: Element, private renderWith: number, private rederHeight: number ){
        this.sceneHtmlElement = sceneHtmlElement;
        this.init();
    }

    // =================================
    // Setup
    // =================================
    init(): void {
        this.initRenderer();
        this.setScene();
        this.setCamera(100, window.innerWidth / window.innerHeight, .1, 50);
        this.showScene();
        this.renderer.render(this.scene, this.camera);
    }

    private initRenderer(): void {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.renderWith, this.rederHeight);
        this.sceneHtmlElement.appendChild( this.renderer.domElement );
    }

    private setCamera( fov: number, aspect: number, near: number, far: number ) {
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    }

    private setScene() : void {
        this.scene = new THREE.Scene();
    }

    // =================================
    // Modifications
    // =================================
    private setCameraPosition( axis: 'x' | 'y' | 'z', position: number ): void {
        switch (axis) {
            case 'x':
                this.camera.position.x = position
                break;
            case 'y':
                this.camera.position.y = position
                break;
            default:
                this.camera.position.z = position
                break;
        }
    }

    // =================================
    // Objects
    // =================================
    private createCube( boxWidth: number, boxHeight: number, boxDepth: number, materialParams?: object ): THREE.Mesh { //{color: 0x44aa88}
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        const material = new THREE.MeshBasicMaterial(materialParams);
        return new THREE.Mesh(geometry, material);
    }

    // =================================
    // Scenes
    // =================================
    private showScene(): void {
        this.showCubeScene();
    }

    private showCubeScene(): void {
        this.setCameraPosition('z', 1);
        this.setCameraPosition('x', 1);
        const testCube = this.createCube(1, 1, 1, {color: 0x44aa88})
        this.scene.add(testCube);
    }
}

new CajonScene( sceneHtmlElement, window.innerWidth , window.innerHeight );



