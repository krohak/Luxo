// var dgram = require('dgram');
// var socket = dgram.createSocket('udp4');

device = {
    port: 55443,
    host: "192.168.1.3"
}

var net = require('net');
socket = new net.Socket();

socket.connect(device.port, device.host, function() {
    
    var speed = 200;
    var rgb = [255,255,255]


    speed = speed || 3000;

    var rgb_dec = (rgb[0] * 65536) + (rgb[1] * 256) + rgb[2];
    
    
    var command = {
        id: 1,
        method: 'set_rgb',
        params: [rgb_dec, 'smooth', speed]
    };
    
    var message = JSON.stringify(command);
    
    socket.write(message + '\r\n');

})



