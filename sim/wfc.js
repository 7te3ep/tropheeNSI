import { createPool } from "./pathfinding.js"
import {randArr , getBorders} from "./tools.js"
import { getNeighbors ,rLen} from './tools.js'
import { shuffleArray } from "./rabbit.js"
import { drawGrid } from "./grid.js"

export function returnCant(cell,rules){
    let cant = []
    cell.entropy.forEach(function(item,i){
        cant.push(rules[item].cant)
    })
    return cant.reduce((a, b) => a.filter(c => b.includes(c)));
}

export function wfc(map,rules){
    let filterPool = (pool)=>pool.filter((item)=>{return item.wfc == undefined})
    let collapse = (pool)=> {
        let i = pool.length>10 ? Math.round(Math.random() * pool.length / 10) : 0
        pool[i].wfc = true;
        pool[i].entropy = [randArr(pool[i].entropy)];
        pool[i].layer = 0
        return pool[i];
    }

    let pool = shuffleArray(createPool(map)) 

    while(pool.length > 0){
        collapse(pool)

        let canContinu = true
        let i = 0
        while (canContinu == true && i < 5){
            canContinu = false
            pool.forEach(function(item){
                if (item.layer == i){
                    expand(item,rules,map)
                    canContinu = true
                }
            })
            i ++
        }
        createPool(map).forEach((item)=>{
            item.layer = undefined
        })
        pool = filterPool(pool).sort((a,b)=>{return a.entropy.length - b.entropy.length})

        drawGrid(map)
    }
}

function expand(item,rules,map,first){
    let cant = returnCant(item,rules)
    getNeighbors(map,item,true).forEach((neighbor)=>{
        if (neighbor.layer == undefined) neighbor.layer = item.layer ++ 
        let len = neighbor.entropy.length 
        for (let i = 0; i < len; i++) {
            if (cant.includes(neighbor.entropy[i]) && len > 1){
                neighbor.entropy.splice(i,1)
                i--
                len--
            }
        }
    })       
}