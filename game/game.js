import {Map} from "./map.js"
import { Preda } from "./preda.js"
import { Prey } from "./prey.js"
import {canva,ctx} from "./canva.js"
import {getBorders, randInt, rdmColor, randArr, getDOM } from "../tools.js"
import {graph, compute} from "./data.js"

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
        this.stats = {preda:[parameter.popSize],preys:[parameter.popSize]}
    }

    init(){
        // crée la map
        this.map.init()
        this.map.draw(ctx,this.param)
        // remplis les populations de depart
        let borders = getBorders(this.map.m)
        for (let i = 0; i<= this.param.popSize; i ++){
            this.predaPop.push(new Preda(this.param))
            let spawn = randInt(0,borders.length-1)
            this.preyPop.push(new Prey("rgb("+rdmColor()+","+rdmColor()+","+rdmColor()+")",this.param,borders[spawn].x,borders[spawn].y))
            if (borders.length > 10) borders.splice(spawn,1)
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
        // if turn launch
    }

    end(){
        clearInterval(this.state)
        if (this.param.len == this.day) return
        this.fps = 0
        this.naturalSelection()
        this.state = setInterval(this.play.bind(this),16)
        //natural selection
        // day ++
        this.day ++
        getDOM("day").innerHTML = "JOURS : "+this.day+"/"+this.param.len
        // if day < max launch start
    }

    naturalSelection(){
        this.stats.preda.push(this.predaPop.length-1)
        this.stats.preys.push(this.preyPop.length-1)
        graph(this.stats.preda,this.stats.preys)
        this.preyPop = this.preyPop.filter((prey)=> prey.status == "survived")
        compute(this.preyPop,this.day)
        this.predaPop = this.predaPop.filter((preda)=> preda.hasEat == true)
        let result = []
        let borders = getBorders(this.map.m)
        for (let i = 0;i<5+this.preyPop.length*1.5;i++){
            let spawn = randInt(0,borders.length-1)
            if (Math.random() <= 0.1){
                result.push(new Prey("rgb("+rdmColor()+","+rdmColor()+","+rdmColor()+")",this.param,borders[spawn].x,borders[spawn].y))
            }else {
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
        this.preyPop = result
        result = []
        for (let i = 0;i<5+ this.predaPop.length*1.5;i++){
            result.push(new Preda(this.param))
        }
        this.predaPop = result
    }
}

export {Game}


//let parent1 = this.preyPop[randInt(0,this.preyPop.length-1)].adn.color
//let parent2 = this.preyPop[randInt(0,this.preyPop.length-1)].adn.color
//parent1 = parent1.substring(4, parent1.length-1).replace(/ /g, '').split(',');
//parent2 = parent2.substring(4, parent2.length-1).replace(/ /g, '').split(',');
//var adn = {
//    r:(parseInt(parent1[0]) +parseInt(parent2[0]) )/2,
//    g:(parseInt(parent1[1]) +parseInt(parent2[1]) )/2,
//    b:(parseInt(parent1[2]) +parseInt(parent2[2]) )/2
//}
//result.push(new Prey("rgb("+adn.r+","+adn.g+","+adn.b+")",this.param,borders[spawn].x,borders[spawn].y))



