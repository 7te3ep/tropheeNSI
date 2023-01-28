import {canva,ctx} from './canva.js'
import {Rabbit} from './rabbit.js'
import { drawGrid,createMap } from './grid.js'
import { pathFinding,createPool,scoreExpand } from './pathfinding.js'
import { getNeighbors } from './tools.js'
import { randInt,randArr ,rLen} from './tools.js'
import { wfc } from './wfc.js'

let renardSprite = new Image()
renardSprite.src = "./pixil-frame-0.png"

let rules = {
    "land":{cant:["wall"]},
    "dirt":{cant:[]},
    "wall":{cant:["land"]}
}


// update preys position and made them spawn if its the first turn 
function handlePreys(moove){
    if (!moove){
        let borders = createPool(map)
            .filter((item)=>{return item.entropy[0] != "wall" && item.score != undefined})
            .filter((item)=>{return item.x == 0 || item.x == map.length-2 || item.y == 0 || item.y == map.length-2})
        
        preyPop.forEach((prey)=>{          
            let spawn = borders[randInt(0,rLen(borders))]
            prey.x = spawn.x
            prey.y = spawn.y
        })
    }
    preyPop =  preyPop.filter((item)=>item.status =="alive")
    preyPop.forEach((prey,i)=>{
        if (moove) prey.update(map,preyPop)
        ctx.drawImage(renardSprite, prey.x*g.cell, prey.y*g.cell,g.cell, g.cell)
    })
}

function init(){
    g = {cell:25,ctr:0}
    preyPop = []
    for (let i = 0;i<80;i++){
        preyPop.push(new Rabbit(canva,g))
    }
    map = createMap()
    map[Math.floor(map.length/2)][Math.floor(map.length/2)].score = 0
}

var map, g , preyPop
init()
wfc(map,rules)
pathFinding()
handlePreys(false)
drawGrid(map)

window.addEventListener('keydown',(e)=>{
    g.ctr ++
    ctx.clearRect(0,0,canva.width,canva.height)
    drawGrid(map)
    handlePreys(true)
})

export {g,map}