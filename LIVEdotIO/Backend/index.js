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

    setInterval(function() {
        io.emit('m1',
            new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    }, 1000);

    setInterval(function() {
        io.emit('m2',
            new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
    }, 1500);

    //setInterval(function () {
    //    var sys = require('sys');
    //    var exec = require('child_process').exec;
    //    function puts(error, stdout, stderr) {
    //        sys.puts(stdout);
    //    }
    //    exec("ls -la", puts);
    //}, 1000);

});





http.listen(3000, function() {
    console.log('listening on port 3000');
});
