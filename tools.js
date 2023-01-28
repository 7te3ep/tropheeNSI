export function getNeighbors(map,item){
    let neighbors = []
    neighbors.push(map[item.x-1] ? map[item.x-1][item.y] : undefined)
    neighbors.push(map[item.x+1] ? map[item.x+1][item.y] : undefined)
    neighbors.push(map[item.x][item.y-1] ? map[item.x][item.y-1] : undefined)            
    neighbors.push(map[item.x][item.y+1] ? map[item.x][item.y+1] : undefined)
    neighbors = neighbors.filter((item)=>{return item != undefined})
    return neighbors
}

export function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}