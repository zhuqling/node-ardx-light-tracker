'use strict';

var colors = require('colors'),
	Table = require('cli-table');

var LightTracker = function() {
	this.matrix = null;

	this.setValues = function(brightnessValues) {
		this.matrix = [
			[brightnessValues[0], brightnessValues[1]],
			[brightnessValues[2], brightnessValues[3]],
		];

		return this;
	};
};

LightTracker.prototype.toString = function() {
	var table = new Table();

	table.push(
		this.matrix[0],
		this.matrix[1]
	);

	return table.toString();
};

LightTracker.prototype._calculateOffset = function(arrA, arrB) {
	var averageArrA = (arrA[0] + arrA[1]) / 2,
		averageArrB = (arrB[0] + arrB[1]) / 2;

	if (Math.abs(averageArrA - averageArrB) < 5) return 0;

	if (averageArrA >= averageArrB) {
		return 1
	} else {
		return -1;
	}
};

LightTracker.prototype._getTiltOffset = function() {
	var rightRow = [this.matrix[0][1], this.matrix[1][1]],
		leftRow = [this.matrix[0][0], this.matrix[1][0]];


	return this._calculateOffset(rightRow, leftRow);
};

LightTracker.prototype._getPanOffset = function() {
	var topRow = this.matrix[0],
		bottomRow = this.matrix[1];

	return this._calculateOffset(topRow, bottomRow);
};

// Directions -1/0/+1 degree
LightTracker.prototype.getOffset = function() {
	var tiltOffset = this._getTiltOffset(),
		panOffset = this._getPanOffset();

	return {
		tilt: tiltOffset,
		pan: panOffset
	};
};

var averageLight = function(arr) {
	return (arr[0] + arr[1]) / 2;
};

module.exports = LightTracker;