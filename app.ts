import * as THREE from 'three';

import {GLTFScene} from './scripts/scenemanager';
import {Loader} from './scripts/loader';
import { WebGLRenderer } from 'three';

interface Scene {
    name : string, 
    sceneUrl : string,
    thumbnailUrl : string,
    options : string[]
}

let SceneData : Map<string, Scene> = new Map<string, Scene>();

SceneData.set("scene1", {
    name : "",
    sceneUrl : "models/scenes/anim-test-trees.glb",
    thumbnailUrl : "assets/forest_concept_001.png",
    options :  ["scene2", "scene3", "scene4", "scene5"]
})

SceneData.set("scene2", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat1.png",
    options :  ["scene3", "scene4", "scene5", "scene1"]
})

SceneData.set("scene3", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat2.png",
    options :  ["scene4", "scene5", "scene1", "scene2"]
})

SceneData.set("scene4", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat3.png",
    options :  ["scene5", "scene1", "scene2", "scene3"]
})

SceneData.set("scene5", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat4.png",
    options :  ["scene1", "scene2", "scene3", "scene4"]
})

class SceneController {
    scene : THREE.Scene;
    camera : THREE.Camera;
    mixer : THREE.AnimationMixer;
    clock : THREE.Clock;

    parent : Game;
    loader : Loader;

    idx : number = 0;

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
        var title = "scene" + (this.idx+1).toString();
        var scene = SceneData.get(title);

        if (scene){
            this.loader.loadScene(scene.sceneUrl, this.changeScene.bind(this));
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
        this.sizingFactor = 0.1
    }

    makeInactive(){
        this.container.className = "frame hidden";
        this.targetWidth = 300;
        this.targetHeight = 150;
        this.sizingFactor = 0.1
    }

    checkSize(){
        var size = this.renderer.getSize();
        if(this.targetWidth != size.width || this.targetHeight != size.height){
            var wDiff = (this.targetWidth - size.width) * this.sizingFactor;
            var hDiff = (this.targetHeight - size.height) * this.sizingFactor;

            // console.log(size.width + wDiff, size.height + hDiff);
            this.renderer.setSize(size.width + wDiff, size.height + hDiff);
            this.sizingFactor += 0.1;
        }
    }

    update(){
        this.checkSize();
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

        for (var i = 0; i < this.fCount; i++){
            var f = new Frame()
            this.container.appendChild(f.container);
            this.frames.push(f);
        }

        this.activeFrame = this.frames[0];
        this.activeFrame.makeActive();
    }

    update(){
        for (let f of this.frames){
            f.update();
        }

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