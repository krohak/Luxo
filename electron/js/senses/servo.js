const path = require('path')
const fs = require('fs')
const event = require('../../js/events/events')
const os = require('os')


class Servo {

	constructor(){
		this.pwm = null
		this.servoTimer = null
		this.playbackRate = 33 //ms
		this.servoRestAngle = 1500

		this.animate = this.animate.bind(this)
		this.reset = this.animate.bind(this)

		event.on('servo-move', this.animate)
		event.on('servo-reset', this.reset)
		
		
	}

	animate(animName){
		console.log(animName)

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