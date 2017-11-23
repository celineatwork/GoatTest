/// <reference path="./index.d.ts"/>

import * as THREE from 'three'
import * as GLTFLoader from 'three-gltf2-loader'

GLTFLoader(THREE)

declare module 'three' {
export var GLTFLoader: any
}

export default THREE