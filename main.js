import {canva,ctx} from './canva.js'
import {Rabbit} from './rabbit.js'
import { drawGrid,createMap } from './grid.js'
import { pathFinding,createPool,scoreExpand } from './pathfinding.js'
import { getNeighbors } from './tools.js'
import { randInt,randArr ,rLen, getBorders, colorSim} from './tools.js'
import { wfc } from './wfc.js'

// retry if map is bad
// no more absolute values
// project architecture rework
// wfc improved (more rules)
// project clean and commented

<<<<<<< HEAD

=======
let renardSprite = new Image()
renardSprite.src = "./pixil-frame-0.png"
>>>>>>> 8425ff6f580ae3835fc61e4afeb691d3d9147c3a

let rules = {
    "land":{cant:["wall"]},
    "dirt":{cant:["tree"]},
    "wall":{cant:["land","tree"]},
    "tree":{cant:["dirt","wall",'tree']}
}

// update preys position and made them spawn if its the first turn
function handlePreys(moove){
    if (!moove){
        let borders = getBorders(map)
        
        if (borders.length != 0) preyPop.forEach((prey)=>{          
            let spawn = borders[randInt(0,rLen(borders))]
            prey.x = spawn.x
            prey.y = spawn.y
        })
    }
    preyPop =  preyPop.filter((item)=>item.status =="alive")
    console.log(preyPop)
    preyPop.forEach((prey,i)=>{
        if (moove) prey.update(map,preyPop)
        prey.draw(g)
    })
}


function init(){
    g = {cell:20,hours:0,dayLength:24,dayTurns:1}
    preyPop = []
    for (let i = 0;i<80;i++){
        preyPop.push(new Rabbit(canva,g))
    }
    map = createMap()
}

var map, g , preyPop
init()
wfc(map,rules)
pathFinding()
handlePreys(false)
drawGrid(map)

window.addEventListener('keydown',(e)=>{

    let play = setInterval(()=>{
        g.hours ++
        ctx.clearRect(0,0,canva.width,canva.height)
        drawGrid(map)
        handlePreys(true)
        if (preyPop.length == 0) clearInterval(play);
    },100)
    preyPop.sort((a,b)=>{
        return colorSim("rgb(116, 220, 105)",a.adn.color) - colorSim("rgb(116, 220, 105)",b.adn.color)
    })
    //rgb(118,209,94) 
    console.log(preyPop[0].adn.color)
})

export {g,map,rules}