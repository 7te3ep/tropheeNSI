import { createPool } from "./pathfinding.js"
import {randArr} from "./tools.js"
import { getNeighbors ,rLen} from './tools.js'

export function returnCant(cell,rules){
    let cant = []
    cell.entropy.forEach(function(item,i){
        cant.push([])
        rules[item].cant.forEach((value)=>{cant[i].push(value)})
    })
    let result = cant.reduce((a, b) => a.filter(c => b.includes(c)));
    return result
}

export function wfc(map,rules){
    let pool = createPool(map)
    let filterPool = (pool)=>pool.filter((item)=>{return item.wfc == undefined})
    let collapse = (pool)=> {
        pool[0].wfc = true;
        pool[0].entropy = [randArr(pool[0].entropy)];
        return pool[0];
    }

    while (pool.length > 0) {
        let item = collapse(pool)
        let cant = returnCant(item,rules)
        getNeighbors(map,item).forEach((neighbor)=>{
            let len = neighbor.entropy.length
            for (let i = 0; i < len; i++) {
                if (cant.includes(neighbor.entropy[i])){
                    neighbor.entropy.splice(i,1)
                    i--
                    len--
                }
            }
        })       
        pool = filterPool(pool).sort((a,b)=>{return a.entropy.length - b.entropy.length})
    }
}