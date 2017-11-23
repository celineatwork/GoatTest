import THREE from './mythree'

interface GLTFScene {
    animations : Array<THREE.AnimationClip>;
    cameras: Array<THREE.Camera>;
    scenes: Array<THREE.Scene>;
    scene : THREE.Scene;
}


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
            func(data);
        })
    }

}

export {GLTFScene, Loader}