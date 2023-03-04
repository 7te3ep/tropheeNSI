import {randArr,getNeighbors,shuffleArray,createPool} from "../tools.js"

const spriteSheet = new Image();
spriteSheet.src = "MasterSimple.png";

let land = {
    x:16,
    y:16
}

let dirt = {
    x:16,
    y:128
}

let grass = {
    x:218,
    y:72
}

let tree = {
    x:218,
    y:90
}

let wall = {
    x:218,
    y:108
}

let hole = {
    x:218,
    y:126
}

class Map {
    constructor(parameter,canva){
        this.m
        this.rules = parameter.rules
        this.cellSize = parameter.cellSize
        this.canvaSize = canva
        this.wfcDepth = parameter.wfcDepth
    }

    init() {
        this.m = []
        // crée un array contenant la map qui est une grille
        for (let x = 0; x <= this.canvaSize.width;x += this.cellSize){
            this.m.push([])
            for (let y = 0;y<=this.canvaSize.height;y += this.cellSize){
                // chaque case est un objet
                this.m[x/this.cellSize].push({x:x/this.cellSize, y:y/this.cellSize, score:undefined, "wfc":undefined, "entropy":Object.keys(this.rules), layer:undefined})
            }
        }
        // appel la methode wfc pour appliquer le wave function collapse, le type de la case est sur l'attribut entropy
        this.wfc(this.m,this.rules)
        // applique ensuite le pathfinding pour attribuer un score a chaque case sur l'attribut layer
        this.pathFinding(this.m)
    }

    wfc(map,rules) {
        // on recupere toutes les cases de la map dans un array pool
        let pool = shuffleArray(createPool(map))

        // on applique le wfc j'usqu'a ce que pool soit vide
        while(pool.length > 0){
            // on collapse une case puis on met a jours ces voisins avec une profondeur nomné "wfcDepth"
            collapse(pool)
            for (let i = 0 ; i<= this.wfcDepth ; i++){
                let intersect = pool.filter((item)=>item.layer == i)
                if (intersect.length == 0) break
                intersect.forEach((item)=>expand(item,rules,map))
            }
            createPool(map).forEach((item)=>{item.layer = undefined})
            // on garde dans l'array pool les cases n'ayants pas eté collapse et on les trie par entropy croissante
            pool = filterPool(pool).sort((a,b)=>{return a.entropy.length - b.entropy.length})
        }
    }

    pathFinding(map){
        // on prend une case aleatoire pour le terrier, elle doit etre sur l'herbe
        randArr(createPool(map).filter((item)=>item.entropy[0] == "grass")).score = 0
        let index = 0
        var pool
        // tant que des cases correspondent a l'index, on fait se propager les scores
        while (index == 0 || pool.length >= 1){
            pool = createPool(map).filter((item) => item.score == index && item.entropy[0] != "wall" && item.entropy[0] != "tree")
            pool.forEach((item)=> scoreExpand(item,map))
            index ++
        }
    }

    draw(ctx,param) {
        // on parcour la map et on dessine sur le canva le graphisme correspondant a l'entropy
        this.m.forEach((x, i) => {
            x.forEach((y,j)=>{
                if (this.m[i][j].entropy.length == 1){
                    let texture
                    if (this.m[i][j].wfc == true && this.m[i][j].entropy[0] == "dirt") {texture = dirt }
                    else if (this.m[i][j].wfc == true && this.m[i][j].entropy[0] == "land") { texture = land }
                    else if (this.m[i][j].wfc == true && this.m[i][j].entropy[0] == "tree") { texture = tree }
                    else if (this.m[i][j].wfc == true && this.m[i][j].entropy[0] == "grass") { texture = grass }
                    // si la case est une montagne, ou qu'elle est isolé/innaccessible c'est un cailloux
                    if (this.m[i][j].wfc == true && this.m[i][j].entropy[0] == "wall" || this.m[i][j].score == undefined) { texture = wall }
                    // le terrier
                    if (this.m[i][j].score == 0 ) {texture = hole}
                    // dessine la case
                    ctx.drawImage(spriteSheet, texture.x, texture.y, 16, 16, i*this.cellSize,j*this.cellSize, this.cellSize, this.cellSize)
                    if (param.showCellScore) ctx.fillText(this.m[i][j].score, i*this.cellSize,j*this.cellSize+this.cellSize/2);
                }
            })
        });
    }
}
// ctx.fillRect(i*this.cellSize,j*this.cellSize,this.cellSize,this.cellSize)
function returnCant(cell,rules){
    // trouve les intersection entre les cant de toutes les entropy d'une case
    let cant = []
    cell.entropy.forEach(function(item,i){
        cant.push(rules[item].cant)
    })
    return cant.reduce((a, b) => a.filter(c => b.includes(c)));
}

function expand(item,rules,map){
    // enleve les impossibilité d'une case a ces voisins
    let cant = returnCant(item,rules)
    getNeighbors(map,item,true).forEach((neighbor)=>{
        if (neighbor.layer == undefined) neighbor.layer = item.layer ++ 
        let entropy = neighbor.entropy
        // parcour l'entropy du voisin et supprime les entropy qui sont dans la liste cant
        for (let i = 0; i < entropy.length && entropy.length > 1; i++) {
            if (cant.includes(entropy[i])){
                entropy.splice(i,1)
                i--
            }
        }
    })
}

function scoreExpand(cell,map){
    // ajoute 1 au score des cases autour de cell sur laquel on passe
    getNeighbors(map,cell,false)
        .filter((item)=>item.score == undefined)
        .forEach((item)=>{
            item.score = cell.score + 1
            // en fonction de son type, la case peut avoir un score modifié
            if (item.entropy[0] == "wall") item.score = 500
            else if (item.entropy[0] == "tree") item.score = 500
            else if (item.entropy[0] == "dirt") item.score ++
    })
}

function filterPool(pool) {
    return pool.filter((item)=>{return item.wfc == undefined})
}

function collapse (pool) {
    // prend une case proche de l'index 0 dans l'array et lui choisi un type dans ces entropy
    let i = pool.length > 10 ? Math.round(Math.random() * pool.length / 10) : 0
    // on met a jours la case avec son type, wfc = true parce qu'elle a ete collapse et layer = 0 pour la recurvivité
    Object.assign(pool[i],{"wfc":true, "entropy":[randArr(pool[i].entropy)], layer:0})
}

export {Map}