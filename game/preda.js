import { colorSim } from "../tools.js"
import { ctx,canva } from "./canva.js"

export class Preda {
    constructor(param){
        this.param = param
        this.x = -this.param.cellSize - Math.round(Math.random() * 100)
        this.y = Math.round(Math.random() * canva.height)
        this.velocity = this.param.spd*0.7 + Math.round(Math.random() * 2 *10)/10
        this.hasEat = false
    }

    hunt(preyPop){
        if (!this.canEat) return preyPop
        preyPop.filter((prey)=> prey.status == "alive").forEach((prey)=>{
            if (Math.floor(this.x/this.param.cellSize) == prey.x && Math.floor(this.y/this.param.cellSize) == prey.y){
                prey = this.eat(prey)
            }
        })
        return preyPop
    }

    eat(prey){
        if (Math.random() < Math.round((colorSim(this.param.biom,prey.adn.color)/300)*100)/100){
            prey.status = "dead"
            this.hasEat = true
            return prey
        }
    }

    draw(){
        ctx.fillStyle = "red"
        ctx.fillRect(this.x,this.y,this.param.cellSize,this.param.cellSize)
        this.velocity = this.param.spd*0.7 + Math.round(Math.random() * 2 *10)/10
        this.x += this.velocity
        if (this.x > canva.width){
            this.x = -50
            this.y = Math.round(Math.random() * canva.height)
            this.canEat = true
        }
    }
}
