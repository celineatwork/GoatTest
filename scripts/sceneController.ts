import * as THREE from 'three';
import {GLTFScene, Loader} from './loader';
import { SceneData } from './sceneData';
import { Game } from './../app';

interface Scene {
    name : string, 
    sceneUrl : string,
    thumbnailUrl : string,
    options : string[],
    captions : string[]
}

class SceneController {
    game : Game;

    scene : THREE.Scene;
    sceneData : GLTFScene;

    camera : THREE.Camera;
    mixer : THREE.AnimationMixer;
    clock : THREE.Clock;
    loader : Loader;

    idx : number = 0;

    constructor(game: Game){
        this.game = game;

        // THREE initializations
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.clock = new THREE.Clock();
        
        // custom class initializations
        this.loader = new Loader();

        // call back when main scene animation is finished
        // this.mixer.addEventListener("finished", function(e){
        //     game.sceneFinished();
        // })
    }

    loadNext(){
        // presumption that all scene names are 'sceneX'
        var title = "scene" + (this.idx+1).toString();
        this.loadScene(title);
    }

    loadScene(sceneName : string){
        var scene = SceneData.get(sceneName);
        if (scene){
            if (this.sceneData){
                this.scene.remove(this.sceneData.scene);
            }

            // display thumbnails on tiles
            this.game.prepareScene(scene);

            // load the scene object
            this.loader.loadScene(scene.sceneUrl, this.changeScene.bind(this));
        }
    }

    changeScene(sceneData : GLTFScene){
        // called from loader as a callback
        this.sceneData = sceneData;

        // add scene and change camera
        this.scene.add(sceneData.scene);
        this.camera = sceneData.cameras[0];
        
        // add some lighting
        this.scene.add(new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ));

        // set up scene animation
        var anim = sceneData.animations[0];
        this.mixer.clipAction(anim).clampWhenFinished = true;
        this.mixer.clipAction(anim).setLoop(THREE.LoopOnce, 0);
    }

    playScene(){
        var anim = this.sceneData.animations[0];
        if (!this.mixer.clipAction(anim).isRunning()){
            // give time for a fade
            setTimeout(() => {
                this.mixer.clipAction(anim).reset();
                this.mixer.clipAction(anim).play();
            }, 600);
        }
    }

    update(){
        this.mixer.update(this.clock.getDelta() * 3);
    }
}


export {Scene, SceneController}