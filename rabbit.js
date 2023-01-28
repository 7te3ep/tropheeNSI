import { getNeighbors } from "./tools.js"

class Rabbit {
    constructor(canvas,g){
        this.x
        this.y
        this.adn  = {"weight":7,"size":10}
        this.status = "alive"
    }

    update(map,preyPop){
        if (map[this.x][this.y].score == 0) this.status = "dead"
        let neighbors = getNeighbors(map,this)
        
        shuffleArray(neighbors)
        neighbors =  neighbors.sort(function(a, b){return a.score - b.score})
        let go = true
        preyPop.forEach((prey)=>{
            if (prey.x == neighbors[0].x && prey.y == neighbors[0].y){
                go = false
            }
        })
        if (neighbors.length != 0 && go){
            this.x = neighbors[0].x
            this.y = neighbors[0].y
        }
    }
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


export {Rabbit}