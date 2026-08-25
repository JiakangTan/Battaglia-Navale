"use strict"

const grandezza_Griglia = 10; // 8x8 o 10x10
const grandezzeNavi = [5, 4, 3, 3, 2];  // ci sono 5 navi con le rispettive grandezze

let griglia_Giocatore = [];
let griglia_Nemica = []; 
let naviRimastePlayer = 0;
let naviRimasteNemico = 0;
let gameOver = false;
let tentativi = 0;
let turnoComputer = false;

// cronometro
let interval = null;
let secondi = 0;
let minuti = 0;
let Attivo = false;


const giocatoreGriglia = document.getElementById('griglia-giocatore');
const nemicoGriglia = document.getElementById('griglia-nemico'); 
const statoPartita = document.getElementById('stato');
const btnRicomincia = document.getElementById('btn-partita');
const tentativiHTML = document.getElementById('tent');
const naviRimasteHTML = document.getElementById('navRimaste');

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

    naviRimasteHTML.innerHTML = "Celle navi rimaste: " + naviRimasteNemico;
    IniziaCronometro();
    
    statoPartita.innerHTML = "Il tuo turno!"

    tentativi = 0;
    tentativiHTML.innerHTML = "Tentativi: " + tentativi;

    console.log(griglia_Nemica) // dice dove sono le navi (0 = acqua , 1 = nave, 2 = acqua colpita , 3 = nave colpita) nella console

    btnRicomincia.disabled = true;
}

function IniziaCronometro(){
    if(Attivo == true){
        clearInterval(interval); 
    }

    minuti = 0
    secondi = 0;
    cronometro.innerHTML = `0${minuti}:0${secondi}`

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
                }
            }else {
            griglia[riga + i][col] = 1;
                if (tipo === 'player') {
                    ottieniCella(giocatoreGriglia, riga + i, col).classList.add("nave");
                }
            }
    }
}

function ottieniCella(grigliaHTML,riga,col){ // ottiene la cella HTML 
    return grigliaHTML.children[riga * grandezza_Griglia + col];
}

function clickCellaNemica(riga,col,cella){ // gestisce il click sulle celle del nemico
    if(gameOver || griglia_Nemica[riga][col] > 1 || turnoComputer == true) return; // se condizione verificata allora succede niente
    
    if(griglia_Nemica[riga][col] == 1){
        cella.classList.add("colpita");
        griglia_Nemica[riga][col] = 3;
        naviRimasteNemico--;
        statoPartita.innerHTML = "Nave colpita!";
        naviRimasteHTML.innerHTML = "Celle navi rimaste: " + naviRimasteNemico;

        if(naviRimasteNemico === 0){
            statoPartita.innerHTML = "Hai vinto!"
            gameOver = true;
            clearInterval(interval)
            Attivo = false;

            btnRicomincia.disabled = false;
            return;
        }

    }else{
        griglia_Nemica[riga][col] = 2;
        cella.classList.add("acqua");
        statoPartita.innerHTML = "Acqua!";
    }

    turnoComputer = true; // disattiva lo click del giocatore
    
    setTimeout(() => {
        statoPartita.innerHTML = "Turno del computer...";
    }, 1000);

    setTimeout(turnoAI, 2500);
    
    
    tentativi++;
    tentativiHTML.innerHTML = "Tentativi: "+ tentativi;
        
    
    
}

function turnoAI(){
    if (gameOver) return;

        let colpoValido = false;
        let riga, col, cellaHTML;

        while (!colpoValido) {
            riga = Math.floor(Math.random() * grandezza_Griglia);
            col = Math.floor(Math.random() * grandezza_Griglia);

            if (griglia_Giocatore[riga][col] <= 1) {
                colpoValido = true;
            }
        }

        cellaHTML = ottieniCella(giocatoreGriglia, riga, col);

        if (griglia_Giocatore[riga][col] === 1) {
            griglia_Giocatore[riga][col] = 3;
            cellaHTML.classList.add("colpita");
            naviRimastePlayer--;
            statoPartita.innerHTML = "Il computer ha colpito una tua nave!";

            if (naviRimastePlayer === 0) {
                statusEl.textContent = "Hai perso! Il computer ha distrutto la tua flotta.";
                gameOver = true;
                btnRicomincia.disabled = false;
                return;
            }   
        }else{
            griglia_Giocatore[riga][col] = 2;
            cellaHTML.classList.add("acqua");
            statoPartita.innerHTML = "Il computer ha fatto acqua.";
        }
    turnoComputer = false;
}

