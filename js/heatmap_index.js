var margin = {top: 80, right: 25, bottom: 30, left: 150},
  width = 600 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;
var datasets = ["sts.csv", "issue_status.csv"];

var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateYlGnBu)
    .domain([0,100])


    
var svg = d3.select("#my_dataviz")
       .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
var bars = svg.selectAll(".bars")
        .data(d3.range(0,100), function(d) { return d; })
        .enter().append("rect")
        .attr("class", "bars")
        .attr("x", function(d, i) { return i*3.45; })
        .attr("y", -40)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("height", 20)
        .attr("width", 6)
        .style("font-family","system-ui")
        .style("fill", function(d, i) { return myColor(d); })


svg.append("text")
    .attr("x", 2)
    .attr("y", -8)
    .attr("text-anchor", "center")
    .style("font-size", "11px")
    .style("fill", "grey")
    .style("font-family","system-ui")
    .style("max-width", 400)
    .text("0");
svg.append("text")
    .attr("x", 87.5)
    .attr("y", -8)
    .attr("text-anchor", "center")
    .style("font-size", "11px")
    .style("fill", "grey")
    .style("font-family","system-ui")
    .style("max-width", 400)
    .text("25");      
svg.append("text")
    .attr("x", 173)
    .attr("y", -8)
    .attr("text-anchor", "center")
    .style("font-size", "11px")
    .style("fill", "grey")
    .style("font-family","system-ui")
    .style("max-width", 400)
    .text("50"); 
svg.append("text")
    .attr("x", 258.5)
    .attr("y", -8)
    .attr("text-anchor", "center")
    .style("font-size", "11px")
    .style("fill", "grey")
    .style("font-family","system-ui")
    .style("max-width", 400)
    .text("75"); 

svg.append("text")
        .attr("x", 330)
        .attr("y", -8)
        .attr("text-anchor", "center")
        .style("font-size", "11px")
        .style("fill", "grey")
        .style("font-family","system-ui")
        .style("max-width", 400)
        .text("100");
var div = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("border-width", "2px")
          
//Read the data
d3.csv("data/heatmap_stats.csv").then(function(data) {

  var x = d3.scaleBand()
    .range([ 0, 350 ])
    .domain(data.map(function(d) {
                return d.group;
            }))
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(data.map(function(d) {
                return d.variable;
            }))
    .padding(0.05);
  svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  
  var squares = svg.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.group) })
      .attr("y", function(d) { return y(d.variable) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", function(event,d) {
          div.style("opacity", 1)
          d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
       })
      .on("mousemove", function(event,d) {
        div
         .style("opacity", 1)
         div.html("["+d.group +"] from ["+ d.variable +"]: " + d.value)
         .style("left",(d3.mouse(this)[0]+70)  + "px")
         .style("top", (d3.mouse(this)[1]) + "px");
       })
      .on("mouseleave", function(d) {
        div
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
       });

  squares.transition()
    .duration(3000)
    .delay((d,i) => i*200)
    .style("opacity", 1)
  squares.exit.remove();

});

svg.append("text")
        .attr("x", 60)
        .attr("y", -50)
        .attr("text-anchor", "center")
        .style("font-size", "22px")
        .style("font-family","system-ui")
        .text("The Record of USERS");

svg.append("text")
        .attr("x", -280)
        .attr("y", -130)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "center")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("font-family","system-ui")
        .style("max-width", 400)
        .text("USER_ID");

svg.append("text")
        .attr("x",140)
        .attr("y",height + 30)
        .attr("text-anchor", "center")
        .style("font-size", "13px")
        .style("fill", "grey")
        .style("font-family","system-ui")
        .style("max-width", 400)
        .text("STATUS");