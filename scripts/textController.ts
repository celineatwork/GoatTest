import { Game } from './../app'
import {Scene} from './sceneController';

class TextController {
    game : Game;

    // option list
    optionContainer : HTMLUListElement;
    optionBoxes : TextBox[];

    constructor(game : Game){
        this.game = game;
        this.optionContainer = document.createElement("ul");
        this.optionBoxes = new Array<TextBox>();

        this.optionContainer.className = "options"

        // create option boxes as list elements
        for (var i = 0; i < this.game.maxOptionCount; i++){
            this.optionBoxes.push(new TextBox(game, this.optionContainer));
        }

        // add option boxes to game element
        this.game.container.appendChild(this.optionContainer);
    }

    prepareText(scene : Scene){
        for (var i = 0; i < this.game.maxOptionCount; i++){
            var textBox = this.optionBoxes[i];

            var caption = scene.captions[i];
            var sceneName = scene.options[i];

            if (caption && textBox){
                textBox.setOption(sceneName, caption);
            }
        }
    }
    
    showOptions(){
        // called from game.sceneFinished
        this.optionContainer.className += " active";
    }

    hideOptions(){
        console.log("test");
        this.optionContainer.className = "options";
    }
}

class TextBox{
    game : Game;
    container : HTMLLIElement;
    text: HTMLSpanElement;
    data : string;

    constructor(game : Game, container : HTMLUListElement){
        var self = this;

        this.container = document.createElement("li");
        this.text = document.createElement("span");

        this.container.className = "textbox";
        this.container.addEventListener("click", function(){
            // game.sceneController.loadScene(self.data);
            game.sceneSelected(self.data);
        });

        this.container.appendChild(this.text);
        container.appendChild(this.container)
    }

    setOption(data: string, text:string){
        this.text.textContent = text;
        this.data = data;
    }
}

export {TextBox, TextController}