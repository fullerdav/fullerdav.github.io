const { log, time } = console;

Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

const assoc = {
  "AA":  ["B", "K", "M", "N", "DDD", "KKK", "SSS"],
  "BB":  ["B", "J", "M", "N", "AAA", "BBB", "CCC", "FFF", "HHH", "KKK", "MMM", "SSS", "QQQ"],
  "CC":  ["N", "BBB", "EEE", "KKK", "LLL", "MMM", "SSS"],
  "DD":  ["F", "J", "O", "AAA", "GGG", "HHH", "KKK", "MMM", "NNN", "OOO", "PPP"],
  "EE":  ["C", "O", "S", "AAA", "BBB", "DDD", "KKK", "LLL", "MMM", "NNN",  "OOO"],
  "FF":  ["D", "J", "O", "P", "S", "AAA", "BBB", "CCC", "FFF", "KKK", "LLL", "QQQ"],
  "GG":  ["O", "AAA", "BBB", "LLL", "SSS"],
  "HH":  ["E", "R", "FFF", "GGG", "JJJ", "LLL", "PPP", "RRR"],
  "II":  ["A", "C", "G", "H", "I", "L", "O", "P", "Q", "S", "BBB", "CCC", "FFF", "III", "MMM", "RRR"],
  "JJ":  ["N","O","HHH","NNN","KKK","OOO","PPP"],
  "KK":  ["O", "R", "KKK", "LLL", "MMM", "EEE", "SSS"],
  "LL":  ["N", "LLL", "SSS"],
  "A":   ["II"],
  "B":   ["AA", "BB"],
  "C":   ["EE", "II"],
  "D":   ["FF"],
  "E":   ["HH"],
  "F":   ["DD"],
  "G":   ["II"],
  "H":   ["II"],
  "I":   ["II"],
  "J":   ["BB", "DD", "FF"],
  "K":   ["AA"],
  "L":   ["II"],
  "M":   ["AA", "BB"],
  "N":   ["AA", "BB", "CC", "JJ", "LL"],
  "O":   ["DD", "EE", "FF", "GG", "II", "JJ", "KK"],
  "P":   ["FF", "II"],
  "Q":   ["II"],
  "R":   ["HH", "KK"],
  "S":   ["EE", "FF", "II"],
  "AAA": ["BB", "DD", "EE", "FF", "GG"],
  "BBB": ["BB", "CC", "EE", "FF", "GG", "II"],
  "CCC": ["BB", "FF", "II"],
  "DDD": ["AA", "EE"],
  "EEE": ["CC", "KK"],
  "FFF": ["BB", "FF", "HH", "II"],
  "GGG": ["DD", "HH"],
  "HHH": ["BB", "DD", "JJ"],
  "III": ["II"],
  "JJJ": ["HH"],
  "KKK": ["AA", "BB", "CC","DD", "EE", "FF", "JJ", "KK"],
  "LLL": ["CC", "EE", "FF", "GG", "HH", "KK", "LL"],
  "MMM": ["BB", "CC","DD", "EE", "II", "KK"],
  "NNN": ["DD", "EE", "JJ"],
  "OOO": ["DD", "EE", "JJ"],
  "PPP": ["DD", "HH", "JJ"],
  "QQQ": ["BB", "FF"],
  "RRR": ["HH", "II"],
  "SSS": ["AA", "BB", "CC", "GG", "KK", "LL"]
};

var htmlnodes = $(".node");
var nodeset = new Set(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","AA","BB","CC","DD","EE","FF","GG","HH","II","JJ","KK","LL","AAA","BBB","CCC","DDD","EEE","FFF","GGG","HHH","III","JJJ","KKK","LLL","MMM","NNN","OOO","PPP","QQQ","RRR","SSS"]);

var activeDivs = new Set();
var fadedDivs = new Set();
var clicked;


htmlnodes
  .on("mouseover", function() { 
      activeDivs.clear();
      fadedDivs.clear();
      if (this.id.length === 2) {
        assoc[this.id].forEach(function(k){
          activeDivs.add(k);  
        });
      } else {
        for (let key in assoc) {
          if (assoc[key].indexOf(this.id) !== -1) {
            activeDivs.add(key);  
          }
        }
      }
      activeDivs.add(this.id);
      fadedDivs = nodeset.difference(activeDivs); 

      activeDivs.forEach(function(k, index){
        $("#" + k + " span").toggleClass("hilite");
        let cls = $("#" + k + " span").attr("class").split(" ");
        $("#" + cls[0]).css("font-size", "1.5em").css("line-height", "2em");
        
      });
      fadedDivs.forEach(function(k, index){
        $("#" + k + " span").toggleClass("lolite");
      });
      makeSVG(this.id, assoc[this.id]);
  })
  .on("mouseout", function(){
    $("#svgcontainer").empty();
    activeDivs.forEach(function(k,index){
      $("#" + k + " span").toggleClass("hilite");
      let cls = $("#" + k + " span").attr("class").split(" ");
        $("#" + cls[0]).css("font-size", "1em").css("line-height", "1em");
    });
    fadedDivs.forEach(function(k, index){
      $("#" + k + " span").toggleClass("lolite");
    });
  })
  .on("click", function() {
    $("#svgcontainer").empty();
    $("#d3force").css("width", "96%").css("margin-left", "4%");
    $("#d3force1").css("width", "4%").css("margin-right", "96%").css("border-right", "2px solid black");
      clicked = this.id;
      if (this.id.length === 2) {
        treeDraw(this.id);  
      } else {
        treeDraw(activeDivs);
      } 
  });

  function makeSVG(src, targs) {
    var ns = {svg:"http://www.w3.org/2000/svg", xlink: "http://www.w3.org/1999/xlink"};
    var svg = document.createElementNS(ns.svg, "svg");
    let g = document.createElementNS(ns.svg, "g");
  
    let elsrc = document.querySelector("#" + src + " span");
    let length2 = src.length === 2 ? true : false;
    let s = {x: elsrc.offsetTop + elsrc.offsetHeight/2};
    
    targs.forEach(function(targ){
      let targsrc = document.querySelector("#" + targ + " span");
      let length1 = targ.length === 1 ? true : false;
      let t = {x: targsrc.offsetTop + targsrc.offsetHeight/2};

      if (length2) {
        t.y = length1 ? (targsrc.offsetLeft + targsrc.offsetWidth) : targsrc.offsetLeft; 
        s.y = length1 ? elsrc.offsetLeft : (elsrc.offsetLeft + elsrc.offsetWidth);
        log("length2", t.y, s.y);
      } else {
        t.y = src.length === 1 ?  targsrc.offsetLeft : (targsrc.offsetWidth + targsrc.offsetLeft); 
        s.y = src.length === 1 ?  elsrc.offsetLeft + elsrc.offsetWidth : elsrc.offsetLeft; 
         log("else", t.y, s.y);
      }
     
      let d = `M ${s.y} ${s.x}
          C ${(s.y + t.y) / 2} ${s.x},
            ${(s.y + t.y) / 2} ${t.x},
            ${t.y} ${t.x}`;

       let path = document.createElementNS(ns.svg, "path");
       
        path.setAttribute("class", "link");
        path.setAttribute("d", d);
        g.appendChild(path); 
    });
    svg.appendChild(g); 
    $("#svgcontainer").append(svg);
    
  }

  function modalClose() {
       $("#d3force").css("width", "0%").css("margin-left", "100%");
       $("#d3force1").css("width", "0%").css("margin-right", "100%");
       $("#d3force1").css("border", "none");
       $("#d3force").empty();
       clicked = null;
    }
    $("#d3force1").on("click", () => {
        modalClose();
    });
  
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 27) {
            modalClose();
        }
     },{passive:true});
    
    document.addEventListener('click', (e) => {
        console.log(e.x, e.y);
     },{passive:true});

//####################################################################


function treeDraw(id) {
    var margin = {top:10, right:10, bottom:10, left:100},
        width = 1000 - margin.right - margin.left,
        height = 720 - margin.top - margin.bottom,
        i = 0, duration = 500,
        root;

    var treemap = d3.tree().size([height, width]);

    var vis = d3.select("#d3force").append("svg:svg")
       .attr("width", width + margin.right + margin.left)
       .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    d3.json("js/scaffolding.json", function(json) {
     
      if (typeof id === "string") {
          json.children.forEach(function(r){
            if (id === r.id) {
              root = r;
            }
          });
      } else {
          json.children = json.children.filter(function(a){
            return activeDivs.has(a.id);
          });
          root = json;
          root.name = $("#" + clicked).text();
      }
      root.href = "javascript:modalClose()";
      root = d3.hierarchy(root, function(d) {return d.children;});

      root.x0 = height/2;
      root.y0 = 0;

      function toggleAll(d) {
        if (d.children) {
          d.children.forEach(toggleAll);
          toggle(d);
        }
      }
      
      root.children.forEach(toggleAll);
      update(root);   
    });

    function update(source) {

        var treeData = treemap(root);
        var tooltip = d3.select("#d3force").append("div").attr("class", "tooltip").style("opacity", 0);

        var nodes = treeData.descendants(), 
            links = treeData.descendants().slice(1);

          nodes.forEach(function(d) { 
            d.y = d.depth * 200;
          });

          var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

          var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
              return "translate(" + source.y0 + "," + source.x0 + ")"; 
            })
            .on("click", function(d) { 
                let indno = d.parent.children.indexOf(d);
                if (indno !== null) {
                     let sibs = d.parent.children.slice(0, indno);
                     let sibplus = d.parent.children.slice(indno + 1, d.parent.children.length);
                     sibs = sibs.concat(sibplus);
                     closeChildren({name:"dummy", children:sibs});
                 }
                 toggle(d); 
                 update(d); 
            }); 
            // .on("mouseover", function(d){
            //         var xspot = d.y0 + 200, yspot = d.x0 - 20;
            //         log(xspot);
            //         tooltip
            //           .transition(200)
            //           .style("opacity", ".9");
            //         tooltip.html(d.data.name)
            //           .style("top", function(d){
            //             return (yspot) + "px";                      
            //           })
            //           .style("left", function(d){
            //             return xspot + "px";                     
            //           })
            //     })
            //     .on("mouseout", function(d){
            //       tooltip.style("opacity", "0");
            //       tooltip.exit();
            //     });
 
                nodeEnter.append("circle")
                  .style("fill", function(d) { return "url(#exampleGradient)"; })
                  .style("fill-opacity", ".65");
                 

//################################

        var anchors = nodeEnter.append("svg:a")
            .attr("target", "_blank")
            .attr("xlink:href", function(d) {
                return d.data.href;
            });

        var txts = anchors.append("svg:text")
          .attr("text-anchor", "middle")
          .text(function(d) { 
              return d.data.name; 
          })
          .style("cursor", function(d) {
            return d.depth > 0 ? "pointer" : "inherit"; 
          });
        

        txts.each(function(d){
          let text = d3.select(this);
          let label = d.data.name;
          let words = label.split(" ").reverse();
          let chars = label.length;
          let totLength = chars * 6;
          let lines = Math.floor(totLength/125);
         
          let midline = lines/2;
          let y = lines > 2 ? lines * -2 : 6;
        
          let line = [], maxlength = 125, maxlen = 90, linelen = 0, lineno = 1;
          let dy = -.5; 
        
          let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", "-.5em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            linelen = maxlength - (Math.abs(midline - lineno) * 12);
            if (tspan.node().getComputedTextLength() > linelen) {
              tspan.text(line.join(" "));
              let curlen = tspan.node().getComputedTextLength();
              maxlen = maxlen > curlen ? maxlen : curlen;

              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", lineno++ * 1.1 + dy + "em");
              line = [];
            } 
          }
          if (line.length > 0) { 
            tspan.text(line.join(" ")); 
          }
         
         d.radius = maxlen * .6;
       
        });
           
//###################################################

        var nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
          .duration(duration).attr("transform", function(d) {return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
          .attr("r", function(d){
            return d.radius;
          })
          .style("fill", function(d) { 
            return "url(#exampleGradient)"; 
          })
          .style("fill-opacity", ".65");
    
        var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .remove();

        var link = vis.selectAll("path.link")
          .data(links, function(d) { return d.id; });

        var linkEnter = link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
              var o = {x: source.x0, y: source.y0};
              return diagonal(o, o);
          });

        var linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
          .duration(duration)
          .attr("d", function(d) { return diagonal(d, d.parent); });

        var linkExit = link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
              var o = {x: source.x, y: source.y};
              return diagonal(o, o);
          })
          .remove();

         
        nodes.forEach(function(d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        function diagonal(s, d) {
            path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`

            return path;
        }
    }

    function closeChildren(el) {   
      if (el.children) { 
        el.children.forEach(closeChildren);
        toggle(el);
      }
    }

    // Toggle children.
    function toggle(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    }
}
