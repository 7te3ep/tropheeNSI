export function getNeighbors(map,item){
    let neighbors = []
    neighbors.push(map[item.x-1] ? map[item.x-1][item.y] : undefined)
    neighbors.push(map[item.x+1] ? map[item.x+1][item.y] : undefined)
    neighbors.push(map[item.x][item.y-1] ? map[item.x][item.y-1] : undefined)            
    neighbors.push(map[item.x][item.y+1] ? map[item.x][item.y+1] : undefined)
    return neighbors.filter((item)=>{return item != undefined})
}

export function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let rLen = (arr)=>{return arr.length-1}
let randArr = (arr) => {return arr[randInt(0,rLen(arr))]}

export {randArr,rLen}