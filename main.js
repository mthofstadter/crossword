
var directionHor = true;
var deletePress = false;
var invalidKey = false;
var activeRow = 0;
var activeCol = 0;
var won = false;

function onloadRender() {
    createGrid();
    // winner();
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
         box.value = " ";
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
        0: "Rebeka Librehombre por ejemplo", //Amiga
        1: "Best feature of 6145 Pershing (thanks Costco)", //Dyson
        2: "Taking an exam (if you\u{0027}re Keishi) or serving a ball (if you\u{0027}re Sarah)", //Acing
        3: "Mikey vis-a-vis Ori and the Will of the Wisps", //Gamer
        4: "sumafo paltpusy enam", //Erpry
    };
    const down = {
        0: "Don\u{0027}t judge a book by its cover or Better late than never e.g.", //Adage
        1: "Your response to \u{0022}Who\u{0027}s Sheila?\u{0022}", //Mycar
        2: "\u{0022}_  _ _ _ _\u{0022} -Celli when asked about how he feels towards Lauren", //Isimp
        3: "Sarar after Katie\u{0027}s Pizza or Andy\u{0027}s", //Goner
        4: "How you might feel upon seeing Thorgy", //Angry
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
    const answer = Array.from("amigadysonacinggamererpry");
    const puzzle = [];
    for(var i=0; i<5; i++) {
        for(var j=0; j<5; j++) {
           puzzle.push(document.getElementById("box" + i + j).value);
        }
    }
    if(puzzle.length == answer.length) {
        for(let i=0; i<puzzle.length; i++) {
            if(puzzle[i] != answer[i]) {
                return false;
            }
        }
        winner();
        return true;
    } else {
        return false;
    }
}

function winner() {
    if(won == false) {
        var audio = new Audio('drip.m4a');
        audio.play();
        document.getElementById("winnercircle").classList.add("won");
        document.getElementById("winMsg").classList.add("won2");
    }
    won = true;
}