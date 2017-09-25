const { log, time } = console;

var ns = { svg: "http://www.w3.org/2000/svg", xlink: "http://www.w3.org/1999/xlink" };

Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

let docFrag = document.createDocumentFragment();
function createFrag(el, cls, html) {
  newEl = html ? document.createElement(el) : document.createElementNS(ns.svg, el);
  newEl.style.cssText = html ? '' : "z-index:-1; position: absolute; top: 0; left:0; width:100%; height:100%";
  newEl.setAttribute('class', cls);
  docFrag.append(newEl);
}
        
createFrag('div', 'tooltip', true);
createFrag('svg', 'svgfrag', false);
createFrag('g', 'gfrag', false);
createFrag('path', 'link', false);

const svgfrag = docFrag.querySelector("svg.svgfrag");
const gfrag = docFrag.querySelector("g.gfrag");
const pathfrag = docFrag.querySelector(".link");

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
    "AA": ["B", "K", "M", "N", "DDD", "KKK", "SSS"],
    "BB": ["B", "J", "M", "N", "AAA", "BBB", "CCC", "FFF", "HHH", "KKK", "MMM", "SSS", "QQQ"],
    "CC": ["N", "BBB", "EEE", "KKK", "LLL", "MMM", "SSS"],
    "DD": ["F", "J", "O", "AAA", "GGG", "HHH", "KKK", "MMM", "NNN", "OOO", "PPP"],
    "EE": ["C", "O", "S", "AAA", "BBB", "DDD", "KKK", "LLL", "MMM", "NNN", "OOO"],
    "FF": ["D", "J", "O", "P", "S", "AAA", "BBB", "CCC", "FFF", "KKK", "LLL", "QQQ"],
    "GG": ["O", "AAA", "BBB", "LLL", "SSS"],
    "HH": ["E", "R", "FFF", "GGG", "JJJ", "LLL", "PPP", "RRR"],
    "II": ["A", "C", "G", "H", "I", "L", "O", "P", "Q", "S", "BBB", "CCC", "FFF", "III", "MMM", "RRR"],
    "JJ": ["N", "O", "HHH", "NNN", "KKK", "OOO", "PPP"],
    "KK": ["O", "R", "KKK", "LLL", "MMM", "EEE", "SSS"],
    "LL": ["N", "LLL", "SSS"],
    "A": ["II"],
    "B": ["AA", "BB"],
    "C": ["EE", "II"],
    "D": ["FF"],
    "E": ["HH"],
    "F": ["DD"],
    "G": ["II"],
    "H": ["II"],
    "I": ["II"],
    "J": ["BB", "DD", "FF"],
    "K": ["AA"],
    "L": ["II"],
    "M": ["AA", "BB"],
    "N": ["AA", "BB", "CC", "JJ", "LL"],
    "O": ["DD", "EE", "FF", "GG", "II", "JJ", "KK"],
    "P": ["FF", "II"],
    "Q": ["II"],
    "R": ["HH", "KK"],
    "S": ["EE", "FF", "II"],
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
    "KKK": ["AA", "BB", "CC", "DD", "EE", "FF", "JJ", "KK"],
    "LLL": ["CC", "EE", "FF", "GG", "HH", "KK", "LL"],
    "MMM": ["BB", "CC", "DD", "EE", "II", "KK"],
    "NNN": ["DD", "EE", "JJ"],
    "OOO": ["DD", "EE", "JJ"],
    "PPP": ["DD", "HH", "JJ"],
    "QQQ": ["BB", "FF"],
    "RRR": ["HH", "II"],
    "SSS": ["AA", "BB", "CC", "GG", "KK", "LL"]
};

const htmlnodes = $(".node");
//const sections = $(".container section");

let nset = Object.keys(assoc);
nset = new Set(nset);

var activeDivs = new Set();
var fadedDivs = new Set();
var clicked, timeoutid;

htmlnodes
    .on("mouseover", function() {
        activeDivs.clear();
        fadedDivs.clear();
        assoc[this.id].forEach(function(k) {
            activeDivs.add(k);
        });
        activeDivs.add(this.id);
        fadedDivs = nset.difference(activeDivs);

        let tb = this.parentNode.dataset.key;
        timeoutid = window.setTimeout(function() {
                rotateCarousel(tb);            
         }, 1500); 

        activeDivs.forEach(function(k, index) {
            $(`#${k} span`).toggleClass("hilite");
        });
        fadedDivs.forEach(function(k, index) {
            $(`#${k} span`).toggleClass("lolite");
        });

        makeSVG(this.id, assoc[this.id]);

    })
    .on("mouseout", function(e) {
        activeDivs.forEach(function(k, index) {
            $(`#${k} span`).toggleClass("hilite");
        });
        fadedDivs.forEach(function(k, index) {
            $(`#${k} span`).toggleClass("lolite");
        });
         $("#svgcontainer").empty("svg");

        window.clearTimeout(timeoutid);
    
    })
    .on("click", function() {
        $("#svgcontainer").empty("svg");
        $("#d3force").css("width", "96%").css("margin-left", "4%");
        $("#d3force1").css("width", "4%").css("margin-right", "96%").css("border-right", "2px solid black");
        $("header").css("display", "none");
        $(".container").css("display", "none");
       
        clicked = this.id;
        if (clicked.length === 2) {
            treeDraw(clicked);
        } else {
            treeDraw(activeDivs, false);
        }
    });

//############################

function modalClose() {
    $("#chevron").css("display", "none");
    $("#d3force").css("width", "0%").css("margin-left", "100%");
    $("#d3force1").css("width", "0%").css("margin-right", "100%");
   
    clicked = null;
}
$("#d3force1").on("click", () => {
    modalClose();
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode == 27) {
        modalClose();
    }
}, { passive: true });

document.getElementById("d3force").addEventListener("transitionend", function(event) {
    let w = $("#d3force").css("width");
    if (parseFloat(w) > 92) {
        $("#chevron").css("display", "inline-block");
    }
    if (parseFloat(w) < 4) {
      $("#d3force1").css("border", "none");
      $("#d3force").empty("svg")
      $(".container").css("opacity", "1").css("display", "grid");
      $("header").css("opacity", "1").css("display", "block");
    }
}, false);

//############################

function makeSVG(src, targs) {
   let g = gfrag.cloneNode(true);

    let endPoints = function(node, len) {
        let x = node.offsetTop + node.offsetHeight/2, y;
        if (len === 2) {
          y = node.offsetWidth + node.offsetLeft;
        } else {
          y = len === 1 ? node.offsetWidth + node.offsetLeft : node.offsetLeft;
        }
        return {x:x, y:y, len:len};
    }

    let elsrc = document.querySelector(`#${src} span`);
    let s = endPoints(elsrc, src.length);

    targs.forEach(function(targ) {
        let targsrc = document.querySelector(`#${targ} span`);
        let t = endPoints(targsrc, targ.length);
        if (t.len === 2) {
            t.y = s.len === 1 ? targsrc.offsetLeft : t.y;
        } else {
            s.y = t.len === 1 ? elsrc.offsetLeft : elsrc.offsetLeft + elsrc.offsetWidth;
        }

        let d = `M ${s.y} ${s.x}
              C ${(s.y + t.y) / 2} ${s.x},
                ${(s.y + t.y) / 2} ${t.x},
                ${t.y} ${t.x}`;

        let path = pathfrag.cloneNode(true);
//        path.setAttribute("d", "M 625 60 C 500 164 500 606 625 710");
        path.setAttribute("d", d);
        g.appendChild(path);
    });

    let svg = svgfrag.cloneNode(true);
    svg.appendChild(g);
    $("#svgcontainer").append(svg);
}

//####################################################################

function treeDraw(id, redraw) {
    var i = 0, duration = 500, 
        margin = { top: 20, right: 0, bottom: 20, left: 120 },
        width = width || window.outerWidth - margin.right - margin.left,
        height = height || window.outerHeight - margin.top - margin.bottom;

   var treemap = d3.tree().size([height, width]);
   var vis = d3.select("#d3force").append("svg:svg")
          .attr("id", "vis")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
    d3.json("js/scaffolding.json", function(json) {
        if (typeof id === "string") {
            json.children.forEach(function(r) {
                if (id === r.id) {
                    root = r;
                }
            });
        } else {
            json.children = json.children.filter(function(a) {
                return activeDivs.has(a.id);
            });
            root = json;
            root.name = $(`#${clicked}`).text();
        }

        root = d3.hierarchy(root, function(d) { return d.children; });

        root.x0 = height / 2;
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
        return n.depth > 0 ? { length: n.parent.children.length, index: n.parent.children.indexOf(n) } : { length: 0, index: null };
    }

    var update = function(source) {

        var treeData = treemap(root);

        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        nodes.forEach(function(d) {
            d.y = d.depth * 250;
        });

        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            });

        nodeEnter.append("circle")
            .style("fill", function(d) { return "url(#circleGradient)"; })
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
                        closeChildren({ name: "dummy", children: sibs });
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

        txts.each(function(d) {
            let text = d3.select(this);
            let maxlen = 0,
                dy = -.5;
            let lbl = d.data.name,
                index = 0;

            let midline = Math.ceil(lbl.length * .045);
            let y = midline * -.25 + "em";
            //let rx = /([.\,()\-]|[^\b]){5,25}(\b|$)/g;
            let rx = /[\w\s.()\,\-\:]{8,25}(\s|$)/g;
        
            let str = lbl.match(rx);
    
            str.forEach(function(s) {
                let tspan = text.append("tspan").text(s).attr("x", 0).attr("y", y).attr("dy", index++ * 1.1 + dy + "em");
                maxlen = maxlen > tspan.node().getComputedTextLength() ? maxlen : tspan.node().getComputedTextLength();
            });

            d.radius = (maxlen / 16) * .65 + "em";

        });

        var bulb = nodeEnter.filter(function(d) {
                return d.parent && d.data.id !== undefined;
            })
            .append("g").attr("transform", "translate(-10, -60)");

        var circ = bulb.append("svg:circle")
            .attr("transform", "translate(16, 10)")
            .attr("class", "watts")
            .attr("r", 10);

        circ.on("mouseover", function() {
                this.style.setProperty("fill", "url(#glowGradient)", null);
            })
            .on("mousedown", function(d) {
                this.style.setProperty("fill", "url(#bulbGradient)", null);
                let moresibs = countSibs(d).length > 3;
                let outcome = d.data.id;
                let reason = reasons[outcome];
                if (reason !== undefined && reason[clicked] !== undefined) {
                  reason = reason[clicked];
                } else {
                  reason = `Place holder text`;
                } 
     
                let tip = docFrag.querySelector('div.tooltip'); 
                $('#d3force').append(tip.cloneNode(true));
                let tooltip = document.querySelector('#d3force .tooltip');
                  
                tooltip.innerHTML = reason;
                tooltip.style["width"] = reason.length > 150 ?  `${Math.ceil(reason.length)}px` : "150px";
                
                if (moresibs) {
                  let top = d.x - (50 + tooltip.offsetHeight / 2);
                  tooltip.style["top"] =  top < 8 ? "8px" : top + "px";
                  tooltip.style["left"] = (d.y + margin.left + 35) + "px";
                  tooltip.classList.add("tipright");
                  tooltip.style["animation"] = "rlight .4s";
                } else {
                  tooltip.style["top"] = d.x - (65 + tooltip.offsetHeight) + "px";
                  tooltip.classList.add("tiptop");
                  tooltip.style["left"] = (d.y + margin.left) - tooltip.offsetWidth / 2 + "px";
                  tooltip.style["animation"] = "toplight .4s";
                }
    
                tooltip.style["opacity"] = 1;
            })
            .on("mouseout", function() {
                this.style.setProperty("fill", "none", null);
                let tt = document.querySelector('#d3force .tooltip');
                if (tt) {tt.parentNode.removeChild(tt);}
            });

        bulb.append("use").attr("xlink:href", "#lightbulb")
            .style("transform", "scale(.018,.018)");


        //###################################################

        var nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(duration).attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", function(d) {
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
                var o = { x: source.x0, y: source.y0 };
                return diagonal(o, o);
            });

        var linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
            .duration(duration)
            .attr("d", function(d) {
                return diagonal(d, d.parent);
            });

        var linkExit = link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = { x: source.x, y: source.y };
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

        // window.addEventListener("resize", function(e){
        //   let r = document.querySelector("body").getBoundingClientRect();
        //   height = r.height;
        //   width = r.width;
        //  // $("#d3force").empty();
        //  // treeDraw(activeDivs, true);
        //  update(root);
        // });

    }

    function closeChildren(el) {
        if (el.children) {
            el.children.forEach(function(x) {
                closeChildren(x);
            });
            toggle(el);
        }
    }

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

let carousel = document.getElementById('carousel');
let rotate = 0;

const rotateCarousel = function(n) {
  if (n !== "") {
    rotate = (n - 1) * -60;  
    carousel.style["transform"] = 'translateZ( -442px ) rotateY(' + rotate + 'deg)';
  } 
}

carousel.addEventListener('wheel', function(e){
      e.preventDefault();
      rotate += e.deltaY < 0 ? -60 : 60;
      carousel.style["transform"] = 'translateZ( -442px ) rotateY(' + rotate + 'deg)';
}, {passive:false});


       
// http://wpacouncil.org/files/framework-for-success-postsecondary-writing.pdf
// https://drive.google.com/file/d/0B92zIYwSHAVtTUpIQ19RSUZYeTQ/view?usp=sharing
// http://www.ala.org/acrl/sites/ala.org.acrl/files/content/issues/infolit/Framework_ILHE.pdf
// http://wpacouncil.org/files/framework-for-success-postsecondary-writing.pdf
// https://docs.google.com/document/d/1VtsjEedFkWqKidf0wJ4Pl0iCMloiRwNJrAJspt4VtvE/edit
// https://muse.union.edu/commoncurriculum/files/2016/01/CCA-PartII-LearningOutcomes.pdf

