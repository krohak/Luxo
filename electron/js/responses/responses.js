
const event = require('../../js/events/events')

module.exports = {

	confused: {
		localFolder: 'confused',
		queryTerms: ['shrug', 'confused', 'dont know'],
		servo: 'sit',
		led: {
			anim: 'blink',
			color: 'orange'
		},
		sound: null
	},

	greeting: {
		localFolder: 'greeting',
		queryTerms: ['hello','hi','howdy','sup','whatsup'],
		servo: 'hello',
		led: {
			anim: 'blink',
			color: 'green'
		},
		sound: null
	},

	expressions: {
		localFolder: 'greeting',
		queryTerms: ['hello','hi','howdy','sup','whatsup'],
		servo: 'dance',
		led: {
			anim: 'party',
			color: 'green'
		},
		sound: null
	},

	love: {
		localFolder: 'greeting',
		queryTerms: ['hello','hi','howdy','sup','whatsup'],
		servo: 'stand',
		led: {
			anim: 'set',
			color: 'pink'
		},
		sound: null
	},

	sad: {
		localFolder: 'greeting',
		queryTerms: ['hello','hi','howdy','sup','whatsup'],
		servo: 'sit',
		led: {
			anim: 'set',
			color: 'blue'
		},
		sound: null
	},

	handsome: {
		localFolder: 'greeting',
		queryTerms: ['hello','hi','howdy','sup','whatsup'],
		servo: 'hello',
		led: {
			anim: 'blink',
			color: 'red'
		},
		sound: null
	},

	wakeword: {
		localFolder: null,
		queryTerms: null,
		servo: 'alert',
		led: {
			anim:'circle',
			color: 'aqua'
		},
		sound: 'alert.wav',
		cb: function(){
			event.emit('speech-to-text')
		}
	}
}