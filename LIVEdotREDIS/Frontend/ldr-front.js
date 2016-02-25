var redisKeyInput = document.getElementById("redisKeyInput");
var redisKeyLabels = document.getElementById("redisKeyLabels");

function getIdFromValue(value) {
    return "key_" + value;
}

// TODO: break out the utility functions to their own files
function addRedisKeyLabel(redisKey) {
    // Add a label to indicate that we are tracking this key
    var redisKeyLabel = $('<label></label>');
    redisKeyLabel.attr("id", getIdFromValue(redisKey));
    redisKeyLabel.append(redisKey);
    redisKeyLabel.hide();
    $(redisKeyLabels).append(redisKeyLabel);
    redisKeyLabel.fadeIn();
    var redisKeyGap = $('<label> </label>');
    $(redisKeyLabels).append(redisKeyGap);
}

function removeRedisKeyLabel(redisKey) {
    var redisKeyLabel = document.getElementById(getIdFromValue(redisKey));
    if(redisKeyLabel) {
        // remove label gap and label after fading out
        $(redisKeyLabel).fadeOut("slow", function() {
            $(this).next().remove();
            $(this).remove();
        });
    }
    return (redisKeyLabel != null);
}


function getKeyTypeSelected() {
    var keyTypeSelected = "KEY";
    var keyTypeSelector = document.getElementById("keyTypeSelector");
    if(keyTypeSelector) {
        keyTypeSelected = keyTypeSelector.options[keyTypeSelector.selectedIndex].text;
    }
    return keyTypeSelected;
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

        addRedisKeyLabel(redisKey);

        var keyTypeSelected = getKeyTypeSelected();
        // Send the key to the backend to track it
        var socket = io();
        if(keyTypeSelected == "KEY") {
            socket.emit('trackKey', redisKey);
        } else if(keyTypeSelected == "HKEY") {
            socket.emit('trackHKey', redisKey);
        }
    }
}

function removeKey() {
    var redisKey = redisKeyInput.value;
    redisKeyInput.value = "";

    if(removeRedisKeyLabel(redisKey) == true) {
        // Send the key to the backend to stop tracking it
        var socket = io();
        socket.emit('removeKey', redisKey);
    } else {
        alert("No such key being tracked!")
    }
}
