var fish = 0;			//number of fish
var gold = 0;			//number of gold
var fishermen = 0;		//number of fishermen
var merchants = 0;		//number of merchants
var fishRate = 0;		//rate of fish/sec
var fishRateIni = 0;	//initial number of fish for fish/sec calculation
var fishRateFin = 0;	//final number of fish for fish/sec calculation
var goldRate = 0;		//rate of gold/sec
var goldRateIni = 0;	//initial number of gold/sec
var goldRateFin = 0;	//final number of gold/sec
var totalFishStorage = 10000;		//number of fish that can be stored

function fishClick(number){
	
	if((fish + number) <= totalFishStorage){
		
		fish = fish + number;
		document.getElementById("fish").innerHTML = fish + " fish";
	}
};

function sellClick(number){
	
	if(fish >= number){
		fish = fish - number;
		gold = gold + number;
		document.getElementById("fish").innerHTML = fish + " fish";
		document.getElementById("gold").innerHTML = gold + " gold";
	}
	
};

function buyFisherman(){
	
	var fishermanCost = Math.floor(10 * Math.pow(1.1, fishermen));
	
	if(gold >= fishermanCost){
		
		fishermen = fishermen + 1;
		gold = gold - fishermanCost;
		document.getElementById('fishermen').innerHTML = fishermen;
		document.getElementById('gold').innerHTML = gold;
	}
	
	var nextFishermanCost = Math.floor(10 * Math.pow(1.1, fishermen));
	document.getElementById('fishermanCost').innerHTML = nextFishermanCost + " gold";
	
};

function buyMerchant(){
	
	var merchantCost = Math.floor(10 * Math.pow(1.1, merchants));
	
	if(gold >= merchantCost){
		
		merchants = merchants + 1;
		gold = gold - merchantCost;
		document.getElementById('merchants').innerHTML = merchants;
		document.getElementById('gold').innerHTML = gold;
	}
	
	var nextMerchantCost = Math.floor(10 * Math.pow(1.1, merchants));
	document.getElementById('merchantCost').innerHTML = nextMerchantCost + " gold";
	
};

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

function convertBigNumToSmall(number){



}	



function save(){
	
	var save = {
		
		fish: fish,
		gold: gold,
		fishermen: fishermen,
		merchants: merchants
	}	
	
	localStorage.setItem("save", JSON.stringify(save));
}


function load(){

var savegame = JSON.parse(localStorage.getItem("save"));

if(typeof savegame.fish !== "undefined") fish = savegame.fish;
if(typeof savegame.gold !== "undefined") gold = savegame.gold;
if(typeof savegame.fishermen !== "undefined") fishermen = savegame.fishermen;
if(typeof savegame.merchants !== "undefined") merchants = savegame.merchants;

}


window.setInterval(function(){

fishClick(fishermen);
sellClick(merchants);
calcRates();
console.log(fish);
}, 1000);