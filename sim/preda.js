import { getNeighbors } from "./tools.js"
import { ctx,canva } from "./canva.js"

class Preda {
    constructor(canvas,g,color){
        this.x = -g.cell - Math.round(Math.random() * 100)
        this.y = Math.round(Math.random() * canvas.height)
        this.g = g
        this.velocity = 40+ Math.round(Math.random() * 2 *10)/10
        this.eat = false
    }

    draw(preyPop){
        ctx.fillStyle = "red"
        ctx.fillRect(this.x,this.y,this.g.cell,this.g.cell)
        this.x += this.velocity
        if (this.x > canva.width){
            this.x = -50
            this.y = Math.round(Math.random() * canva.height)
            this.canEat = true
        } 
    }
}

export {Preda}