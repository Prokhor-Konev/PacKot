console.log("Scripts activaded.")




let game = document.getElementById('game');
let canvas = game.getContext("2d");
let poneImage = new Image();
let x = 0;
let y = 4 * 70;

let savedLevel = localStorage.getItem("level");
let currentLevels = Number.parseInt(savedLevel ? savedLevel : "0");
let level = levels[currentLevels]

let state = 3;
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 68) {
        movePacKot(x + 70, y);
        state = 3
    }
    if (event.keyCode === 65) {

        movePacKot(x - 70, y);
        state = 4
    }
    if (event.keyCode === 87) {
        movePacKot(x, y - 70);
        state = 1;
    }
    if (event.keyCode === 83) {
        movePacKot(x, y + 70);
        state = 2;
    }
})

function checkMovePossible(nextX, nextY) {
    if (nextX < 0 || nextY < 0 || nextX > 9 || nextY > 9) {
        return false;
    }
    if (level.ghosts[nextX][nextY] != 0) {
        return false;
    }
    if (level.map[nextX][nextY] === 1) {
        return false
    } else {
        return true;
    }
}

function moveGhosts() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let ghost = level.ghosts[i][j];
            let nextI = i;
            let nextJ = j;
            if (ghost > 0 && ghost < 10) {
                if (ghost === 1) {
                    nextI += 1;
                } else if (ghost === 2) {
                    nextI -= 1
                } else if (ghost === 3) {
                    nextJ += 1
                } else if (ghost === 4) {
                    nextJ -= 1
                }
                if (checkMovePossible(nextI, nextJ)) {
                    let g = level.ghosts[i][j];
                    level.ghosts[i][j] = 0;
                    level.ghosts[nextI][nextJ] = g + 10;
                    if ((x / 70) === nextJ && (y / 70) === nextI) {
                        gameover();
                    }
                } else {
                    level.ghosts[i][j] = Math.round(Math.random()* 3) + 1
                }
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if(level.ghosts[i][j] > 10 ) {
                level.ghosts[i][j]  = level.ghosts[i][j] - 10;
            }
        }
    }
}




function movePacKot(nextX, nextY) {
    if (nextX < 0 || nextY < 0) {
        return;
    }
    if (nextX >= 700 || nextY >= 700) {
        return;
    }
    let i = nextX / 70;
    let j = nextY / 70;
    if (level.ghosts[j][i] != 0) {
        gameover()
    }
    if (level.map[j][i] === 1) {
        return;
    }

    if (level.map[j][i] === 0) {
        level.map[j][i] = 100;
        isSecretActivated = false;
    }
    //Секреточки!
    if (level.map[j][i] === 3) {
        level.map[j][i] = 4;
        isSecretActivated = true;
    }

    x = nextX;
    y = nextY;

    if(checkIsWinner()) {
        winner();
    }
}

function checkIsWinner() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (level.map[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function gameover() {
    deadAudio.play();
    alert("Не получилось!:(")
    document.location = "level.html";
   
}

//Textures
let packotImage = new Image();
packotImage.src = "image/KotR.png";
let wallImage = new Image();
wallImage.src = "image/Wall2.png";
let tabletImage = new Image();
tabletImage.src = "image/Eat.png";
let ghostImage = new Image();
ghostImage.src = "image/ghostb.png"
let secretwImage = new Image();
secretwImage.src = "image/secretw.png";
let secretImage = new Image();
secretImage.src = "image/Tube.png"
let bossImage = new Image();
bossImage.src = "image/ghostym.png"


let kotRImage = new Image();
kotRImage.src = "image/KotR.png";
let kotLImage = new Image();
kotLImage.src = "image/KotL.png";
let kotUImage = new Image();
kotUImage.src = "image/KotU.png";
let kotDImage = new Image();
kotDImage.src = "image/KotD.png";

let deadAudio = new Audio();
deadAudio.src = "sounds/Myaukanie.mp3";
let winAudio = new Audio();
winAudio.src = "sounds/pobeda.mp3";



let isSecretActivated = false;

function winner() { 
    currentLevels++;
    localStorage.setItem("level", currentLevels);
    winAudio.play();
    alert("Круто играешь!")
    document.location = "level.html"
    // if (currentLevels > levels.length - 1) {
    //     alert("Ура, я наелся!");
    //     location.reload();
    //     document.location("level.html")
    // }
    // level = levels[currentLevels]
}

function draw() {
    canvas.clearRect(0, 0, 700, 700);
    drawWorld();
    drawObjects();
    if (state === 1) {
        canvas.drawImage(kotUImage, x, y, 70, 70);     
    }
    if (state === 2) {
        canvas.drawImage(kotDImage, x, y, 70, 70);
    }
    if (state === 3) {
        canvas.drawImage(kotRImage, x, y, 70, 70);
    }
    if (state === 4) {
        canvas.drawImage(kotLImage, x, y, 70, 70);
    }
}

function drawObjects() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let object = level.map[i][j]
            let ghost = level.ghosts[i][j]
            if (object === 1) {
                canvas.drawImage(wallImage, 70 * j, 70 * i, 70, 70);
            } else if (object === 0) {
                canvas.drawImage(tabletImage, 70 * j, 70 * i, 70, 70)
            } 
            if (object === 3) {
                canvas.drawImage(secretwImage, 70 * j, 70 * i, 70, 70);
            }
            if (object === 4 || (object === 3 && isSecretActivated)) {
                let jj = x / 70;
                let ii = y / 70;
                if (i === ii && j === jj
                    || i === ii && (j + 1) === jj
                    || (i - 1) === ii && j === jj
                    || (i + 1) === ii && j === jj
                    || i === ii && (j - 1) === jj
                    || (i + 1) === ii && (j - 1) === jj
                    || (i + 1) === ii && (j + 1) === jj
                    || (i - 1) === ii && (j + 1) === jj
                    || (i - 1) === ii && (j - 1) === jj) {
                    canvas.drawImage(secretImage, 70 * j, 70 * i, 70, 70);
                } else {
                    canvas.drawImage(wallImage, 70 * j, 70 * i, 70, 70);
                }
            }
            if (ghost != 0) {
                canvas.drawImage(ghostImage, 70 * j, 70 * i, 70, 70)
            }
        }
    }
}



function drawWorld() {
    let x = 0;
    canvas.beginPath();
}
setInterval(draw, 10);
setInterval(moveGhosts, 400);