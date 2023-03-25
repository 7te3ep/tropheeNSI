// POP GRAPH

// INIT
var popWidth = 700,
    popHeight = 450 ;

var popGraph = d3.select("#popStats")
    .append("svg")
    .attr({width: popWidth,height: popHeight});

popGraph.append('rect') // outline for reference
.attr({x: 0, y: 0,
    width: popWidth,
    height: popHeight,
    fill:"none",
    stroke: 'white',
    'stroke-width': 2});

// AFFICHE LE GRAPH DES POPULATIONS

// AFFICHE UNE COURBE
function update(array,color,param){
    var xy = []; // start empty, add each element one at a time
    for(var i = 0; i < array.length; i++ ) {
        xy.unshift({x: i, y: array[i]});
    }
    var xscl = d3.scale.linear()
        .domain([0,param.len]) //use just the x part
        .range([20,popWidth-20])
    var yscl = d3.scale.linear()
        .domain([d3.min(xy, function(d) { return + d.y; }), d3.max(xy, function(d) { return + d.y; })]) // use just the y part
        .range([popHeight-20,20])
    var slice = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return xscl(d.x);}) // apply the x scale to the x data
        .y(function(d) { return yscl(d.y);}) // apply the y scale to the y data
    popGraph.append("path")
        .attr("class", "line")
        .attr("d", slice(xy))
        .style("fill", "none")
        .style("stroke", color)
        .style("stroke-width", 4);
}

// AFFICHE LES DEUX COURBES
export function graph(array1,array2,param){
    if (array1.length == 0 || array2.length == 0) return
    d3.selectAll('.line').remove()
    d3.selectAll('.g').remove()
    update(array1,"blue",param)
    update(array2,"red",param)
}

// COLOR GRAPH

// INIT
var colorGraph = d3.select("#colorStats")
    .append("svg")
    .attr({width: 300,height: 450,class:"hsv"});
colorGraph.append('rect') // outline for reference
    .attr({x: 0, y: 0,
    width: 300,
    height: 450,
    fill:"none",
    stroke: 'white',
    'stroke-width': 2})

// CALCULE MOYENNE DE LA COULEURS DES PROIES
export function compute(preyPop){
    let sumR = []
    let sumG = []
    let sumB = []
    preyPop.forEach((prey)=>{
        let color = prey.adn.color
        let rgbArray = color.substring(4, color.length-1).replace(/ /g, '').split(',')
        sumR.push(rgbArray[0])
        sumG.push(rgbArray[1])
        sumB.push(rgbArray[2])
    })
    let moyenneCouleurs = (array) => Math.round(array.reduce((a, b) => a + parseInt(b), 0)/array.length-1).toString()
    let R =  moyenneCouleurs(sumR)
    let G =  moyenneCouleurs(sumG)
    let B =  moyenneCouleurs(sumB)
    return [R,G,B]
}

// AFFICHE LE GRAPH DES COULEURS
export function showColors(colors,param){
    d3.selectAll('.circle').remove()
    let rayon = 100/(param.len/10)
    let ctr = 0
    let colorY = rayon + 10
    let colorX
    for (let i = 0; i<colors.length-1;i++){
        colorX = 10+rayon+(ctr*rayon*2)
        colorGraph.append('circle')
            .attr('cx', colorX).attr('cy', colorY)
            .attr("class", "circle")
            .attr('r', rayon).attr('fill', 'rgb('+colors[i][0]+","+colors[i][1]+","+colors[i][2]+")");
        ctr ++
        if (10+rayon+(ctr*rayon*2)+rayon >= 300){
            ctr = 0
            colorY += rayon *2 + 10
        }
    }
}