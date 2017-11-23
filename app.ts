
import {FrameController} from './scripts/frameController';
import {Scene, SceneController} from './scripts/sceneController';
import {TextController} from './scripts/textController';

class Game {
    container : HTMLDivElement;
    sceneController : SceneController;
    frameController : FrameController;
    textController : TextController;

    maxOptionCount : number = 4;

    constructor(){
        this.container = document.createElement('div');
        this.container.className = "game";
        document.body.appendChild(this.container);

        // custom class initializations
        this.sceneController = new SceneController(this);
        this.frameController = new FrameController(this);
        this.textController = new TextController(this);

        // load the first scene
        this.sceneController.loadNext();        
        this.render();
    }

    prepareScene(scene : Scene){
        // called from scenecontroller on scene load
        this.frameController.prepareFrames(scene);
        this.textController.prepareText(scene);
    }

    playScene(){
        this.frameController.playScene();
        this.sceneController.playScene();
    }

    sceneFinished(){    
        console.log("animation finished");
    }

    private render(){
        this.sceneController.update();
        this.frameController.update();

        this.frameController.activeFrame.renderer.render(this.sceneController.scene, this.sceneController.camera)
        requestAnimationFrame(this.render.bind(this));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let game = new Game()
});

export {Game}