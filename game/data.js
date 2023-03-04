import { rgb_to_hsv } from "../tools.js";

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

var xy
function update(array,color){
    var xy = []; // start empty, add each element one at a time
    for(var i = 0; i < array.length; i++ ) {
        xy.unshift({x: i, y: array[i]});
    }

    var xscl = d3.scale.linear()
        .domain([0,50]) //use just the x part
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

export function graph(array1,array2){
    if (array1.length == 0 || array2.length == 0) return
    d3.selectAll('.line').remove()
    d3.selectAll('.g').remove()
    update(array1,"blue")
    update(array2,"red")
}

var colorGraph = d3.select("#colorStats")
    .append("svg")
    .attr({width: 300,height: 450,class:"hsv"});
colorGraph.append('rect') // outline for reference
    .attr({x: 0, y: 0,
    width: 300,
    height: 450,
    fill:"none",
    stroke: 'white',
    'stroke-width': 2});


let dayCtr = 0
let colorX
let rayon = 20
let colorY = rayon + 10
export function compute(preyPop,day){
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

    colorX = 10+rayon+(dayCtr*rayon*2)
    colorGraph.append('circle')
        .attr('cx', colorX).attr('cy', colorY)
        .attr('r', rayon).attr('fill', 'rgb('+R+","+G+","+B+")");
    dayCtr ++
    if (10+rayon+(dayCtr*rayon*2)+rayon >= 300){
        dayCtr = 0
        colorY += rayon *2 + 10
    }
}


