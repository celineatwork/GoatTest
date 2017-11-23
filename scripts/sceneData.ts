import {Scene} from './sceneController';

let SceneData : Map<string, Scene> = new Map<string, Scene>();

SceneData.set("scene1", {
    name : "",
    sceneUrl : "models/scenes/anim-test-trees.glb",
    thumbnailUrl : "assets/forest_concept_001.png",
    options :  ["scene2", "scene3", "scene4", "scene5"],
    captions : ["choice 1 (S2)", "choice 2 (S3)", "choice 3 (S4)", "choice 4 (S5)"]
})

SceneData.set("scene2", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat1.jpg",
    options :  ["scene3", "scene4", "scene5", "scene1"],
    captions : ["choice 1 (S3)", "choice 2 (S4)", "choice 3 (S5)", "choice 4 (S1)"]
})

SceneData.set("scene3", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat2.jpg",
    options :  ["scene4", "scene5", "scene1", "scene2"],
    captions : ["choice 1 (S4)", "choice 2 (S5)", "choice 3 (S1)", "choice 4 (S2)"]
})

SceneData.set("scene4", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat3.jpg",
    options :  ["scene5", "scene1", "scene2", "scene3"],
    captions : ["choice 1 (S5)", "choice 2 (S1)", "choice 3 (S2)", "choice 4 (S3)"]
})

SceneData.set("scene5", {
    name : "",
    sceneUrl : "models/scenes/wobble.glb",
    thumbnailUrl : "assets/goat4.jpg",
    options :  ["scene1", "scene2", "scene3", "scene4"],
    captions : ["choice 1 (S1)", "choice 2 (S2)", "choice 3 (S3)", "choice 4 (S4)"]
})

export {SceneData}