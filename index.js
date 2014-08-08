var five = require("johnny-five"),
	board = new five.Board();

var Photoresistor = require('./helper/Photoresistor'),
	LightTracker = require('./helper/LightTracker');

board.on("ready", function() {

	// 2 servos (tilt and pan)
	var tilt = new five.Servo(9),
		pan = new five.Servo(10);

	board.repl.inject({
		tilt: tilt,
		pan: pan
	});

	tilt.center();
	pan.center();

	// 4 photoresitors (one per analog pin)
	// Physically arranged as per below:
	// ---------
	// | 0 | 1 |
	// ---------
	// | 2 | 3 |
	// ---------
	var resistors = ['A0', 'A1', 'A2', 'A3'].map(function(pin) {
		return new Photoresistor(pin);
	});

	//
	var lightTracker = new LightTracker(),
		panMinValue = 20;

	setTimeout(function() {
		setInterval(function() {
			var values = resistors.map(function(resistor) {
				return Math.round(resistor.brightness);
			});

			var offset = lightTracker.setValues(values).getOffset(),
				tiltOffset = offset.tilt,
				panOffset = -offset.pan;

			tilt.step(offset.tilt);

			if (!(panOffset == -1 && pan.value == panMinValue)) {
				pan.step(-offset.pan);
			}

			console.log(lightTracker.toString());
			console.log('[tilt] value', tilt.value, 'offset', offset.tilt);
			console.log('[pan] value', pan.value, 'offset', -offset.pan);
		}, 25)
	}, 1000);

});