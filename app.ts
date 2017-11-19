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

    idx : number = -1;

    constructor(){
        // THREE initializations
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.clock = new THREE.Clock();
        
        // custom class initializations
        this.loader = new Loader();

        // add some lighting
        this.scene.add(new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ));
    }

    loadNext(){
        var nextScene = GameScenes[this.idx + 1];
        if (nextScene){
            this.loader.loadScene(nextScene.sceneUrl, this.changeScene.bind(this));
        }
    }

    changeScene(sceneData : any){
        // add scene and change camera
        this.scene.add(sceneData.scene);
        this.camera = sceneData.cameras[0];

        // set up scene animation
        var anim = sceneData.animations[0];
        this.mixer.clipAction(anim).clampWhenFinished = true;
        this.mixer.clipAction(anim).setLoop(THREE.LoopOnce, 0);
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

    constructor(){
        // THREE initializations
        this.renderer = new THREE.WebGLRenderer();

        // custom class initializations
        this.sceneController = new SceneController();

        // add dom element
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.renderer.setSize(1024, 768);
        this.container.appendChild(this.renderer.domElement);

        // load the first scene
        this.sceneController.loadNext();        
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