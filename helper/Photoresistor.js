'use strict';

module.exports = function(pin) {
	var self = this;

	this.sensor = new five.Sensor({
		pin: pin,
		freq: 250
	});

	this._dataHandler = function(err, value) {
		// range of brightness is 0 - 255
		self.brightness = 255 - five.Fn.constrain(five.Fn.map(value, 0, 900, 0, 255), 0, 255);
	};

	this.sensor.on('data', this._dataHandler);
};