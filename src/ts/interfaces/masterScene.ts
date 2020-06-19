
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface BaseScene {
    renderer            : THREE.WebGLRenderer;
    camera              : THREE.PerspectiveCamera;
    scene               : THREE.Scene;
    cameraControls?     : OrbitControls;
    setRenderer?:       () => void;
    runRenderer?:       () => void;
    setCamera?:         () => void;
    setLights?:         () => void;
    setScene?:          () => void;
    setControls?:       () => void;
    showScene?:         () => void;
    handleResponsive?:  () => void;
}
