/*  CSS & SCSS */
import '../config/config';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import gsap from "gsap";
import { Vector2, BackSide } from 'three';

// =================================
// Assets
// =================================
const redeclipseBk =  require('../assets/img/skybox/redeclipse_bk.png')
const redeclipseDn =  require('../assets/img/skybox/redeclipse_dn.png')
const redeclipseFt =  require('../assets/img/skybox/redeclipse_ft.png')
const redeclipseLf =  require('../assets/img/skybox/redeclipse_lf.png')
const redeclipseRt =  require('../assets/img/skybox/redeclipse_rt.png')
const redeclipseUp =  require('../assets/img/skybox/redeclipse_up.png')
const ionModel     =  require('../assets/3d/cajon.gltf')

// =================================
//  Projecto webpack & RxJs
// =================================
const sceneHtmlElement = document.querySelector('#cajonScene');


class CajonScene {

    renderer: THREE.WebGLRenderer;
    camera  : THREE.PerspectiveCamera;
    scene   : THREE.Scene;
    lights  : THREE.Light[] = [];
    sceneElements: THREE.Mesh[] | any = [];
    cameraControls: OrbitControls;
    lightHolder: THREE.Group;

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
        this.initCameraControls();
        this.setLights();
        this.showScene();
        this.runRenderer();
    }

    private initRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(this.renderWith, this.rederHeight);
        this.sceneHtmlElement.appendChild( this.renderer.domElement );
    }

    private runRenderer(): void {
        this.lightHolder.quaternion.copy(this.camera.quaternion);
        this.cameraControls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame( () => this.runRenderer() );
    }

    private initScene() : void {
        this.scene = new THREE.Scene();
    }

    private initCameraControls(): void {
        this.cameraControls = new OrbitControls( this.camera, this.renderer.domElement );
        this.cameraControls.maxDistance = 9;
        this.cameraControls.minDistance = 4;
        this.cameraControls.enableDamping = true;
        this.cameraControls.dampingFactor = 0.03;
    }

    private setCamera( fov: number, aspect: number, near: number, far: number ): void {
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    }

    private setLights(): void {
        this.lightHolder = new THREE.Group();

        this.lights[0]   = new THREE.PointLight( 0xffffff, 1, 500);
        this.lights[0].position.set( -2, 1, 5 );
        
        this.lights[1]   = new THREE.PointLight( 0xffffff, .65, 500);
        this.lights[1].position.set( 2, 2, 2 );

        this.lightHolder.add( this.lights[0] );
        this.lightHolder.add( this.lights[1] );

        this.scene.add(this.lightHolder);
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

    private setAnimation() {

        console.log(this.sceneElements[0])
        const tl = gsap.timeline({ delay: .3 });
        tl.to(this.sceneElements[0].rotation, 1, {z: .3}) 
        tl.to(this.sceneElements[0].rotation, 1, {x: 1.2}, '<') 
        tl.to(this.sceneElements[0].rotation, 1, {y: .3}, '<') 
        tl.to(this.sceneElements[0].scale, 1, { y: 2}) 
        tl.to(this.sceneElements[0].scale, 1, { x: 2 }, '<') 
        tl.to(this.sceneElements[0].scale, 1, { z: 2.8 }, '<') 
        tl.to(this.camera.position, 1, { x: 2 }, '<') 
        tl.to(this.camera.position, 1, { y: 3 }, '<') 
        tl.to(this.cameraControls.target, 1, { x: -1 }, '<') 

        this.cameraControls.update();
        
        // tl.to(this.sceneElements[0].scale, 1, { x: 1 }) 
        // tl.to(this.sceneElements[0].scale, 1, { y: 1}, '<') 
        // tl.to(this.sceneElements[0].rotation, 1, {y: -.7}) 
        // tl.to(this.sceneElements[0].scale, 1, { z: 1 }) 
        // tl.to(this.camera.position, 1, { x: -1 }, '<') 
        // tl.to(this.cameraControls.target, 1, { x: -1 }, '<') 

        // tl.to(this.sceneElements[0].rotation, 1, {y: -.5, x: .1}) 
        // tl.to(this.sceneElements[0].scale, 1, { x: 1 }) 
        // tl.to(this.sceneElements[0].scale, 1, { y: 1,}, '<') 
        // tl.to(this.sceneElements[0].scale, 1, { z: 1.1 }) 
        // }
    }

    // =================================
    // Objects
    // =================================
    private createCube( boxWidth: number, boxHeight: number, boxDepth: number, materialParams?: object, material?: THREE.Material | THREE.Material[] ): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        if( !material )
            material = new THREE.MeshLambertMaterial(materialParams);
            
        return new THREE.Mesh(geometry, material);
    }

    private createSphere( radius?: number, widthSegments?: number, heightSegments?: number, materialParams?: object ): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        const material = new THREE.MeshLambertMaterial(materialParams);
        return new THREE.Mesh(geometry, material);
    }

    // =================================
    // Events
    // =================================
    private createEvents() {
        window.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            const rayCaster = new THREE.Raycaster();
            const mouse     = new Vector2( ( e.clientX / window.innerWidth ) * 2 -1, ( e.clientY / window.innerHeight ) * 2 -1  );
            rayCaster.setFromCamera( mouse, this.camera );

            const intesects = rayCaster.intersectObjects( this.scene.children, true);
            intesects.forEach( ( inters: THREE.Intersection ) => {
                console.log(inters)
                switch (inters.object.name) {
                    case 'ion':
                        this.playCajonEvents( inters );
                        break;
                
                    default:
                        this.playCajonEvents( inters );
                        break;
                }
            })
        });
    }

    private playCajonEvents( inters: THREE.Intersection ) {
        const tapAudio = new Audio('./assets/audio/1.mp3')
        const topAudio = new Audio('./assets/audio/2.mp3')

        if( inters.face.normal.x > 0)
            console.log('toca al lado', inters.point)
        else if( inters.face.normal.z == -1) {
            console.log('toca delante arriba', inters.point)
            tapAudio.play();
        }
        else if( inters.face.normal.z == -1) {
            console.log('toca delante abajo', inters.point)
            topAudio.play();
        }
    }

    // =================================
    // Scenes
    // =================================
    private showScene(): void {
        // this.showCubeScene();
        this.showIon();
        this.cubeableWorld();
        // this.starsWorld();
    }

    private showCubeScene(): void {
        const cajonCube = this.createCube(1.2, 2, 1.5, {color: 0xeabf8a})
        this.sceneElements.push(cajonCube);
        
        // this.setCameraPosition('z', 2.5);
        // this.setCameraPosition('x', 0);

        cajonCube.scale.set(.1,.1,.1);
        cajonCube.position.set(0, 0, 0);
        cajonCube.rotation.set(0, -Math.PI * .5, 0);
        cajonCube.name = 'cajon';
        this.scene.background = new THREE.Color( 0x24282b );
        this.scene.add(cajonCube);

    }

    private showIon() {
        const loader = new GLTFLoader().load(ionModel.default, (gltf) => {
            const gltfMesh = gltf.scene.children[3];
            gltfMesh.rotation.set(0,0,  -Math.PI * .5);
            gltfMesh.scale.set(.1,.1,.1);
            gltfMesh.name = 'ion';
            this.sceneElements.push(gltfMesh);
            this.scene.add( gltf.scene );
            this.setCameraPosition('z', 6);
            this.setCameraPosition('x', 0);
            this.setAnimation();
            // this.createEvents();
        });
        
    }

    private cubeableWorld() {
        
        const materialArray: THREE.Material[] = [];

        // const textureLoads  = [
        //     './assets/img/skybox/posx.jpg', // derecha
        //     './assets/img/skybox/negx.jpg', // izquierda
        //     './assets/img/skybox/posy.jpg', // arriba
        //     './assets/img/skybox/negy.jpg', // abajo
        //     './assets/img/skybox/posz.jpg', // atras
        //     './assets/img/skybox/negz.jpg'  // frente
        // ];

        const textureLoads  = [
            redeclipseFt.default,
            redeclipseBk.default,
            redeclipseUp.default,
            redeclipseDn.default,
            redeclipseRt.default,
            redeclipseLf.default
        ];
        




        textureLoads.forEach( texturePath => {
            const texture = new THREE.TextureLoader().load( texturePath );
            materialArray.push( new THREE.MeshBasicMaterial({ map: texture, side: BackSide }) );
        });

        const cubeWorld = this.createCube(50,50,50, null, materialArray );
        cubeWorld.position.set(0,0,0);
        this.scene.add( cubeWorld );
    }

    private starsWorld() {
        const starsGeometry = new THREE.Geometry();
        const starTexture   = new THREE.TextureLoader().load('./assets/img/star.png');
        const starMaterial   = new THREE.PointsMaterial({
            color: 0xffffff,
            size: .2,
            map: starTexture
        });

        for (let i = 0; i < 8000; i++) {
            starsGeometry.vertices.push( new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            ));
        }
        const fullStar = new THREE.Points( starsGeometry, starMaterial );

        this.scene.add( fullStar );
    }
}

new CajonScene( sceneHtmlElement, window.innerWidth , window.innerHeight );



