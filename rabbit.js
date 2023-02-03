import { getNeighbors } from "./tools.js"
import { ctx } from "./canva.js"

let renardSprite = new Image()
renardSprite.src = "./rabbitTest.png"
class Rabbit {
    constructor(canvas,g){
        this.x
        this.y
        this.adn  = {"color":"rgb("+Math.ceil(Math.random()*255).toString()+","+Math.ceil(Math.random()*255).toString()+","+Math.ceil(Math.random()*255).toString()+")"}
        this.status = "alive"
    }

    update(map,preyPop){
        if (map[this.x][this.y].score == 0) this.status = "dead"
        
        let neighbors = shuffleArray(getNeighbors(map,this))
        
        neighbors =  neighbors.sort(function(a, b){return a.score - b.score}).filter((item)=>{return item.score != 5 && item.score != undefined})
        preyPop.every((prey)=>{
            if (prey.x == neighbors[0].x && prey.y == neighbors[0].y){
                neighbors = []
                return false
            }
        })
        if (neighbors.length != 0){
            this.x = neighbors[0].x
            this.y = neighbors[0].y
        }
    }

    draw(g){
        ctx.fillStyle = this.adn.color
        let pos = {x:this.x*g.cell,y:this.y*g.cell,pixel:g.cell/5}
        ctx.fillRect(pos.x,pos.y+(pos.pixel),g.cell,g.cell*0.8)
        ctx.fillRect(pos.x,pos.y,g.cell*0.4,g.cell)
        ctx.fillRect(pos.x+(pos.pixel*3),pos.y,g.cell*0.4,g.cell)
        ctx.drawImage(renardSprite, this.x*g.cell, this.y*g.cell,g.cell, g.cell)
    }
}


export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}


export {Rabbit}