"use strict"

const grandezza_Griglia = 10; // 8x8 o 10x10
const grandezzeNavi = [5, 4, 3, 3, 2];  // ci sono 5 navi con le rispettive grandezze

let griglia_Giocatore = [];
let griglia_Nemica = []; 
let naviRimastePlayer = 0;
let naviRimasteNemico = 0;
let gameOver = false;
let tentativi = 0;

// cronometro
let interval = null;
let secondi = 0;
let minuti = 0;
let Attivo = false;


const giocatoreGriglia = document.getElementById('griglia-giocatore');
const nemicoGriglia = document.getElementById('griglia-nemico'); 
const statoPartita = document.getElementById('stato');
const btnRicomincia = document.getElementById('btn-ricomincia');
const tentativiHTML = document.getElementById('tent');

const cronometro = document.getElementById('cronom');

function inizializza_gioco(){
    gameOver = false;

    giocatoreGriglia.innerHTML = "";
    nemicoGriglia.innerHTML = "";

    griglia_Giocatore = Array(grandezza_Griglia).fill(null).map(() => Array(grandezza_Griglia).fill(0));
    griglia_Nemica = Array(grandezza_Griglia).fill(null).map(() => Array(grandezza_Griglia).fill(0)); // converte il vettore in una matrice di 0

    genera_Griglia(giocatoreGriglia,"giocatore");
    genera_Griglia(nemicoGriglia,"nemico");

    posiziona_navi(griglia_Giocatore, "player"); // posiziona le navi in modo casuale
    posiziona_navi(griglia_Nemica,"nemico"); 

    naviRimastePlayer = 17;
    naviRimasteNemico = 17; // celle contenenti parti di navi

    IniziaCronometro();
    
    statoPartita.innerHTML = "Il tuo turno!"
}

function IniziaCronometro(){
    if(Attivo == true){
        clearInterval(interval);
        minuti = 0
        secondi = 0;
        cronometro.innerHTML = `0${minuti}:0${secondi}`
    }
        

    interval = setInterval(() => {
        if(secondi + 1 == 60) // calcola il tempo del cronometro
        {
            secondi = 0;
            if(minuti + 1 == 60)
            {
                minuti = 0;
            }else
                minuti++
        }else
            secondi++;

        // stampa il tempo nel cronometro html
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

function genera_Griglia(grigliaHTML,tipo){
    for(let r = 0;r < grandezza_Griglia;r++){
        for(let c = 0;  c < grandezza_Griglia; c++){
            const cella = document.createElement('div');
            cella.classList.add('cella');
            cella.dataset.row = r;
            cella.dataset.col = c;

            if(tipo === "nemico"){
                cella.addEventListener('click', () => clickCellaNemica(r, c, cella));
            }

            grigliaHTML.appendChild(cella);
        }
    }
}

function posiziona_navi(griglia,tipo){
    grandezzeNavi.forEach(size => { // per ogni elemento del vettore
        let posizionata = false;
        while (!posizionata) {
            const orizzontale = Math.random() < 0.5; // genera un numero tra 0 e 0.9999...
            const riga = Math.floor(Math.random() * grandezza_Griglia);
            const col = Math.floor(Math.random() * grandezza_Griglia);

            if (controlloPosizionamento(griglia, riga, col, size, orizzontale)) {
                posizionamento(griglia, riga, col, size, orizzontale, tipo);
                posizionata = true;
            }
        }
    });
}

function controlloPosizionamento(griglia,riga,col,size,orizzontale){
    if (orizzontale) {
        if (col + size > grandezza_Griglia) return false;
            for (let i = 0; i < size; i++) {
                if (griglia[riga][col + i] !== 0) return false;
            }
    }else{
        if (riga + size > grandezza_Griglia) return false;
            for (let i = 0; i < size; i++) {
                if (griglia[riga + i][col] !== 0) return false;
            }
    }
    return true;
}

function posizionamento(griglia,riga,col,size,orizzontale,tipo){
    for (let i = 0; i < size; i++) {
        if (orizzontale) {
            griglia[riga][col + i] = 1;
            if (tipo === 'player') {
                    ottieniCella(giocatoreGriglia, riga, col + i).classList.add("nave");
                }else
                    ottieniCella(nemicoGriglia, riga , col + i).classList.add("nave");
            }else {
            griglia[riga + i][col] = 1;
                if (tipo === 'player') {
                    ottieniCella(giocatoreGriglia, riga + i, col).classList.add("nave");
                }else
                    ottieniCella(nemicoGriglia, riga + i, col).classList.add("nave");

            }
    }
}

function ottieniCella(grigliaHTML,riga,col){ // ottiene la cella HTML 
    return grigliaHTML.children[riga * grandezza_Griglia + col];
}

function clickCellaNemica(riga,col,cella){ // gestisce il click sulle celle del nemico
    if(!cella.classList.contains("acqua") && !cella.classList.contains("colpita")){
        if(cella.classList.contains("nave")){
            cella.classList.add("colpita");
            cella.classList.remove("nave");
        }else{
            cella.classList.add("acqua")
        }
        tentativi++;
        tentativiHTML.innerHTML = "Tentativi: "+ tentativi
        
    }
    

    
}

function turnoAI(){

}

