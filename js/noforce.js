const { log, time } = console;

var ns = {svg:"http://www.w3.org/2000/svg", xlink: "http://www.w3.org/1999/xlink"};

Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

const reasons = {
  "EE": { 
          "C": "This mirrors the last advanced outcome where students identify specific types of primary sources that will provide the best evidence to support an argument or answer a research question.", 
          "O": 'Many of the library outcomes for this concept require students to evaluate evidence.  Most specifically, students need to evaluate primary source evidence critically and ethically to make sure that it is the best evidence to use to support an argument or research question.', 
          "S": "Incorporating primary sources into students’ work will often require them to think critically in order to synthesize the information themselves and demonstrate original thinking.", 
          "AAA": 'This habit of mind “is fostered when students are encouraged to conduct research using methods of investigation which are appropriate to the discipline” (Framework for Success in Postsecondary Writing, 4).  In order to do that, students need to be able to identify how specific disciplines collect and format data in order to follow these standards in their own data collection.', 
          "BBB": '“Openness is fostered when students are challenged to practice different ways of gathering, investigating, and presenting information” (Framework for Success in Postsecondary Writing, 4).  Collecting information from primary sources is often a new information gathering method and requires students to figure out how to visualize the information in effective ways.', 
          "DDD": 'Primary sources often challenge students to “use methods that are new to them to investigate questions, topics, and ideas” by going beyond using just secondary sources (Framework for Success in Postsecondary Writing, 5).',
          "KKK": 'As part of this standard, “students are able to differentiate between primary and secondary sources, recognizing how their use and importance vary with each discipline.” This mirrors our first basic outcome.  We build upon another part of this standard, by students not only “realiz[ing] that information may need to be constructed with raw data from primary sources,” but to use disciplinary standards to collect and format that data', 
          "LLL": 'Part of this standard is to “identify appropriate investigative methods” including “us[ing] surveys, letters, interviews and other forms of inquiry to retrieve primary information” (Information Literacy Competency Standards for Higher Education, 9). This directly relates to the second advanced outcome, which discusses using discipline specific data collection methods.',
          "MMM": 'Part of this standard is to recognize the “context within which the information was created and understand the impact of [that] context on interpreting the information” (Information Literacy Competency Standards for Higher Education, 11).  While recognizing the context of any source is important, it is especially vital with primary sources.',
          "NNN": 'Students recognize that authoritative content may be packaged formally or informally and may include sources of all types,” including primary sources (Framework for Information Literacy for Higher Education, 4). Students deduce that primary sources have their own authority even though they can be types of resources that typically would not be considered scholarly.',
          "OOO": 'In order to use primary sources appropriately within the context of the research question, students must understand the source’s creation process in order to identify the limitations of its use and identify which ones will provide the best evidence to support a research question.'
        }
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
const slides = ["schaffer", "acrl", "cclo","ilcs", "wpa", "wac"];

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
     
       rotateCarousel($("#" + this.id + " span").attr("class"));  
      
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
    $("header").css("display", "none");
    $("#d3force").css("margin-left", "4%");
    $("#d3force1").css("width", "4%").css("margin-right", "96%").css("border-right", "2px solid black");
    clicked = this.id;
      if (clicked.length === 2) {
        treeDraw(clicked);  
      } else {
        treeDraw(activeDivs);
      } 
  });

//############################

 document.getElementById("d3force").addEventListener("transitionend", function(event) {
   let m = $("#d3force").css("margin-left");
   if (parseFloat(m) > 98) {
      $("header").css("display", "block");
      $(".container").css("display", "grid");
    }
  });

  function modalClose() {
       $("#chevron").css("display", "none");
       $("#d3force").css("margin-left", "100%").empty("svg");
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
        let svg = document.createElementNS(ns.svg, "svg");
        let g = document.createElementNS(ns.svg, "g");
        
        function endPoints (node1, node2) {
            return [{x: node1.offsetTop + node1.offsetHeight/2, y: node1.offsetLeft + node1.offsetWidth}, {x: node2.offsetTop + node2.offsetHeight/2, y: node2.offsetLeft}];
        }
   
        let elsrc = document.querySelector("#" + src + " span");
       
        targs.forEach(function(targ){
          let targsrc = document.querySelector("#" + targ + " span");
          let s, t;
          if (src.length === 2) {
            [s, t] = targ.length === 1 ? endPoints(targsrc, elsrc) : endPoints(elsrc, targsrc); 
          } else {
            [s, t] = src.length === 1 ? endPoints(elsrc, targsrc) : endPoints(targsrc, elsrc); 
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
        i = 0, duration = 500, root;

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
        var circletxt = $("<div></div>").addClass("circletxt").appendTo("#d3force");
  
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
 
          nodeEnter.append("circle")
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
          .style("cursor", function(d) {
            return d.depth === 0 || (!d.children && !d._children) ? "inherit" : "pointer"; 
          });
        
        txts.each(function(d){
          let text = d3.select(this);
          let maxlen = 0, dy = -.5;
          let lbl = d.data.name, index = 0;
          
         let midline = Math.ceil(lbl.length * .045);
         let y = midline * -.2 + "em";
         let rx = /([^\b]{5,22})(\b|$)/g;

          let str = lbl.match(rx);
          str.forEach(function(s){
              let tspan = text.append("tspan").text(s).attr("x", 0).attr("y", y).attr("dy", index++ * 1.1 + dy + "em");
              maxlen = maxlen > tspan.node().getComputedTextLength() ? maxlen : tspan.node().getComputedTextLength();
          });
          
          d.radius = (maxlen/16) * .65 + "em";

         });
          
      
  var bulb = nodeEnter.filter(function(d){
      return d.parent && d.data.id !== undefined;
    })
    .append("g").attr("transform", "translate(-10, -60)");
   
  var circ = bulb.append("svg:circle")
    .attr("transform", "translate(16, 10)")
    .attr("class", "watts")
    .attr("r", 10);
    
      
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
      let sibs = countSibs(d), top, left;
      this.style.setProperty("fill", "url(#bulbGradient)", null);
      let outcome = d.data.id;
      let reason = reasons[outcome];
      
      tooltip
        .html(function(){
          if (reason !== undefined && reason[clicked] !== undefined) {
            return reason[clicked];
          } else {
            return "Place holder text";
          }
        })
        .css("width", function(d) {
           let len = tooltip.html().length;
           return len > 150 ? Math.ceil(len) + "px" : "150px";
        }) 
        .css("top", function(){
            top = sibs.length > 3 ? d.x - (50 + this.offsetHeight/2) : d.x - (65 + this.offsetHeight);
            top = top < 0 ? 0 : top;
            return top + "px";
        })
        .css("left", function() {
           left = sibs.length > 3 ? (d.y + margin.left + 35) : (d.y + margin.left) - this.offsetWidth/2;
           return left + "px";
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
          .duration(duration).attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")"; });

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
          .attr("d", function(d) {
            return diagonal(d, d.parent); });

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
        el.children.forEach(function(x) {
          closeChildren(x);
        });
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


rotateCarousel = function(n) {
      let carousel = document.getElementById('carousel');
      let increment = slides.indexOf(n), rotate=0;
      rotate += -60 * increment;
      carousel.style[ "transform" ] = 'translateZ( -442px ) rotateY(' + rotate + 'deg)';
}

var init = function() {
      var carousel = document.getElementById('carousel'),
          navButton = document.querySelector('#left'), theta = 0,
          navButtonClick = function( event ){
            theta += -60 * 1;
            carousel.style["transform"] = 'translateZ( -288px ) rotateY(' + theta + 'deg)';
          };
      navButton.addEventListener( 'click', navButtonClick, false);
};

window.addEventListener( 'DOMContentLoaded', init, false);



function findMissing(arr) {
  let tester = [...Array(100).keys()];
  let results = [];
  tester.forEach(function(t){
    if (arr.indexOf(t) === -1) {
      results.push(t);
    }
  });
  return results;
}

