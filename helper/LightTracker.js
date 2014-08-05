'use strict';

var colors = require('colors'),
	Table = require('cli-table');

var LightTracker = function(brightnessValues) {
	this.matrix = [
		[brightnessValues[0], brightnessValues[1]],
		[brightnessValues[2], brightnessValues[3]],
	];
};

LightTracker.prototype.toString = function() {
	var table = new Table();

	table.push(
		this.matrix[0],
		this.matrix[1]
	);

	return table.toString();
};

LightTracker.prototype._calculateDirection = function(arrA, arrB) {
	var averageArrA = (arrA[0] + arrA[1]) / 2,
		averageArrB = (arrB[0] + arrB[1]) / 2;

	if (Math.abs(averageArrA - averageArrB) < 20) return 0;

	if (averageArrA >= averageArrB) {
		return 1
	} else {
		return -1;
	}
};

LightTracker.prototype._getHorizontalDirection = function() {
	var rightRow = [this.matrix[0][1], this.matrix[1][1]],
		leftRow = [this.matrix[0][0], this.matrix[1][0]];


	return this._calculateDirection(rightRow, leftRow);
};

LightTracker.prototype._getVerticalDirection = function() {
	var topRow = this.matrix[0],
		bottomRow = this.matrix[1];

	return this._calculateDirection(topRow, bottomRow);
};

// Directions -1/0/+1 degree
LightTracker.prototype.getDirections = function() {
	var horizontalDirection = this._getHorizontalDirection(),
		verticalDirection = this._getVerticalDirection();

	return [horizontalDirection, verticalDirection];
};

var averageLight = function(arr) {
	return (arr[0] + arr[1]) / 2;
};

module.exports = LightTracker;