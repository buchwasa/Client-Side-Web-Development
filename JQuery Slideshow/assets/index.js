"use strict";

let currentPosition = 0;
function changeImage() {
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

    $("#tree-type").effect("fade", undefined, 1375, function() {
        $("#tree-type").text(images[currentPosition][0]);
    });

    $("#tree").effect("fold", undefined, 1000, function() {
        $("#tree").attr("src", images[currentPosition][1]);
        $("#tree").removeAttr( "style" ).hide().fadeIn();
    });
}

function callNext() {
    currentPosition++;
    changeImage();
}

function callPrevious() {
    currentPosition--;
    changeImage();
}

$(document).ready(function() {
    $("#next").click(callNext);
    $("#previous").click(callPrevious);
})
