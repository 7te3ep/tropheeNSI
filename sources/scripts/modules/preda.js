import { colorSim } from "../tools.js"
import { ctx,canva } from "./canva.js"

let eagle = new Image()
eagle.src = "../assets/eagle.png"
let frames = [{x: 9,y: 30,w:20,h:21},{x: 40,y: 30,w:21,h:21},{x: 73,y: 31,w:21,h:26}]

export class Preda {
    constructor(param){
        this.param = param
        this.x = -this.param.cellSize - Math.round(Math.random() * 100)
        this.y = Math.round(Math.random() * canva.height)
        this.velocity = this.param.spd * 0.7 + Math.round(Math.random() * 2 * 10 ) / 10
        this.hasEat = false
        this.animFrames = 0
        this.currentFrame = 0
    }

    hunt(preyPop){
        // recupere les proies a proximité puis lance eat() pour chacune
        preyPop.filter((prey)=> prey.status == "alive").forEach((prey)=>{
            if (Math.floor(this.x/this.param.cellSize) == prey.x && Math.floor(this.y/this.param.cellSize) == prey.y){
                prey = this.eat(prey)
            }
        })
        return preyPop
    }

    eat(prey){
        // calcul la probabilité de manger la proie en fonction de son camouflage (colorSim)
        if (Math.random() <  0.1 + Math.round((colorSim(this.param.biom,prey.adn.color) / 300) * 100) / 100){
            prey.status = "dead"
            if (!this.hasEat) this.hasEat = true
            return prey
        }
    }

    updateSpd(){
        this.velocity = this.param.spd * 0.7 + Math.round( Math.random() * 2 *10 ) / 10
    }

    draw(){
        // gestion de l'animation du vol des oiseaux
        this.animFrames ++
        if (this.animFrames == 10) {
            this.animFrames = 0
            if (this.currentFrame == 2) this.currentFrame = 0
            else this.currentFrame ++
        }
        // dessine l'aigle
        ctx.drawImage(eagle , frames[this.currentFrame].x, frames[this.currentFrame].y, frames[this.currentFrame].w, frames[this.currentFrame].h, this.x,this.y, this.param.cellSize, this.param.cellSize)
        // met a jours sa position
        this.x += this.velocity
        if (this.x > canva.width){
            this.x = -50
            this.y = Math.round(Math.random() * canva.height)
            this.canEat = true
        }
    }
}
