// Canvas element stuff ---
function getCanvas() {
	$c = document.getElementById("manuscript");
	$ctx = $c.getContext("2d");
}

function scaleCanvas() {
	$scale = Math.floor($c.height/50);
	$c.height = window.innerHeight - 20;
}

// Drawing code ---
function drawPixel(x, y, colour) {
	var newX = x * $scale;
	var newY = y * $scale;
	$ctx.fillStyle = colour;
	$ctx.fillRect(newX, newY, $scale, $scale);
}

function drawGlyph(glyph, x, y, colour) {
	for(var arrY = 0; arrY < glyph.length; arrY++){
		for(var arrX = 0; arrX < glyph[arrY].length; arrX++) {
			if(glyph[arrY][arrX] == 'X'){
				drawPixel(x + arrX, y + arrY, colour);
			}
		}
	}
}

function blackout() {
	$ctx.fillStyle = "#000000";
	$ctx.fillRect(0, 0, $c.width, $c.height);
}

// Glyph object definition and methods ---
function glyph (glyphString, x, y, colour) {
	this.glyphString = glyphString;
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.glyphArray = getGlyph(glyphString);
	this.draw = draw;
}

function draw() {
	drawGlyph(this.glyphArray, this.x, this.y, this.colour);
}

function getGlyph(glyph) {
	var glyphArray = [];
	var tmpArray = glyph.split("\n");
	for(var i = 0; i< tmpArray.length; i++) {
		glyphArray.push(tmpArray[i].split(""));
	}
	return glyphArray;
}

// Game functions (initialise, update and render) ---
function initialise() {
	getCanvas();
	$scale = Math.floor($c.height/50);
	$glyphs = [];
	var newGlyph = new glyph(glyphMe(), $c.width/$scale, 10, "#FFFFFF")

	$glyphs.push(newGlyph);
	
	blackout();
}
function update() {

	scaleCanvas();
	if($glyphs[0].x > 2){
		$glyphs[0].x--;
	}
}

function render() {
	blackout();
	for(var i = 0; i < $glyphs.length; i++){
		$glyphs[i].draw();
	}
}

// Testing junk ---
function glyphMe() {
	var glyphString =  "\
  XXXX   X   X   X    \n\
 X    X   X   X   X   \n\
X    X X   X   X   X  \n\
X   X  X   X   X   X  \n\
X  X   X   X   X   X  \n\
X X    X   X   X   X  \n\
 X    X   X   X   X   \n\
  XXXX   X   X   X    \n";
	return glyphString;
}
