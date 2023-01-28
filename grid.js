import {canva,ctx} from './canva.js'
import {g,map} from "./main.js"

export function drawGrid(map){
    map.forEach((x, i) => {
        x.forEach((y,j)=>{
            if(map[i][j].wfc == true && map[i][j].entropy[0] == "dirt") {ctx.fillStyle = "rgb(220, 162, 105)"} 
            if(map[i][j].wfc == true && map[i][j].entropy[0] == "land") {ctx.fillStyle = "rgb(116, 220, 105)"}
            if(map[i][j].wfc == true && map[i][j].entropy[0] == "wall" || map[i][j].score == undefined) {ctx.fillStyle = "black"} 
            if (map[i][j].score == 0 ) {ctx.fillStyle = "red"}
            ctx.fillRect(i*g.cell,j*g.cell,g.cell,g.cell)
            ctx.fillStyle= "white"
            ctx.fillText(map[i][j].score,i*g.cell,j*g.cell+ 10)
        })
    });
}

export function createMap(){
    let map = []
    for (let x = 0;x<=canva.width;x+=g.cell){
        map.push([])
        for (let y = 0;y<=canva.width;y+=g.cell){
            map[x/g.cell].push({x:x/g.cell,y:y/g.cell,score:undefined,"wfc":undefined,"entropy":["land","dirt","wall"]})
        }
    }
    return map
}
