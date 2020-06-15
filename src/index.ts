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
    lights  : THREE.Light[] = [];

    constructor( private sceneHtmlElement: Element, private renderWith: number, private rederHeight: number ){
        this.sceneHtmlElement = sceneHtmlElement;
        this.init();
        this.handleResponsive();
    }

    // =================================
    // Setup
    // =================================
    init(): void {
        this.initRenderer();
        this.initScene();
        this.setCamera(100, window.innerWidth / window.innerHeight, .1, 50);
        this.setLights();
        this.showScene();
        this.renderer.render(this.scene, this.camera);
    }

    private initRenderer(): void {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.renderWith, this.rederHeight);
        this.sceneHtmlElement.appendChild( this.renderer.domElement );
    }

    private initScene() : void {
        this.scene = new THREE.Scene();
    }

    private setCamera( fov: number, aspect: number, near: number, far: number ): void {
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    }

    private setLights(): void {
        this.lights[0] = new THREE.PointLight( 0xffffff, 1, 100);
        this.lights[0].position.set( 2, 1, 4 );
        this.scene.add( this.lights[0] );
    }

    private handleResponsive(): void {
        window.addEventListener('resize', () => this.fixViewPoint());
    }

    private fixViewPoint(): void {
        this.renderer.setSize(window.innerWidth , window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
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
        const material = new THREE.MeshLambertMaterial(materialParams);
        return new THREE.Mesh(geometry, material);
    }

    private createSphere( radius?: number, widthSegments?: number, heightSegments?: number, materialParams?: object ): THREE.Mesh { //{color: 0x44aa88}
        const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        const material = new THREE.MeshLambertMaterial(materialParams);
        return new THREE.Mesh(geometry, material);
    }

    // =================================
    // Scenes
    // =================================
    private showScene(): void {
        this.showCubeScene();
    }

    private showCubeScene(): void {
        const testCube = this.createCube(1.2, 1.8, 1, {color: 0x44aa88})
        // const testSphere = this.createSphere(1, 12, 12, {color: 0x22aaff})
        
        
        this.setCameraPosition('z', 6);
        this.setCameraPosition('x', 0);
        testCube.position.z = 2;
        this.scene.add(testCube);
    }
}

new CajonScene( sceneHtmlElement, window.innerWidth , window.innerHeight );



