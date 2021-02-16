// A  V E C T O R  T Y P E

function Vec(x, y) {
	this.x = x;
	this.y = y;
};

Vec.prototype.plus = function(vector) {
	let sumX = this.x + vector.x;
	let sumY = this.y + vector.y;
	return new Vec (sumX, sumY)
};

Vec.prototype.minus = function(vector) {
	let diffX = this.x - vector.x;
	let diffY = this.y - vector.y;
	return new Vec (diffX, diffY)
};

Object.defineProperty(Vec.prototype, 'length', {
  get: function() {
	return Math.sqrt(this.x**2 + this.y**2)
  }
});


console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5


// G R O U P S

class Group {
	constructor() {
		this.members = [];
	}
	add(num) {
		if (!this.members.includes(num))
			this.members.push(num);
	}
	delete(num) {
		if (this.members.includes(num))
			this.members.splice(this.members.indexOf(num), 1);
	}
	has(num) {
		return this.members.includes(num);
	}
	static from(arr) {
		let group = new Group;
		for(let item of arr) {
			group.add(item);
		} 
		return group;
	}
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false


// I T E R A B L E  G R O U P S
class Group {
	constructor() {
		this.members = [];
	}
	add(num) {
		if (!this.members.includes(num))
			this.members.push(num);
	}
	delete(num) {
		if (this.members.includes(num))
			this.members.splice(this.members.indexOf(num), 1);
	}
	has(num) {
		return this.members.includes(num);
	}
	static from(arr) {
		let group = new Group;
		for(let item of arr) {
			group.add(item);
		} 
		return group;
	}
	[Symbol.iterator]() { 
		return new GroupIterator(this);
	}
}

class GroupIterator {
	constructor(group) {
		this.group = group;
		this.position = 0;
	}
	next() {
		if (this.position >= this.group.members.length) {
			return {done: true};
		} else {
			let result = {value: this.group.members[this.position],
						  done: false};
			this.position++;
			return result
		}
	}
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c


// B O R R O W I N G  A  M E T H O D

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
console.log(Object.prototype.hasOwnProperty.call("one"));
// → false



















