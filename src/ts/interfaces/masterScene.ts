
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface BaseScene {
    renderer            : THREE.WebGLRenderer;
    camera              : THREE.PerspectiveCamera;
    scene               : THREE.Scene;
    cameraControls?     : OrbitControls;
    init:               () => void;
    setScene?:          () => void;
    setCamera?:         () => void;
    setControls?:       () => void;
    setLights?:         () => void;
    setRenderer?:       () => void;
    showScene?:         () => void;
    handleResponsive?:  () => void;
    startAnimation?:    () => void;
}
