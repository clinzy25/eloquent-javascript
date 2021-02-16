let log = console.log;

//F L A T T E N I N G

let arr = [[1, 2, 3], [4, 5], [6]];
arr.reduce((flat, num) => flat.concat(num));
log(arr);


//Y O U R  O W N  L O O P

let loop = (value, test, update, body) => {
	for (let i = value; test(i); i = update(i)) { //i must equal update(i) or stack overflow
		body(i);
	}
}

loop(3, n => n > 0, n => n - 1, log);
// → 3
// → 2
// → 1


// E V E R Y T H I N G

//Recreate function of .every
//Using a loop
const every = (arr, test) => {
	for (let item of arr)
		if (test(item) === false) return false;
    	return true;
}

//Using .some and DeMorgan's Laws
const every = (arr, test) => !arr.some(item => !test(item));


console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true


// D O M I N A N T  W R I T I N G  D I R E C T I O N

// a function that returns the dominant writing direction given a string
// scripts.js supplies char code ranges and the associated dominant writing direction ('rtl', or 'ltr')
// char codes are read from string with codePointAt() in function dominantDirection()

require('../scripts.js');

// Script sample:
// {
//   name: "Coptic",
//   ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
//   direction: "ltr",
//   year: -200,
//   living: false,
//   link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
// }

const characterScript = (code) => {
  for (let script of SCRIPTS)
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script.direction;
    }
  return null;
}

//Select item that occurs most often in an array
const occursMost = (arr) => {
  return arr.reduce((a, b, i, arr) => ( 
         arr.filter(j => j === a).length >= arr
            .filter(j => j === b).length ? a : b 
    ), null)
}

const dominantDirection = (text) => {
	let codes = [];
	let directions = [];
	for (let char of text)
		codes.push(char.codePointAt()); //finds char code for every char in string
	for (let code of codes) 
    	directions.push(characterScript(code)); // finds writing direction for every char code
  return occursMost(directions); // returns writing direction that occurs most
}

log(dominantDirection("Hello!"));
// → ltr
log(dominantDirection("Hey, مساء الخير"));
// → rtl
