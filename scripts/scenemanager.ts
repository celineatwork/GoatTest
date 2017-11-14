class GLTFScene {
    public animations : Array<THREE.AnimationClip>;
    public cameras: Array<THREE.Camera>;
    public scenes: Array<THREE.Scene>;
    public scene : THREE.Scene;

    constructor(obj: any){
        this.animations = obj.animations;
        this.cameras = obj.cameras;
        this.scenes = obj.scenes;
        this.scene = obj.scene;
    }

    playAnimations(mixer : THREE.AnimationMixer) : void {
        for (var i=0; i < this.animations.length; i++){
            var animation = this.animations[i];
            console.log(animation.name);
            mixer.clipAction(animation).play();
            // var action = mixer.existingAction(animation);
            // action.play();
        }
    }
}

export {GLTFScene}