import * as THREE from 'three';

import {GLTFScene} from './scripts/scenemanager';
import {Loader} from './scripts/loader';
import {Scene, GameScenes} from './scripts/scenes'

class SceneController {
    scene : THREE.Scene;
    camera : THREE.Camera;
    mixer : THREE.AnimationMixer;
    clock : THREE.Clock;

    parent : Game;
    loader : Loader;

    idx : number = -1;

    constructor(parent: Game){
        var self = this;

        // THREE initializations
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.clock = new THREE.Clock();
        
        // custom class initializations
        this.loader = new Loader();
        this.parent = parent;

        // add some lighting
        this.scene.add(new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ));

        // bindings
        this.mixer.addEventListener("finished", function(e){
            self.parent.changeScene();
        })
    }

    loadNext(){
        var nextScene = GameScenes[this.idx + 1];
        if (nextScene){
            this.loader.loadScene(nextScene.sceneUrl, this.changeScene.bind(this));
        }
    }

    changeScene(sceneData : GLTFScene){
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
        this.mixer.update(this.clock.getDelta() * 3);
    }
}

class FrameController{
    parent : Game;
    container : HTMLDivElement;
    overlay_1 : HTMLDivElement;
    currentFrame : HTMLCanvasElement;
    targetWidth : number;
    targetHeight : number;
    
    sizingFactor : number = 0.1;

    constructor(parent : Game){
        this.parent = parent;
        this.currentFrame = this.parent.renderer.domElement;

        this.targetWidth = window.innerWidth;
        this.targetHeight = window.innerWidth/2;

        this.container = document.createElement('div');
        this.overlay_1 = document.createElement('div')
        this.parent.renderer.setSize(this.targetWidth, this.targetHeight);
        
        // this.container.appendChild(this.overlay_1);
        this.container.appendChild(this.currentFrame);

        this.overlay_1.style.width = window.innerWidth.toString() + "px";
        this.overlay_1.style.height = (window.innerHeight/2).toString() + "px";
        this.overlay_1.className = "overlay"
        
        document.body.appendChild(this.container);
    }

    changeScene(){
        var scale = 100;
        this.overlay_1.className = "overlay paused";
        
        var size = this.parent.renderer.getSize();
        this.targetWidth = size.width - scale;
        this.targetHeight= size.height -scale/2;
        this.sizingFactor = 0.1;
    }

    checkSize(){
        var size = this.parent.renderer.getSize();
        if(this.targetWidth != size.width || this.targetHeight != size.height){
            var wDiff = (this.targetWidth - size.width) * this.sizingFactor;
            var hDiff = (this.targetHeight - size.height) * this.sizingFactor;

            // console.log(size.width + wDiff, size.height + hDiff);
            this.parent.renderer.setSize(size.width + wDiff, size.height + hDiff);
            this.sizingFactor += 0.1;
        }
    }

    update(){
        this.checkSize();
    }

}

class Game {
    container : HTMLDivElement;
    renderer : THREE.WebGLRenderer;

    sceneController : SceneController;
    frameController : FrameController;

    constructor(){
        // THREE initializations
        this.renderer = new THREE.WebGLRenderer();

        // custom class initializations
        this.sceneController = new SceneController(this);
        this.frameController = new FrameController(this);

        // load the first scene
        this.sceneController.loadNext();        
        this.render();
    }

    changeScene(){
        this.frameController.changeScene();
    }

    private render(){
        this.sceneController.update();
        this.frameController.update();

        this.renderer.render(this.sceneController.scene, this.sceneController.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let game = new Game()
});