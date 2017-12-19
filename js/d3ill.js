var sectContain = document.getElementById("wrapper");

let subj = ["A","B","BD","BF","BJ","BL","BX","C","D","DA","DG","DL","DR","DS","DT","E","F","G","GC","GE","GN","GR","GT","GV","H","HA","HB","HC","HD","HF","HG","HM","HN","HQ","HT","HV","J","JF","JG","JH","JJ","JV","JZ","K","KG","L","LB","LC","M","ML","N","ND","P","PA","PB","PC","PD","PF","PG","PH","PL","PN","PQ","PR","PS","PT","RC","Q","QA","QC","QD","QE","QH","R","RA","S","T","U","V","Z","ZA"];

var wrapper = d3.select("#wrapper")
    .append("svg").attr("viewBox", "-50 -50 " + (dims().width+100) + " " + (dims().height+300));
var chart = wrapper.append("g").attr("transform", "translate(0, 30)");

const parseTime = d3.timeParse("%Y-%m-%d");
var x = d3.scaleTime().range([0, dims().width]).domain([parseTime('2013-09-15'),parseTime('2017-10-31')]).nice();
var y = d3.scaleLinear().range([dims().height, 0]).domain([0, 3000]).nice();

const colorScale = d3.scaleOrdinal(["Student","Faculty", "Staff", "NA"]).range([ "#666", "forestgreen", "#660000", "#006600"])
const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

d3.tsv("js/ill.tsv", function(error, data) {
  data.forEach(function(d){
    d.turn = Number(d.turn);
    d.date = parseTime(d.date);
    let nm = d.name;
    let name = nm.split(" ");
    d.name = name.map(n => `${n[0]}${n.slice(1).toLowerCase()}`).join(" ");
    d.distance = +d.distance;
    d.distance = d.distance > 0 ? d.distance : 1;
  });
  var maxDist = Math.max(data.distance);
  chart.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .style("fill", function(d) {
      return colorScale(d.status);
    })
    .attr("cx", function(d) { return x(d.date);})
    .attr("cy", function(d) { return y(d.distance);})
    .attr("r", "4")
    .on("mouseover", function(d) {
      let tip = `${d.name}, ${d.state}<br>distance: ${d.distance} miles<br>${d.status}`;
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

    chart.append("g").attr("transform", "translate(0," + dims().height + ")").call(xAxisCall)
      .selectAll("text").attr("y", 0).attr("x",-10).style("opacity", "0.75").style("font-size", "10px")
      .style("text-anchor", "end").style("transform", "rotate(270deg)");
    chart.append("g").call(yAxisCall)
      .style("opacity", "0.75").style("font-size", "10px").style("text-anchor", "top");;
    
});