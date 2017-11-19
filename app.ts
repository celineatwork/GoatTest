import * as THREE from 'three';

import {GLTFScene} from './scripts/scenemanager';
import {Loader} from './scripts/loader';
import {Scene, GameScenes} from './scripts/scenes'

class SceneController {
    scene : THREE.Scene;
    camera : THREE.Camera;
    mixer : THREE.AnimationMixer;
    clock : THREE.Clock;

    loader : Loader;

    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.clock = new THREE.Clock();

        // add some lighting
        this.scene.add(new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ));
    }

    changeScene(sceneData : any){
        this.scene.add(sceneData.scene);
        this.camera = sceneData.cameras[0];

        var anim = sceneData.animations[0];
        this.mixer.clipAction(anim).play();
    }

    update(){
        this.mixer.update(this.clock.getDelta());
    }
}

class Game {
    container : HTMLDivElement;
    renderer : THREE.WebGLRenderer;

    sceneController : SceneController;
    loader : Loader;

    constructor(){
        this.sceneController = new SceneController();
        this.renderer = new THREE.WebGLRenderer();
        this.loader = new Loader();

        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.renderer.setSize(1024, 768);
        this.container.appendChild(this.renderer.domElement);

        this.loader.loadGLTF('models/scenes/anim-test-trees.glb', this.sceneController.changeScene.bind(this.sceneController));
        
        this.render();
    }

    private render(){
        this.sceneController.update();

        this.renderer.render(this.sceneController.scene, this.sceneController.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let game = new Game()
});