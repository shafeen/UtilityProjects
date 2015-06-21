/**
 * Created by SHAFEEEENZZ on 6/16/15.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile('/Frontend/index.html', { root: '../' });
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
    // we want to be able to decide the update intervals of the functions

    // TODO: send add/updates through one event and removals on another event
    setInterval(function() {
        var eventInfoObj = {};
        eventInfoObj.eventName = "mydiv3";
        eventInfoObj.message = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        // addition/update event
        io.emit('a', eventInfoObj);
    }, 3000);

    setInterval(function() {
        var eventInfoObj = {};
        eventInfoObj.eventName = "mydiv3";
        eventInfoObj.message = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        // removal event
        io.emit('r', eventInfoObj);
    }, 7000);

});





http.listen(3000, function() {
    console.log('listening on port 3000');
});
