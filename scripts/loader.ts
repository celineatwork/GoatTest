/// <reference path="./index.d.ts" />

import * as THREE from 'three'
import * as GLTFLoader from 'three-gltf2-loader'
GLTFLoader(THREE)
declare module 'three' {
export var GLTFLoader: any
}

class Loader {
    private _GTLFLoader = new THREE.GLTFLoader();
    // private _FBXLoader = new THREE.FBXLoader();
    private _manager = new THREE.LoadingManager();

    constructor() {
         // loading manager progress setup
         this._manager.onProgress = function(item, loaded, total){
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
    loadObject(url: string, func: (object: any) => void) : void {
        if ((url).endsWith(".fbx")){
            // load fbx
        } else if ((url).endsWith("glb")){
            this.loadGLTF(url, func);
        }

    }

    loadGLTF(url: string, func: (object: any) => void) : any {
        this._GTLFLoader.load(url, function(data : any){
            console.log(data);
            func(data);
        })
    }
}

export {Loader}