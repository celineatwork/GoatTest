"use strict";
class MyClass {

  load(url) {
    var loader = new THREE.GTLFLoader();
    loader.load(url, function(data){
        return data;
    })
  }

}
exports.default = MyClass;