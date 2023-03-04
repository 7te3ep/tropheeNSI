var width = 900,
    height = 500 ;

var svg = d3.select("body")
    .append("svg")
    .attr({width: width,height: height});

svg.append('rect') // outline for reference
	.attr({x: 0, y: 0,
	    width: width,
	    height: height,
	    stroke: 'black',
	    'stroke-width': 0.5,
	    fill:'white'});

var xy
function update(array,color){
    xy = []; // start empty, add each element one at a time
    for(var i = 0; i < array.length; i++ ) {
        xy.unshift({x: i, y: array[i]});
    }

    var xscl = d3.scale.linear()
        .domain([0,50]) //use just the x part
        .range([20,width-20])
    var yscl = d3.scale.linear()
        .domain([d3.min(xy, function(d) { return + d.y; }), d3.max(xy, function(d) { return + d.y; })]) // use just the y part
        .range([height-20,20])
    var slice = d3.svg.line()
        .interpolate("basis") 
        .x(function(d) { return xscl(d.x);}) // apply the x scale to the x data
        .y(function(d) { return yscl(d.y);}) // apply the y scale to the y data     // This controls the vertical position of the Axis
    svg.append("path")
        .attr("class", "line")
        .attr("d", slice(xy)) // use the return value of slice(xy) as the data, 'd'
        .style("fill", "none")
        .style("stroke", color)
        .style("stroke-width", 4);

}

function graph(array1,array2){
    if (array1.length == 0 || array2.length == 0) return
    d3.selectAll('.line').remove()
    d3.selectAll('.g').remove()
    update(array1,"blue")
    update(array2,"red")
}

export {graph}
