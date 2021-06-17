
var directionHor = true;
var deletePress = false;
var invalidKey = false;
var activeRow = 0;
var activeCol = 0;

function onloadRender() {
    createGrid();
}

function createGrid() {
    for(var i=0; i<5; i++) {
        for(var j=0; j<5; j++) {
            let row = document.getElementById("row" + i);
            var box = document.createElement("input");
            box.setAttribute("id", "box" + i + j);
            box.setAttribute("class", "letter");
            box.setAttribute("type", "text");
            box.setAttribute("maxlength", "1");
            box.setAttribute("onkeyup", "moveFocus(this)");
            box.setAttribute("onkeydown", "checkKey(this, event)");
            box.setAttribute("onmousedown", "direction(this)");
            box.setAttribute("onfocus", "active(this)");
            document.getElementById(row.id).append(box);
            }
        }
    document.getElementById("box00").focus();
}

function moveFocus(box) {
    if(invalidKey) {
        invalidKey = false;
        return;
    }
    let newbox = "";
    //MOVING FOCUS ON DELETE
    if(deletePress) {
        deletePress = false;
        if(box.value == "") {
            if(directionHor) { //direction = horizontal
                newBox = "box" + box.id.charAt(3) + (parseInt(box.id.charAt(4))-1);
                if(box.id.charAt(4) == 0) {
                    newBox = "box" + (parseInt(box.id.charAt(3))-1) + "4";
                }
                if(box.id.charAt(3) == 0 && box.id.charAt(4) == 0) {
                    newBox = "box44";
                }
                document.getElementById(newBox).focus();
                
            } else { //direction = vertical
                newBox = "box" + (parseInt(box.id.charAt(3))-1) + box.id.charAt(4);
                if(box.id.charAt(3) == 0) {
                    newBox = "box" + "4" + (parseInt(box.id.charAt(4))-1);
                }
                if(box.id.charAt(3) == 0 && box.id.charAt(4) == 0) {
                    newBox = "box44";
                }
                document.getElementById(newBox).focus();
            }

        return;
        }
    }

    //MOVING FOCUS ON INPUT
    if(directionHor) { //direction = horizontal
        newBox = "box" + box.id.charAt(3) + (parseInt(box.id.charAt(4))+1);
        if(box.id.charAt(4) == 4) {
            newBox = "box" + (parseInt(box.id.charAt(3))+1) + "0";
        }
        if(box.id.charAt(3) == 4 && box.id.charAt(4) == 4) {
            newBox = "box00";
            directionHor = !directionHor; //change direction at end
        }
        document.getElementById(newBox).focus();
        
    } else { //direction = vertical
        newBox = "box" + (parseInt(box.id.charAt(3))+1) + box.id.charAt(4);
        if(box.id.charAt(3) == 4) {
            newBox = "box" + "0" + (parseInt(box.id.charAt(4))+1);
        }
        if(box.id.charAt(3) == 4 && box.id.charAt(4) == 4) {
            newBox = "box00";
            directionHor = !directionHor; //change direction at end
        }
        document.getElementById(newBox).focus();
    }
}


function checkKey(box, event) {
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
        invalidKey = false;
     } else {
         invalidKey = true;
        return;
    }
    const key = event.key;
    if(key === "Backspace" || key === "Delete") {
        deletePress = true;
    }
    box.value = "";
}


function direction(box) {
    if(box.id == ("box" + activeRow + activeCol)) {
        directionHor = !directionHor;
    }
    highlight();
}

function active(box) {
    activeRow = box.id.charAt(3);
    activeCol = box.id.charAt(4);
    highlight();
}

function highlight() {
    clue();
    checkPuzzle();
    var highlights = document.getElementsByClassName("highlight");
    while (highlights.length) {
        highlights[0].classList.remove("highlight");
    }

    if(directionHor) {
        for(var i=0; i<5; i++) {
            document.getElementById("box" + activeRow + i).classList.add("highlight");
        }
    }
    else {
        for(var i=0; i<5; i++) {
            document.getElementById("box" + i + activeCol).classList.add("highlight");
        }
    }
}

function clue() {
    const across = {
        0: "Airline of change", //Delta
        1: "An oak's beginning", //Acorn
        2: "The Golden Trio after the giant chess game", //noron
        3: "Prickly plants", //cacti
        4: "Delete", //erase
    };
    const down = {
        0: "Prom or homecoming for example", //dance
        1: "To echo in Portugese", //ecoar
        2: "Assassinated Spanish poet", //lorca
        3: "Walks quickly (for a horse)", //trots
        4: "Maker of White Cheddar and Shells", //annie
    };
    if(directionHor) {
        document.getElementById("clue").innerText = across[activeRow];
        if(activeRow == 0) {
            document.getElementById("clueNum").innerText = "1a";
        } else {
            document.getElementById("clueNum").innerText = parseInt(activeRow)+5;
        }
    } else {
        document.getElementById("clue").innerText = down[activeCol];
        if(activeCol == 0) {
            document.getElementById("clueNum").innerText = "1d";
        } else {
            document.getElementById("clueNum").innerText = parseInt(activeCol)+1;
        }
    }
    
}

function checkPuzzle() {
    const answer = Array.from("deltaacornnoroncactierase");
    const puzzle = [];
    for(var i=0; i<5; i++) {
        for(var j=0; j<5; j++) {
           puzzle.push(document.getElementById("box" + i + j).value);
        }
    }
    if(puzzle.length == answer.length) {
        for(let i=0; i<puzzle.length; i++) {
            if(puzzle[i] != answer[i]) {
                // console.log("wrong");
                return false;
            }
        }
        window.alert("Congrats!");
        return true;
    } else {
        // console.log("wrong");
        return false;
    }
}