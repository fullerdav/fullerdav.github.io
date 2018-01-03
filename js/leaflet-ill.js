
const mymap = L.map('mapid', {zoom:'animate', maxZoom:10, zoomDelta:0.1, scrollWheelZoom: 'center', doubleClickZoom: 'center'}).setView([42.502222,-75.911667], 6);

const waterColor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 3,
  maxZoom: 16,
  ext: 'png'
});

const tonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 3,
  maxZoom: 20,
  ext: 'png'
}).addTo(mymap);

const hyddaFull = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
  minZoom: 3,
  maxZoom: 18,
  attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const openStreetMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var EsriOceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
  minZoom: 2,
  maxZoom: 13
});

var myStyle = {"color": "hsla(160, 50%, 25%, 0.8)", "weight": 1.5, "opacity": 0.65, "fillOpacity": 0, "weight": 2};
let ills = [], cnys = [], hist = [];

illiads.forEach(function(school, i){
  let {latlng, symbol, name, borrowed, turn} = school;
  let total = borrowed * 100;  // 
  let color = 'firebrick';
  let distance = Math.round(mymap.distance(latlng, [42.817222, -73.9279])/1609.34, 4);

  symbol = L.circle(latlng, {color: color, strokeWidth: 1, fillColor: color, fillOpacity: 0.25, radius: total});
  symbol.bindTooltip(`<span class="ill">${name} <br>distance:${distance} mi<br>borrowed:${borrowed}<br>avg days:${turn}</span>`);
  ills.push(symbol);
  
});

connectnys.forEach(function(school, i){
  let {latlong, symbol, name, borrowed} = school;
  let total = borrowed * 50;
  let distance = Math.round(mymap.distance(latlong, [42.817222, -73.9279])/1609.34, 4);
 
  symbol = L.circle(latlong, {color: 'blue', strokeWidth: 1, fillColor: 'skyblue', fillOpacity: 0.25, radius: total});
  symbol.bindTooltip(`<span class="cny">${name} <br>distance:${distance}mi<br>borrowed:${borrowed}</span>`);
  cnys.push(symbol);
});

historical.forEach(function(h, i){
  let myIcon = L.icon({iconUrl: 'images/titanic.png', iconSize: [50, 50]});
  symbol = L.marker([41.726931, -49.948253], {icon: myIcon});
  hist.push(symbol);
});

const empire = L.geoJSON(empireDelivery, {"style":myStyle});
//L.geoJSON(empire,{"style":myStyle}).addData(mymap);
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


const ill_schools = L.layerGroup(ills);
const cny_schools = L.layerGroup(cnys);
const historic = L.layerGroup(hist);
var illfiltered = L.layerGroup([]);
var empLayer = L.layerGroup([empire]);

const overlayMaps = {"Empire Delivery Network": empire, "Connect NY": cny_schools, "Illiad": ill_schools, "Titanic": historic};
const baseMaps = {"Toner-Lite": tonerLite, "Open Street Map": openStreetMap, "Hydda Full": hyddaFull, "ESRI Ocean Base Map": EsriOceanBasemap};

L.control.layers(baseMaps, overlayMaps).addTo(mymap);

mymap.addLayer(empLayer);
mymap.addLayer(cny_schools);
mymap.addLayer(ill_schools);

// const filterIll = function(val) {
//   let illfiler = null;  
//   illfilter = illiads.filter(ill => ill.distance > val);
//   let sumitems = illfilter.reduce(function(a,b){return a + b.borrowed;}, 0);
//   let sumturn = illfilter.reduce(function(a,b){return a + b.turn;}, 0);
//   sumturn = Math.round(sumturn/illfilter.length, 2);
//   document.getElementById('funbox').innerHTML = `<span class="ill">${val} mi from Union<br># of items: ${sumitems}<br>Avg time: ${sumturn} days</span>`;
//   let schools = [];
//   illfilter.forEach(function(school, i){
//       let {latlong, symbol, name, borrowed, turn, IDS} = school;
//       let radius = borrowed * 100;  
//       let color = IDS ? 'purple' : 'firebrick';
//       let distance = Math.round(mymap.distance(latlong, [42.817222, -73.9279])/1609.34, 2);
//       symbol = L.circle(latlong, {color: color, strokeWidth: 1, fillColor: color, fillOpacity: 0.25, radius: radius});
//       let tiptext = `<span class="ill">${name} <br>distance:${distance}mi<br>borrowed:${borrowed}<br>avg days:${turn}</span>`;
//       symbol.bindTooltip(tiptext);
//       schools.push(symbol);
//   });
//   illfiltered = L.layerGroup(schools);
//   if (mymap.hasLayer(ill_schools)) {
//     mymap.removeLayer(ill_schools);
//   }
//   let zoomlevel = val > 800 ? 4 : val > 400 ? 5 : 7;
//   let view = zoomlevel > 5 ? [42.502222,-75.911667] : [44.58, -100.46];
//   mymap.setZoom(zoomlevel).setView(view);
//   mymap.addLayer(illfiltered);
// }

mymap.on('overlayadd', function(layer){
  let slide = document.querySelector('#slider');
  if (layer.name === "Illiad") {
    //document.getElementById('funbox').innerHTML = `<span class="ill">Use the slider or click anywhere on the map to view distance => turnaround time</span>`;
    slide.style['visibility'] = 'visible';
    if (mymap.hasLayer(illfiltered)) {
      mymap.removeLayer(illfiltered);
    }
    mymap.setView([42.817222, -73.9279]).setZoom(7);
   } else if (layer.name === "Titanic") {
      [tonerLite, openStreetMap, hyddaFull, EsriOceanBasemap].forEach(function(layr){
        if (mymap.hasLayer(layr)) {
          layr.removeFrom(mymap);
        }
      });
      mymap.addLayer(EsriOceanBasemap);
      mymap.setView([41.726931, -49.948253]).setZoom(4);
  } else {
      slide.style.visibility = 'hidden';
  } 
});

mymap.on('overlayremove', function(layer){
  if (layer.name === "Titanic") {
    mymap.removeLayer(EsriOceanBasemap);
    mymap.setView([42.817222, -73.9279]).setZoom(7);
  }
});

mymap.on('zoom', function(){
 log(mymap.getZoom());
});

// mymap.on('click', function(ev) {
//     let distance = Math.round(mymap.distance(ev.latlng, [42.817222, -73.9279])/1609.34, 4);
//     distance = distance > 2500 ? 2500 : distance;
  
//     if (mymap.hasLayer(illfiltered) || mymap.hasLayer(ill_schools)) {
//         filterIll(distance);
//     } else {
//         document.getElementById('funbox').innerHTML = `<span class="ill">${distance} mi from Union</span>`;
//     }
    
// });

document.getElementById('slider').addEventListener('change', function(e){
  filterIll(this.value);
});


// let newschools = [];

// for ( i in newschools) {
//   let n = newschools[i];
//   let nn = {};
//   nn["symbol"] = n.symbol;
//   nn["name"] = n["name"] ? n.name : "";
//   // if (nn["name"]) {
//   //   let nm = nn.name.split(" ");
//   //   nn.name = nm.map(n => `${n[0]}${n.slice(1).toLowerCase()}`).join(" ");
//   // }
//   if (n.hasOwnProperty("latlng")) {
//     nn["latlng"] = n.latlng;  
//     // if (n.hasOwnProperty("distance")) {
//     //   nn["distance"] = n.distance;
//     // }
//   } 
//  if (n.latlng) {
//     nn["distance"] = Math.round(mymap.distance(n.latlng, [42.817222, -73.9279])/1609.34, 4);  
//  } 
//   if(n.hasOwnProperty("turn")) {
//     nn["turn"] = n.turn;
//   }
//   if(n.hasOwnProperty("borrowed")) {
//     nn["borrowed"] = n.borrowed;
//   }
  
 // log(JSON.stringify(nn));
 
//}