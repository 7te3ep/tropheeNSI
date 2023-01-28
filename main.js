import {canva,ctx} from './canva.js'
import {Rabbit} from './rabbit.js'
import { drawGrid,createMap } from './grid.js'
import { pathFinding,createPool,scoreExpand } from './pathfinding.js'
import { getNeighbors } from './tools.js'
import { randInt } from './tools.js'

let rLen = (arr)=>{return arr.length-1}
let randArr = (arr) => {return arr[randInt(0,rLen(arr))]}

let renardSprite = new Image()
renardSprite.src = "./pixil-frame-0.png"

// update preys position and made them spawn if its the first turn 
function handlePreys(moove){
    if (!moove){
        let borders = []
        map.forEach((x,i)=>{
            x.forEach((y,j)=>{
                if (i == 0 || i == map.length-2 || j == 0 || j == map.length-2){
                    borders.push(y)
                }
            })
        })
        borders = borders.filter((item)=>{return item.entropy[0] != "wall" && item.score != undefined})
        if(borders.length != 0){
            preyPop.forEach((prey)=>{          
                let spawn = borders[randInt(0,rLen(borders))]
                prey.x = spawn.x
                prey.y = spawn.y
            })
        }
    }
    ctx.fillStyle = "blue"
    preyPop =  preyPop.filter((item)=>item.status =="alive")
    preyPop.forEach((prey,i)=>{
        i --
        if (moove) prey.update(map,preyPop)
        //ctx.fillRect(prey.x*g.cell,prey.y*g.cell,g.cell,g.cell)
        ctx.drawImage(renardSprite, prey.x*g.cell, prey.y*g.cell,g.cell, g.cell)
    })
}

let rules = {
    "land":{cant:["wall"]},
    "dirt":{cant:[]},
    "wall":{cant:["land"]}
}

function cantUpdate(cell){
    let cant = []
    cell.entropy.forEach(function(item,i){
        cant.push([])
        rules[item].cant.forEach((value)=>{cant[i].push(value)})
    })
    let result = cant.reduce((a, b) => a.filter(c => b.includes(c)));
    return result
}

function wfc(map){
    let pool = createPool(map).filter((item)=>{return item.wfc == undefined})
    let filterPool = (pool)=>pool.filter((item)=>{return item.wfc == undefined})
    let collapse = (pool)=> {
        pool.sort((a,b)=>{return a.entropy.length - b.entropy.length})
        let item = pool[0]
        item.wfc = true
        item.entropy = [randArr(item.entropy)]
        return item
    }
    while (pool.length > 0) {
        let item = collapse(pool)
        let cant = cantUpdate(item)
        let neighbors = getNeighbors(map,item)
        neighbors.forEach((neighbor)=>{
            let len = neighbor.entropy.length
            for (let i = 0; i < len; i++) {
                if (cant.includes(neighbor.entropy[i])){
                    neighbor.entropy.splice(i,1)
                    i--
                    len--
                }
            }
        })       
        pool = filterPool(pool)
    }
}

function init(){
    ctr = 0
    g = {cell:25}
    preyPop = []
    for (let i = 0;i<80;i++){
        preyPop.push(new Rabbit(canva,g))
    }
    map = createMap()
    terrier = {co:Math.floor(map.length/2)}
    map[terrier.co][terrier.co].score = 0
}

var map, terrier, g , preyPop, ctr
init()
wfc(map)
pathFinding()
handlePreys(false)
drawGrid(map)



window.addEventListener('keydown',(e)=>{
    ctr ++
    ctx.clearRect(0,0,canva.width,canva.height)
    drawGrid(map)
    handlePreys(true)
})

export {g,map}