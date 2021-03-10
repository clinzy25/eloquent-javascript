// C O N T E N T  N E G O T I A T I O N

let url = 'https://eloquentjavascript.net/author';
let types = ['text/plain', 
			 'text/html', 
			 'application/json',
			 'application/rainbows+unicorns'];

async function getTypes() {
	for (let type of types) {
		await fetch(url, {headers: {accept: type}})
		.then(resp => resp.text())
		.then(resp => console.log(`Type: ${type} \n\n ${resp}`));
	} 
}

getTypes();


// A  J A V A S C R I P T  W O R K B E N C H 

// <textarea id="code">return "hi";</textarea>
// <button id="button">Run</button>
// <pre id="output"></pre>

// <script>
	document.querySelector("#button").addEventListener("click", () => {
	  let input = document.querySelector("#code").value;
	  let output = document.querySelector("#output");
	  try {
	    let result = Function(input)();
	    output.innerText = String(result);
	  } catch (error) {
	    output.innerText = "Error: " + error;
	  }
	});
// </script>


// C O N W A Y ' S  G A M E  O F  L I F E

// <!doctype html>
// <script src="code/chapter/18_http.js"></script>

// <div id="grid"></div>
// <button id="next">Next generation</button>
// <button id="run">Auto run</button>

// <script>
  const width = 30, height = 15;

  // I will represent the grid as an array of booleans.

  let gridNode = document.querySelector("#grid");
  // This holds the checkboxes that display the grid in the document.
  let checkboxes = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let box = document.createElement("input");
      box.type = "checkbox";
      gridNode.appendChild(box);
      checkboxes.push(box);
    }
    gridNode.appendChild(document.createElement("br"));
  }

  function gridFromCheckboxes() {
    return checkboxes.map(box => box.checked);
  }
  function checkboxesFromGrid(grid) {
    grid.forEach((value, i) => checkboxes[i].checked = value);
  }
  function randomGrid() {
    let result = [];
    for (let i = 0; i < width * height; i++) {
      result.push(Math.random() < 0.3);
    }
    return result;
  }

  checkboxesFromGrid(randomGrid());

  // This does a two-dimensional loop over the square around the given
  // x,y position, counting all fields that have a cell but are not the
  // center field.
  function countNeighbors(grid, x, y) {
    let count = 0;
    for (let y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
      for (let x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
        if ((x1 != x || y1 != y) && grid[x1 + y1 * width]) {
          count++;
        }
      }
    }
    return count;
  }

  function nextGeneration(grid) {
    let newGrid = new Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let neighbors = countNeighbors(grid, x, y);
        let offset = x + y * width;
        if (neighbors < 2 || neighbors > 3) {
          newGrid[offset] = false;
        } else if (neighbors == 2) {
          newGrid[offset] = grid[offset];
        } else {
          newGrid[offset] = true;
        }
      }
    }
    return newGrid;
  }

  function turn() {
    checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
  }

  document.querySelector("#next").addEventListener("click", turn);

  let running = null;
  document.querySelector("#run").addEventListener("click", () => {
    if (running) {
      clearInterval(running);
      running = null;
    } else {
      running = setInterval(turn, 400);
    }
  });
// </script>