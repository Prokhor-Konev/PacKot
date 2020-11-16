let menuLevel = localStorage.getItem("level");

for (let p = 0; p < 6; p++) {
    if (menuLevel && p > Number.parseInt(menuLevel)) {
        console.log(p + " заблочен");
        let button = document.getElementsByClassName("menu-button")[p];
        button.classList.add('disable');
        button.disabled = true;
    } else {
        console.log(p + " разблочен");
    }
}

function start(level) {
    localStorage.setItem("level", level)
    document.location ='game.html';
}

function start2(level) {
    localStorage.setItem("level", level)
    document.location ='game2.html';
}

