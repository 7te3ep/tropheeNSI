export function getNeighbors(map,item,diagonal){
    // recupere les voisins sur la grille, inclue les diagonales ou non 
    let neighbors = []
    if (map[item.x-1] != undefined && map[item.x-1][item.y] != undefined) neighbors.push(map[item.x-1][item.y])
    if (map[item.x+1] != undefined && map[item.x+1][item.y] != undefined)neighbors.push(map[item.x+1][item.y])
    if (map[item.x] != undefined && map[item.x][item.y - 1] != undefined)neighbors.push(map[item.x][item.y-1])
    if (map[item.x] != undefined && map[item.x][item.y + 1] != undefined)neighbors.push(map[item.x][item.y+1])
    if (!diagonal) return neighbors
    if (map[item.x+1] != undefined && map[item.x+1][item.y + 1] != undefined)neighbors.push(map[item.x+1][item.y+1])
    if (map[item.x+1] != undefined && map[item.x+1][item.y - 1] != undefined)neighbors.push(map[item.x+1][item.y-1])
    if (map[item.x-1] != undefined && map[item.x-1][item.y + 1] != undefined)neighbors.push(map[item.x-1][item.y+1])
    if (map[item.x-1] != undefined && map[item.x-1][item.y - 1] != undefined)neighbors.push(map[item.x-1][item.y-1])
    return neighbors
}

export function rLen (arr){
    return arr.length-1
}

export function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randArr(arr){
    return arr[randInt(0,rLen(arr))]
}

export function shuffleArray(array) {
    // melange un array
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

export function createPool(map){
    // extrait les objet cell de la l'array
    let result = []
    map.forEach((x,i)=>x.forEach((y,j)=>result.push(map[i][j])))
    return result
}

export function getDOM(id){
    // recupere un elelement du DOM, rend le code moin verbeux dans les autres fichiers
    return document.getElementById(id)
}
export let getColorRgbValue = (color) => {return color.replace("rgb(","").replace(")","").split(",")}

export function colorSim(color1,color2){
    let c1 = getColorRgbValue(color1)
    let c2 = getColorRgbValue(color2)
    var d = Math.sqrt((c1[0] - c2[0])**2 + (c1[1] - c2[1])**2 + (c1[2] - c2[2])**2)
    d < 0 ? d = d * -1 : d = d
    return d
}

export const getBorders = (map)=> {return createPool(map).filter((item)=>{return item.entropy[0] != "wall" &&  item.entropy[0] != "tree" && item.score != undefined}).filter((item)=>{return item.x == 0 || item.x == map.length-1 || item.y == 0 || item.y == map[0].length-1})}
export let rdmColor = ()=> Math.ceil(Math.random()*255)

export function rgb_to_hsv(r , g , b) {
  
    // R, G, B values are divided by 255
    // to change the range from 0..255 to 0..1
    r = r / 255.0;
    g = g / 255.0;
    b = b / 255.0;

    // h, s, v = hue, saturation, value
    var cmax = Math.max(r, Math.max(g, b)); // maximum of r, g, b
    var cmin = Math.min(r, Math.min(g, b)); // minimum of r, g, b
    var diff = cmax - cmin; // diff of cmax and cmin.
    var h = -1, s = -1;

    // if cmax and cmax are equal then h = 0
    if (cmax == cmin)
        h = 0;

    // if cmax equal r then compute h
    else if (cmax == r)
        h = (60 * ((g - b) / diff) + 360) % 360;

    // if cmax equal g then compute h
    else if (cmax == g)
        h = (60 * ((b - r) / diff) + 120) % 360;

    // if cmax equal b then compute h
    else if (cmax == b)
        h = (60 * ((r - g) / diff) + 240) % 360;

    // compute v
    return h
}