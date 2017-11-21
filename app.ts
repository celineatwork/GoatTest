import * as THREE from 'three';

import {GLTFScene} from './scripts/scenemanager';
import {Loader} from './scripts/loader';
import {Scene, GameScenes} from './scripts/scenes'
import { WebGLRenderer } from 'three';

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
        // this.mixer.addEventListener("finished", function(e){
        //     self.parent.changeScene();
        // })
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

class Frame{
    renderer : WebGLRenderer;
    container : HTMLDivElement;
    overlay : HTMLDivElement;

    targetWidth : number;
    targetHeight : number;
    sizingFactor : number = 0.1;

    constructor (){
        this.renderer = new WebGLRenderer();
        this.container = document.createElement('div');
        this.overlay = document.createElement('div');

        // container has a canvas and an overlay
        this.container.className = "frame hidden";
        this.container.appendChild(this.renderer.domElement)
        this.container.appendChild(this.overlay);
    }

    makeActive(){
        this.container.className = "frame active";
        this.targetWidth = window.innerWidth;
        this.targetHeight = window.innerWidth / 2;
    }

    makeInactive(){
        this.container.className = "frame hidden";
    }

    update(){
        
    }
}

class FrameController{
    parent : Game;
    frames : Frame[];

    container : HTMLDivElement;
    activeFrame : Frame;

    fCount : number = 5;

    constructor(parent : Game){
        this.parent = parent;
        this.frames = new Array<Frame>();

        // make a div container that holds all the frames
        this.container = document.createElement('div');
        this.container.className = "frameController";
        this.parent.container.appendChild(this.container);

        for (var i=0; i<this.fCount; i++){
            var f = new Frame()
            this.container.appendChild(f.container);
            this.frames.push(f);
        }

        this.activeFrame = this.frames[0];
        this.activeFrame.makeActive();
    }

    update(){

    }

}

class Game {
    container : HTMLDivElement;
    sceneController : SceneController;
    frameController : FrameController;

    constructor(){
        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        // custom class initializations
        this.sceneController = new SceneController(this);
        this.frameController = new FrameController(this);

        // load the first scene
        this.sceneController.loadNext();        
        this.render();
    }

    // changeScene(){
    //     this.frameController.changeScene();
    // }

    private render(){
        this.sceneController.update();
        this.frameController.update();

        this.frameController.activeFrame.renderer.render(this.sceneController.scene, this.sceneController.camera)
        requestAnimationFrame(this.render.bind(this));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let game = new Game()
});