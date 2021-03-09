//B A L L O O N

// <p>🎈</p>

// <script>

let balloon = document.querySelector('p');
  let size;
  function setSize(newSize) {
    size = newSize;
    balloon.style.fontSize = size + "rem";
  }
  setSize(1);
 
document.body.addEventListener('keydown', function blow(event) {
  	if (size > 3) {
      balloon.textContent = '💥'
      document.body.removeEventListener('keydown', blow);
    }
	if (event.key == 'ArrowUp') {
		setSize(size * 1.1);
		event.preventDefault()
	} else if (event.key == 'ArrowDown') {
		setSize(size * 0.9);
		event.preventDefault() 
	}
})
  
// </script>


//M O U S E  T R A I L

// <style>
//   .trail { /* className for the trail elements */
//     position: absolute;
//     height: 6px; width: 6px;
//     border-radius: 3px;
//     background: teal;
//   }
//   body {
//     height: 300px;
//   }
// </style>

//<script>
  
let storage = [];
for(let i = 0; i < 20; i++) {
	let trail = document.createElement('div');
  	trail.className = 'trail';
  	document.body.appendChild(trail);
  	storage.push(trail);
}
let currentDot = 0;
  
document.body.addEventListener('mousemove', event => {
	let dot = storage[currentDot];
	dot.style.left = event.clientX + 'px';
	dot.style.top = event.clientY + 'px';
	currentDot = (currentDot + 1) % storage.length;
});

//</script>


//T A B S

function asTabs(node) {
	let tabs = Array.from(node.children).map(node => {
	  let button = document.createElement("button");
	  button.textContent = node.getAttribute("data-tabname");
	  let tab = {node, button};
	  button.addEventListener("click", () => selectTab(tab));
	  return tab;
	});

	let tabList = document.createElement("div");
	for (let {button} of tabs) tabList.appendChild(button);
	node.insertBefore(tabList, node.firstChild);

	function selectTab(selectedTab) {
	  for (let tab of tabs) {
	    let selected = tab == selectedTab;
	    tab.node.style.display = selected ? "" : "none";
	    tab.button.style.color = selected ? "red" : "";
	  }
	}
	selectTab(tabs[0]);
	}

asTabs(document.querySelector("tab-panel"));