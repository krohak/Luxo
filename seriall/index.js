const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
})


function writeSerial(){
	port.write('a\n', function(err) {
	  if (err) {
	    return console.log('Error on write: ', err.message)
	  }
	  console.log('message written')
	})
}

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

setTimeout(writeSerial, 3000);




