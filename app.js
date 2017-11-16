"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = require("three");
const loader_1 = require("./scripts/loader");
const scenes_1 = require("./scripts/scenes");
// interface GameObject {
//     name: string;
//     active: boolean;
//     url: string;
//     obj: any;
// }
// interface SceneObject {
//     number: number;
//     name: string;
//     active: boolean;
//     sceneUrl: string;
//     gameObjects: GameObject[];
//     sceneObj: any;
// }
// let SceneOne = {
//         number: 1,
//         name: "Forest",
//         active: false,
//         sceneUrl: 'models/scenes/anim-test-trees.glb'
// }
// let SceneTwo = {
//     number: 2,
//     name: "Wobbly",
//     active: false,
//     sceneUrl: 'models/scenes/wobble.glb'
// }
// let scenes = [SceneOne, SceneTwo];
// class Goat {
// }
// class Camera {
//     currentCamera : THREE.Camera;
//     nextCamera : THREE.Camera;
//     constructor(obj : THREE.Camera){
//         this.currentCamera= obj;
//     }
//     setNext(obj : THREE.Camera){
//         this.nextCamera = obj;
//     }
// }
// class Scene{
//     obj: GLTFScene;
//     //render loop things
//     mixer: THREE.AnimationMixer;
//     clock : THREE.Clock;
//     multiplier = 2;
//     constructor(obj: GLTFScene){
//         this.obj = obj;
//     }
//     update(){
//         this.mixer.update(this.clock.getDelta() * this.multiplier);
//     }
// }
// class Game {
//     renderer : THREE.WebGLRenderer;
//     root : THREE.Group;
//     scene: Scene;
//     camera : Camera;
//     loader : Loader;
//     // game objects
//     // scenes: {[name : string]: SceneObject} = {};
//     constructor(){
//         this.root = new THREE.Group();
//         this.loader = new Loader();
//         // load scene through callback
//         this.loader.loadObject(scenes[0].sceneUrl, this.addGLTFScene);
//         // renderer initialization
//         this.renderer = new THREE.WebGLRenderer();
//         this.renderer.setSize( window.innerWidth, window.innerHeight );
//         document.body.appendChild(this.renderer.domElement);
//         // lighting
//         var hemisphereLight =  new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//         this.scene.add(hemisphereLight);
//         // scene animation finished
//         let game = this;
//         this.mixer.addEventListener('finished', function(e){
//             game.sceneAnimationFinished();
//         });
//         // do render
//         this.render();
//     }
//     private render() : void {
//         var now = Date.now();
//         this.dt = now - this.lastFrameTime;
//         this.lastFrameTime = now;
//         // updates 
//         // this.mixer.update(this.clock.getDelta() * this.multiplier);
//         // this.camera.update();
//         this.update();
//         this.renderer.render(this.scene, this.camera.obj);
//         requestAnimationFrame(this.render.bind(this));
//     }
//     private update(){
//         // console.log(this.dt, this.lastFrameTime);
//         this.camera.update(this.dt);
//     }
//     //
//     // LOADING THINGS
//     //
//     sceneAnimationFinished() : void {
//         this.loadNextScene();
//     }
//     loadNextScene() : void {
//         if (this.currentScene){
//             this.loadScene(this.sceneCount+1);
//         } else {
//             this.loadScene(this.sceneCount);
//         }
//     }
//     loadScene(idx: number) : void {
//         let nextScene = scenes[idx];
//         if(nextScene){
//             this.loadObject(nextScene.sceneUrl);
//         }
//     }
//     loadObject(url : string) : void {
//         console.log(url);
//         this.loader.loadObject(url, this.addGLTFScene.bind(this));
//     }
//     // used as a callback function from loader.loadGLTF
//     addGLTFScene(obj: any) : void {
//         // add scene object to game scene dictionary
//         this.sceneCount++;
//         var name = "scene" + this.sceneCount.toString();
//         this.scenes[name] = obj;
//         // add scene to game scene
//         this.scene.add(obj.scene);
//         // swap camera
//         if (obj.cameras.length){
//             this.camera.setNext(obj.cameras[0]);
//             // this.lerpToCamera(obj.cameras[0])
//             // this.camera = obj.cameras[0]
//             // need to consider camera switching?
//         }
//         // play animation
//         if (obj.animations.length){
//             this.mixer.clipAction(obj.animations[0]).clampWhenFinished = true;
//             this.mixer.clipAction(obj.animations[0]).setLoop(THREE.LoopOnce, 0);
//             this.mixer.clipAction(obj.animations[0]).play();
//         }
//     }
//     // lerpToCamera(nextCamera: THREE.Camera) : void{
//     //     let alpha = 0.0;
//     //     while (alpha < 1.0){
//     //         console.log(alpha);
//     //         this.camera.position.lerp(nextCamera.position, alpha);
//     //         alpha += 0.01;
//     //     }
//     //     this.camera = nextCamera;
//     // }
// }
// function sceneLoader(game: Game): void {
// }
// window.addEventListener('DOMContentLoaded', () => {n
//     let game = new Game();
//     // sceneLoader(game);
//     game.loadNextScene();
// });
// interface Scene{
//     number: number;
//     name: string;
//     sceneUrl: string;
//     active: boolean;
//     loadedObj: GLTFScene;
// }
// let SceneOne = {
//         number: 1,
//         name: "Forest",
//         active: false,
//         sceneUrl: 'models/scenes/anim-test-trees.glb'
// }
// let SceneTwo = {
//     number: 2,
//     name: "Wobbly",
//     active: false,
//     sceneUrl: 'models/scenes/wobble.glb'
// }
// let GameScenes = [SceneOne, SceneTwo];
class CameraController {
    constructor() {
        this.currentCamera = new THREE.Camera();
    }
    changeCamera(camera) {
        this.currentCamera = camera;
        console.log(camera);
    }
    update() {
    }
}
class SceneController {
    constructor(game) {
        this.currentSceneIndex = -1;
        this.gameScenes = scenes_1.GameScenes;
        this.multiplier = 2;
        this.parent = game;
        this.loader = new loader_1.Loader();
        this.currentScene = new THREE.Scene();
        this.mixer = new THREE.AnimationMixer(this.parent);
        this.clock = new THREE.Clock();
    }
    loadNext() {
        // called from Game object
        this.nextSceneIndex = this.currentSceneIndex + 1;
        var nextScene = this.gameScenes[this.nextSceneIndex];
        this.loader.loadGLTF(nextScene.sceneUrl, this.showScene.bind(this));
    }
    showScene(sceneData) {
        // callback function from loader.loadGTLF
        this.previousSceneIndex = this.currentSceneIndex;
        this.currentSceneIndex = this.nextSceneIndex;
        // swap the scenes
        this.sceneData = sceneData;
        this.currentScene = sceneData.scene;
        // add some hemispheric lighting
        var hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        this.currentScene.add(hemisphereLight);
        // call back to gmae
        this.parent.sceneLoaded(sceneData);
    }
    playAnimation() {
        if (this.sceneData.animations.length) {
            var anim = this.sceneData.animations[0];
            this.mixer.clipAction(anim).clampWhenFinished = true;
            this.mixer.clipAction(anim).setLoop(THREE.LoopOnce, 0);
            this.mixer.clipAction(anim).play();
        }
    }
    update() {
        this.mixer.update(this.clock.getDelta() * this.multiplier);
    }
}
class Game {
    constructor() {
        this.renderer = new THREE.WebGLRenderer();
        this.cameraController = new CameraController();
        this.sceneController = new SceneController(this);
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        // this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(1024, 768);
        this.container.appendChild(this.renderer.domElement);
        this.sceneController.loadNext();
        this.render();
    }
    sceneLoaded(sceneData) {
        // called from sceneController.showScene
        // change the camera
        this.cameraController.changeCamera(sceneData.cameras[0]);
        this.sceneController.playAnimation();
    }
    render() {
        this.cameraController.update();
        this.sceneController.update();
        this.renderer.render(this.sceneController.currentScene, this.cameraController.currentCamera);
        requestAnimationFrame(this.render.bind(this));
    }
}
window.addEventListener('DOMContentLoaded', () => {
    let game = new Game();
});
