 function getDate(d) {
  let dte = d.indexOf(":") !== -1 ? d.split(":")[1] : d;
  let yr = dte.slice(0, 4);
  let mnth = dte.slice(4, 6);
  let day = dte.slice(6, 8);
  let hr = dte.slice(8, 10);
  let min = dte.slice(10, 12);
  let sec = dte.slice(12, 14);
  let tz = dte.slice(14);
  return yr + "-" + mnth + "-" + day + " " + hr + ":" + min + ":" + sec + "  TZ:" + tz;
 }
 function getMeta(metadata) {
    var resource = {};
    let columns = { "col1":0, "col2":0, "col3":0, "col4":0 };
    resource.citation = {};
    for (key in metadata) {
      if (/type/.test(key) | /author/.test(key) | /creator/.test(key) | /title/.test(key)  | /publisher/.test(key) | /subj/.test(key) | /desc/.test(key) | /date/.test(key)) {
        resource[key] = metadata[key];   
      } else if (/citation/.test(key)) {
        resource.citation[key] = metadata[key]; 
      }
    }  
    return resource;
}
function dispSites(s) {
  $("#searching").hide();
  $("#key").show();
  $("#results").css("display", "grid");
  $("#results").show();
  let countries = ["au","ca","de","eu","fi","fr","ie","il","jp","nz","se","uk","us"];
  let columns = {"col1":0, "col2":0, "col3":0, "col4":0};
  if (Object.keys(s).length > 0) {
    var skey = Object.keys(s);
    sortedkeys = skey.sort(function(a,b){
      if (s[a].rank > s[b].rank) {
        return -1;
      } else if (s[b].rank > s[a].rank) {
        return 1;
      } else {
        return 0;
      }
    });
    sortedkeys.map(function(n) {
      let site = s[n];
    console.log(n + ": " + site.rank);
      var alink = site.wplink !== "" ? $("<a></a>").attr("target", "_blank").attr("href", site.wplink).text(n) : n;  
      let img = $("<img></img>").addClass("flag");
      if (countries.indexOf(site.domain) !== -1) {
        img.attr("src", "https://fullerdav.github.io/images/" + site.domain + ".png");
      } else {
        img.attr("src", "");
      }
      var dl = $("<dl></dl>");
      $("<dt></dt>").addClass("sitename").append(alink).append(img).appendTo(dl);
      site.urls.map(function(v){ 
          var link = $("<a></a>").attr("target", "_blank").attr("href", v.link).text(v.title);
          $("<dt></dt>").addClass("title").append(link).appendTo(dl);
          $("<p></p>").addClass("desc").text(v.desc).appendTo(dl);
      }); 
      let column = ["col4", "col3", "col2", "col1"].reduce(function(a,b){
          return columns[a] < columns[b] ? a : b;
      });
      var div = $("<div></div>").addClass("outer");
      var divorg = $("<div></div>").addClass(site.domain);
      divorg.append(dl).appendTo(div);
      div.appendTo($("#" + column)); 
      columns[column] += $(div).height();
  });
    $("head>script[src*=googleapi]").remove();
  } else {
    $("#message").text("no results").show();
  }
}
function getDom(d) {
 while (d.length > 1) {
    var sitename = d.join(".");
    if (mysites[sitename] !== undefined) {
      return {"name": mysites[sitename].name, "wplink": mysites[sitename].wplink};   
    }
    d.shift();               
  }
  return {"name": sitename, "wplink": ""};
}
function procResponse(res) {
   if (res.items !== undefined) {
   for (var i = 0; i < res.items.length; i++) {
      let item = res.items[i];
      if (!foundurls[item.link]) {
          foundurls[item.link] = true;
          let curritem = {link: item.link, title: item.title, desc: item.snippet};
          if (item.hasOwnProperty("pagemap") && item.pagemap.hasOwnProperty("metatags")) {
               curritem["tags"] = getMeta(item.pagemap.metatags[0]);                                     
          } 
          let domarr = item.displayLink.split(".");
          let dom = getDom(domarr);
          sites[dom.name] = sites[dom.name] === undefined ?  {domain: domarr[domarr.length - 1], urls: [], wplink: dom.wplink, rank: 0} :  sites[dom.name];
          sites[dom.name].urls.push(curritem);
          sites[dom.name].rank += drex.test(item["title"]) ? 2 : 0;
          sites[dom.name].rank += drex.test(curritem["desc"]) ? curritem["desc"].match(drex).length : 0;
          for (let i = 0; i < trex.length; i++) {
            let rx = trex.pop();
            sites[dom.name].rank += rx.test(item["title"]) ? 2 : 0;
            sites[dom.name].rank += rx.test(curritem["desc"]) ? curritem["desc"].match(rx).length : 0;
          }
      }                             
    }
  } else {
     $("#message").text("no results, try again");
     $("#searching").show();
     $("#key").hide();
  }
  if (!getnext) {
     dispSites(sites);
  } 
}
function hndlr(response) {
    var proceed = response.queries === undefined || response.queries.request[0].totalResults === 0 ? false : true;
    getnext = proceed && response.queries.hasOwnProperty("nextPage") && (response.queries.nextPage[0].startIndex < 100) ? true : false;
    if (getnext) {
      $("#message").append(" .");
       gscript(response.queries.nextPage[0]);    
    }
    procResponse(response);
  }
function gscript(nxt) {
    var g = document.createElement('script');
    g.type = 'text/javascript';
    g.async = true;
    if (nxt.startIndex > 0) {
        g.src = 'https://www.googleapis.com/customsearch/v1?q=' + nxt.searchTerms + '&cx=' + nxt.cx + '&start=' + nxt.startIndex + '&key=AIzaSyBPo9-brE_qWz_sxES5yikTO6oMrtYP5cA&callback=hndlr';
    } else {
        g.src = 'https://www.googleapis.com/customsearch/v1?q=' + nxt.searchTerms + '&cx=' + nxt.cx + '&key=AIzaSyBPo9-brE_qWz_sxES5yikTO6oMrtYP5cA&callback=hndlr';
    }
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(g, s);
}
$("#gdata").on('click', function () {
    sites = {};
    foundurls = {};
    qterm = $("#qvalue").val();
    gscript({
        searchTerms: qterm,
        cx: gcsecx,
        startIndex: 0
    });
    $("#key").hide();
    $(".header").hide();
    $("#message").empty().append("Searching for <i>" + qterm + "</i>").show();
    $("#searching").show();
    $(".spinner").show();
    ["col1","col2","col3","col4"].forEach(function(v,index){
        $("#" + v + "").empty();
    });
    var qterms = qterm.split(" ");
    if (qterms.length > 1) {
      trex.push(new RegExp(qterm, 'gi'));
    }
    for (let i = 0; i < qterms.length; i++) {
      trex.push(new RegExp(qterms[i], 'gi'));  
    }
    drex = new RegExp("data(-*sets*)*", 'gi');
});

var gse = {"digitalarchives": "017097913603090994702:fjd8tlez-hc", "researchtopics": "017097913603090994702:ndcbo17bcge", "scholarlyarticles": "017097913603090994702:m6sjv7tu628", "blogs":"017097913603090994702:wsw4y_fvygo", "thinktanks": "017097913603090994702:rzhmodt523w", "datasets":"017097913603090994702:-xygo9gvyvw"};
var gcsecx = gse["datasets"];
var sites, qterm, getnext, drex, foundurls;
var trex = [];
