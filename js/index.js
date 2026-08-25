"use strict"

const grandezza_Griglia = 10; // 8x8 o 10x10
const grandezzeNavi = [5, 4, 3, 3, 2];  // ci sono 5 navi con le rispettive grandezze

let griglia_Giocatore = [];
let griglia_Nemica = []; 
let naviRimastePlayer = 0;
let naviRimasteNemico = 0;
let gameOver = false;

// cronometro
let interval = null;
let secondi = 0;
let minuti = 0;
let Attivo = false;

const giocatoreGriglia = document.getElementById('griglia-giocatore');
const nemicoGriglia = document.getElementById('griglia-nemico'); 
const statoPartita = document.getElementById('stato');
const btnRicomincia = document.getElementById('btn-ricomincia');

const cronometro = document.getElementById('cronom');

function inizializza_gioco(){
    gameOver = false;

    giocatoreGriglia.innerHTML = "";
    nemicoGriglia.innerHTML = "";

    griglia_Giocatore = Array(grandezza_Griglia).fill(null).map(() => Array(grandezza_Griglia).fill(0));
    griglia_Nemica = Array(grandezza_Griglia).fill(null).map(() => Array(grandezza_Griglia).fill(0)); // converte il vettore in una matrice di 0

    genera_Griglia(giocatoreGriglia,"giocatore")
    genera_Griglia(nemicoGriglia,"nemico")

    naviRimastePlayer = 17;
    naviRimasteNemico = 17; // celle contenenti parti di navi

    
    
    
}

function IniziaCronometro(){
    if(Attivo == true)
        clearInterval(interval);

    interval = setInterval(() => {
        if(secondi + 1 == 60)
        {
            secondi = 0;
            minuti++
        }else
            secondi++;

        if(minuti <10)
            if(secondi <10)
                cronometro.innerHTML = `0${minuti}:0${secondi}`
            else
                cronometro.innerHTML = `0${minuti}:${secondi}`
        else
            if(secondi <10)
                cronometro.innerHTML = `${minuti}:0${secondi}`
            else
                cronometro.innerHTML = `${minuti}:${secondi}`
    }, 1000);
    Attivo = true;
}

function genera_Griglia(griglia,tipo){
    for(let r = 0;r < grandezza_Griglia;r++){
        for(let c = 0;  c < grandezza_Griglia; c++){
            const cella = document.createElement('div');
            cella.classList.add('cell');
            cella.dataset.row = r;
            cella.dataset.col = c;

            if(tipo === "nemico"){
                cella.addEventListener('click', () => controllaCella(r, c, cell));
            }

            griglia.appendChild(cella);
        }
    }
}

function posiziona_navi(){

}

function controlloPosizionamento(){

}

function posizionamento(){

}

function ottieniCella(){

}

function clickCellaNemica(){

}

function turnoAI(){

}

inizializza_gioco();