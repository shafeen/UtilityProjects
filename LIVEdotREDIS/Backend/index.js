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

    // LIVEdotREDIS key tracking code
    var redisKeys = [];

    socket.on('trackKey', function(trackKey) {
        redisKeys.push(trackKey);
        console.log("Tracking redis keys: ");
        redisKeys.forEach(function(key) {
            console.log("\t" + key);
        });
    });

    socket.on('removeKey', function(removeKey) {
        var index = redisKeys.indexOf(removeKey);
        if(index >= 0) {
            console.log("Stop tracking key: " + removeKey);
            redisKeys.splice(index, 1);

            var eventInfoObj = {};
            eventInfoObj.eventName = removeKey;
            io.emit('r', eventInfoObj);
        }
        console.log("Tracking redis keys: ");
        redisKeys.forEach(function(key) {
            console.log("\t" + key);
        });
    });


    // provide an update for each of the keys we're tracking
    // this goes without saying but you should have a REDIS server running
    var REDIS_POLL_INTERVAL= 1000;
    setInterval(function() {
        // init redis client
        var redis = require("redis");
        var client = redis.createClient();
        client.on("error", function (err) {
            console.log("Error " + err);
        });

        redisKeys.forEach(function(key) {
            client.get(key, function (err, reply) {
                var eventInfoObj = {};
                // NOTE: model's eventName MUST match the eventName used to send the ldiModel object
                eventInfoObj.eventName = key;
                if(reply) {
                    //console.log(key + " => "+ reply.toString());
                    eventInfoObj.ldiModel = createLDIModel(eventInfoObj.eventName, key, reply, "" );
                    // addition/update event
                    io.emit('a', eventInfoObj);
                } else { // key must no longer exist so remove frontend view
                    io.emit('r', eventInfoObj);
                }
            });
        });
        client.quit();
    }, REDIS_POLL_INTERVAL);

});



http.listen(3000, function() {
    console.log('listening on port 3000');
});









