const path = require('path')
const fs = require('fs')
const event = require('../../js/events/events')
const os = require('os')
const SerialPort = require('serialport')

class Servo {

	constructor(){
		// this.pwm = null
		// this.servoTimer = null
		// this.playbackRate = 33 //ms
		// this.servoRestAngle = 1500
		this.port = new SerialPort('/dev/ttyACM0', {
			baudRate: 9600
		  })
		
		  // Open errors will be emitted as an error event
		this.port.on('error', function(err) {
			console.log('Error: ', err.message)
		})
		  

		this.animate = this.animate.bind(this)
		this.reset = this.animate.bind(this)

		event.on('servo-move', this.animate)
		event.on('servo-reset', this.reset)
		
		
	}

	animate(animName){
		console.log(animName.animName)
		
		let command = ""
		if (animName.animName == "hello"){
			command = "a\n"

		}
		else if(animName.animName == "dance"){
			command = "b\n"
		}

		else if(animName.animName == "sit"){
			command = "c\n"
		}

		else if(animName.animName == "stand"){
			command = "d\n"
		}

		this.port.write(command, function(err) {
			if (err) {
			  return console.log('Error on write: ', err.message)
			}
			console.log('message written')
		  })

	}

	reset(){

		console.log("servo reset")
	}

	servoPlayback(animData){
		console.log(animData)

	}
}

//make singleton
const servo = new Servo()
// Object.freeze(servo)

module.exports = servo
