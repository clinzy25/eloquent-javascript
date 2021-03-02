// T R A C K I N G  T H E  S C A L P E L

function anyStorage(nest, source, name) {
  if (source == nest.name) return storage(nest, name);
  else return routeRequest(nest, source, "storage", name);
}

async function locateScalpel(nest) {
  let current = nest.name;
  for(;;) {
  	let next = await anyStorage(nest, current, "scalpel");
  	if (next == current) return current;
  	current = next;
  } 
}

function locateScalpel2(nest) {
	function loop(current) {
		return anyStorage(nest, current, "scalpel").then(next => {
			if (next == current) return current;
			else return loop(next);
		});
	}
	return loop(nest.name);
}


//B U I L D I N G  P R O M I S E . A L L 

function Promise_all(promises) {
	return new Promise((resolve, reject) => {
		let results = [];
		let pending = promise.length;
		for (let i = 0; i < promises.length; i++) {
			promises[i].then(result => {
				results[i] = result;
				pending--;
				if (pending == 0) resolve(results);
			});
		}
		if (promises.length == 0) resolve(results);
	});
}