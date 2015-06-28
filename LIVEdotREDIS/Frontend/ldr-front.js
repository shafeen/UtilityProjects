var redisKeyInput = document.getElementById("redisKeyInput");
var redisKeyLabels = document.getElementById("redisKeyLabels");

function getIdFromValue(value) {
    return "key_" + value;
}


function trackKey() {
    if(!redisKeyInput.value) {
        alert("Type in a key first!");
    } else if(document.getElementById(getIdFromValue(redisKeyInput.value))) {
        alert("That key is already being tracked!");
        redisKeyInput.value = "";
    } else {
        // TODO: don't allow whitespaces in keys
        var redisKey = redisKeyInput.value;
        redisKeyInput.value = "";

        var redisKeyLabel = document.createElement("label");
        redisKeyLabel.id = getIdFromValue(redisKey);
        redisKeyLabel.appendChild(document.createTextNode(redisKey));

        var redisKeyGap = document.createElement("label");
        redisKeyGap.appendChild(document.createTextNode(" "));

        redisKeyLabels.appendChild(redisKeyLabel);
        redisKeyLabels.appendChild(redisKeyGap);

        // Send the key to the backend to track it
        var socket = io();
        socket.emit('trackKey', redisKey);

    }
}    

function removeKey() {
    var redisKey = redisKeyInput.value;
    redisKeyInput.value = "";

    var redisKeyLabel = document.getElementById(getIdFromValue(redisKey));
    if(redisKeyLabel) {
        redisKeyLabels.removeChild(redisKeyLabel);

        // Send the key to the backend to stop tracking it
        var socket = io();
        socket.emit('removeKey', redisKey);

    } else {
        alert("No such key being tracked!")
    }
}
