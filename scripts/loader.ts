/// <reference path="./index.d.ts"/>

import * as THREE from 'three'
import * as GLTFLoader from 'three-gltf2-loader'
GLTFLoader(THREE)

declare module 'three' {
    export var GLTFLoader: any
}

import {GLTFScene} from './scenemanager';
import {Scene} from './scenes'

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

    // determine which loader to use
    // loadObject(obj : any, func: (object: any) => void) : void {
    //     if ((obj.url).endsWith(".fbx")){
    //         // load fbx
    //     } else if ((obj.url).endsWith("glb")){
    //         this.loadGLTF(obj, func);
    //     }

    // }

    loadGLTF(url: string, func: (sceneData : GLTFScene) => void) : any {
        this.GTLFLoader.load(url, function(data : any){
            func(data);
        })
    }


}

export {Loader}