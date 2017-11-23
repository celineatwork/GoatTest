import * as THREE from 'three';

import {GLTFScene} from './scripts/scenemanager';
import {Loader} from './scripts/loader';
import { WebGLRenderer } from 'three';

interface Scene {
    name : string, 
    sceneUrl : string,
    thumbnailUrl : string,
    options : string[],
    captions : string[]
}

let SceneData : Map<string, Scene> = new Map<string, Scene>();

SceneData.set("scene1", {
    name : "",
    sceneUrl : "models/scenes/anim-test-trees.glb",
    thumbnailUrl : "assets/forest_concept_001.png",
    options :  ["scene2", "scene3", "scene4", "scene5"],
    captions : ["S01: choice 1", "S01: choice 2", "S01: choice 3", "S01: choice 4"]
})

SceneData.set("scene2", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat1.jpg",
    options :  ["scene3", "scene4", "scene5", "scene1"],
    captions : ["S02: choice 1", "S02: choice 2", "S02: choice 3", "S02: choice 4"]
})

SceneData.set("scene3", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat2.jpg",
    options :  ["scene4", "scene5", "scene1", "scene2"],
    captions : ["S03: choice 1", "S03: choice 2", "S03: choice 3", "S03: choice 4"]
})

SceneData.set("scene4", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat3.jpg",
    options :  ["scene5", "scene1", "scene2", "scene3"],
    captions : ["S04: choice 1", "S04: choice 2", "S04: choice 3", "S04: choice 4"]
})

SceneData.set("scene5", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat4.jpg",
    options :  ["scene1", "scene2", "scene3", "scene4"],
    captions : ["S05: choice 1", "S05: choice 2", "S05: choice 3", "S05: choice 4"]
})

class SceneController {
    scene : THREE.Scene;
    sceneData : GLTFScene;

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
        this.loadScene(title);
    }

    loadScene(sceneName : string){
        var scene = SceneData.get(sceneName);
        if (scene){
            // delete current scene
            if (this.sceneData){
                this.scene.remove(this.sceneData.scene);
            }

            // display thumbnails on tiles
            this.parent.prepareScene(scene);

            // load the scene object
            this.loader.loadScene(scene.sceneUrl, this.changeScene.bind(this));
        }
    }

    changeScene(sceneData : GLTFScene){
        this.sceneData = sceneData;

        // add scene and change camera
        this.scene.add(sceneData.scene);
        this.camera = sceneData.cameras[0];

        // set up scene animation
        var anim = sceneData.animations[0];
        this.mixer.clipAction(anim).clampWhenFinished = true;
        this.mixer.clipAction(anim).setLoop(THREE.LoopOnce, 0);
        this.mixer.clipAction(anim).fadeIn(5);
    }

    playScene(){
        console.log("play");
        var anim = this.sceneData.animations[0];
        
        // give time for a fade
        setTimeout(() => {
            this.mixer.clipAction(anim).play();
        }, 600);
    }

    update(){
        this.mixer.update(this.clock.getDelta() * 3);
    }
}

class Frame{
    game : Game;

    renderer : WebGLRenderer;
    container : HTMLDivElement;
    overlay : HTMLDivElement;

    targetWidth : number;
    targetHeight : number;
    sizingFactor : number = 0.1;
    active : boolean = false;

    constructor (game : Game){
        this.game = game;

        this.renderer = new WebGLRenderer();
        this.container = document.createElement('div');
        this.overlay = document.createElement('div');

        // container has a canvas and an overlay
        this.container.className = "frame hidden";
        this.overlay.className = "overlay";
        this.container.appendChild(this.renderer.domElement)
        this.container.appendChild(this.overlay);

        // add rudimentary click method
        this.overlay.addEventListener("click", function(){
            game.playScene();
        })
    }

    makeActive(){
        this.container.className = "frame active";
        
        // this.targetWidth = window.innerWidth;
        // this.targetHeight = window.innerWidth / 2;
        this.renderer.setSize(window.innerWidth, window.innerWidth / 2);
        
        this.sizingFactor = 0.1
        this.active = true;
    }

    makeInactive(){
        this.container.className = "frame hidden";
        
        // this.targetWidth = 300;
        // this.targetHeight = 150;
        
        this.sizingFactor = 0.1
        this.active = false;
    }

    // checkSize(){
        // var size = this.renderer.getSize();
        // if(this.targetWidth != size.width || this.targetHeight != size.height){
        //     var wDiff = (this.targetWidth - size.width) * this.sizingFactor;
        //     var hDiff = (this.targetHeight - size.height) * this.sizingFactor;

        //     // console.log(size.width + wDiff, size.height + hDiff);
        //     this.renderer.setSize(size.width + wDiff, size.height + hDiff);
        //     this.sizingFactor += 0.1;
        // }
    // }

    loadThumbnail(url : string){
        console.log(url);
        this.overlay.style.backgroundImage = "url(" + url;
    }

    playScene(){
        this.container.className = "frame active playing";
    }

    update(){
        // this.checkSize();
    }
}

class FrameController{
    game : Game;
    frames : Frame[];

    container : HTMLDivElement;
    activeFrame : Frame;

    constructor(game : Game){
        this.game = game;
        this.frames = new Array<Frame>();

        // make a div container that holds all the frames
        this.container = document.createElement('div');
        this.container.className = "frameController";
        this.game.container.appendChild(this.container);

        for (var i = 0; i < this.game.maxOptionCount + 1; i++){
            var f = new Frame(game)
            this.container.appendChild(f.container);
            this.frames.push(f);
        }

        // make the first frame the active frame
        this.activeFrame = this.frames[0];
        this.activeFrame.makeActive();
    }

    prepareFrames(scene : Scene){
        for (var i = 0; i < this.game.maxOptionCount + 1; i++){
            var frameObj = this.frames[i];
            var sceneOption = SceneData.get(scene.options[i]);

            if (!frameObj.active && sceneOption){
                frameObj.loadThumbnail(sceneOption.thumbnailUrl);
            }
        }

        this.activeFrame.loadThumbnail(scene.thumbnailUrl);
    }

    playScene(){
        this.activeFrame.playScene();
    }

    update(){
        // for (let f of this.frames){
        //     f.update();
        // }

    }

}

class TextController {
    game : Game;

    // option list
    optionContainer : HTMLUListElement;
    optionBoxes : TextBox[];

    constructor(game : Game){
        this.game = game;
        this.optionContainer = document.createElement("ul");
        this.optionBoxes = new Array<TextBox>();

        this.optionContainer.className = "options"

        // create option boxes as list elements
        for (var i = 0; i < this.game.maxOptionCount; i++){
            this.optionBoxes.push(new TextBox(game, this.optionContainer));
        }

        // add option boxes to game element
        this.game.container.appendChild(this.optionContainer);
    }

    prepareText(scene : Scene){
        for (var i = 0; i < this.game.maxOptionCount; i++){
            var textBox = this.optionBoxes[i];

            var caption = scene.captions[i];
            var sceneName = scene.options[i];

            if (caption && textBox){
                textBox.setOption(sceneName, caption);
            }
        }
    }
}

class TextBox{
    game : Game;
    container : HTMLLIElement;
    text: HTMLSpanElement;
    data : string;

    constructor(game : Game, container : HTMLUListElement){
        var self = this;

        this.container = document.createElement("li");
        this.text = document.createElement("span");

        this.container.className = "textbox";
        this.container.addEventListener("click", function(){
            game.sceneController.loadScene(self.data);
        });

        this.container.appendChild(this.text);
        container.appendChild(this.container)
    }

    setOption(data: string, text:string){
        this.text.textContent = text;
        this.data = data;
    }
}

class Game {
    container : HTMLDivElement;
    sceneController : SceneController;
    frameController : FrameController;
    textController : TextController;

    // 4 options plus current frame
    maxOptionCount : number = 4;

    constructor(){
        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        // custom class initializations
        this.sceneController = new SceneController(this);
        this.frameController = new FrameController(this);
        this.textController = new TextController(this);

        // load the first scene
        this.sceneController.loadNext();        
        this.render();
    }

    // changeScene(){
    //     this.frameController.changeScene();
    // }

    prepareScene(scene : Scene){
        // called from scenecontroller on scene load
        // show thumbnails
        this.frameController.prepareFrames(scene);
        this.textController.prepareText(scene);
    }

    playScene(){
        this.frameController.playScene();
        this.sceneController.playScene();
    }

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