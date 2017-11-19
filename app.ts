import * as THREE from 'three';

import {GLTFScene} from './scripts/scenemanager';
import {Loader} from './scripts/loader';
import {Scene, GameScenes} from './scripts/scenes'

class Game {
    container : HTMLDivElement;

    renderer : THREE.WebGLRenderer;
    scene : THREE.Scene;
    camera : THREE.Camera;

    mixer : THREE.AnimationMixer;
    clock : THREE.Clock;

    loader : Loader;

    constructor(){
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.clock = new THREE.Clock();

        this.scene.add(new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ));

        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.renderer.setSize(1024, 768);
        this.container.appendChild(this.renderer.domElement);

        this.loader = new Loader();
        this.loader.loadGLTF('models/scenes/anim-test-trees.glb', this.loadScene.bind(this));
        
        this.render();
    }

    loadScene(sceneData : any){
        console.log(sceneData);
        this.scene.add(sceneData.scene);
        this.camera = sceneData.cameras[0];

        var anim = sceneData.animations[0];
        this.mixer.clipAction(anim).play();
    }

    private render(){
        this.mixer.update(this.clock.getDelta());
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let game = new Game()
});