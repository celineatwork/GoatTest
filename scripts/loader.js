"use strict";
/// <reference path="./index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = require("three");
const GLTFLoader = require("three-gltf2-loader");
GLTFLoader(THREE);
class Loader {
    constructor() {
        this.GTLFLoader = new THREE.GLTFLoader();
        // FBXLoader = new THREE.FBXLoader();
        this.LoadingManager = new THREE.LoadingManager();
        // loading manager progress setup
        this.LoadingManager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete;
                percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete) + '% downloaded');
            }
        };
        var onError = function (xhr) {
            console.error(xhr);
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
    loadGLTF(url, func) {
        this.GTLFLoader.load(url, function (data) {
            func(data);
        });
    }
}
exports.Loader = Loader;
