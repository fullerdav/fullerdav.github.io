
const mymap = L.map('mapid', {zoom:'animate', maxZoom:10, zoomDelta:0.1, scrollWheelZoom: 'center', doubleClickZoom: 'center'}).setView([42.502222,-75.911667], 7);

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

var myStyle = {"color": "#000", "weight": 1.5, "opacity": 0.65, "fillOpacity": 0, "weight": 2};
let ills = [], cnys = [], hist = [];

illiads.forEach(function(school, i){
  let {latlong, symbol, name, borrowed, turn, IDS} = school;
  let total = borrowed * 100;  // 
  let color = IDS ? 'purple' : 'firebrick';
  let distance = Math.round(mymap.distance(latlong, [42.817222, -73.9279])/1609.34, 4);

  symbol = L.circle(latlong, {color: color, strokeWidth: 1, fillColor: color, fillOpacity: 0.25, radius: total});
  symbol.bindTooltip(`<span class="ill">IDS: ${IDS}<br> ${name} <br>distance:${distance} mi<br>borrowed:${borrowed}<br>avg days:${turn}</span>`);
  ills.push(symbol);
  
});

connectnys.forEach(function(school, i){
  let {latlong, symbol, name, borrowed} = school;
  let total = borrowed * 25;
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
//L.geoJSON(cnycoll,{"style":myStyle}).addData(mymap);

const ill_schools = L.layerGroup(ills);
const cny_schools = L.layerGroup(cnys);
const historic = L.layerGroup(hist);
var illfiltered = L.layerGroup([]);

const overlayMaps = {"Empire Delivery Network": empire, "Connect NY": cny_schools, "Illiad": ill_schools, "Titanic": historic};
const baseMaps = {"Toner-Lite": tonerLite, "Open Street Map": openStreetMap, "Hydda Full": hyddaFull, "ESRI Ocean Base Map": EsriOceanBasemap};

L.control.layers(baseMaps, overlayMaps).addTo(mymap);

const filterIll = function(val) {
  let illfiler = null;  
  illfilter = illiads.filter(ill => ill.distance > val);
  let sumitems = illfilter.reduce(function(a,b){return a + b.borrowed;}, 0);
  let sumturn = illfilter.reduce(function(a,b){return a + b.turn;}, 0);
  sumturn = Math.round(sumturn/illfilter.length, 2);
  document.getElementById('funbox').innerHTML = `<span class="ill">${val} mi from Union<br># of items: ${sumitems}<br>Avg time: ${sumturn} days</span>`;
  let schools = [];
  illfilter.forEach(function(school, i){
      let {latlong, symbol, name, borrowed, turn, IDS} = school;
      let radius = borrowed * 100;  
      let color = IDS ? 'purple' : 'firebrick';
      let distance = Math.round(mymap.distance(latlong, [42.817222, -73.9279])/1609.34, 2);
      symbol = L.circle(latlong, {color: color, strokeWidth: 1, fillColor: color, fillOpacity: 0.25, radius: radius});
      let tiptext = `<span class="ill">IDS: ${IDS}<br> ${name} <br>distance:${distance}mi<br>borrowed:${borrowed}<br>avg days:${turn}</span>`;
      symbol.bindTooltip(tiptext);
      schools.push(symbol);
  });
  illfiltered = L.layerGroup(schools);
  if (mymap.hasLayer(ill_schools)) {
    mymap.removeLayer(ill_schools);
  }
  let zoomlevel = val > 1200 ? 4 : val > 900 ? 5 : 6;
  zoomlevel = val < 250 ? 7 : zoomlevel;
  let view = zoomlevel > 5 ? [42.817222, -73.9279] : [44.58, -103.46];
  mymap.setZoom(zoomlevel).setView(view);
  mymap.addLayer(illfiltered);
}

mymap.on('overlayadd', function(layer){
  let slide = document.getElementById('slider');
  if (layer.name === "Illiad") {
     document.getElementById('funbox').innerHTML = `<span class="ill">Use the slider or click anywhere on the map to view distance => turnaround time</span>`;
    slide.style.visibility = 'visible';
    if (mymap.hasLayer(illfiltered)) {
      mymap.removeLayer(illfiltered);
    }
   } else if (layer.name === "Titanic") {
      mymap.setZoom(13).setView([41.726931, -49.948253]).setZoom(4);
  } else {
    slide.style.visibility = 'hidden';
  } 
});

//mymap.on('zoom', function(){
//  log(mymap.getZoom());
//});

mymap.on('click', function(ev) {
    let distance = Math.round(mymap.distance(ev.latlng, [42.817222, -73.9279])/1609.34, 4);
    distance = distance > 2500 ? 2500 : distance;
  
    if (mymap.hasLayer(illfiltered) || mymap.hasLayer(ill_schools)) {
        filterIll(distance);
    } else {
        document.getElementById('funbox').innerHTML = `<span class="ill">${distance} mi from Union</span>`;
    }
    
});

document.getElementById('slider').addEventListener('change', function(e){
  filterIll(this.value);
});


