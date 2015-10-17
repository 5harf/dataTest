


var width = 900,
    height = 900, 
    margin = 50;

var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
var x=d3.scale.linear().domain([8000,600000]).range([margin,width-margin]);
var y=d3.scale.linear().domain([0,60000]).range([height-margin,margin]);
var r=d3.scale.linear().domain([460000,30000000]).range([0,20]);
var o=d3.scale.linear().domain([6500,43000]).range([.5,1]);
// var c=d3.scale.category10().domain(["Africa","America","Asia","Europe","Oceania"]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (height - margin) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "axis")
   .attr("transform", "translate(" + margin + ",0)")
  .call(yAxis);

svg.selectAll(".h").data(d3.range(-8,10,2)).enter()
  .append("line").classed("h",1)
  .attr("x1",margin).attr("x2",height-margin)
  .attr("y1",y).attr("y2",y)
  
svg.selectAll(".v").data(d3.range(1,5)).enter()
  .append("line").classed("v",1)
  .attr("y1",margin).attr("y2",width-margin)
  .attr("x1",x).attr("x2",x)
  
d3.csv("csvData.csv",function(csv) {
  // we first sort the data
 
  csv.sort(function(a,b) {return b.numberOfEmployees-a.numberOfEmployees;});
 
  // then we create the marks, which we put in an initial position
 
  svg.selectAll("circle").data(csv).enter()
    .append("circle")
    .attr("cx",function(d) {return x(0);})
    .attr("cy",function(d) {return y(0);})
    .attr("r",function(d) {return r(0);})
 
    // .style("fill",function(d) {return c(d.continent);})
    .style("opacity",function(d) {return o(+d.averageWorkerAnnual);})
 
      .append("title")
      .text(function(d) {return d.location;})
   
  // now we initiate - moving the marks to their position
 
  svg.selectAll("circle").transition().duration(1000)
    .attr("cx",function(d) {return x(+d.numberOfEmployees);})
    .attr("cy",function(d) {return y(+d.numberOfEstablishments);})
    .attr("r",function(d) {return r(Math.sqrt(+d.annualPayroll));})
})
