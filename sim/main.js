import {canva,ctx} from './canva.js'
import {Rabbit} from './rabbit.js'
import { drawGrid,createMap } from './grid.js'
import { pathFinding,createPool,scoreExpand } from './pathfinding.js'
import { getNeighbors } from './tools.js'
import { randInt,randArr ,rLen, getBorders, colorSim} from './tools.js'
import { wfc } from './wfc.js'
import { Preda } from './preda.js'
import { graph } from '../data.js'

let renardSprite = new Image()
renardSprite.src = "./pixil-frame-0.png"
let preystats = [20]
let predastats = [20]
let ptdr = 0
let rules = {
    "land":{cant:["wall","tree"]},
    "dirt":{cant:["tree","grass"]},
    "wall":{cant:["land","tree","grass"]},
    "tree":{cant:["dirt","wall",'tree',"land"]},
    "grass":{cant:["wall","dirt"]}
}
// update preys position and made them spawn if its the first turn
function handlePreys(moove,init){
    if (init){
        let borders = getBorders(map)
        
        if (borders.length != 0) preyPop.forEach((prey)=>{   
            let rdmBorder = randInt(0,rLen(borders))   
            let spawn = borders[rdmBorder]
            prey.x = spawn.x
            prey.y = spawn.y
            if (borders.length > preyPop.length/10) borders.splice(rdmBorder,1)    
        })
    }
    preyPop.filter((item)=>item.status =="alive").forEach((prey,i)=>{
        if (moove) prey.update(map,preyPop)
        prey.draw(g)
    })
}

function handlePreda(canEat){
    predaPop.forEach((preda)=>{
        preda.draw()
        if (canEat){
            preyPop.forEach((prey)=>{
                if (Math.floor(preda.x/g.cell) == prey.x && Math.floor(preda.y/g.cell) == prey.y){
                    if (Math.random() < Math.round((colorSim("rgb(116, 220, 105)",prey.adn.color)/300)*100)/100){
                        prey.status = "eaten"
                        preda.eat = true
                    }
                }
            })
        }
    })
}
var map, g , preyPop, predaPop ,play, fpsCtr,predaX

function init(){
    g = {cell:20,hours:0,dayLength:24,dayTurns:1}
    fpsCtr = 0
    preyPop = []
    predaPop = []
    for (let i = 0;i<20;i++){
        preyPop.push(new Rabbit(canva,g,"rgb("+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+")"))
    }
    for (let i = 0;i<20;i++){
        predaPop.push(new Preda(canva,g))
    }
    map = createMap()
    wfc(map,rules)
    pathFinding()
    handlePreys(false,true)
    drawGrid(map)
}



function turn(){
    ctx.clearRect(0,0,canva.width,canva.height)
    drawGrid(map)
    if (fpsCtr % 1 == 0){
        g.hours ++
        handlePreys(true,false)
        handlePreda(true)
        if (preyPop.filter((item)=>item.status =="alive").length == 0){
            naturalSelection(preyPop)
            clearInterval(play);
            ptdr ++
            if (ptdr < 50){
                console.log(predastats,preystats)
                clearInterval(play)
                play = setInterval(turn,32)
            }
        } 
    }else {
        handlePreys(false,false)
        handlePreda(false)
}
    fpsCtr ++
}

function naturalSelection(preys) {
    preys = preys.filter((prey)=>prey.status != "eaten")
    preystats.push(preys.length)
    let result = []
    for (let i = 0;i<5+preys.length*1.8;i++){
        if (Math.random() <= 0.1){
            result.push(new Rabbit(canva,g,"rgb("+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+","+Math.ceil(Math.random()*255)+")"))
        }else {
            let parent1 = preys[randInt(0,preys.length-1)].adn.color
            let parent2 = preys[randInt(0,preys.length-1)].adn.color
            parent1 = parent1.substring(4, parent1.length-1).replace(/ /g, '').split(',');
            parent2 = parent2.substring(4, parent2.length-1).replace(/ /g, '').split(',');
            var adn = {
                r:(parseInt(parent1[0]) +parseInt(parent2[0]) )/2,
                g:(parseInt(parent1[1]) +parseInt(parent2[1]) )/2,
                b:(parseInt(parent1[2]) +parseInt(parent2[2]) )/2
            }
            result.push(new Rabbit(canva,g,"rgb("+adn.r+","+adn.g+","+adn.b+")"))
        }
    }
    preyPop = result
    result = []
    predaPop = predaPop.filter((preda)=>preda.eat == true)
    predastats.push(predaPop.length)
    for (let i = 0;i<5+ predaPop.length*2.1;i++){
        result.push(new Preda(canva,g))
    }
    predaPop = result
    handlePreys(false,true)
    drawGrid(map)
    graph(preystats,predastats)
}
init()

window.addEventListener('keydown',(e)=>{
    console.log(predastats,preystats)
    clearInterval(play)
    play = setInterval(turn,32)
})

function lol(){
    
}
//init=> key event => go => play => turn => Stop => 

export {g,map,rules,canva}