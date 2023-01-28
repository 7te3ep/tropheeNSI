import {canva,ctx} from './canva.js'
import {g,map} from "./main.js"

export function createPool(map){
    let result = []
    map.forEach((x,i)=>x.forEach((y,j)=>result.push(map[i][j])))
    return result
}

export function scoreExpand(cell){
    let neighbors = []
    neighbors.push(map[cell.x-1] ? map[cell.x-1][cell.y] : undefined)
    neighbors.push(map[cell.x+1] ? map[cell.x+1][cell.y] : undefined)
    neighbors.push(map[cell.x][cell.y-1] ? map[cell.x][cell.y-1] : undefined)
    neighbors.push(map[cell.x][cell.y+1] ? map[cell.x][cell.y+1] : undefined)
    
    neighbors = neighbors.filter((item)=>item != undefined && item.score == undefined)
    neighbors.forEach((item)=>{
            item.score = cell.score + 1
            if (item.entropy[0] == "wall") item.score = 500
            if (item.entropy[0] == "dirt") item.score ++ 
    })
}

export function pathFinding(){
    let index = 0
    let continu = true
    while (continu){
        continu = false
        var pool = createPool(map).filter((item) => item.score == index && item.entropy[0] != "wall" )

        if (pool.length >= 1)continu = true
        pool.forEach((item)=>scoreExpand(item))
        index++
    }
}

