import { createPool } from "./pathfinding.js "

export function getNeighbors(map,item,diagonal){
    let neighbors = []
    if (map[item.x-1] != undefined && map[item.x-1][item.y] != undefined) neighbors.push(map[item.x-1][item.y])
    if (map[item.x+1] != undefined && map[item.x+1][item.y] != undefined)neighbors.push(map[item.x+1][item.y])
    if (map[item.x] != undefined && map[item.x][item.y - 1] != undefined)neighbors.push(map[item.x][item.y-1])
    if (map[item.x] != undefined && map[item.x][item.y + 1] != undefined)neighbors.push(map[item.x][item.y+1])
    if (!diagonal) return neighbors
    if (map[item.x+1] != undefined && map[item.x+1][item.y + 1] != undefined)neighbors.push(map[item.x+1][item.y+1])
    if (map[item.x+1] != undefined && map[item.x+1][item.y - 1] != undefined)neighbors.push(map[item.x+1][item.y-1])
    if (map[item.x-1] != undefined && map[item.x-1][item.y + 1] != undefined)neighbors.push(map[item.x-1][item.y+1])
    if (map[item.x-1] != undefined && map[item.x-1][item.y - 1] != undefined)neighbors.push(map[item.x-1][item.y-1])
    return neighbors
}

export function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let rLen = (arr)=>{return arr.length-1}
let randArr = (arr) => {return arr[randInt(0,rLen(arr))]}
const getBorders = (map)=> {return createPool(map).filter((item)=>{return item.entropy[0] != "wall" &&  item.entropy[0] != "tree" && item.score != undefined}).filter((item)=>{return item.x == 0 || item.x == map.length-2 || item.y == 0 || item.y == map.length-2})}
let getColorRgbValue = (color) => {return color.replace("rgb(","").replace(")","").split(",")}

function colorSim(color1,color2){
    let c1 = getColorRgbValue(color1)
    let c2 = getColorRgbValue(color2)
    var d = Math.sqrt((c1[0] - c2[0])**2 + (c1[1] - c2[1])**2 + (c1[2] - c2[2])**2)
    d < 0 ? d = d * -1 : d = d
    return d
}

export {randArr,rLen,getBorders ,colorSim}