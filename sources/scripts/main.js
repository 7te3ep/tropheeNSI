// parametre a utiliser pour la generation d'une partie, donc la creation d'un objet Game
var parameter = {
        showCellScore:false,
        len:50,
        spd:parseInt(getDOM('spd').value),
        popSize:20,
        cellSize : 20,
        wfcDepth:10,
        biom:"rgb(0,255,0)",
        rules:{
            "land":{cant:["wall","tree"]},
            "dirt":{cant:["tree","grass"]},
            "wall":{cant:["land","tree","grass"]},
            "tree":{cant:["dirt","wall",'tree',"land"]},
            "grass":{cant:["wall","dirt"]}
        }
}

import {Game} from "./modules/game.js"
import { getDOM } from "./tools.js"

// charge la spritesheet pour eviter les problemes d'affichages pour les mauvaises connexions
const spriteSheet = new Image();
spriteSheet.onload = function() { game.init() }
spriteSheet.src = "../assets/MasterSimple.png";

//INIT
let game  = new Game(parameter,spriteSheet)

// HANDLE FRONTEND

getDOM("reset").addEventListener("click",()=>{
    getDOM("play").innerHTML = "PLAY"
    clearInterval(game.state)
    parameter.biom = "rgb(0,255,0)"
    game  = new Game(parameter,spriteSheet)
    game.init()
})

getDOM("showPathScore").addEventListener("click",()=>{
    parameter.showCellScore = parameter.showCellScore ? false : true
    getDOM("showPathScore").innerHTML = parameter.showCellScore ? "Affiche score" : "N'affiche pas score"
})

getDOM("play").addEventListener("click",()=>{
    if (game.fps != 0) return
        getDOM("play").innerHTML = "PLAYING"
        game.start()
})

getDOM('spd').oninput = function() {
    parameter.spd = parseInt(this.value)
    game.predaPop.forEach((preda)=>{
        preda.updateSpd()
    })
}

getDOM("submitQuantity").addEventListener("click",()=>{
    parameter.len = getDOM("quantity").value
})

getDOM("biomChange").addEventListener("click",()=>{
    parameter.biom = "rgb(205, 159, 33)"
})