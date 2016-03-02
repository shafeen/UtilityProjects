// namespace containing ldr-front functions
window.ldr = window.ldr || {};

(function(ldr) {
    var redisKeyInput = $('#redisKeyInput');
    var redisKeyLabels = $('#redisKeyLabels');

    ldr.getIdFromValue = function(value) {
        return "key_" + value;
    };

    // TODO: break out the utility functions to their own files
    ldr.addRedisKeyLabel = function (redisKey) {
        var redisKeyLabelTemplate = Handlebars.compile($('#redisKeyLabel-template').html());
        var redisKeyLabel = $(redisKeyLabelTemplate({redisKey: redisKey}));
        redisKeyLabel.hide();
        redisKeyLabels.append(redisKeyLabel);
        redisKeyLabel.fadeIn();
    };

    ldr.removeRedisKeyLabel = function(redisKey) {
        var redisKeyLabel = $('#'+ldr.getIdFromValue(redisKey));
        if(redisKeyLabel.length) {
            // remove label gap and label after fading out
            redisKeyLabel.fadeOut("slow", function() {
                $(this).next().remove();
                $(this).remove();
            });
        }
        return (redisKeyLabel.length != 0);
    };

    ldr.getKeyTypeSelected = function() {
        var keyTypeSelected = "KEY";
        var keyTypeSelector = $("#keyTypeSelector");
        if(keyTypeSelector) {
            keyTypeSelected = keyTypeSelector.children()[keyTypeSelector.selectedIndex].text;
        }
        return keyTypeSelected;
    };

    ldr.trackKey = function() {
        if(!redisKeyInput.val()) {
            alert("Type in a key first!");
        } else if($('#'+ldr.getIdFromValue(redisKeyInput.val())).length) {
            alert("That key is already being tracked!");
            redisKeyInput.val("");
        } else {
            // TODO: don't allow whitespaces in keys
            var redisKey = redisKeyInput.val();
            redisKeyInput.val("");

            ldr.addRedisKeyLabel(redisKey);

            var keyTypeSelected = ldr.getKeyTypeSelected();
            // Send the key to the backend to track it
            var socket = io();
            if(keyTypeSelected == "KEY") {
                socket.emit('trackKey', redisKey);
            } else if(keyTypeSelected == "HKEY") {
                socket.emit('trackHKey', redisKey);
            }
        }
    };

    ldr.removeKey = function() {
        var redisKey = redisKeyInput.val();
        redisKeyInput.val("");

        if(ldr.removeRedisKeyLabel(redisKey) == true) {
            // Send the key to the backend to stop tracking it
            var socket = io();
            socket.emit('removeKey', redisKey);
        } else {
            alert("No such key being tracked!")
        }
    };
})(window.ldr);
