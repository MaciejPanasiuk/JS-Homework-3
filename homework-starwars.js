const films = require('./sw-films.json');
const planets = require('./sw-planets.json');
const people = require('./sw-people.json');
const starships = require('./sw-starships.json');

// count sum of all starships cost from episodes 4-6
console.log(
  'Sum of all starships cost from episodes 4 - 6 is: ', sumAllStarshipsCostFromEpisodes(4, 6)
);

function sumAllStarshipsCostFromEpisodes(startEp, endEp) {
  
  const starshipstotal = films.filter((currentEp)=>{if(currentEp.episode_id>=startEp && currentEp.episode_id<=endEp)
    {return currentEp;}})//narrows the search to given episodes
    .map((currentship)=> currentship.starships)
    .flat()
    const ShipUrls= Array.from(new Set (starshipstotal))//we get a list of unique ships in those given episodes
    //gotta look for the ships with certain urls
    let ShipFatStacks=starships;
     let ShipArr=[];
    for(i=0;i<ShipUrls.length;i++){
        ShipArr.push(ShipFatStacks.find((element)=>element.url===ShipUrls[i]))
    }
Result=ShipArr.map((currentship)=>+currentship.cost_in_credits)
.filter((currentCost)=>{if(currentCost!=NaN){return currentCost;}})
.reduce((accumulator,element)=>accumulator+element,0)
  return Result;  
}

// find the fastest starship you can afford having 8500000 credits

const ShipCostUnknown=starships
.filter((param)=>{if(param.cost_in_credits==="unknown"){return param.name;}})//this is our collection of starships with unknown cost
.sort((a,b)=>b.max_atmosphering_speed-a.max_atmosphering_speed)
//console.log('a');
// find the fastest starship you can afford having 8500000 credits
console.log(
  'Fastest ship I can get for up to 8500000 is: ',
    getFastestShipFor(8500000).name, 'buuut there is also this ', ShipCostUnknown[0].name,' with a top speed of ', ShipCostUnknown[0].max_atmosphering_speed,' but we dont know its cost'
);
function getFastestShipFor(money) {
  let ship=starships
  //.map((currentShip)=>+currentShip.cost_in_credits)
  .filter((currentShip)=>{if(currentShip.cost_in_credits!=='unknown'){return currentShip;}})
  .filter((currentCost)=>{if(currentCost.cost_in_credits<=money){return currentCost;}})
  .sort((a,b)=>b.max_atmosphering_speed-a.max_atmosphering_speed)//we sort it descending, so that the 1st ship will be the fastest, 
  // TODO 
  if(Object.keys(ship).length === 0)//handy little bit that checks if our object is sort of empty, we can also add another condition checking if its an object but it gets messed up
  {
return ship='YOU CANT AFFORD ANYTHING WITH THAT,GO MAW SOME SPACE LAWNS FOR CREDITS OR SOMETHING';}
  else{
  return ship[0].name;} 
}

// find planet name with the lowest difference between the rotation period and orbital period

console.log(
  'Planet name with the lowest difference between the rotation period and orbital period is: ',
    getPlanetNameWithLowestDifference('rotation_period', 'orbital_period')
);

function getPlanetNameWithLowestDifference(key1, key2) {
  //we compare both values, subtract one from another and just incase use .abs to gewt absolute value
  let planetName;
  let planetdata=planets
  .filter((currentplanet)=>{if(currentplanet[key1]!=="unknown" || currentplanet[key2]!=="unknown"){return currentplanet;}})//gets rid of unknown 
  .filter((currentplanet)=>{if(Number(currentplanet[key1])!==0 || Number(currentplanet[key2])!==0){return currentplanet;}})//gets rid of zeros
  .sort((a,b)=>Math.abs(Number(a[key1])-Number(a[key2]))-Math.abs(Number(b[key1])-Number(b[key2])))//sorting object keys with lowest diff
  //IMPORTANT we access certain key with an array notation: object[key], thats how we can put keys as parameters in a function and acces them further in the body of the function.

  planetName=planetdata[0].name
  return planetName;
}

// map all starships with crew <= 4 that were created between 10 dec 2014 and 15 dec 2014

console.log(
  'Ships with max crew of 4 created between 10.12.2014 - 12.12.2014 number is: ' +
  getCrewShipFrom(4, new Date(2014, 11, 10, 0, 0, 0), new Date(2014, 11, 12, 24, 59, 59)).length //I swapped the date so it includes ships created 12.12, not just up to that date.otherwise we get only MIllenium Falcon
  );

function getCrewShipFrom(maxCrew, dateStart, dateEnd) {
  let ship;
  ship=starships.filter((currentShip)=>{if(new Date(currentShip.created)>=dateStart && new Date(currentShip.created)<=dateEnd){return currentShip}})
  .filter((remainingships)=>remainingships.crew<=maxCrew)
  // TODO
  //first we narrow down the ships to the date brackets
  //we check if we can read the date format in the json, prolly not so we do some swappin`
  return ship;
}

// create an array of people’s names from episodes 1 and 5 sorted by the diameter of origin planet low to high
console.log(
  'People from ep 1 - 5 sorted by origin planet diameter low to high: ' ,
    getPeopleSortedByOriginPlanetDiameter(1, 5), '\n','Including characters from planets with 0 diameter ( in front) and unknown or uncatalogued( in the end)'
);//so 1-5 or 1 AND 5 only?O.o

function getPeopleSortedByOriginPlanetDiameter(startEp, endEp) {

  const PeopleFromEps=films.filter((currentfilm)=>currentfilm.episode_id===startEp || currentfilm.episode_id===endEp)//filtering the eps we need
  .map((currentEp)=>currentEp.characters)
  .flat()
  const PeoplesURL=Array.from(new Set(PeopleFromEps));//we get an array of people from ep 1 and 5 without doubles

  let PlanetArr=[];
  const HomeworldsOfChars=people
  HomeworldsOfChars.forEach((currentChar)=>{if(PeoplesURL.includes(currentChar.url)){PlanetArr.push(currentChar.homeworld);}})
  const PlanetURL=Array.from(new Set(PlanetArr));//we got urls of planets  from which our chars originate
  
const PeopleByDiameter=planets.filter((currentPlanet)=>PlanetURL.includes(currentPlanet.url))//Jesus, it was so simple
.sort((a,b)=>a.diameter-b.diameter)//planets and other things of origin sorted in ascending order
.map((currentplanet)=>currentplanet.residents)
.flat()
let sortedByDiameterURL=[];//sorted urls by diameter
for(i=0;i<PeopleByDiameter.length;i++)//should check if PeopleByDiameter current index is included in the url var, if so push to new sorted url
{
  if(PeoplesURL.includes(PeopleByDiameter[i]))
  {sortedByDiameterURL.push(PeopleByDiameter[i])}
}
let ResultPeople=[];
let CharFinder=people
CharFinder.forEach((currentChar)=>{if(sortedByDiameterURL.includes(currentChar.url)){return ResultPeople.push(currentChar)}})
//.map((currentChar)=>currentChar.name)
   
   //that gives us a list of planets that chars from given episodes come from
  //const PlanetsDiameter=planets.map((currentplanet)=>{if(PlanetURL.includes(currentplanet.url)){return currentplanet}});
  return ResultPeople;
}
  //return Object.values(ResultPeople);
console.log('a');