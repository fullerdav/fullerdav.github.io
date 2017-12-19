

const empireDelivery = {
              "type": "FeatureCollection", 
              "features": [
                {"geometry": 
                  {
                    "type": "GeometryCollection",
                    "geometries": [
                        {
                            "type": "Polygon", 
                            "coordinates": 
                                [[
                                    [-73.75015318393709, 42.65087935554455], 
					                [-76.14750891923906, 43.04881979669318],
					                [-77.59969711303711, 43.15710884095329], 
					                [-78.87146115303041, 42.88602714832883],
					                [-75.91878890991211, 42.09822241118974],  
					                [-74.00716781616211, 40.713955826286046],
					                [-74.00714904069902, 41.503242263398405],
					                [-73.75015318393709, 42.65087935554455]
                                ]]
                        }
                        // {
                        //     "type":"Point", 
                        //     "coordinates":[-73.75015318393709, 42.65087935554455]
                        // },
                        // {
                        //     "type":"Point", 
                        //     "coordinates":[-76.14750891923906, 43.04881979669318]
                        // },
                        // {
                        //     "type":"Point", 
                        //     "coordinates":[-77.59969711303711, 43.15710884095329]
                        // },                        
                        // {
                        //     "type":"Point", 
                        //     "coordinates": [-78.87146115303041, 42.88602714832883]
                        // },

                        // {
                        //     "type":"Point", 
                        //     "coordinates":[-75.91878890991211, 42.09822241118974]
                        // },
                        // {
                        //     "type":"Point", 
                        //     "coordinates":[-74.00716781616211, 40.713955826286046]
                        // },
                        // {
                        //     "type":"Point", 
                        //     "coordinates":[-74.00714904069902, 41.503242263398405]
                        // }
                    ]
                }, 
                "type": "Feature", 
                "properties": {
                	"name":"Empire Delivery Network"
                }}
              ]
           };


const illiads = [
  {"borrowed": 206, "symbol":"NAM", "name":"SUNY Albany", "IDS":true, "distance":10, "latlong": [42.686193, -73.823884], "turn":4.48},
  {"borrowed": 70, "symbol":"COO", "name":"Cornell Univ", "IDS":false, "distance":133, "latlong": [42.446700, -76.495700], "turn":5.05},  
  {"borrowed": 45, "symbol":"SNN", "name":"Smith Coll", "IDS":false, "distance":74, "latlong": [42.3178, -72.6348], "turn":8.98},
  {"borrowed": 40, "symbol":"OBE", "name":"Oberlin Coll", "IDS":false, "distance":438, "latlong": [41.29477, -82.21942], "turn":10.31},
  {"borrowed": 40, "symbol":"PIT", "name":"Univ of Pittsburgh", "IDS":false, "distance":352, "latlong": [40.44285,-79.95922], "turn":5.72},
  {"borrowed": 39, "symbol":"ZCU", "name":"Columbia Univ", "IDS":false, "distance":139, "latlong": [40.80899, -73.96125], "turn":6.51},
  {"borrowed": 37, "symbol":"AMH", "name":"Amherst Coll", "IDS":false, "distance":78, "latlong": [42.37092, -72.5162], "turn":6.26},
  {"borrowed": 36, "symbol":"WLU", "name":"Wesleyan Univ", "IDS":false, "distance":109, "latlong": [41.55565,-72.65565], "turn":6.18},
  {"borrowed": 36, "symbol":"YUS", "name":"Yale Univ", "IDS":false, "distance":116, "latlong": [41.31121, -72.92649], "turn":5.62},
  {"borrowed": 32, "symbol":"ORC", "name":"Reed Coll", "IDS":false,  "distance":2384, "latlong": [45.48096,-122.63028], "turn":9.72}, 
  {"borrowed": 32, "symbol":"SYB", "name":"Syracuse Univ", "distance":113, "IDS":true, "latlong": [43.03784,-76.13465], "turn":7.32},
  {"borrowed": 31, "symbol":"DLM", "name":"Univ of Delaware", "IDS":false, "distance":237, "latlong": [39.67956, -75.75299], "turn":8.8},
  {"borrowed": 30, "symbol":"BBH", "name":"Bowdoin Coll", "IDS":true, "distance":213, "latlong": [43.9073, -69.96311], "turn":5.12},
  {"borrowed": 25, "symbol":"VZS", "name":"Skidmore Coll", "IDS":false, "distance":21, "latlong": [43.095199,-73.78004], "turn":2.63},
  {"borrowed": 24, "symbol":"GZQ", "name":"Marquette Univ", "IDS":false, "distance":708, "latlong": [43.03896, -87.92798], "turn":7.62},
  {"borrowed": 24, "symbol":"WYU", "name":"Univ of Wyoming", "IDS":false, "distance":1617, "latlong":[41.31192, -105.57638], "turn":8.18},
  {"borrowed": 24, "symbol":"YQR", "name":"Rochester Public Library", "IDS":false,  "distance":186, "latlong":[43.14241, -77.587], "turn":10.91},
  {"borrowed": 23, "symbol":"HDC", "name":"Claremont Colleges", "IDS":true, "distance":2415, "latlong":[34.10307, -117.71388], "turn":8.38},
  {"borrowed": 23, "symbol":"WCM", "name":"Williams Coll", "IDS":false, "latlong": [42.71675, -73.20288], "turn":6.92},
  {"borrowed": 21, "symbol":"PSC", "name":"Swarthmore Coll", "IDS":false, "distance":214, "latlong":[39.90539, -75.3538], "turn":7.68},
  {"borrowed": 22, "symbol":"HTM", "name":"Whitman Coll", "IDS":false, "distance":2173, "latlong":[46.07069, -118.32885], "turn":6.96},
  {"borrowed": 22, "symbol":"MNN", "name":"Carleton Coll", "IDS":false, "distance":966, "latlong":[44.4623, -93.15467], "turn":12.96},
  {"borrowed": 21, "symbol":"CBY", "name":"Colby Coll", "IDS":false, "distance":245, "latlong":[44.56413, -69.66317], "turn":3.57},
  {"borrowed": 21, "symbol":"CGU", "name":"Univ of Chicago", "IDS":false, "distance":701, "latlong":[41.78976, -87.59977], "turn":9.15},
  {"borrowed": 20, "symbol":"PBU", "name":"Bucknell Univ", "IDS":false, "distance":199, "latlong":[40.95889, -76.88167], "turn":6.95},
  {"borrowed": 19, "symbol":"BMC", "name":"Bryn Mawr Coll", "IDS":false, "distance":206, "latlong":[40.029, -75.31269], "turn":5.56},
  {"borrowed": 19, "symbol":"GDC", "name":"Gettysburg Coll", "IDS":false, "distance":268, "latlong":[39.83833, -77.23694], "turn":6.04},
  {"borrowed": 19, "symbol":"MTH", "name":"Mount Holyoke Coll", "IDS":false, "distance":79, "latlong":[42.25565, -72.57453], "turn":6.75},
  {"borrowed": 18, "symbol":"DKC", "name":"Dickinson Coll", "IDS":false, "distance":249, "latlong":[40.20287, -77.24526], "turn":3.7},
  {"borrowed": 18, "symbol":"AUM", "name":"UMASS Amherst", "IDS":false, "distance":77, "latlong":[42.3895, -72.5281], "turn":7.94},
  {"borrowed": 18, "symbol":"MAC", "name":"Macalester Coll", "IDS":false, "distance":967, "latlong":[44.93742, -93.16921], "turn":9.16},
  {"borrowed": 18, "symbol":"WEL", "name":"Wellesley Coll", "IDS":true, "distance":138, "latlong":[42.29537, -71.30617], "turn":6.83},
  {"borrowed": 17, "symbol":"BTS", "name":"Bates Coll", "IDS":false, "distance":207, "latlong":[44.10522, -70.20357], "turn":10.04},
  {"borrowed": 16, "symbol":"CTL", "name":"Connecticut College", "IDS":false, "distance":136, "latlong":[41.3826, -72.10813], "turn":3.41},
  {"borrowed": 16, "symbol":"NYG", "name":"New York State Lib", "IDS":true, "distance":14, "latlong":[42.64833, -73.76194], "turn":4.88},
  {"borrowed": 16, "symbol":"OKS", "name":"Oklahoma State Univ", "IDS":false, "distance":1313, "latlong":[36.12198, -97.07032], "turn":8.47},
  {"borrowed": 15, "symbol":"EYM", "name":"Univ of Michigan", "IDS":false, "distance":500, "latlong":[42.28373, -83.72895], "turn":9.86},
  {"borrowed": 15, "symbol":"IDU", "name":"DePauw Univ", "IDS":false, "distance":706, "latlong":[39.64088, -86.86032], "turn":8.36},
  {"borrowed": 15, "symbol":"MDY", "name":"Middlebury Coll", "IDS":true, "distance":91, "latlong":[44.00849, -73.17614], "turn":6.94},
  {"borrowed": 15, "symbol":"ZYU", "name":"New York Univ", "IDS":false, "distance":144, "latlong":[40.72871, -73.99597], "turn":9.8}, 
  {"borrowed": 14, "symbol":"BNG", "name":"SUNY Binghamton", "IDS":true, "distance":116, "latlong":[42.0898, -75.96825], "turn":4.05},
  {"borrowed": 14, "symbol":"VKM", "name":"Siena College", "IDS":false, "distance":11, "latlong":[42.71841, -73.75373], "turn":3.37},
  {"borrowed": 14, "symbol":"YRM", "name":"RPI", "IDS":false, "distance":14, "latlong":[42.73258, -73.68095], "turn":1.83},
  {"borrowed": 14, "symbol":"NNM", "name":"Davidson Coll", "IDS":false, "distance":626, "latlong":[35.50233, -80.83912], "turn":4.62},
  {"borrowed": 14, "symbol":"TNY", "name":"Trinity Univ", "IDS":false, "distance":1642, "latlong":[29.46329, -98.48279], "turn":5.06},
  {"borrowed": 13, "symbol":"VVC", "name":"Colgate Univ", "IDS":false, "distance":81, "latlong":[42.81729, -75.53573], "turn":3.15},
  {"borrowed": 13, "symbol":"FDA", "name":"Florida State Univ", "IDS":false, "distance":1028, "latlong":[30.4419, -84.29085], "turn":7.34},
  {"borrowed": 13, "symbol":"HLS", "name":"Harvard Univ", "IDS":false, "distance":146, "latlong":[42.37843, -71.11644], "turn":9.2},
  {"borrowed": 13, "symbol":"HVC", "name":"Haverford Coll", "IDS":false, "distance":207, "latlong":[40.01178, -75.30574], "turn":4.84},
  {"borrowed": 13, "symbol":"MUU", "name":"Univ of Missouri", "IDS":false, "distance":996, "latlong":[38.94526, -92.32888], "turn":6.69},
  {"borrowed": 13, "symbol":"VXW", "name":"Vassar College", "IDS":false, "distance":78, "latlong":[41.68704, -73.89541], "turn":8.79},
  {"borrowed": 13, "symbol":"VLW", "name":"Washington & Lee Univ", "IDS":false, "distance":453, "latlong":[37.78825, -79.44321], "turn":6.34},
  {"borrowed": 12, "symbol":"BUF", "name":"SUNY BUffalo", "IDS":true, "distance":248, "latlong":[42.95311, -78.82087], "turn":3.93},
  {"borrowed": 12, "symbol":"KEN", "name":"Kenyon Coll", "IDS":false, "distance":469, "latlong":[40.37684, -82.39659], "turn":5.95},
  {"borrowed": 12, "symbol":"MNO", "name":"St. Olaf Coll", "IDS":false, "distance":967, "latlong":[44.46184, -93.18276], "turn":7.62},
  {"borrowed": 11, "symbol":"PUL", "name":"Princeton Univ", "IDS":false, "distance":175, "latlong":[40.34285, -74.65682], "turn":3.7},
  {"borrowed": 11, "symbol":"TWU", "name":"Univ of the South", "IDS":false, "distance":830, "latlong":[35.2048, -85.9197], "turn":11.64},
  {"borrowed": 10, "symbol":"IUP", "name":"Purdue Univ", "IDS":false, "distance":690, "latlong":[40.42809, -86.92251], "turn":5.12},
  {"borrowed": 10, "symbol":"ORE", "name":"Oregon State Univ", "IDS":false, "distance":2431, "latlong":[44.56311, -123.27871], "turn":8.6},
  {"borrowed": 10, "symbol":"TYC", "name":"Trinity College", "IDS":false, "distance":97, "latlong":[41.75093, -72.6912], "turn":6.9},
  {"borrowed": 10, "symbol":"UCW", "name":"Univ of Connecticut", "IDS":true, "distance":110, "latlong":[41.80926, -72.25369], "turn":4.5},
  {"borrowed": 10, "symbol":"VJN", "name":"College of St. Rose", "IDS":true, "distance":13, "latlong":[42.66258, -73.7879], "turn":2.21},
  {"borrowed":9, "symbol":"IUL", "name":"Indiana University", "latlong":[39.166667, -86.5], "turn":11.12}
];


const connectnys =  [
  {"borrowed":150, "symbol":"VJA", "name":"Adelphi Univ", "distance":143, "latlong":[40.809486, -73.237846]},
  {"borrowed":418, "symbol":"VVP", "name":"Bard College",  "distance":55, "latlong":[42.0212, -73.90652]},
  {"borrowed":223, "symbol":"VKC", "name":"Canisius College", "distance":249, "latlong":[42.92534, -78.85254]},
  {"borrowed":541, "symbol":"VVC", "name":"Colgate University", "distance":81, "latlong":[42.81729, -75.53573]},
  {"borrowed":371, "symbol":"YHM", "name":"Hamilton College", "distance":76, "latlong":[43.052364, -75.405657]},
  {"borrowed":217, "symbol":"VFL", "name":"Le Moyne College", "distance":110, "latlong":[43.04896, -76.08826]},
  {"borrowed":41, "symbol":"YJT", "name":"Medaille", "distance":250, "latlong":[42.92889, -78.85528]},
  {"borrowed":33, "symbol":"VZQ", "name":"Pratt Institute", "distance":147, "latlong":[40.69066, -73.9643]},
  {"borrowed":200, "symbol":"VZP", "name":"Pace Univ", "distance":117, "latlong":[41.12565, -73.80763]},
  {"borrowed":303, "symbol":"RVE", "name":"Rochester Institute of Technology", "distance":190, "latlong":[43.0859, -77.67028]},
  {"borrowed":798, "symbol":"VKM", "name":"Siena College", "distance":11, "latlong":[42.71841, -73.75373]},
  {"borrowed":525, "symbol":"YRM", "name":"RPI",  "distance":14, "latlong":[42.73258, -73.68095]},
  {"borrowed":395, "symbol":"XLM", "name":"St. Lawrence Univ", "distance":137, "latlong":[44.59201, -75.16076]},
  {"borrowed":220, "symbol":"YWM", "name":"US Military Academy",  "distance":101, "latlong":[41.35352, -74.02831]},
  {"borrowed":2, "symbol":"VYM", "name":"US Merchant Marine", "distance":139, "latlong":[40.81232, -73.76263]},
  {"borrowed":1136, "symbol":"VXW", "name":"Vassar College", "distance":78, "latlong":[41.68704, -73.89541]},
  {"borrowed":2, "symbol":"XMA", "name":"Marist College", "distance":250, "latlong":[41.725974, -73.93354]},
  {"borrowed":1176, "symbol":"VZS", "name":"Skidmore Coll", "distance":21, "latlong": [43.095199,-73.78004]}
];

const historical = [
  { "name": "Titanic Disaster", "latlong":[41.726931, -49.948253]}
];


const lcheadings = {"A":"General Works",
"B":"Philosophy, Psychology, Religion",
"BD":"Speculative philosophy",
"BF":"Psychology",
"BJ":"Ethics",
"BL":"Religion, Theology",
"BX":"Christian Denominations",
"C":"Auxiliary Sciences of History (General)",
"D":"History (General)",
"DA":"Great Britain",
"DG":"Italy",
"DL":"Northern Europe, Scandivavia",
"DR":"Balkan Peninsula",
"DS":"Asia",
"DT":"Africa",
"E":"American and the United States History (general)",
"F":"United States, Canada, North America",
"G":"Geography, Anthropology, Recreation",
"GC":"Oceanography",
"GE":"Environmental Sciences",
"GN":"Anthropology",
"GR":"Folklore",
"GT":"Manners and Customs (General)",
"GV":"Recreation, Leisure",
"H":"Social Sciences",
"HA":"Statistics",
"HB":"Economic theory, Demography",
"HC":"Economic History and Conditions",
"HD":"Industries, Land use, Labor",
"HF":"Commerce, Accounting & Advertising",
"HG":"Finance",
"HM":"Sociology (General)",
"HN":"Social history and conditions, Social problems, Social reform",
"HQ":"Family, Marriage, Women",
"HT":"Communities, Classes, Races",
"HV":"Social Pathology, Social and public welfare, Criminology",
"J":"Political Science",
"JF":"Political insitutions and public administration - General",
"JG":"Political insitutions and public administration - General",
"JH":"Political insitutions and public administration - General",
"JJ":"Political insitutions and public administration - General",
"JV":"Colonies and colonization. Emigration and immigration. International migration",
"JZ":"International relations",
"K":"Law",
"KG":"Latin America, Mexico and Central America, West Indies, Caribbean area",
"L":"Education",
"LB":"Theory and practice of education",
"LC":"Special aspects of education",
"M":"Music",
"ML":"Literature of Music",
"N":"Fine Arts",
"ND":"Painting",
"P":"Language and Literature",
"PA":"Greek and Latin language and literature",
"PB":"Modern languages. Celtic languages",
"PC":"Romantic languages",
"PD":"Germanic, Scandinavian laguages.",
"PF":"West Germanic Languages",
"PG":"Slavic, Baltic, Albanian languages.",
"PH":"Uralic, Basque languages",
"PL":"Languages and literatures of Eastern Asia, Africa, Oceania",
"PN":"Literature - General",
"PQ":"French, Italian, Spanish, and Portuguese literature",
"PR":"English Literature",
"PS":"American literature",
"PT":"German literature",
"RC":"Internal Medicine and Practice of Medicine",
"Q":"Science (General)",
"QA":"Mathematics",
"QC":"Physics",
"QD":"Chemistry",
"QE":"Geology",
"QH":"Natural History - Biology",
"R":"Medicine",
"RA":"Public aspects of medicine",
"S":"Agriculture",
"T":"Technology",
"TC":"Hydraulic and ocean engineering.",
"U":"Military Science",
"V":"Naval Science",
"Z":"Bibliography, Library Science, Information Resources",
"ZA":"Information resources (General)"};

const cnystudent = [
{"lcno":"E", "count":"276"},
{"lcno":"PN", "count":"213"},
{"lcno":"PS", "count":"209"},
{"lcno":"DS", "count":"184"},
{"lcno":"HV", "count":"170"},
{"lcno":"D", "count":"168"},
{"lcno":"HQ", "count":"163"},
{"lcno":"QD", "count":"147"},
{"lcno":"PR", "count":"135"},
{"lcno":"N", "count":"113"},
{"lcno":"HD", "count":"110"},
{"lcno":"F", "count":"100"},
{"lcno":"DA", "count":"78"},
{"lcno":"QA", "count":"78"},
{"lcno":"DT", "count":"77"},
{"lcno":"ML", "count":"77"},
{"lcno":"GV", "count":"75"},
{"lcno":"BF", "count":"69"},
{"lcno":"PQ", "count":"69"},
{"lcno":"HN", "count":"61"}
//{"lcno":"BL", "count":"56"},
// {"lcno":"RC", "count":"48"},
// {"lcno":"PA", "count":"46"},
// {"lcno":"HC", "count":"45"},
// {"lcno":"HG", "count":"45"},
// {"lcno":"JK", "count":"45"},
// {"lcno":"HB", "count":"44"},
// {"lcno":"LB", "count":"44"},
// {"lcno":"HT", "count":"42"},
// {"lcno":"QC", "count":"41"},
// {"lcno":"ND", "count":"40"}
];

const cnyfaculty = [
{"lcno":"PN", "count":"148"},
{"lcno":"PR", "count":"141"},
{"lcno":"DS", "count":"98"},
{"lcno":"PS", "count":"79"},
{"lcno":"E", "count":"75"},
{"lcno":"B", "count":"67"},
{"lcno":"HQ", "count":"64"},
{"lcno":"HD", "count":"57"},
{"lcno":"PQ", "count":"55"},
{"lcno":"N", "count":"51"},
{"lcno":"PL", "count":"41"},
{"lcno":"HV", "count":"40"},
{"lcno":"F", "count":"39"},
{"lcno":"BL", "count":"38"},
{"lcno":"Z", "count":"37"},
{"lcno":"GN", "count":"32"},
{"lcno":"HC", "count":"32"},
{"lcno":"ML", "count":"32"},
{"lcno":"PA", "count":"32"},
{"lcno":"BF", "count":"29"}
// {"lcno":"GT", "count":"29"},
// {"lcno":"D", "count":"28"},
// {"lcno":"HN", "count":"27"},
// {"lcno":"HB", "count":"24"},
// {"lcno":"HM", "count":"24"},
// {"lcno":"PT", "count":"24"},
// {"lcno":"P", "count":"23"},
// {"lcno":"BJ", "count":"22"},
// {"lcno":"GV", "count":"22"},
// {"lcno":"LB", "count":"22"},
// {"lcno":"DG", "count":"21"},
// {"lcno":"K", "count":"20"},
// {"lcno":"DT", "count":"20"}
];

const illstudent = [
	{"lcno":"HD", "count":"27"}, {"lcno":"PN", "count":"25"}, {"lcno":"HV", "count":"23"}, 
	{"lcno":"E", "count":"22"}, {"lcno":"PR", "count":"22"}, {"lcno":"D", "count":"21"}, 
	{"lcno":"GV", "count":"21"}, {"lcno":"PQ", "count":"21"},  {"lcno":"F", "count":"19"}, 
	{"lcno":"HF", "count":"18"}, {"lcno":"ML", "count":"18"}, {"lcno":"RC", "count":"17"}, 
	{"lcno":"DS", "count":"16"}, {"lcno":"BF", "count":"15"}, {"lcno":"GT", "count":"15"} 
	//{"lcno":"PS", "count":"15"}, {"lcno":"QD", "count":"14"}, {"lcno":"QA", "count":"13"}, 
	//{"lcno":"DA", "count":"11"}, {"lcno":"HQ", "count":"11"}, {"lcno":"RA", "count":"10"}
];
const illfaculty = [
	{"lcno":"DS", "count":"44"}, {"lcno":"PN", "count":"42"}, 
	{"lcno":"PL", "count":"29"}, {"lcno":"ML", "count":"26"}, {"lcno":"QA", "count":"26"}, 
	{"lcno":"PT", "count":"25"},  {"lcno":"F", "count":"24"}, {"lcno":"HD", "count":"23"},
	{"lcno":"HQ", "count":"18"}, {"lcno":"PS", "count":"17"}, {"lcno":"Z", "count":"17"}, 
	{"lcno":"PQ", "count":"16"}, {"lcno":"HV", "count":"13"}, {"lcno":"LB", "count":"13"}, 
	{"lcno":"ND", "count":"13"}
	// {"lcno":"PA", "count":"12"}, {"lcno":"PR", "count":"12"}, 
	//{"lcno":"RC", "count":"12"},{"lcno":"D", "count":"11"}, {"lcno":"P", "count":"11"}, 
	//{"lcno":"BF", "count":"10"}, {"lcno":"BX", "count":"10"}, {"lcno":"DA", "count":"10"}
];


const fillPopular = function(cny, ill, div) {
    let txtbox = document.querySelector(div);
    txtbox.innerHTML='';
    let popular = cny || ill;
    for (i in popular) {
      let {count, lcno} = popular[i];
      let subj = lcheadings[lcno];

      let lc = lcno.length === 2 ? lcno.padEnd(4) : lcno.padEnd(5);
      let cls = cny ? "cny" : "ill";
      txtbox.innerHTML += `${lc} <span class=${cls}>${subj} (${count})</span><br>`;  
    }
}












// const edls = [
//   [42.6525, -73.757222], // Albany
//   [43.046944, -76.144444], //Syracuse
//   [43.165556, -77.611389], //Rochester
//   [42.904722, -78.849444], //Buffalo
//   [41.519722, -74.021389],  //Newburgh 
//   [42.102222,-75.911667],  //binghamton
//   [40.7127, -74.0059], // New York
//   [42.6525, -73.757222]
//];
//edls.forEach(function(edl, i) {
//   L.circle(edl, {
//     "radius":5000, 
//     "fillColor": 'hsl(0%, 0%, 10%)',
//     "color": 'hsl(0%, 0%, 90%)'
//  }); //.addTo(mymap);
// 

//let attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 15,
//     id: 'mapbox.streets',
//     pane:'labels',
//     accessToken: 'pk.eyJ1IjoiZGF2aWRmdWxsZXIiLCJhIjoiY2o4dXhzbzZ1MHl5bTJxbjd3OHp2c2JoZiJ9.YQBmM8H2KwUyp_i3ADY3tg'
// }).addTo(mymap);
 