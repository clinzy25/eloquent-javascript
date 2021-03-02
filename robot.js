let log = console.log

const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

//creates a map object that, for each node, stores an array of connected nodes.
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to)
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

// log(roadGraph)
// [Object: null prototype] {
//     "Alice's House": [ "Bob's House", 'Cabin', 'Post Office' ],
//     "Bob's House": [ "Alice's House", 'Town Hall' ],
//     Cabin: [ "Alice's House" ],
//     'Post Office': [ "Alice's House", 'Marketplace' ],
//     'Town Hall': [ "Bob's House", "Daria's House", 'Marketplace', 'Shop' ],
//     "Daria's House": [ "Ernie's House", 'Town Hall' ],
//     "Ernie's House": [ "Daria's House", "Grete's House" ],
//     "Grete's House": [ "Ernie's House", 'Farm', 'Shop' ],
//     Farm: [ "Grete's House", 'Marketplace' ],
//     Shop: [ "Grete's House", 'Marketplace', 'Town Hall' ],
//     Marketplace: [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ]
//   }


//Robot move, pick up and deliver, create village state
class VillageState { //robots location and collection of undelivered parcels
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) { 
        if (!roadGraph[this.place].includes(destination)) { //if there is no road going from the current place to the destination, return current state
            return this;
        } else { //drops off and picks up parcels
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p; //look for parcels at current place
                return {place: destination, address: p.address}; //if they are here, return an object with the destination, and the address
            }).filter(p => p.place != p.address); //hold objects that do not have the current address
            return new VillageState(destination, parcels); //make a new village state after the move
        }
    }
}

//always start at the post office, this function isn't needed after line 108
let first = new VillageState(
    'Post Office',
    [{place: 'Post Office', address: "Alice's House"}]
);

//the thing a robot returns is an object containing both the direction it wants to move 
//in and a memory value that will be given back to it the next time it is called
function runRobot(state, robot, memory) {
    for (let turn=0;; turn++) {
        if (state.parcels.length == 0) { //reading amount of parcels in the village state, I guess this is an array?? Yes line 98
            log(`Done in ${turn} turns`); //record how many turns it took
            break;
        }
        let action = robot(state, memory); //??? this is like a constructor function for a new robot
        state = state.move(action.direction); //???
        memory = action.memory; //???
        log(`Moved to ${action.direction}`) //logs what it does and commits it to memory
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

//Randomly assign parcels starting location and address to be delivered
VillageState.random = function(parcelCount = 20) { // adds property to constructor, should make that generate a random int 0-50
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph)); //choose random address for each parcel
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address); //dont select addresses that are the same as current location
        parcels.push({place, address})
    }
    return new VillageState('Post Office', parcels); //fire up new state with random parcels and post office start
};

//If we find a route that passes all places in the village, the robot could run that route twice, 
//at which point it is guaranteed to be done. Here is one such route (starting from the post office):
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];

//Create a new robot to pass to runRobot, give it special memory
function routeRobot(state, memory) { //Looks like it runs the second half of runRobot, but memory = mailRoute instead of action.memory, state is same
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)} //drop first element at every turn
}

// runRobotAnimation(VillageState.random(), routeRobot, []); //runs above robot

//Check all possible routes away from current location, THEN all possible routes from those routes, pushing to route when place === to, and making sure
//not to back track
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}]; //an array of places that should be explored next. It starts with just the start position and an empty route.
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at == place)) { //non-back tracking. dont go to places it has already been
                work.push({at: place, route: route.concat(place)})
            }
        }
    }
}
//graph theory


function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) { // if parcel goes to where it is, place it
            route = findRoute(roadGraph, place, parcel.place);
        } else { ////if parcel needs to go somewhere other than where it is, set route to findRoute, see arguments
            route = findRoute(roadGraph, place, parcel.address)
        }
    }
    return {direction: route[0], memory: route.slice(1)} //from memory function
}

// runRobot(VillageState.random(), goalOrientedRobot, []);

//M E A S U R I N G   A  R O B O T

function steps(state, robot, memory) {
    for (let steps = 0;; steps++) {  
        if (state.parcels.length == 0) return steps;
            let action = robot(state, memory);
            state = state.move(action.direction);
            memory = action.memory;
    }
}


function compareRobots(robot1, memory1, robot2, memory2) {
    let steps1 = 0, steps2 = 0
    for(let i = 1; i < 100; i++) {
        let state = VillageState.random();
        steps1 += steps(state, robot1, memory1);
        steps2 += steps(state, robot2, memory2);
    }
    log(`Robot1 average: ${steps1/100}`);
    log(`Robot2 average: ${steps2/100}`);
}

// log(compareRobots(routeRobot, [], goalOrientedRobot, []));


//R O B O T  E F F I C I E N C Y

function lazyRobot({place, parcels}, route) {
    if (route.length == 0) {
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return {route: findRoute(roadGraph, place, parcel.place),
                        pickup: true};
            } else {
                return {route: findRoute(roadGraph, place, parcel.address),
                        pickup: false}
            }
        });
        function score({route, pickUp}) {
            return (pickUp ? 0.5 : 0) - route.length;
        }
        route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }
    return {direction: route[0], memory: route.slice(1)}
}

runRobot(VillageState.random(), lazyRobot, []);


//P E R S I S T E N T  G R O U P

class PGroup {
	constructor(members) {
		this.members = members;
	}
	add(num) {
		if (this.has(num)) return this;
        return new PGroup(this.members.concat([num]))
	}
	delete(num) {
		if (!this.has(num)) return this;
        return new PGroup(this.members.filter(m => m !== num));
	}
	has(num) {
		return this.members.includes(num);
	}

}
PGroup.empty = new PGroup([])

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false