let libraries = [];

//let subj = ["A","B","BD","BF","BJ","BL","BX","C","D","DA","DG","DL","DR","DS","DT","E","F","G","GC","GE","GN","GR","GT","GV","H","HA","HB","HC","HD","HF","HG","HM","HN","HQ","HT","HV","J","JF","JG","JH","JJ","JV","JZ","K","KG","L","LB","LC","M","ML","N","ND","P","PA","PB","PC","PD","PF","PG","PH","PL","PN","PQ","PR","PS","PT","RC","Q","QA","QC","QD","QE","QH","R","RA","S","T","U","V","Z","ZA"];
var svg =  d3.select("#wrapper").append("svg").attr("viewBox", "-50 50 " + (dims.width() + 300) + " " + (dims.height() + 100));
var canvas = svg.append("g").attr("transform", "translate(0, 30)");
const parseTime = d3.timeParse("%Y-%m-%d");
//var x = d3.scaleTime().range([0, dims().width]).domain([parseTime('2013-09-15'),parseTime('2017-10-31')]).nice();
var x = d3.scaleLinear().range([0, dims.width()]).domain([0, 2500]).nice();
var y = d3.scaleLinear().range([dims.height(), 0]).domain([0, 40]).nice();
const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
const colorScale = d3.scaleOrdinal("NY", true, false).range(["hsla(240, 80%, 80%, 0.9)", "hsla(120, 80%, 80%, 0.9)", "hsla(0, 80%, 80%, 0.9)"]);

d3.json("js/ill.json", function(error, data) {
  data.forEach(function(d){
      d.date = parseTime(d.date);
  });

  canvas.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .style("fill", function(d) {
      return colorScale(d.type);
    })
    .attr("cx", function(d) { return x(d.distance);})
    .attr("cy", function(d) { return y(d.turn);})
    .attr("r", "5")
    .on("mouseover", function(d) {
      let tip = `${d.name}<br>distance: ${d.distance} miles<br>days: ${d.turn}`;
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(tip)
        .style("left", (d3.event.pageX + 15) + "px")
        .style("top", (d3.event.pageY - 25) + "px");
    })
    .on("mouseout", function(d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
    
    var yAxisCall = d3.axisLeft(y);
    var xAxisCall = d3.axisBottom(x);

    canvas.append("g").attr("transform", "translate(0," + dims.height() + ")").call(xAxisCall)
      .selectAll("text").attr("y", 0).attr("x",-10).style("opacity", "0.75").style("font-size", "10px")
      .style("text-anchor", "end").style("transform", "rotate(270deg)");
    canvas.append("g").call(yAxisCall)
      .style("opacity", "0.75").style("font-size", "12px").style("text-anchor", "top");
   
});