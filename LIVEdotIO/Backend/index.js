/**
 * Created by Shafeen M on 6/16/15.
 */


// LIVEdotIO model
function LDIModel(eventName, headingVal, para1Val, para2Val) {
    this["divHead_"+eventName] = headingVal;
    this["divPara1_"+eventName] = para1Val;
    this["divPara2_"+eventName] = para2Val;
}

var express = require('express');
// main code for index.js starts here
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// serve all static files from the ../Frontend/ directory
app.use(express.static('../Frontend/'));

io.on('connection', function(socket) {
    console.log('a client connected');

    socket.on('disconnect', function() {
        console.log('a client disconnected');
    });

    // we want the Frontend to be able to do 3 things:
    // - add or update new or existing LIVEdotIO view - 'a'
    // - remove an active LIVEdotIO view - 'r'
    //
    // we should be able to decide the update intervals of the functions

    // view addition/updates
    var UPDATE_EVENT_INTERVAL = 3000;
    setInterval(function() {
        var eventInfoObj = {};
        eventInfoObj.eventName = "publishEvent";
        // the model will contain the relevant data (or messages) to show in the frontend views
        // NOTE: model's eventName postfix MUST match the eventName sent in the msg object
        eventInfoObj.ldiModel = new LDIModel(eventInfoObj.eventName,
            "Head",
            new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            (new Date()).toDateString() );
        eventInfoObj.message = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        // addition/update event
        socket.emit('a', eventInfoObj);
    }, UPDATE_EVENT_INTERVAL);

    // view removals, they don't require a message (and may not be required)
    var REMOVAL_EVENT_INTERVAL = 7000;
    setInterval(function() {

        var eventInfoObj = {};
        eventInfoObj.eventName = "mydiv3";
        // removal event
        socket.emit('r', eventInfoObj);
    }, REMOVAL_EVENT_INTERVAL);

});

http.listen(3000, function() {
    console.log('listening on port 3000');
});



