"use strict"

const grandezza_Griglia = 10; // 8x8 o 10x10
const grandezzeNavi = [5, 4, 3, 3, 2];  // ci sono 5 navi con le rispettive grandezze

let griglia_Giocatore = [];
let griglia_Nemica = []; 
let naviRimastePlayer = 0;
let naviRimasteNemico = 0;
let gameOver = false;

const giocatoreGriglia = document.getElementById('griglia-giocatore');
const nemicoGriglia = document.getElementById('griglia-nemico'); 
const statoPartita = document.getElementById('stato');
const btnRicomincia = document.getElementById('btn-ricomincia');


function inizializza_gioco(){
    gameOver = false;

    giocatoreGriglia.innerHTML = "";
    nemicoGriglia.innerHTML = "";

    griglia_Giocatore = Array(grandezza_Griglia).fill(null).map(() => Array(grandezza_Griglia).fill(0));
    griglia_Nemica = Array(grandezza_Griglia).fill(null).map(() => Array(grandezza_Griglia).fill(0)); // converte il vettore in una matrice di 0

    genera_Griglia(giocatoreGriglia,"giocatore")
    genera_Griglia(nemicoGriglia,"nemico")


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

inizializza_gioco();