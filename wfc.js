import { createPool } from "./pathfinding.js"
import {randArr , getBorders} from "./tools.js"
import { getNeighbors ,rLen} from './tools.js'
import { shuffleArray } from "./rabbit.js"

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
        return pool[i];
    }

    let pool = shuffleArray(createPool(map)) 
    while (pool.length > 0) {
        let item = collapse(pool)
        item.layer == 0
        expand(item,rules,map,true)
        pool = filterPool(pool).sort((a,b)=>{
            a.layer = undefined
            return a.entropy.length - b.entropy.length
        })
    }
}

function expand(item,rules,map,first){
    let cant = returnCant(item,rules)
        getNeighbors(map,item).forEach((neighbor)=>{
            if (first && neighbor.entropy.length != 1 && neighbor.wfc == undefined) expand(neighbor,rules,map,false)
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