//R E T R Y

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
for(;;) {
	try {
		return primitiveMultiply(a, b);
		break;
	} catch (error) {
		if (!error instanceof MultiplicatorUnitFailure)
			throw error;
	}
	}
}


// T H E  L O C K E D  B O X

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
	let locked = box.locked;
	if (!locked) {
		return body();
	}
	box.unlock()
	try {
		return body();
	} finally {
		box.lock();
	}
};
