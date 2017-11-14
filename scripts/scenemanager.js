"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GLTFScene {
    constructor(obj) {
        this.animations = obj.animations;
        this.cameras = obj.cameras;
        this.scenes = obj.scenes;
        this.scene = obj.scene;
    }
    playAnimations(mixer) {
        for (var i = 0; i < this.animations.length; i++) {
            var animation = this.animations[i];
            console.log(animation.name);
            mixer.clipAction(animation).play();
            // var action = mixer.existingAction(animation);
            // action.play();
        }
    }
}
exports.GLTFScene = GLTFScene;
