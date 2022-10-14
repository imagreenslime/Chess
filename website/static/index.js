var temp = document.createElement('div');
temp.id = 'block';
temp.className = 'board';
document.getElementsByTagName('body')[0].appendChild(temp);
const bp = ["br", 'bh', 'bb', 'bq', 'bk', 'bb', 'bh', "br"];
const wp = ["wr", 'wh', 'wb', 'wq', 'wk', 'wb', 'wh', "wr"];

function createBoard() {
	for (let i = 1; i < 9; i++) {
		for (let j = 1; j < 9; j++) {
			let here = document.createElement('div');
			here.className = 'square' + j + i + " square";
			if ((i + j) % 2 == 0) {
				here.classList.add("blackcell");
			} else {
				here.classList.add("whitecell");
			}
			document.getElementById('block').appendChild(here);
		}
	}
	for (let i = 1; i < 33; i++) {
		let a = i % 4;
		let piece = document.createElement('div');
		const num = ((Math.floor((i - 1) / 4)) + 1);
		switch (a) {
			case 0:
				piece.className = "square2" + num + " bp" + " piece";
				break;
			case 1:
				piece.className = "square1" + num + " " + bp[num - 1] + " piece";
				break;
			case 2:
				piece.className = "square7" + num + " wp" + " piece";
				break;
			case 3:
				piece.className = "square8" + num + " " + wp[num - 1] + " piece";
				break;
		}
		document.getElementById('block').appendChild(piece);
	}
}

function getPiece(id) {
	let step1 = document.getElementsByClassName(id);
	let step2 = step1[1].classList;
	let step3 = step2[1];
	return step3;
}

function pieceCheck(id) {
	let step1 = document.getElementsByClassName(id);
	if (step1[1]) {
		return true;
	} else {
		return false;
	}
}

function takeSquare(id1, id2) {
	let ele = document.getElementsByClassName(id1);
	ele[1].className = (id2 + " " + getPiece(id1) + " piece");
}

function takePiece(id1, id2) {
	let step1 = document.getElementsByClassName(id2);
	step1[1].remove();
	takeSquare(id1, id2);
}
var turn = "w";

function rightColor(id) {
	let step1 = getPiece(id);
	return step1[0] == turn;
}

function inBoard(x, y) {
	return (x > 0 && x < 9 && y > 0 && y < 9);
}

function createId(row, col) {
	return ("square" + row.toString() + col.toString());
}

function colorMoves(move) {

	let dot = document.createElement('div');
	dot.className = "dot " + move;
	document.getElementById('block').appendChild(dot);
}

function delDots() {
	const dots = document.querySelectorAll('.dot');
	dots.forEach(dot => {
		dot.remove();
	});
}

function legalPawnMoves(id) {
	let moves = [];
	let newRow = Number(id[6]);
	let newCol = Number(id[7]);
	var p;
	var t = 2;
	if (getPiece(id)[0] == "w") {
		p = -1;
		if (Number(id[6]) == 7) {
			t = 3;
		}
	} else {
		p = 1;
		if (Number(id[6]) == 2) {
			t = 3;
		}
	}
	let i = 1;
	newRow += p;
	while (i < t && inBoard(newRow, newCol) && !(pieceCheck(createId(newRow, newCol)))) {
		i++;
		moves.push(createId(newRow, newCol));
		newRow += p;
	}

	newRow = Number(id[6]) + p;
	const colCheck = [Number(id[7]) - 1, Number(id[7]) + 1];
	colCheck.forEach((item) => {
		let sqr = ("square" + newRow.toString() + item.toString());
		if (inBoard(newRow, item) && (pieceCheck(sqr))) {
			moves.push(sqr);
		}
	});
	moves.forEach(colorMoves);
	return moves;
}

function legalBishopMoves(id) {
	let color = getPiece(id)[0];
	var moves = [];
	moves.push.apply(moves, bishopHelper(Number(id[6]), Number(id[7]), 1, 1, color));
	moves.push.apply(moves, bishopHelper(Number(id[6]), Number(id[7]), 1, -1, color));
	moves.push.apply(moves, bishopHelper(Number(id[6]), Number(id[7]), -1, -1, color));
	moves.push.apply(moves, bishopHelper(Number(id[6]), Number(id[7]), -1, 1, color));
	moves.forEach(colorMoves);
}

function bishopHelper(row, col, subRow, subCol, color) {
	var temp = [];
	row += subRow;
	col += subCol;
	while (inBoard(row, col) && !(pieceCheck(createId(row, col)))) {
		temp.push(createId(row, col));
		row += subRow;
		col += subCol;
		let id = createId(row, col);
		if (pieceCheck(id) && getPiece(id)[0] != color) {
			temp.push(id);
		}
	}
	return (temp);
}

function switchTurn() {
	if (turn == "w") {
		turn = "b";
	} else {
		turn = "w";
	}
}
var dropped = false;
var sqr1;

function select(id) {
	if (pieceCheck(id) && rightColor(id)) {
		dropped = true;
		sqr1 = id;
		db = true;
		if ((getPiece(id))[1] == "p") {
			legalPawnMoves(id);
		} else if ((getPiece(id))[1] == "b") {
			legalBishopMoves(id);
		}

	}
}

function drop(id) {
	if (dropped == true) {
		delDots();
		const class1 = sqr1;
		const class2 = id;

		if (pieceCheck(class2) && !(rightColor(class2))) {
			takePiece(class1, class2);
			switchTurn();
		} else if (!(pieceCheck(class2))) {
			takeSquare(class1, class2);
			switchTurn();
		}

		sqr1 = undefined;
	}
}

function getSquare(event, coord, delay) {
	var z;
	if (coord == "x") {
		z = event.clientX - delay;
	} else {
		z = event.clientY - delay;
	}
	return Math.floor(z / 100);
}
var db;

function downbeat(event) {
	var x = getSquare(event, "x", 540);
	var y = getSquare(event, "y", 135);
	x++;
	y++;
	if (inBoard(x, y)) {
		let s = createId(y, x);
		select(s);
		document.addEventListener("mouseup", upbeat);
	}
}

function upbeat(event) {
	if (db == true) {
		var x = getSquare(event, "x", 540);
		var y = getSquare(event, "y", 135);
		x++;
		y++;
		if (inBoard(x, y)) {
			let s = createId(y, x);
			drop(s);
		}
		db = false;
	}
}
document.addEventListener("mousedown", downbeat);