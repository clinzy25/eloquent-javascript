//B U I L D  A  T A B L E

//<h1>Mountains</h1>
//<div id="mountains"></div>

let MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
  {name: "Everest", height: 8848, place: "Nepal"},
  {name: "Mount Fuji", height: 3776, place: "Japan"},
  {name: "Vaalserberg", height: 323, place: "Netherlands"},
  {name: "Denali", height: 6168, place: "United States"},
  {name: "Popocatepetl", height: 5465, place: "Mexico"},
  {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];


let buildTable = (arr) => {
  let table = document.createElement('table');
  let row = document.createElement('tr');
  for (let key in arr[0]) {
    let header = document.createElement('th');
    header.appendChild(document.createTextNode(key));
    table.appendChild(row).appendChild(header);
  }
  for (let entry of arr) {
    let row = document.createElement('tr');
    Object.values(entry).forEach(value => {
      let data = document.createElement('td');
      data.appendChild(document.createTextNode(value));
      row.appendChild(data);
    })
    table.appendChild(row);
  }
  return table;
}

let div = document.querySelector('#mountains').appendChild(buildTable(MOUNTAINS))

// Mountains
// name  height  place
// Kilimanjaro 5895  Tanzania
// Everest 8848  Nepal
// Mount Fuji  3776  Japan
// Vaalserberg 323 Netherlands
// Denali  6168  United States
// Popocatepetl  5465  Mexico
// Mont Blanc  4808  Italy/France


//E L E M E N T S  B Y  T A G  N A M E

const byTagName = (node, tagName) => {
  let result = [];
  function search(node) {
    for(let el of node.childNodes) {
      if(el.nodeType == 1) {
        if(el.nodeName.toLowerCase() == tagName) {
          result.push(el)
        }
        search(el)
        }
      }
    }
  search(node);
  return result;
}

console.log(byTagName(document.body, "h1").length);
// → 1
console.log(byTagName(document.body, "span").length);
// → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
// → 2


//T H E  C A T ' S  H A T

// <style>body { min-height: 500px }</style>
// <img src="img/cat.png" id="cat" style="position: absolute">
// <img src="img/hat.png" id="hat" style="position: absolute">
  
// <script>
  let cat = document.querySelector("#cat");
  let hat = document.querySelector("#hat");

  let angle = 0;
  let lastTime = null;
  function animate(time) {
    if (lastTime != null) angle += (time - lastTime) * 0.09;
    lastTime = time;
    cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
    cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
  hat.style.top = (Math.sin(angle) * -40 + 40) + "px";
    hat.style.left = (Math.cos(angle) * -200 + 230) + "px";
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
// </script>