const log = console.log

//T H E  S U M  O F  A  R A N G E

const range = (start, end, step = 1) => {
	let result = [];
	if (step > 0) {
		for (let i = start; i <= end; i += step) //count forwards 
			result.push(i);
	} else { 
		for (let i = start; i >= end; i += step) //count backwards
			result.push(i);
	}
	return result;
}

const sum = (arr) => arr.reduce((add, num) => add + num);

log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
log(range(5, 2, -1));
// → [5, 4, 3, 2]
log(sum(range(1, 10)));
// → 55



// R E V E R S I N G  A N  A R R A Y

//returns new array
const reverseArray = (arr) => {
	let newArr = [];
  	for (let i of arr) {
        newArr.unshift(i);
    }
  return newArr;
}

//modifies original array
const reverseArrayInPlace = (arr) => {
	for(let i = 0; i < (arr.length - 1) / 2; i++) {
      	let front = arr[i];
        let back = arr[arr.length - 1 - i];
        arr[i] = back;
      	arr[arr.length - 1 - i] = front;
    }
  return arr;
}

log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
let arrayValueEven = [1, 2, 3, 4, 5, 6]
reverseArrayInPlace(arrayValue);
log(arrayValue);
// → [5, 4, 3, 2, 1]
reverseArrayInPlace(arrayValueEven);
log(arrayValue);
// → [6, 5, 4, 3, 2, 1]



// A  L I S T

const arrayToList = (arr) => {
	let list = null
	for (let i = arr.length - 1; i >= 0; i--) {
		list = {value: arr[i], rest: list};
	}
	return list;
}

log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}


const listToArray = (list) => {
	let arr = [list.value] //handles the non-nested value separately
	while (list.rest != null) {
		list = list.rest;
		arr.push(list.value);
	}
	return arr;
}

log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]


const prepend = (elem, list) => {
	return {value: elem, rest: list};
}

log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}


const nth = (list, num) => {
	if (num == 0) 
		return list.value;
	else if (list.rest === null) 
		return undefined;
	else 
		return nth(list.rest, num - 1);
}

console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20


// D E E P  C O M P A R I S O N

//First try
const deepEqual = (a, b) => {
	if (typeof a === 'object' && typeof b === 'object' && 
			   a != null && b != null) {
		for (let i = 0; Object.keys(a)[i] != undefined; i++)  {
          if (typeof Object.values(a)[i] === 'object' || typeof Object.values(b)[i] === 'object'){
          	return deepEqual(Object.values(a)[i], Object.values(b)[i])
          } else {
			return (Object.keys(a)[i] === Object.keys(b)[i]) && 
				   (Object.values(a)[i] === Object.values(b)[i])
          }
        }
	} else {
		return a === b;
	}
}

//Refactored
const deepEqual = (a, b) => {
	if (a === b) return true;
	if (typeof a !== 'object' || typeof b !== 'object' ||
		Object.keys(a).length !== Object.keys(b).length) return false
	for(let i in a) 
		if (!(i in b) || !deepEqual(a[i], b[i])) return false
  	for(let i in b) 
		if (!(i in a) || !deepEqual(a[i], b[i])) return false
  	return true
}

let obj = {here: {is: "an"}, object: 2};
log(deepEqual(obj, obj));
// → true
log(deepEqual(obj, {here: 1, object: 2}));
// → false
log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true