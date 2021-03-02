//A  M O D U L A R  R O B O T

import {route as route} from 'routing';
import {VillageState} from 'VillageState';
export function robot(run, random, rouute, goalOriented) {
	// runRobot
	// randomRobot
	// routeRobot
	// goalOrientedRobot
}

import {roads} from 'External interface';
export function buildGraph(roads, buildGraph, roadGraph) {
	// roads
	// buildGraph
	// roadGraph
}

import {roadGraph} from 'buildGraph';
import {roads} from 'buildGraph';
import {randomPick} from 'routing';
export function state(VillageState) {
	// VillageState
	// VillageState.random
}

import {roadGraph} from 'buildGraph';
export function routing(randomPick, mailRoute, findRoute) {
	// randomPick
	// mailRoute
	// findRoute
}

//findRoute should be available from npm
//https://www.npmjs.com/search?q=graph


// R O A D S  M O D U L E

const {buildGraph} = require('./graph')

	const roads = [
	  "Alice's House-Bob's House",   "Alice's House-Cabin",
	  "Alice's House-Post Office",   "Bob's House-Town Hall",
	  "Daria's House-Ernie's House", "Daria's House-Town Hall",
	  "Ernie's House-Grete's House", "Grete's House-Farm",
	  "Grete's House-Shop",          "Marketplace-Farm",
	  "Marketplace-Post Office",     "Marketplace-Shop",
	  "Marketplace-Town Hall",       "Shop-Town Hall"
	];

exports.roadGraph = function(roads.map(item => item.split('-'))
