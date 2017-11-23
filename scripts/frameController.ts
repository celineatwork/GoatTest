import { Game } from './../app';
import { WebGLRenderer } from 'three';
import {Scene} from './sceneController';
import { SceneData } from './sceneData';

class Frame{
    game : Game;

    renderer : WebGLRenderer;
    container : HTMLDivElement;
    overlay : HTMLDivElement;
    data : Scene;

    targetWidth : number;
    targetHeight : number;
    sizingFactor : number = 0.1;
    active : boolean = false;

    constructor (game : Game){
        this.game = game;

        this.renderer = new WebGLRenderer();
        this.container = document.createElement('div');
        this.overlay = document.createElement('div');

        // container has a canvas and an overlay
        this.container.className = "frame hidden";
        this.overlay.className = "overlay";
        this.container.appendChild(this.renderer.domElement)
        this.container.appendChild(this.overlay);

        // add rudimentary click method
        this.overlay.addEventListener("click", function(){
            game.playScene();
        });
    }

    makeActive(){
        this.container.className = "frame active";
        
        // this.targetWidth = window.innerWidth;
        // this.targetHeight = window.innerWidth / 2;
        this.renderer.setSize(window.innerWidth, window.innerWidth / 2);
        
        this.sizingFactor = 0.1
        this.active = true;
    }

    makeInactive(){
        this.container.className = "frame hidden";
        
        // this.targetWidth = 300;
        // this.targetHeight = 150;
        this.renderer.setSize(0, 0);
        
        this.sizingFactor = 0.1
        this.active = false;
    }

    // checkSize(){
        // var size = this.renderer.getSize();
        // if(this.targetWidth != size.width || this.targetHeight != size.height){
        //     var wDiff = (this.targetWidth - size.width) * this.sizingFactor;
        //     var hDiff = (this.targetHeight - size.height) * this.sizingFactor;

        //     // console.log(size.width + wDiff, size.height + hDiff);
        //     this.renderer.setSize(size.width + wDiff, size.height + hDiff);
        //     this.sizingFactor += 0.1;
        // }
    // }

    attachScene(scene : Scene){
        this.data = scene;
        this.loadThumbnail(this.data.thumbnailUrl);
    }

    loadThumbnail(url : string){
        this.overlay.style.backgroundImage = "url(" + url;
    }

    playScene(){
        this.container.className = "frame active playing";
    }

    update(){
        // this.checkSize();
    }
}

class FrameController{
    game : Game;
    frames : Frame[];

    container : HTMLDivElement;
    activeFrame : Frame;

    constructor(game : Game){
        this.game = game;
        this.frames = new Array<Frame>();

        // make a div container that holds all the frames
        this.container = document.createElement('div');
        this.container.className = "frameController";
        this.game.container.appendChild(this.container);

        for (var i = 0; i < this.game.maxOptionCount + 1; i++){
            var f = new Frame(game)
            this.container.appendChild(f.container);
            this.frames.push(f);
        }

        // make the first frame the active frame
        this.activeFrame = this.frames[0];
        this.activeFrame.makeActive();
    }

    prepareFrames(scene : Scene){
        for (var i = 0; i < this.game.maxOptionCount + 1; i++){
            var frameObj = this.frames[i];
            var sceneOption = SceneData.get(scene.options[i]);

            if (!frameObj.active && sceneOption){
                frameObj.attachScene(sceneOption);
            }
        }

        this.activeFrame.loadThumbnail(scene.thumbnailUrl);
    }

    sceneSelected(sceneName: string){
        for(var i = 0; i < this.game.maxOptionCount + 1; i++) {
            var frameObj = this.frames[i];
            if (frameObj.data){
                console.log(frameObj.data.name);
                
                if (frameObj.data.name == sceneName){
                    console.log(i);
                    
                    // make that frame active
                    this.activeFrame.makeInactive();
                    frameObj.makeActive();
                    this.activeFrame = frameObj;
                    break;
                }
            }
        }

        this.game.loadScene(this.activeFrame.data);
    }

    moveFrames(){
    }

    playScene(){
        this.activeFrame.playScene();
    }

    update(){
        // for (let f of this.frames){
        //     f.update();
        // }

    }

}

export {Frame, FrameController}