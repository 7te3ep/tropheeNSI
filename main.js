// parametre a utiliser pour la generation d'une partie, donc la creation d'un objet Game
var parameter = {
        showCellScore:false,
        len:50,
        spd:parseInt(getDOM('spd').value),
        popSize:20,
        cellSize : 25,
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

import {Game} from "./game/game.js"
import { getDOM } from "./tools.js"

const spriteSheet = new Image();
spriteSheet.onload = function() { game.init() }
spriteSheet.src = "MasterSimple.png";


let game  = new Game(parameter,spriteSheet)


getDOM("reset").addEventListener("click",()=>{
    getDOM("play").innerHTML = "PLAY"
    clearInterval(game.state)
    game  = new Game(parameter)
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


getDOM('spd').oninput = function() {parameter.spd = parseInt(this.value)}