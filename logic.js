const maze = []; // crea una lista per gestire gli indici del labirinto

for (let i = 0; i < 11; i++) {
    const sottolista = [];
    for (let j = i * 11; j < (i + 1) * 11; j++) {
        sottolista.push(j);
    }
    maze.push(sottolista);
}

var darkMode = false;

// dichiarazione di variabili per le caselle
var xCell, yCell, current_cell, current_uscita, casella, uscita, xUscita, yUscita;

// dichiarazione di variabili per il timer
var timer;
var isRunning = false;
var milliseconds = 0, seconds = 0, minutes = 0;
var finalTime;

function generaCaselle() {
    // generare una casella di partenza qualsiasi
    xCell = Math.floor(Math.random() * (11));
    yCell = Math.floor(Math.random() * (11));

    current_cell = maze[yCell][xCell];
    casella = document.getElementById(current_cell);
    casella.style.backgroundColor = "red";

    // random generator dell'uscita
    do {
        xUscita = Math.floor(Math.random() * (11));
        yUscita = Math.floor(Math.random() * (11));
    } while ((xUscita !== 0 && xUscita !== 10 && yUscita !== 0 && yUscita !== 10) || (xUscita === xCell && yUscita === yCell));
    // il while evita anche che uscita sia uguale a entrata

    current_uscita = maze[yUscita][xUscita];
    uscita = document.getElementById(current_uscita);
    uscita.style.backgroundColor = 'green' // aggiunge la classe per  l'effetto visivo
    if (xUscita == 10) {
        uscita.classList.add('right');
    }
    if (xUscita == 0) {
        uscita.classList.add('left');
    }
    if (yUscita == 10) {
        uscita.classList.add('down');
    }
    if (yUscita == 0) {
        uscita.classList.add('up');
    }
}

generaCaselle()

// funzioni del timer
function updateTimer() {
    // incremento
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    var formattedTime =
        padNumber(minutes) + ":" + padNumber(seconds) + ":" + padNumber(milliseconds);

    document.getElementById("timer").innerHTML = formattedTime;
}

function padNumber(number) {
    return number < 10 ? "0" + number : number;
}           

// switch dark mode
function swtichMode() {
    if (darkMode == false) {
    document.body.style.backgroundColor = "#3C474B";
    document.getElementById("timer").style.color = "#BF0603";
    document.getElementById("vittoria").style.backgroundColor = "#A1A6B4";
    document.getElementById("vittoria").style.color = "white";
    document.getElementsByTagName("h1")[0].style.color = "#BF0603";
    document.getElementById("dark_mode").style.color = "white";
    document.getElementById("restart_button").style.backgroundColor = "white";

    darkMode = true;
    } else {
        //imposta light mode
        document.body.style.backgroundColor = "antiquewhite";
        document.getElementById("timer").style.color = "black";
        document.getElementById("vittoria").style.backgroundColor = "bisque";
        document.getElementById("vittoria").style.color = "black";
        document.getElementsByTagName("h1")[0].style.color = "black";
        document.getElementById("dark_mode").style.color = "black";
        document.getElementById("restart_button").style.backgroundColor = "coral";

        darkMode = false;
    }
}

// restart button
function restart() {
    // reset della casella precedente
    casella.style.backgroundColor = 'white';


    // reset del bordo d'uscita
    if (xUscita == 10) {
        uscita.classList.remove('right');
    }
    if (xUscita == 0) {
        uscita.classList.remove('left');
    }
    if (yUscita == 10) {
        uscita.classList.remove('down');
    }
    if (yUscita == 0) {
        uscita.classList.remove('up');
    }

    // reset agli elementi visualizzati
    const mainElement = document.getElementsByTagName('main')[0];
    document.getElementById('vittoria').style.display = 'none';
    mainElement.style.display = 'grid';
    document.getElementById('timer').style.display = 'block';

    // reset del timer
    clearInterval(timer);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    document.getElementById("timer").innerHTML = "00:00:000";

    // genera nuove caselle
    generaCaselle()
}

function goRight() {
    if (casella.classList.contains("right")) {
        // resetta la casella corrente
        casella.style.backgroundColor = "white";

        // aggiorna la prossima
        xCell += 1
        current_cell = maze[yCell][xCell]
        casella = document.getElementById(current_cell)
        casella.style.backgroundColor = 'red'

        if  (!isRunning) { // fa partire il timer
            timer = setInterval(updateTimer, 10);
            isRunning = true
        }

        checkWin()
    }
      
}

function goLeft() {
    if (casella.classList.contains("left")) {
        // resetta la casella corrente
        casella.style.backgroundColor = "white";

         // resetta la prossima
        xCell -= 1
        current_cell = maze[yCell][xCell]
        casella = document.getElementById(current_cell)
        casella.style.backgroundColor = 'red'

        if  (!isRunning) { // fa partire il timer
            timer = setInterval(updateTimer, 10);
            isRunning = true
        }

        checkWin()
    }
}

function goDown() {
    if (casella.classList.contains("down")) {
         // resetta la casella corrente
        casella.style.backgroundColor = "white";

        // resetta la prossima
        yCell += 1
        current_cell = maze[yCell][xCell]
        casella = document.getElementById(current_cell)
        casella.style.backgroundColor = 'red'

        if  (!isRunning) { // fa partire il timer
            timer = setInterval(updateTimer, 10);
            isRunning = true
        }

        checkWin()
    }
}

function goUp() {
    if (casella.classList.contains("up")) {
        // resetta la casella corrente
        casella.style.backgroundColor = "white";

        // resetta la prossima
        yCell -= 1
        current_cell = maze[yCell][xCell]
        casella = document.getElementById(current_cell)
        casella.style.backgroundColor = 'red'

        if  (!isRunning) { // fa partire il timer
            timer = setInterval(updateTimer, 10);
            isRunning = true
        }

        checkWin()
    }
}

function checkWin() {
    if (current_cell == current_uscita) {
        // aggiorna timer
        clearInterval(timer);
        finalTime = document.getElementById("timer").innerHTML;
        document.getElementById("timer_value").innerHTML = finalTime;


        // visualizza i giusti div
        const mainElement = document.getElementsByTagName('main')[0];
        mainElement.style.display = 'none';
        document.getElementById('timer').style.display = 'none'
        document.getElementById('vittoria').style.display = 'block'
    } 
}

document.body.addEventListener('keydown', function(e) {  // switch per definire le funzioni delle arrow
    switch (e.key) {
        case 'ArrowUp':
            goUp();
            break;
        case 'ArrowDown':
            goDown();
            break;
        case 'ArrowRight':
            goRight();
            break;
        case 'ArrowLeft':
            goLeft();
            break;
    }
});