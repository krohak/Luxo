// const dotstar = require('js/lib/dotstar')
const os = require('os')
const event = require('../../js/events/events')

var Yeelight = require('node-yeelight');


class Leds {

	constructor() {

		this.colors = {
			"red":[255,0,0],
			"green":[0,255,0],
			"blue":[0,0,255],
			"aqua":[0,255,255],
			"purple":[190,64,242],
			"orange":[239,75,36],
			"yellow":[255,215,18],
			"pink":[244,52,239],
			"white":[255,255,255]
		}

		this.playAnimation = this.playAnimation.bind(this)
		this.off = this.off.bind(this)
		this.returnDevice = this.returnDevice.bind(this)
		this.setDevice = this.setDevice.bind(this)
		this.device = null

		var y = new Yeelight;
		
		y.on('ready', function() {
			console.log('ready');
			y.discover();
		});
		
		y.on('deviceadded', function(device) {
			console.log('device added');
		
			y.connect(device);
		});
		
		this.y = y;

		this.returnDevice(this.setDevice)

		// console.log(this.device)

		this.y.listen();

	}

	returnDevice(setDevice){

		this.y.on('deviceconnected', function(device) {
			console.log('device connected');
			setDevice(device)
		})
	}

	setDevice(device){
		this.device = device
		event.on('led-on', this.playAnimation)
		event.on('led-off', this.off)
		this.on("white", 50)
	}

	playAnimation(anim){
		// @param {obj} anim - contains keys for anim type and color
		this[anim.anim](anim.color)
	}

	party(color='red', time=400, count=17, brightness=70, colordict=this.colors){
		let colorCount = 0
		let numcolors = Object.keys(colordict).length

		function* colorYield (){
			console.log()
			let colornames_twice = Object.keys(colordict).concat(Object.keys(colordict))

			for (var key of colornames_twice){
				console.log(key)
				yield key;
			}
		}

		var colorIterator = colorYield();
		
		let blinkInterval = setInterval(() => {

			this.on(colorIterator.next().value, brightness)

			colorCount++

			if(colorCount>count){
				clearInterval(blinkInterval)
				blinkInterval = null
				this.off()
			}
		}, time)
		
	}

	blink(color='red', time=500, count=5, brightness=50) {
		let blinkCount = 0

		let blinkInterval = setInterval(() => {
			if(blinkCount%2==0){
				this.on(color, brightness)
			} else {
				this.off()
			}

			blinkCount++

			if(blinkCount>count){
				clearInterval(blinkInterval)
				blinkInterval = null
				this.off()
			}
		}, time)
	}

	wakeword(color="white", brightness=100){
		if(!this.colors.hasOwnProperty(color)){
			console.error(`Color ${color} has not been set`)
			return
		}

		if(this.device){
			// console.log(this.device)
			console.log(`On leds with ${color}`)
			this.y.setBrightness(this.device, brightness, 300);
			this.y.setRGB(this.device, this.colors[color], 300)
		}
	}
	
	on(color, brightness=50){
		if(!this.colors.hasOwnProperty(color)){
			console.error(`Color ${color} has not been set`)
			return
		}

		if(this.device){
			// console.log(this.device)
			console.log(`On leds with ${color}`)
			this.y.setBrightness(this.device, brightness, 300);
			this.y.setRGB(this.device, this.colors[color], 300)
		}
	}

	off(){
		if(this.device){
			console.log("Off leds")
			this.y.setPower(this.device, false, 300)
		}	
	}
}

// make singleton
const leds = new Leds()


module.exports = leds