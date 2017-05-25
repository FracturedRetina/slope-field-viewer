var xMin = -5;
var yMin = -5;
var xMax = 5;
var yMax = 5;

var c = document.getElementById("graph");
var ctx = c.getContext("2d");

var eq = "y/x";
var LEN = 7;

drawAxes();
drawField();

$('input').change(function(e) {
	ctx.clearRect(0, 0, c.width, c.height);
	eq = $(this).val();
	drawAxes();
	drawField();
});

function drawAxes() {
	//x-axis
	ctx.beginPath();
		ctx.moveTo(0, c.height - c.height * Math.abs(yMin / (yMax - yMin)));
		ctx.lineTo(c.width, c.height - c.height * Math.abs(yMin / (yMax - yMin)));
	ctx.stroke();
	//y-axis
	ctx.beginPath();
		ctx.moveTo(c.width * Math.abs(xMin / (xMax - xMin)), 0);
		ctx.lineTo(c.width * Math.abs(xMin / (xMax - xMin)), c.height);
	ctx.stroke();
}

function drawField() {
	for (var y = yMin - 1; y <= yMax; y++) {
		for (var x = xMin - 1; x <= xMax; x++) {
			var scope = {
				"x": -x,
				"y": -y
			};
			ctx.beginPath();
				ctx.moveTo(
					xToDrawX(x) - LEN * Math.cos(-Math.atan(math.eval(eq, scope))),
					yToDrawY(y) - LEN * Math.sin(-Math.atan(math.eval(eq, scope)))
				);
				ctx.lineTo(
					xToDrawX(x) + LEN * Math.cos(-Math.atan(math.eval(eq, scope))),
					yToDrawY(y) + LEN * Math.sin(-Math.atan(math.eval(eq, scope)))
				);
			ctx.stroke();
		}
	}
}

function drawGrid() {
	for (var y = yMin; y < yMax; y++) {
		for (var x = xMin; x < xMax; x++) {
			if (x != 0 && y != 0) {
				ctx.fillRect(xToDrawX(x), yToDrawY(y), 2, 2);
			}
		}
	}
}

function xToDrawX(x) {
	return c.width * ((xMax - x) / (xMax - xMin));
}

function yToDrawY(y) {
	return c.height - c.height * ((yMax - y) / (yMax - yMin));
}
