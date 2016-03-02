// TODO: namespace all of these functions

var redisKeyInput = $('#redisKeyInput');
var redisKeyLabels = $('#redisKeyLabels');

function getIdFromValue(value) {
    return "key_" + value;
}

// TODO: break out the utility functions to their own files
function addRedisKeyLabel(redisKey) {
    var redisKeyLabelTemplate = Handlebars.compile($('#redisKeyLabel-template').html());
    var redisKeyLabel = $(redisKeyLabelTemplate({redisKey: redisKey}));
    redisKeyLabel.hide();
    redisKeyLabels.append(redisKeyLabel);
    redisKeyLabel.fadeIn();
}

function removeRedisKeyLabel(redisKey) {
    var redisKeyLabel = $('#'+getIdFromValue(redisKey));
    if(redisKeyLabel.length) {
        // remove label gap and label after fading out
        redisKeyLabel.fadeOut("slow", function() {
            $(this).next().remove();
            $(this).remove();
        });
    }
    return (redisKeyLabel.length != 0);
}

function getKeyTypeSelected() {
    var keyTypeSelected = "KEY";
    var keyTypeSelector = $("#keyTypeSelector");
    if(keyTypeSelector) {
        keyTypeSelected = keyTypeSelector.children()[keyTypeSelector.selectedIndex].text;
    }
    return keyTypeSelected;
}

function trackKey() {
    if(!redisKeyInput.val()) {
        alert("Type in a key first!");
    } else if($('#'+getIdFromValue(redisKeyInput.val())).length) {
        alert("That key is already being tracked!");
        redisKeyInput.val("");
    } else {
        // TODO: don't allow whitespaces in keys
        var redisKey = redisKeyInput.val();
        redisKeyInput.val("");

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
    var redisKey = redisKeyInput.val();
    redisKeyInput.val("");

    if(removeRedisKeyLabel(redisKey) == true) {
        // Send the key to the backend to stop tracking it
        var socket = io();
        socket.emit('removeKey', redisKey);
    } else {
        alert("No such key being tracked!")
    }
}
