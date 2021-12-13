"use strict";

let currentPosition = 0;
function changeImage() {
    let tree = document.getElementById("tree");
    let treeType = document.getElementById("tree-type");
    let images = [
        ["Apple", "assets/images/apple-tree.jpg"],
        ["Oak", "assets/images/oak-tree.jpg"],
        ["Pear", "assets/images/pear.jpg"],
        ["Pine", "assets/images/pine.jpg"],
        ["Walnut", "assets/images/walnut.jpg"],
        ["Weeping Willow", "assets/images/weeping-willow.jpg"]
    ];

    if (currentPosition >= images.length) {
        currentPosition = 0;
    }

    if (currentPosition < 0) {
        currentPosition = images.length - 1;
    }

    treeType.innerText = images[currentPosition][0];
    tree.src = images[currentPosition][1];
}

function callNext() {
    currentPosition++;
    changeImage();
}

function callPrevious() {
    currentPosition--;
    changeImage();
}

function init() {
    "use strict";
    document.getElementById("next").onclick = callNext;
    document.getElementById("previous").onclick = callPrevious;
}

window.onload = init;