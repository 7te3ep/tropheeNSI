import {Map} from "./map.js"
import { Preda } from "./preda.js"
import { Prey } from "./prey.js"
import {canva,ctx} from "./canva.js"
import {getBorders, randInt, rdmColor, randArr, getDOM } from "../tools.js"
import {graph, compute, showColors} from "./data.js"

class Game {
    constructor(parameter,spriteSheet){
        this.param = parameter
        this.preyPop = []
        this.predaPop = []
        this.day = 0
        this.stats = {preda : undefined, prey : undefined}
        this.spriteSheet = spriteSheet
        this.map = new Map(parameter,canva,this.spriteSheet )
        this.state
        this.fps = 0
        this.stats = {preda:[parameter.popSize],preys:[parameter.popSize],colors:[]}
    }

    init(){
        // crée la map
        this.map.init()
        this.map.draw(ctx,this.param)
        // remplis les populations de depart
        let borders = getBorders(this.map.m)
        for (let i = 0; i<= this.param.popSize; i ++){
            let spawn = randInt(0,borders.length-1)
            this.preyPop.push(new Prey("rgb("+rdmColor()+","+rdmColor()+","+rdmColor()+")",this.param,borders[spawn].x,borders[spawn].y))
            if (borders.length > 10) borders.splice(spawn,1)
        }
        for (let i = 0;i <= this.param.popSize; i++){
            this.predaPop.push(new Preda(this.param))
        }
        getDOM("day").innerHTML = "JOURS : "+this.day+"/"+this.param.len
    }

    start(){
        this.state = setInterval(this.play.bind(this),20)
        if (this.preyPop.filter((prey)=> prey.status == "alive").length == 0){
            this.end()
        }
    }

    play(){
        //clear
        ctx.clearRect(0,0,canva.width,canva.height)
        // draw map
        this.map.draw(ctx,this.param)

        this.preyPop.forEach((prey)=>{
            if (prey.status == "alive") {
                if ( this.fps % (31 - this.param.spd) == 0 ) prey.update(this.map.m,this.preyPop)
                prey.draw()
            }
        })
        // draw preda and preys
        this.predaPop.forEach((preda)=>{
            if ( this.fps % (31 - this.param.spd) == 0 ) this.preyPop = preda.hunt(this.preyPop)
            preda.draw()
        })
        if (this.preyPop.filter((prey)=> prey.status == "alive").length == 0) this.end()
        this.fps ++
        // si tour lancer
    }

    end(){
        clearInterval(this.state)
        if (this.param.len == this.day) return
        this.fps = 0
        this.naturalSelection()
        this.state = setInterval(this.play.bind(this),16)
        //natural selection
        this.day ++
        getDOM("day").innerHTML = "JOURS : "+this.day+"/"+this.param.len
        // if day < max launch start
    }

    naturalSelection(){
        // ADD STATS
        this.stats.preda.push(this.predaPop.length-1)
        this.stats.preys.push(this.preyPop.length-1)
        this.stats.colors.push(compute(this.preyPop))
        // DRAW DATA
        graph(this.stats.preys,this.stats.preda,this.param)
        showColors(this.stats.colors,this.param)
        // UPDATE POPULATION
        this.preyPop = this.preyPop.filter((prey)=> prey.status == "survived")
        this.predaPop = this.predaPop.filter((preda)=> preda.hasEat == true)
        // REPRODUCE PREYS
        let result = []
        let borders = getBorders(this.map.m)
        for (let i = 0;i<5+this.preyPop.length*1.5;i++){
            let spawn = randInt(0,borders.length-1)
            // MUTATION
            if (Math.random() <= 0.1){
                result.push(new Prey("rgb("+rdmColor()+","+rdmColor()+","+rdmColor()+")",this.param,borders[spawn].x,borders[spawn].y))
            } else {
            // NORMAL REPROD
                let parent1 = this.preyPop[randInt(0,this.preyPop.length-1)].adn.color
                parent1 = parent1.substring(4, parent1.length-1).replace(/ /g, '').split(',');
                var adn = {
                    r:parseInt(parent1[0]),
                    g:parseInt(parent1[1]),
                    b:parseInt(parent1[2])
                }
                result.push(new Prey("rgb("+adn.r+","+adn.g+","+adn.b+")",this.param,borders[spawn].x,borders[spawn].y))
            }
            if (borders.length > 10) borders.splice(spawn,1)
        }
        // UPDATE PREY
        this.preyPop = result
        // REPRODUCE PREDA
        let predaPopLen = 5 + this.predaPop.length*1.5
        this.predaPop = []
        for (let i = 0;i<predaPopLen;i++){
            this.predaPop.push(new Preda(this.param))
        }
    }
}

export {Game}