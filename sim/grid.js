import {canva,ctx} from './canva.js'
import {g,map,rules} from "./main.js"

export function drawGrid(map){
    map.forEach((x, i) => {
        x.forEach((y,j)=>{
            if (map[i][j].entropy.length == 1){
                if(map[i][j].wfc == true && map[i][j].entropy[0] == "dirt") {ctx.fillStyle = "rgb(220, 162, 105)"} 
                if(map[i][j].wfc == true && map[i][j].entropy[0] == "land") {ctx.fillStyle = "rgb(116, 220, 105)"}
                if(map[i][j].wfc == true && map[i][j].entropy[0] == "tree") {ctx.fillStyle = "rgb(20, 500, 20)"}
                if(map[i][j].wfc == true && map[i][j].entropy[0] == "grass") {ctx.fillStyle = "rgb(150, 500, 20)"}
                if(map[i][j].wfc == true && map[i][j].entropy[0] == "wall" || map[i][j].score == undefined) {ctx.fillStyle = "black"} 
                if (map[i][j].score == 0 ) {ctx.fillStyle = "red"}
                ctx.fillRect(i*g.cell,j*g.cell,g.cell,g.cell)
            }
            //ctx.fillStyle= "white"
            //ctx.fillText(map[i][j].score,i*g.cell,j*g.cell+ 10)
        })
    });
}

export function createMap(){
    let map = []
    for (let x = 0;x<=canva.width;x+=g.cell){
        map.push([])
        for (let y = 0;y<=canva.height;y+=g.cell){
            map[x/g.cell].push({x:x/g.cell,y:y/g.cell,score:undefined,"wfc":undefined,"entropy":Object.keys(rules),layer:undefined})
        }
    }
    return map
}
