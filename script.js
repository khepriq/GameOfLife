//Global Var
var pat = "";
var size = 50, box = 11, textRow = 570, textGap = 580, delay = 80;
var x = 0, y = 0;
var mouseX = -1, mouseY = -1;
var cell = new Array();
var next = new Array();
var start = false;
var interval;

function initCell() {
	for(i=0;i<size;i++) {
		cell[i] = new Array();
		for(j=0;j<size;j++)
			cell[i][j]=0;
	}
	clearArray();
}

function clearArray() {
	for(i=0;i<size;i++) {
		next[i] = new Array();
		for(j=0;j<size;j++)
			next[i][j]=0;
	}
}

initCell();

function draw() {
	var canvas = document.getElementById("canvas");
	if (canvas.getContext) {
		canvas.width = canvas.width; // clear canvas
		var ctx = canvas.getContext("2d");
		
		x = 0;
		y = 0;
		
		//draw
		for(i=0;i<size;i++) {
			y=0;
			for(j=0;j<size;j++) {
				if(cell[i][j] == 0)
					ctx.fillStyle = "rgb(210, 210, 222)";
				else
					ctx.fillStyle = "rgb(111,111,190)";
				ctx.fillRect (x, y, 10, 10);
				y+=box;
			}
			x+=box;
		}
		drawButton(ctx);
		canvas.addEventListener("mousedown", DoMouseDown, false);
	}
}

function drawButton(ctx) {
	ctx.font="20px Arial";
	if(!start)
		ctx.fillStyle = "rgb(100, 100, 100)";
	else
		ctx.fillStyle = "rgb(100, 50, 50)";

	ctx.fillText("Next", 10, textRow);
	ctx.fillText("Start", 60, textRow);
	ctx.fillText("Stop", 110, textRow);
	ctx.fillText("Pattern", 160, textRow);
	ctx.fillText("Clear", 230, textRow);
}

function check() {
	x = parseInt(mouseX / box);
	y = parseInt(mouseY / box);
	if(cell[x][y] == 0)
		cell[x][y] = 1;
	else
		cell[x][y] = 0;
}

function DoMouseDown(e) {
	lastDownTarget = e.target;
	if(e.offsetX < box * size && e.offsetY < box * size) {
		mouseX = e.offsetX;
		mouseY = e.offsetY;
		check();
		draw();
	}
	else if(e.offsetY > size*box && e.offsetX < 50 && e.offsetY < textGap)
		Next();
	else if(e.offsetY > size*box && e.offsetX >= 50 && e.offsetX < 100 && e.offsetY < textGap && start == false) {
		interval = setInterval(function(){Next()}, delay);
		start = true;
	}
	else if(e.offsetY > size*box && e.offsetX >= 100 && e.offsetX < 150 && e.offsetY < textGap && start == true) {
		clearInterval(interval);
		start = false;
		draw();
	}
	else if(e.offsetY > size*box && e.offsetX >= 160 && e.offsetX < 220 && e.offsetY < textGap)
		CreatePattern();
	else if(e.offsetY > size*box && e.offsetX >= 230 && e.offsetX < 280 && e.offsetY < textGap)
		Clear();
	else
		Record();
}

function Next() {
	var check = false;
	for(i=0;i<size;i++) {
		for(j=0;j<size;j++) {
			if(cell[i][j] == 1) {
				check = Life(i,j);
				if(check != 2 && check != 3)
					next[i][j] = 0;
				else
					next[i][j] = 1;
			}
			if(cell[i][j] == 0) {
				check = Life(i,j);
				if(check == 3)
					next[i][j] = 1;
			}
		}
	}
	cell = next.slice(0);;
	clearArray();
	draw();
}

function Life(x,y) {
	var result = 0;
	var subX = false, subY = false, addX = false, addY = false;

	if(x-1 >= 0) subX = true;
	if(y-1 >= 0) subY = true;
	if(x+1 < size) addX = true;
	if(y+1 < size) addY = true;

	if(subX && subY)
		if(cell[x-1][y-1] == 1) result++;
	if(subX)
		if(cell[x-1][y] == 1) result++;
	if(subX && addY)
		if(cell[x-1][y+1] == 1) result++;
	if(subY)
		if(cell[x][y-1] == 1) result++;
	if(addY)
		if(cell[x][y+1] == 1) result++;
	if(addX && subY)
		if(cell[x+1][y-1] == 1) result++;
	if(addX)
		if(cell[x+1][y] == 1) result++;
	if(addX && addY)
		if(cell[x+1][y+1] == 1) result++;

	return result;
}

function CreatePattern() {
	Clear();
	cell[0][31] = 1; cell[1][3] = 1; cell[1][17] = 1; cell[1][23] = 1; cell[1][31] = 1; cell[1][46] = 1; cell[2][2] = 1; cell[2][3] = 1; cell[2][17] = 1; cell[2][23] = 1; cell[2][31] = 1; cell[2][46] = 1; cell[2][47] = 1; cell[3][2] = 1; cell[3][3] = 1; cell[3][17] = 1; cell[3][18] = 1; cell[3][22] = 1; cell[3][23] = 1; cell[3][31] = 1; cell[3][46] = 1; cell[3][47] = 1; cell[4][2] = 1; cell[4][31] = 1; cell[4][47] = 1; cell[5][13] = 1; cell[5][14] = 1; cell[5][15] = 1; cell[5][18] = 1; cell[5][19] = 1; cell[5][21] = 1; cell[5][22] = 1; cell[5][25] = 1; cell[5][26] = 1; cell[5][27] = 1; cell[5][31] = 1; cell[6][15] = 1; cell[6][17] = 1; cell[6][19] = 1; cell[6][21] = 1; cell[6][23] = 1; cell[6][25] = 1; cell[6][31] = 1; cell[7][3] = 1; cell[7][17] = 1; cell[7][18] = 1; cell[7][22] = 1; cell[7][23] = 1; cell[7][31] = 1; cell[7][46] = 1; cell[7][47] = 1; cell[8][2] = 1; cell[8][3] = 1; cell[8][31] = 1; cell[8][46] = 1; cell[8][47] = 1; cell[9][2] = 1; cell[9][3] = 1; cell[9][17] = 1; cell[9][18] = 1; cell[9][22] = 1; cell[9][23] = 1; cell[9][31] = 1; cell[9][44] = 1; cell[9][45] = 1; cell[10][2] = 1; cell[10][15] = 1; cell[10][17] = 1; cell[10][19] = 1; cell[10][21] = 1; cell[10][23] = 1; cell[10][25] = 1; cell[10][32] = 1; cell[10][44] = 1; cell[10][45] = 1; cell[11][13] = 1; cell[11][14] = 1; cell[11][15] = 1; cell[11][18] = 1; cell[11][19] = 1; cell[11][21] = 1; cell[11][22] = 1; cell[11][25] = 1; cell[11][26] = 1; cell[11][27] = 1; cell[11][32] = 1; cell[12][32] = 1; cell[13][3] = 1; cell[13][17] = 1; cell[13][18] = 1; cell[13][22] = 1; cell[13][23] = 1; cell[13][32] = 1; cell[14][2] = 1; cell[14][3] = 1; cell[14][17] = 1; cell[14][23] = 1; cell[14][32] = 1; cell[15][2] = 1; cell[15][3] = 1; cell[15][17] = 1; cell[15][23] = 1; cell[15][32] = 1; cell[16][2] = 1; cell[16][32] = 1; cell[17][32] = 1; cell[18][32] = 1; cell[19][32] = 1; cell[20][33] = 1; cell[21][33] = 1; cell[21][47] = 1; cell[22][3] = 1; cell[22][6] = 1; cell[22][33] = 1; cell[22][47] = 1; cell[23][4] = 1; cell[23][5] = 1; cell[23][33] = 1; cell[23][47] = 1; cell[24][1] = 1; cell[24][4] = 1; cell[24][5] = 1; cell[24][8] = 1; cell[25][2] = 1; cell[25][3] = 1; cell[25][6] = 1; cell[25][7] = 1; cell[25][47] = 1; cell[26][2] = 1; cell[26][3] = 1; cell[26][6] = 1; cell[26][7] = 1; cell[26][33] = 1; cell[26][47] = 1; cell[27][1] = 1; cell[27][4] = 1; cell[27][5] = 1; cell[27][8] = 1; cell[27][33] = 1; cell[27][47] = 1; cell[28][4] = 1; cell[28][5] = 1; cell[28][33] = 1; cell[29][3] = 1; cell[29][6] = 1; cell[29][33] = 1; cell[30][32] = 1; cell[31][32] = 1; cell[32][32] = 1; cell[33][2] = 1; cell[33][32] = 1; cell[34][2] = 1; cell[34][3] = 1; cell[34][17] = 1; cell[34][23] = 1; cell[34][32] = 1; cell[35][2] = 1; cell[35][3] = 1; cell[35][17] = 1; cell[35][23] = 1; cell[35][32] = 1; cell[36][3] = 1; cell[36][17] = 1; cell[36][18] = 1; cell[36][22] = 1; cell[36][23] = 1; cell[36][32] = 1; cell[37][32] = 1; cell[38][13] = 1; cell[38][14] = 1; cell[38][15] = 1; cell[38][18] = 1; cell[38][19] = 1; cell[38][21] = 1; cell[38][22] = 1; cell[38][25] = 1; cell[38][26] = 1; cell[38][27] = 1; cell[38][32] = 1; cell[38][44] = 1; cell[38][45] = 1; cell[39][2] = 1; cell[39][15] = 1; cell[39][17] = 1; cell[39][19] = 1; cell[39][21] = 1; cell[39][23] = 1; cell[39][25] = 1; cell[39][32] = 1; cell[39][44] = 1; cell[39][45] = 1; cell[40][2] = 1; cell[40][3] = 1; cell[40][17] = 1; cell[40][18] = 1; cell[40][22] = 1; cell[40][23] = 1; cell[40][31] = 1; cell[40][46] = 1; cell[40][47] = 1; cell[41][2] = 1; cell[41][3] = 1; cell[41][31] = 1; cell[41][46] = 1; cell[41][47] = 1; cell[42][3] = 1; cell[42][17] = 1; cell[42][18] = 1; cell[42][22] = 1; cell[42][23] = 1; cell[42][31] = 1; cell[43][15] = 1; cell[43][17] = 1; cell[43][19] = 1; cell[43][21] = 1; cell[43][23] = 1; cell[43][25] = 1; cell[43][31] = 1; cell[44][13] = 1; cell[44][14] = 1; cell[44][15] = 1; cell[44][18] = 1; cell[44][19] = 1; cell[44][21] = 1; cell[44][22] = 1; cell[44][25] = 1; cell[44][26] = 1; cell[44][27] = 1; cell[44][31] = 1; cell[44][47] = 1; cell[45][2] = 1; cell[45][31] = 1; cell[45][46] = 1; cell[45][47] = 1; cell[46][2] = 1; cell[46][3] = 1; cell[46][17] = 1; cell[46][18] = 1; cell[46][22] = 1; cell[46][23] = 1; cell[46][31] = 1; cell[46][46] = 1; cell[46][47] = 1; cell[47][2] = 1; cell[47][3] = 1; cell[47][17] = 1; cell[47][23] = 1; cell[47][31] = 1; cell[47][46] = 1; cell[48][3] = 1; cell[48][17] = 1; cell[48][23] = 1; cell[48][31] = 1; cell[49][31] = 1;  
	draw();
}

function Clear() {
	initCell();
	draw();
}

function Record() {
	for(i=0;i<size;i++) {
		for(j=0;j<size;j++) {
			if(cell[i][j] == 1)
				pat += "cell["+i+"]["+j+"] = 1; ";
		}
	}
	console.log(pat);
}

document.onmousedown=disableclick;
function disableclick(event) {
  if(event.button == 2)
     return false;
}