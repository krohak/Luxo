var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;






console.log("hey")


const event = require('./js/events/events')
const mic = require('./js/senses/mic')


var listen = null
if(process.env.OS !== 'unsupported'){
  listen = require('./js/senses/listen')
  listen.startListening()
}

// const Eyes = require('./js/face/eyes')
// const speak = require('./js/senses/speak')
// const buttons = require('./js/senses/buttons')
// const remote = require('electron').remote
// const weather = require('./js/skills/weather')



const listeners = require('./js/events/listeners')()

//initiate leds
const leds = require('./js/senses/leds')
const servo = require('./js/senses/servo')
// event.emit('led-on', {anim: 'blink', color: 'aqua'})

// keyboard shortcuts
// document.addEventListener("keydown", (e)=>{
// 	if(e.which == 123){
// 		//F12 show js console
// 		// remote.getCurrentWindow().toggleDevTools()
// 	} else if(e.which == 116){
// 		//F5 refresh page
// 		location.reload()
// 	}
// })

// set audio levels
// event.emit('set-volume',0.4)

// initiate eyes
// const eyes = new Eyes()

// event.emit('show-div', 'eyeWrapper')
// event.emit('start-blinking')

setTimeout(()=>{
	
},3000)

// initiate buttons
// buttons.initializeButtons()



// // initiate camera
// const camera = require('./js/senses/camera')

// initiate listening or show wakeword button
// if(process.env.OS == 'unsupported'){
// 	document.getElementById("wakeword").addEventListener('click', (e) => {
// 		e.preventDefault()
// 		document.getElementById("wakeword").style.backgroundColor = "red"
// 		event.emit('wakeword')
// 	})
// } else {
// 	listen.startListening()
// 	document.getElementById("wakeword").style.display = "none"
// }
