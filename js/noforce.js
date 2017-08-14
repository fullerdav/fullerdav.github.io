const { log, time } = console;

 // $( "body" ).bind("DOMNodeInserted", function( objEvent ){
 //          console.log("Node inserted: " + $(objEvent.target).attr("id"));
 //  });
  
// var target = document.getElementById('topnode');
// var observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     console.log(mutation);
//   });    
// });
// var config = { attributes: true, childList: true, characterData: true };
// observer.observe(target, config);


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

let nset = Object.keys(assoc);
nset = new Set(nset);

var activeDivs = new Set();
var fadedDivs = new Set();
var clicked;

htmlnodes
  .on("mouseover", function() { 
      activeDivs.clear();
      fadedDivs.clear();
      assoc[this.id].forEach(function(k){
          activeDivs.add(k);  
      });
      activeDivs.add(this.id);
      fadedDivs = nset.difference(activeDivs); 
      activeDivs.forEach(function(k, index){ 
        $("#" + k + " span").toggleClass("hilite");
      });
      fadedDivs.forEach(function(k, index){
        $("#" + k + " span").toggleClass("lolite");
      });
      makeSVG(this.id, assoc[this.id]);
  })
  .on("mouseout", function(){
    activeDivs.forEach(function(k,index){
      $("#" + k + " span").toggleClass("hilite");
    });
    fadedDivs.forEach(function(k, index){
      $("#" + k + " span").toggleClass("lolite");
    });
    $("#svgcontainer").empty("svg");
  })
  .on("click", function() {
    $("#d3force").css("width", "97%").css("margin-left", "3%");
    $("#d3force1").css("width", "3%").css("margin-right", "97%").css("border-right", "2px solid black");
    clicked = this.id;
      if (clicked.length === 2) {
        treeDraw(clicked);  
      } else {
        treeDraw(activeDivs);
      } 
  });

//############################

  function modalClose() {
       $("#chevron").css("display", "none");
       $(".container").css("display", "grid");
       $("#d3force").css("width", "0%").css("margin-left", "100%").empty("svg");
       $("#d3force1").css("width", "0%").css("margin-right", "100%").css("border", "none");
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
    
    // document.addEventListener('click', (e) => {
    //     console.log(e.x, e.y);
    //  },{passive:true});


     let element = document.getElementById("d3force1");
     element.addEventListener("transitionend", function(event) {
          let w = $(element).css("width");
          if (parseFloat(w) > 0) {
            $(".container").css("display", "none");
            $("#chevron").css("display", "inline-block");
          }
      }, false);

//############################

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
          } else {
            t.y = src.length === 1 ?  targsrc.offsetLeft : (targsrc.offsetWidth + targsrc.offsetLeft); 
            s.y = src.length === 1 ?  elsrc.offsetLeft + elsrc.offsetWidth : elsrc.offsetLeft; 
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

//####################################################################


function treeDraw(id) {
    var margin = {top:0, right:0, bottom:0, left:120},
        width = 1000 - margin.right - margin.left,
        height = 800 - margin.top - margin.bottom,
        i = 0, duration = 500,
        shape = "circle", root;

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

    function countSibs(n) {
      return n.depth > 0 ? {length:n.parent.children.length, index:n.parent.children.indexOf(n)} : {length:0, index:null};
    }

    function update(source) {
        var treeData = treemap(root);
        var tooltip = $("<div></div>").addClass("tooltip").appendTo("#d3force");
  
        var nodes = treeData.descendants(), 
            links = treeData.descendants().slice(1);

          nodes.forEach(function(d) { 
            d.y = d.depth * 225;
          });

          var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

          var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
              return "translate(" + source.y0 + "," + source.x0 + ")"; 
            });
 
            nodeEnter.append(shape)
              .style("fill", function(d) { return "url(#circlleGradient)"; })
              .style("fill-opacity", ".65");


//################################

        var anchors = nodeEnter.append("svg:a")
            .attr("target", "_blank")
            .attr("xlink:href", function(d) {
                return d.data.href;
            })
            .on("click", function(d) { 
              if (d.depth > 0) {
                let indno = d.parent.children.indexOf(d);
                if (indno !== null) {
                     let sibs = d.parent.children.slice(0, indno);
                     let sibplus = d.parent.children.slice(indno + 1, d.parent.children.length);
                     sibs = sibs.concat(sibplus);
                     closeChildren({name:"dummy", children:sibs});
                 }
                 toggle(d); 
                 update(d);
               }
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
         
           d.radius = maxlen * .55;
       
        });

  var bulb = nodeEnter.filter(function(d){
      let {} = d.data;
      return d.data.id !== undefined;
    })
    .append("g").attr("transform", "translate(-10, -50)");
   
    var circ = bulb.append("svg:circle")
    .attr("transform", "translate(16, 10)")
      .attr("class", "watts")
      .attr("r", 18)
      .attr("fill", "none")
      .style("pointer-events", "fill");
      
    circ.on("mouseover", function(){
      this.style.setProperty("fill", "url(#glowGradient)", null);
    })
    .on("mouseout", function(){
      this.style.setProperty("fill", "none", null);
      tooltip.css("opacity", 0);
    
      if (tooltip.hasClass("tiptop")) { tooltip.removeClass("tiptop");}
      if (tooltip.hasClass("tipright")) { tooltip.removeClass("tipright");}

    })
    .on("mousedown", function(d) {
      let sibs = countSibs(d);
      this.style.setProperty("fill", "url(#bulbGradient)", null);
      
      tooltip
        .html(function(){
          return d.data.name || d.name;
        }) 
        .css("top", function(){
            return sibs.length > 3 ? d.x - (50 + this.offsetHeight/2) + "px" : d.x - (50 + this.offsetHeight) + "px";
        })
        .css("left", function() {
           return sibs.length > 3 ? (d.y + margin.left + 30) + "px" : (d.y + margin.left) - this.offsetWidth/2 + "px";
        });

        if (sibs.length > 3) {
          tooltip.addClass("tipright").css("opacity", 1);
        } else {
          tooltip.addClass("tiptop").css("opacity", 1);
        }

  });
    
    bulb.append("use").attr("xlink:href", "#lightbulb")
      .style("transform", "scale(.018,.018)");
           
//###################################################

        var nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
          .duration(duration).attr("transform", function(d) {return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
          .attr("r", function(d){
            return d.radius;
          })
          .style("fill", function(d) { 
            return "url(#circleGradient)"; 
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

