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
log(roadGraph)

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) { //if there is a road going from the current place to the destination, else return current state
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p; //return parcels if they are not here
                return {place: destination, address: p.address}; //if they are here, return an object with the destination, and the address
            }).filter(p => p.place != p.address); //only return objects that need to be delivered
            return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState(
    'Post Office',
    [{place: 'Post Office', address: "Alice's House"}]
);
let next = first.move("Alice's House");

function runRobot(state, robot, memory) {
    for (let turn=0;; turn++) {
        if (state.parcels.length == 0) {
            log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        log(`Moved to ${action.direction}`)
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 20) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address})
    }
    return new VillageState('Post Office', parcels);
};

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)}
}

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place === to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)})
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place!= place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address)
        }
    }
    return {direction: route[0], memory: route.slice(1)}
}

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

log(compareRobots(routeRobot, [], goalOrientedRobot, []))
runRobot(VillageState.random(), goalOrientedRobot, [])
