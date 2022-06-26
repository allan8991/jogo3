let canvas = null;
let ctx = null;
let tamQuadrado = 20;
let numLinha = 25;
let numColuna = 20;
let comprimentoTela = numColuna * tamQuadrado;
let alturaTela = numLinha * tamQuadrado;
let bolaX = Math.round((Math.random() * 10) + 5);
let bolaY = 9;
let dXBola = Math.round((Math.random() * 2) - 1);
let dYBola = 1;
let velXBola = 0.097;
let velYBola = 0.097;
let cont = 1;
let pecaMovelX = numColuna - 10;
let pecaMovelY = numLinha - 2;
let tamPecaMovel = 4;
let dXPeca = 0;
let vXPeca = 1.7;
let arrayPecasInimigas = [];

function gerarPecasInimigas() {
    let qtdLinhas = Math.round((Math.random() * 5) + 6);
    let qtdColunas = Math.round((Math.random() * 3) + 2);
    for (let m = 1; m <= qtdLinhas; m++) {
        for (let n = 1; n <= qtdColunas; n++) {
            arrayPecasInimigas.push({
                px: m + 5,
                py: n,
                corRed: Math.round((Math.random() * 255)),
                corGreen: Math.round((Math.random() * 255)),
                corBlue: Math.round((Math.random() * 255)),

            })
        }
    }
   


}
function desenharPecasInimigas() {

    for (let k = 0; k < arrayPecasInimigas.length; k++) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${arrayPecasInimigas[k].corRed},${arrayPecasInimigas[k].corGreen},${arrayPecasInimigas[k].corBlue})`;
        ctx.strokeRect((arrayPecasInimigas[k].px) * tamQuadrado, (arrayPecasInimigas[k].py) * tamQuadrado, tamQuadrado, tamQuadrado)
        ctx.fillRect((arrayPecasInimigas[k].px) * tamQuadrado, (arrayPecasInimigas[k].py) * tamQuadrado, tamQuadrado, tamQuadrado)

    }
    finalizarPartida();



}


function colisaoPecaMovelBordasTela() {
    if (comprimentoTela <= pecaMovelX * tamQuadrado + tamPecaMovel * tamQuadrado) {
        dXPeca = -1;


    }
    if (0 >= pecaMovelX) {
        dXPeca = 1;
    }


}

function movelPecaX(e) {
    if ((e.keyCode == 37) || (e.keyCode == 39)) {
        if (e.keyCode == 37) {
            dXPeca = -1;

        }
        if (e.keyCode == 39) {
            dXPeca = 1;
        }
        colisaoPecaMovelBordasTela();
        pecaMovelX += vXPeca * dXPeca;
    }

}
function finalizarPartida() {
    if (arrayPecasInimigas.length == 0) {
        alert("Você Ganhou, parabéns!!!");
        window.location.reload();

    }

}
function colisaoBolaPecaBordasTela() {

    if (bolaY * tamQuadrado + tamQuadrado > alturaTela) {
        //alert("GAME OVER");
        window.location.reload();
    }


    if (bolaY * tamQuadrado <= 0) {
        dYBola *= -1;
        if (dXBola == -1) {
            dXBola = -1;
        } else {
            velXBola = 0.15;
            dXBola = 1;

        }

    }
    if (bolaX * tamQuadrado + tamQuadrado >= comprimentoTela || bolaX * tamQuadrado <= 0) {
        velXBola = 0.16;
        dXBola *= -1;
        if (dYBola == -1) {

            dYBola = -1;
        } else {
            dYBola = 1;
        }

    }
}
function colisaoBolaPecaMovel() {

    if (bolaY * tamQuadrado + tamQuadrado >= pecaMovelY * tamQuadrado && (bolaX * tamQuadrado + tamQuadrado >= pecaMovelX * tamQuadrado
        && (pecaMovelX * tamQuadrado) + (tamQuadrado * tamPecaMovel) >= tamQuadrado * bolaX)) {
        if (bolaX * tamQuadrado > pecaMovelX * tamQuadrado + ((tamQuadrado * tamPecaMovel) / 2)) {
            velXBola = 0.14;
            dXBola = 1;

        }
        else if (bolaX * tamQuadrado < pecaMovelX * tamQuadrado + ((tamQuadrado * tamPecaMovel) / 2)) {
            velXBola = 0.12;
            dXBola = -1;

        }else{
            velXBola = 0.1;
            dXBola *= -1;
        }
    

        dYBola = -1;
    }


}

function colisaoBolaPecaInimiga() {

    for (let k = 0; arrayPecasInimigas.length > k; k++) {
        if (((arrayPecasInimigas[k].px * tamQuadrado <= bolaX * tamQuadrado + tamQuadrado) && (arrayPecasInimigas[k].px * tamQuadrado + tamQuadrado >= bolaX * tamQuadrado)) &&
            ((arrayPecasInimigas[k].py * tamQuadrado <= bolaY * tamQuadrado + tamQuadrado) && (arrayPecasInimigas[k].py * tamQuadrado + tamQuadrado >= bolaY * tamQuadrado))) {
            arrayPecasInimigas.splice(k, 1);
            dYBola = 1;
            dXBola *=-1;

        }

    }
}
function moverBola() {
    colisaoBolaPecaInimiga();
    colisaoBolaPecaMovel();
    colisaoBolaPecaBordasTela();
    bolaX += velXBola * dXBola;
    bolaY += velYBola * dYBola;
    desenharBola();

}
function desenharPecaMovel() {
    ctx.beginPath();
    ctx.fillStyle = "#0a0";
    ctx.fillRect(pecaMovelX * tamQuadrado, pecaMovelY * tamQuadrado, tamQuadrado * tamPecaMovel, tamQuadrado)

}
function desenharBola() {
    ctx.beginPath();
    ctx.fillStyle = "#f00";
    ctx.fillRect(bolaX * tamQuadrado, bolaY * tamQuadrado, tamQuadrado, tamQuadrado)

}


function desenharTelaJogo() {
    for (let x = 1; numLinha > x; x++) {
        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5;
        ctx.moveTo(0, tamQuadrado * x);
        ctx.lineTo(comprimentoTela, tamQuadrado * x);
        ctx.stroke();    
    }
    for (let y = 1; numColuna > y; y++) {
        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5;
        ctx.moveTo(tamQuadrado * y, 0);
        ctx.lineTo(tamQuadrado * y, alturaTela);
        ctx.stroke();

    }
}
function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharTelaJogo();
    desenharPecaMovel();
    desenharPecasInimigas();
    moverBola();
    window.requestAnimationFrame(game);
}
window.addEventListener("load", () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", movelPecaX);
    gerarPecasInimigas();
    game();
})