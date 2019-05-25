var fish = 100;			//number of fish
var gold = 100;			//number of gold
var fishRate = 0;		//rate of fish/sec
var fishRateIni = 0;	//initial number of fish for fish/sec calculation
var fishRateFin = 0;	//final number of fish for fish/sec calculation
var goldRate = 0;		//rate of gold/sec
var goldRateIni = 0;	//initial number of gold/sec
var goldRateFin = 0;	//final number of gold/sec
var totalFishStorage = 10000;		//number of fish that can be stored

/*Adding information about each creature to the respective array
  Values:
  number - how many of each creature there are
  clickValue - how effective each creature is (x clicks per sec)
  cost - how much gold it costs to buy one creature
  nextCost - how much gold it will cost to buy the next creature
  costMulti - cost multiplier for each creature (based on initial cost)
  creatureID - used to update the number of x creature in the html
  costID - used to update the cost of the creature in the html
*/
//TODO: remove nextCost
var fishermen = {number: 0, clickValue: 1, cost: 10, nextCost: 0, costMulti: 10, creatureID: 'fishermen', costID: 'fishermanCost'};
var merchants = {number: 0, clickValue: 1, cost: 10, nextCost: 0, costMulti: 10, creatureID: 'merchants', costID: 'merchantCost'};
var cats = {number: 0, clickValue: 10, cost: 100, nextCost: 0, costMulti: 100, creatureID: 'cats', costID: 'catCost'};
var catMerchants = {number: 0, clickValue: 10, cost: 100, nextCost: 0, costMulti: 100, creatureID: 'catMerchants', costID: 'catMerchantCost'};

var creatures = {fishermen, merchants, cats, catMerchants};

/*
	The main function for incrementing fish. Increments fish by the number passed as long as there is storage
*/
function fishClick(number){
	
	if((fish + number) <= totalFishStorage){
		
		fish = fish + number;
		document.getElementById("fish").innerHTML = fish + " fish";
	}
};

/*
	The main funciton for incrementing gold. This also decrements fish. 
*/
function sellClick(number){
	
	if(fish >= number){
		fish = fish - number;
		gold = gold + number;
		document.getElementById("fish").innerHTML = fish + " fish";
		document.getElementById("gold").innerHTML = gold + " gold";
	}
	
};

// A generalized buy method that works for any creature
// Input: Array -> Output: None
function buyCreature(creature){
	if(gold>= creature.cost){
		creature.number += 1;
		gold = gold - creature.cost;
		creature.cost = Math.floor(creature.costMulti * Math.pow(1.1, creature.number));
		document.getElementById(creature.creatureID).innerHTML = creature.number;
		document.getElementById('gold').innerHTML = gold + " gold";
		document.getElementById(creature.costID).innerHTML = creature.cost + " gold";
	}
}

function calcRates(){
	
	fishRateFin = fish;
	fishRate = fishRateFin - fishRateIni;
	goldRateFin = gold;
	goldRate = goldRateFin - goldRateIni;
	document.getElementById('fishRate').innerHTML = fishRate;
	document.getElementById('goldRate').innerHTML = goldRate;	
	fishRateIni = fish;
	goldRateIni = gold;
}



//@TODO Add function for converting big numbers to smaller ones (1000 -> 1k)
function convertBigNumToSmall(number){



}	



function save(){
	
	var save = {
		
		fish: fish,
		gold: gold,
		creatures: creatures
	}	
	
	localStorage.setItem("save", JSON.stringify(save));
}


function load(){

	var savegame = JSON.parse(localStorage.getItem("save"));

	if(typeof savegame.fish !== "undefined") fish = savegame.fish;
	if(typeof savegame.gold !== "undefined") gold = savegame.gold;
	if(typeof savegame.fishermen !== "undefined") creatures = savegame.creatures;

	document.getElementById('fishermen').innerHTML = creatures.fishermen;
	document.getElementById('cats').innerHTML = creatures.cats;
	document.getElementById('merchants').innerHTML = creatures.merchants;
	document.getElementById('catMerchants').innerHTML = creatures.catMerchants;
}

//Functions here are executed once every second
window.setInterval(function(){

	fishClick(fishermen.number);
	fishClick(cats.number * cats.clickValue);
	sellClick(merchants.number);
	sellClick(catMerchants.number * catMerchants.clickValue);
	calcRates();
	console.log(fish);

}, 1000);