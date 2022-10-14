var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'board';
document.getElementsByTagName('body')[0].appendChild(iDiv);


const blkpieces = ["br", 'bh', 'bb', 'bq', 'bk', 'bb', 'bh', "br"];
const whtpieces = ["wr", 'wh', 'wb', 'wq', 'wk', 'wb', 'wh', "wr"];

for (let i = 1; i < 9; i++){
    for (let j = 1; j < 9; j++){
        let here = document.createElement('div');
        here.className = 'square' + j + i;
        here.classList.add("square");

        if ((i + j) % 2 == 0) {
            here.classList.add("blackcell");
        }
        else{
            here.classList.add("whitecell");
        }
        document.getElementById('block').appendChild(here);
    }
}

for (let i = 1; i < 9; i++){
    let piece = document.createElement('div');
    piece.className = "square2" + i;
    piece.classList.add("bp");
    piece.classList.add("piece");
    document.getElementById('block').appendChild(piece);
}

for (let i = 1; i < 9; i++){
    let piece = document.createElement('div');
    piece.className = "square1" + i;
    piece.classList.add(blkpieces[i - 1]);
    piece.classList.add("piece");
    document.getElementById('block').appendChild(piece);
}

for (let i = 1; i < 9; i++){
    let piece = document.createElement('div');
    piece.className = "square7" + i;
    piece.classList.add("wp");
    piece.classList.add("piece");
    document.getElementById('block').appendChild(piece);
}

for (let i = 1; i < 9; i++){
    let piece = document.createElement('div');
    piece.className = "square8" + i;
    piece.classList.add(whtpieces[i - 1]);
    piece.classList.add("piece");
    document.getElementById('block').appendChild(piece);
}

function piececheck(id) {
	let step1 = document.getElementsByClassName(id);
	if (step1[1]){
	    return true;
	}
	else{
	    return false;
	}
}


function takesquare(id1, id2) {
	let ele = document.getElementsByClassName(id1);
	ele[1].className = (id2+ " " + getpiece(id1) + " piece");
}


function takepiece(id1, id2) {
    let step1 = document.getElementsByClassName(id2);
    step1[1].remove();
    takesquare(id1, id2);
}

var turn = "w";

function rightcolor(id) {
	let step1 = getpiece(id);
	return step1[0] == turn;
}

function getpiece(id){
    let step1 = document.getElementsByClassName(id);
    let step2 = step1[1].classList;
    let step3 = step2[1];
    return step3;
}

function switchturn() {
	if (turn == "w") {
		turn = "b";
	} else {
		turn = "w";
	}
}

var first = false;
var sqr1;

function movepiece(id) {
	if (first == false) {
		if (piececheck("square" + id) && rightcolor("square" + id)) {
			first = true;
			sqr1 = id;
			db = true;
		}
	} else {
		const sqr2 = id;
		const class1 = "square" + sqr1;
		const class2 = "square" + sqr2;

        if (piececheck(class2) && !(rightcolor(class2))){
            takepiece(class1,class2);
            switchturn();
        }
        else if (!(piececheck(class2))){
            takesquare(class1,class2);
            switchturn();
        }

        db = false;
		first = false;
		sqr1 = undefined;
	}
}

function getsquare(event, coord, delay) {
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
	var x = getsquare(event, "x", 540);
	var y = getsquare(event, "y", 135);
	if (x >= 0 && x < 8 && y >= 0 && y < 8) {
	    let s = (y + 1).toString() + (x + 1).toString();
		movepiece(s);
	}
}

function upbeat(event) {
    if(db == true){
        var x = getsquare(event, "x", 540);
        var y = getsquare(event, "y", 135);
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            let s = (y + 1).toString() + (x + 1).toString();
            movepiece(s);
        }
    }
}