/// <reference path="./index.d.ts"/>

import * as THREE from 'three'
import * as GLTFLoader from 'three-gltf2-loader'
GLTFLoader(THREE)

declare module 'three' {
    export var GLTFLoader: any
}

import {GLTFScene} from './scenemanager';
// import {Scene} from './scenes'

class Loader {
    GTLFLoader = new THREE.GLTFLoader();
    // FBXLoader = new THREE.FBXLoader();
    LoadingManager = new THREE.LoadingManager();

    constructor() {
         // loading manager progress setup
         this.LoadingManager.onProgress = function(item, loaded, total){
            console.log(item, loaded, total);
        }

        var onProgress = function( xhr : any ) {
            if ( xhr.lengthComputable ) {
                var percentComplete : number;
                percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round( percentComplete ) + '% downloaded' );
            }
        };
        var onError = function( xhr : any ) {
            console.error( xhr );
        };
    }

    async loadScene(url: string, func: (sceneData : GLTFScene) => GLTFScene){
        this.GTLFLoader.load(url, function(data : any){
            // if (data instanceof GLTFScene){
            //     func(data);
            // } else {
            //     console.log(data);
            // }
            func(data);
        })
    }

}

export {Loader}