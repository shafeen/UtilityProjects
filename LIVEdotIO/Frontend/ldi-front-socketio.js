// parent html file MUST include the socket.io client library

var socket = io();

// LDIView removal code
socket.on('r', function(infoObj) {
    removeLDIView(infoObj.eventName)
});

// LDIView addition/update code
socket.on('a', function(infoObj) {
    // check if the view already exists (view IDs will be named after the event)
    var viewToAdd = document.getElementById(infoObj.eventName);
    if(viewToAdd == null) { // if it does not exist -> create it first
        addNewLDIView(infoObj.eventName);
    }
    // update the LIVEdotIO view with the message in the object
    updateLDIViewData(infoObj.ldiModel);
});