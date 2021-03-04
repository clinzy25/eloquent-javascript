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


//E L E M E N T S  B Y  T A G  N A M E

