import { getNeighbors, shuffleArray } from "../tools.js"
import { ctx } from "./canva.js"

let rabbit = new Image()
rabbit.src = "../assets/rabbit.png"

export class Prey {
    constructor(color,param,x,y){
        this.x = x
        this.y = y
        this.adn  = {"color":color}
        this.status = "alive"
        this.param = param
    }

    update(map,preyPop){
        // si la proie est sur le terrier, attribut le statu : "a survecu"
        if (map[this.x][this.y].score == 0) this.status = "survived"

        // recupère les voisins
        let neighbors = shuffleArray(getNeighbors(map,this,false))
        neighbors =  neighbors
            .sort(function(a, b){return a.score - b.score})
            .filter((item)=>{return item.entropy[0]!= "wall"})
        let cheminLibre = preyPop.filter((prey)=>prey.status == "alive" && prey.x == neighbors[0].x && prey.y == neighbors[0].y).length == 0
        if (neighbors.length != 0 && cheminLibre){
            this.x = neighbors[0].x
            this.y = neighbors[0].y
        }
    }

    draw(){
        // draw prey background
        ctx.fillStyle = this.adn.color
        let pos = {x:this.x*this.param.cellSize,y:this.y*this.param.cellSize,pixel:this.param.cellSize/5}
        ctx.fillRect(pos.x,pos.y+(pos.pixel),this.param.cellSize,this.param.cellSize*0.8)
        ctx.fillRect(pos.x,pos.y,this.param.cellSize*0.4,this.param.cellSize)
        ctx.fillRect(pos.x+(pos.pixel*3),pos.y,this.param.cellSize*0.4,this.param.cellSize)
        ctx.drawImage(rabbit, pos.x, pos.y,this.param.cellSize,this.param.cellSize)
    }

    
}