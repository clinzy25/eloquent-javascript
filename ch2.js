const log = console.log

//M I N I M U M

const min = (a, b) => Math.min(a, b);


log(min(0, 10));
// → 0
log(min(0, -10));
// → -10



// R E C U R S I O N

const isEven = (num) => {
	if (num == 0) {
		return true;
	} else if (num == 1 || num == -1) {
		return false;
	}
	if (num > 0) {
		return isEven(num - 2);
	} else {
		return isEven(num + 2);
	}  
}

log(isEven(50));
// → true
log(isEven(75));
// → false
log(isEven(-1));
// → false
log(isEven(-2));
// true
log(isEven(-21));
//false



//B E A N  C O U N T I N G

const countBs = (str) => {
  	let count = 0;
	for (let char of str) {
    	if (char === 'B') count++
    }
  return count;
}

const countChar = (str, char) => {
	let count = 0;
  	for (let letter of str) {
    	if (letter === char) count++
    }
  return count;
}


log(countBs("BBC"));
// → 2
log(countChar("kakkerlak", "k"));
// → 4