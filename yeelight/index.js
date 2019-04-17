var Yeelight = require('node-yeelight');
var y = new Yeelight;

y.on('ready', function() {
	console.log('ready');
	y.discover();
});

y.on('deviceadded', function(device) {
	console.log('device added');

	y.connect(device);
});

y.on('deviceconnected', function(device) {
	console.log('device connected');

	var state = 0;
	var brightness = 100;
	colors = [
		[255, 255, 0],
		[0, 255, 255],
		[255, 0, 255]
	]
	setInterval(function() {
		// y.setPower(device, state, 300);
		// state = state ? false : true;

		console.log(brightness)

		y.setBrightness(device, brightness, 300);
		y.setRGB(device, colors[state] ,300)

		brightness = brightness == 0? 100 : brightness-10;
		
		
		state = (state+1)%3;
	}, 3000);
});

y.listen();