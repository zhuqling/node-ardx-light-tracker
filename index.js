var five = require("johnny-five"),
	board = new five.Board();

var Photoresistor = require('./helper/Photoresistor'),
	LightTracker = require('./helper/LightTracker');

board.on("ready", function() {

	// 2 servos (vertical and horizontal)
	var servoVertical = new five.Servo(9),
		servoHorizontal = new five.Servo(10);

	board.repl.inject({
		servoVertical: servoVertical,
		servoHorizontal: servoHorizontal
	});

	servoVertical.center();
	servoHorizontal.center();

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

	setInterval(function() {
		var values = resistors.map(function(resistor) {
			return Math.round(resistor.brightness);
		});

		// TODO: Update code so `lightTracker` can be instanciated outside this function
		var lightTracker = new LightTracker(values),
			directions = lightTracker.getDirections();

		// TODO: Use object properties instead of array (be descriptive)
		servoHorizontal.step(directions[0]);
		servoVertical.step(directions[1]);

		console.log(lightTracker.toString());
		console.log('[directions] h, v', lightTracker.getDirections());
		console.log('[vertical servo] current value', servoVertical.value);
		console.log('[horizontal servo] current value', servoHorizontal.value);
	}, 250);

});