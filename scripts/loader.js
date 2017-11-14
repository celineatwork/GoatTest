"use strict";
/// <reference path="./index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = require("three");
const GLTFLoader = require("three-gltf2-loader");
GLTFLoader(THREE);
class Loader {
    constructor() {
        this._GTLFLoader = new THREE.GLTFLoader();
        // private _FBXLoader = new THREE.FBXLoader();
        this._manager = new THREE.LoadingManager();
        // loading manager progress setup
        this._manager.onProgress = function (item, loaded, total) {
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
    loadObject(url, func) {
        if ((url).endsWith(".fbx")) {
            // load fbx
        }
        else if ((url).endsWith("glb")) {
            this.loadGLTF(url, func);
        }
    }
    loadGLTF(url, func) {
        this._GTLFLoader.load(url, function (data) {
            console.log(data);
            func(data);
        });
    }
}
exports.Loader = Loader;
