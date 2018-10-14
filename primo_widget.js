const {log} = console;
const everything = `<i>everything</i>, combines the <div class="tooltip">scope<span class="tooltiptext">a subset of records.</span></div> for 
              <div class="tooltip">library catalog<span class="tooltiptext">...is everything that we maintain a local record for (books, mainly) along with government documents, DVDs, musical scores, and...more.</span></div> 
              and Primo's <div class="tooltip">Central Index<span class="tooltiptext">an index of our electronic databases (articles, mainly), including selected open source content</span></div> into one comprehensive search.</div>
              <div><i>everything</i> results will be gargantuan so it is essential to use the <div class="tooltip">facets/filters<span class="tooltiptext"><img src="facets.png"></span></div> to limit your results.
          </div>`;
const exactitle = `<div>search the scope <i>library catalog</i> for an exact title. </div>
              <div>This is unforgiving, if you misspell you won't get any results.</div>
              <div>If you did spell correctly then you may <div class="tooltip">change the scope to worldcat<span class="tooltiptext"><img src="worldcat_scope.png"></span></div>, search and request the title there.</div>
          </div>`;
const allbooks = `searches all the fields in both the library catalog and the Primo Central Index for books (both physical and electronic).</div>`;
const peerreview = `searches the Primo Central Index for articles and limits  the results to articles in peer review journals`;
const newspapers = `newspapers searches the Library Catalog for the exact title`;
const journaltitles = `searches the Library Catalog for jounal titles`;
const databases = `searches the Library Catalog for databases`;
const filmvideo = `film searches the Library Catalog for the exact title`;
const reference = `reference`;
const unionthesis = `searches the Library Catalog for the exact title`;
         
addFormElement = function(name, value) {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
}

let form = document.createElement('form');
form.setAttribute('id', 'searchFrm');
form.setAttribute('method', 'get');
form.setAttribute('target', '_blank');
form.setAttribute('action', 'https://union.primo.exlibrisgroup.com/discovery/search');
form.setAttribute('enctype', 'application/x-www-form-urlencoded; charset=utf-8');
els = {
  "vid":"01UCNY_INST:01UCNY_INST",
  "search_scope":"MyInst_and_CI",
  "tab":"Everything",
  "query":"any,contains"
}

for (el in els) {
  let newel = addFormElement(el, els[el]);
  form.appendChild(newel);
}

const tmpQuery = document.querySelector("#primoQueryTemp");
const go = document.querySelector("#go");
const explain = document.getElementById("explain");
const divform = document.querySelector('#divform');

docfrag = document.createDocumentFragment();
docfrag.appendChild(form);
divform.insertBefore(docfrag.cloneNode(true), divform.firstChild);
let liveform = divform.querySelector("#searchFrm");
let selected;

makeForm = function(select) {
      switchForm(liveform);
      tmpQuery.focus();
      selected = select;

      switch(selected) {            
        case "everything": 
            explain.innerHTML = everything;
            break; 
        case "exactitle":
            liveform.search_scope.value = 'MyInstitution';
            liveform.tab.value = 'LibraryCatalog';
            liveform.query.value = ["title", "exact"];
            explain.innerHTML = exactitle;
            break;
        case "allbooks":
            let newel2 = addFormElement('facet', 'rtype,include,books');
            liveform.appendChild(newel2);
            explain.innerHTML = allbooks;
            break;
        case "peerreview":
            let newel3 = addFormElement('mfacet', 'tlevel,include,peer_reviewed,1');
            liveform.appendChild(newel3); 
            explain.innerHTML = peereview;
            break;
        case "newspapers":
            liveform.search_scope.value = 'all';
            liveform.setAttribute('action','https://union.primo.exlibrisgroup.com/discovery/npsearch');        
            explain.innerHTML = "searches for newspaper articles'"; 
            break;
         case "databases":
            liveform.setAttribute('action','https://libguides.union.edu/az.php'); 
            let children = liveform.childNodes;
            while (children.length > 0) {
                let child = liveform.firstChild;
                child.parentNode.removeChild(child);
            }
            liveform.appendChild(addFormElement('q', '')); 
            explain.innerHTML = databases; 
            break;
         case "journaltitles":
            liveform.setAttribute('action','https://union.primo.exlibrisgroup.com/discovery/jsearch');        
            liveform.tab.value = 'jsearch_slot';
            explain.innerHTML = journaltitles; 
            break;
        case "reference":
            let newel4 = addFormElement('facet', 'rtype,include,reference_entrys');
            liveform.appendChild(newel4); 
            explain.innerHTML = reference; 
            break;
        case "filmvideo":
            let newel5 = addFormElement('facet', 'rtype,include,video');
            liveform.appendChild(newel5); 
            explain.innerHTML = "searches 'everything' and applies the facet 'Resource Type = Video'"; 
            break;
        case "unionthesis":
            liveform.search_scope.value = 'MyInstitution';
            liveform.tab.value = 'LibraryCatalog';
            let newel6 = addFormElement('facet', 'topic,include,Academic Dissertations');
            liveform.appendChild(newel6); 
            explain.innerHTML = "search the Library Catalog for Union College Honors theses";
      }

      let tooltips = explain.querySelectorAll('.tooltip');
      tooltips.forEach(function(tip) {
        tip.addEventListener('mouseover', function(e) {  
            let tipstyle = this.querySelectorAll('.tooltiptext')[0]; 
            let top = tipstyle.offsetHeight + 8;
            tipstyle.setAttribute('style', 'top:-' + top);
          
        });
      });
}

searchPrimo = function(evt) {
    if (tmpQuery.value) {
        srch = tmpQuery.value.replace(/[,]/g, " ");
        if (selected !== "databases") {
          query = Array.from(liveform.query.value.split(","));
          liveform.query.value = query.join() + "," + srch.trim();
        } else {
          liveform.q.value = srch;
        }   
        liveform.submit();             
    }
}

switchForm = function(lform) {
    lform.parentNode.replaceChild(docfrag.cloneNode(true), lform);
    liveform = divform.querySelector('#searchFrm');
}

let lis = document.querySelectorAll('li');
lis.forEach(function(li) {
  li.addEventListener('click', function(e) {
        lis.forEach(function(li) {
          if (e.target.id === li.id) {
            li.classList.add('selected');
            makeForm(e.target.id);
          } else {
          if (li.classList.contains('selected')) {
            li.classList.remove('selected');
          }
        }
    });
  });
});

tmpQuery.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        go.click();
      }
});

makeForm('everything');
