import * as THREE from 'three';
import {GLTFScene} from './scenemanager';

interface Scene{
    number: number;
    name: string;
    sceneUrl: string;
    active: boolean;
    loadedObj: GLTFScene;
}

let SceneOne = {
        number: 1,
        name: "Forest",
        active: false,
        sceneUrl: 'models/scenes/anim-test-trees.glb'
}

let SceneTwo = {
    number: 2,
    name: "Wobbly",
    active: false,
    sceneUrl: 'models/scenes/wobble.glb'
}

var GameScenes = [SceneOne, SceneTwo];
export {Scene, GameScenes}