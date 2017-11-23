import {Scene} from './sceneController';

let SceneData : Map<string, Scene> = new Map<string, Scene>();

SceneData.set("scene1", {
    name : "",
    sceneUrl : "models/scenes/anim-test-trees.glb",
    thumbnailUrl : "assets/forest_concept_001.png",
    options :  ["scene2", "scene3", "scene4", "scene5"],
    captions : ["S01: choice 1", "S01: choice 2", "S01: choice 3", "S01: choice 4"]
})

SceneData.set("scene2", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat1.jpg",
    options :  ["scene3", "scene4", "scene5", "scene1"],
    captions : ["S02: choice 1", "S02: choice 2", "S02: choice 3", "S02: choice 4"]
})

SceneData.set("scene3", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat2.jpg",
    options :  ["scene4", "scene5", "scene1", "scene2"],
    captions : ["S03: choice 1", "S03: choice 2", "S03: choice 3", "S03: choice 4"]
})

SceneData.set("scene4", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat3.jpg",
    options :  ["scene5", "scene1", "scene2", "scene3"],
    captions : ["S04: choice 1", "S04: choice 2", "S04: choice 3", "S04: choice 4"]
})

SceneData.set("scene5", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat4.jpg",
    options :  ["scene1", "scene2", "scene3", "scene4"],
    captions : ["S05: choice 1", "S05: choice 2", "S05: choice 3", "S05: choice 4"]
})

export {SceneData}