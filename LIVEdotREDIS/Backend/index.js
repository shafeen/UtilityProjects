/**
 * Created by Shafeen M on 6/16/15.
 */


// LIVEdotIO model
function createLDIModel(eventName, headingVal, para1Val, para2Val) {
    var ldiModel = {};
    ldiModel["divHead_"+eventName] = headingVal;
    ldiModel["divPara1_"+eventName] = para1Val;
    ldiModel["divPara2_"+eventName] = para2Val;
    return ldiModel;
}

var express = require('express');
// main code for index.js starts here
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile('/Frontend/index.html', { root: '../' });
});
app.get('/ldr-front.js', function (req, res) {
    res.sendFile('/Frontend/ldr-front.js', { root: '../' });
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('a user disconnected');
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
        eventInfoObj.ldiModel = createLDIModel(eventInfoObj.eventName,
            "Head",
            new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            (new Date()).toDateString() );
        eventInfoObj.message = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        // addition/update event
        io.emit('a', eventInfoObj);
    }, UPDATE_EVENT_INTERVAL);

    // view removals, they don't require a message (and may not be required)
    var REMOVAL_EVENT_INTERVAL = 7000;
    setInterval(function() {

        var eventInfoObj = {};
        eventInfoObj.eventName = "mydiv3";
        // removal event
        io.emit('r', eventInfoObj);
    }, REMOVAL_EVENT_INTERVAL);

});



http.listen(3000, function() {
    console.log('listening on port 3000');
});









