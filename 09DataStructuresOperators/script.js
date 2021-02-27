'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0, // Open 24 hours
            close: 24,
        },
    },
    // Method to destructuring the object. And with default values
    orderDelivery: function ({
        starterIndex = 1,
        mainIndex = 0,
        time = '20:00',
        address,
    }) {
        console.log(
            `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
        );
    },
    // Method to spread operator example
    orderPasta: function (ing1, ing2, ing3) {
        console.log(
            `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
        );
    },
    // Method to rest pattern example
    orderPizza: function (mainIng, ...otherIng) {
        //At least 1 ingredient, more are ok
        console.log(`Main ingredient of pizza: ${mainIng}`);
        if (otherIng.length !== 0) {
            console.log(`The others ingredientes of pizza: ${otherIng}`);
        }
    },
};
// Destructuring arrays
console.log(
    '------------------------------ Destructuring arrays ------------------------------'
);
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
const [x, y, z] = arr;
let [main, secondary] = restaurant.categories;
// Switching variables
//const temp = main;
//main = secondary;
//secondary = temp;
//console.log(main, secondary);
[main, secondary] = [secondary, main];
console.log(main, secondary);
// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);
// Nested: array inside array
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);
// Default Values. When we  have an array that don't know how far is
const [p = 1, q = 1, r = 1] = [8, 9];
//console.log(p, q, r); // p = 8; q = 9; r = undefined
console.log(p, q, r); // p = 8; q = 9; r = 1

// Destructuring objects
console.log(
    '------------------------------ Destructuring objects ------------------------------'
);
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
const {
    name: restaurantName,
    openingHours: hours,
    categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);
// Default values. When the propierty don't exist
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
// Mutating variables
let a2 = 111;
let b2 = 999;
const obj = { a2: 23, b2: 7, c: 14 };
({ a2, b2 } = obj);
console.log(a2, b2);
// Nested. Objects inside objects
const { fri } = openingHours;
console.log(fri);
const {
    fri: { open: o, close: n },
} = openingHours;
console.log(o, n);
// Method to destructuring object
restaurant.orderDelivery({
    time: '22:30',
    address: 'Calle Falsa, 234',
    mainIndex: 2,
    starterIndex: 2,
});
restaurant.orderDelivery({}); // Resultado: Order received! Bruschetta and Pizza will be delivered to undefined at 20:00
restaurant.orderDelivery({
    address: 'Calle Falsa, 234',
    mainIndex: 2,
}); // Resultado: Order received! Bruschetta and Risotto will be delivered to Calle Falsa, 234 at 20:00

// Spread operator
console.log(
    '------------------------------ Spread operator ------------------------------'
);
const arr2 = [7, 8, 9];
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]]; // Or use FOR loop
//console.log(badNewArr); // = [1,2,7,8,9]
const NewArray = [1, 2, arr2];
//console.log(NewArray); // = [1,2,[7,8,9]]
const NewGoodArray = [1, 2, ...arr2];
//console.log(NewGoodArray); //  = [1,2,7,8,9]
// Expand array individually
console.log(...NewGoodArray);
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);
// Copy array
const mainMenuCopy = [...restaurant.mainMenu];
// Join 2 arrays or more
const menuMerge = [...restaurant.mainMenu, ...restaurant.starterMenu];
// Iterables: arrays, strings, maps sets and objects(since ES2018)
const str = 'Jose';
const letters = [...str, ' ', ' A.'];
// Method to spread operator
// const ingredientesWithPrompt = [prompt("Let's make pasta! Ingrediente 1?"),prompt("Ingrediente 2?"), prompt("Ingrediente 3?")]
const ingredients = ['Champiñones', 'Aceitunas negras', 'Tomate', 'Pepinillo'];
restaurant.orderPasta(...ingredients);
// Spread operator working with objects
const newRestaurant = { founderYear: 1985, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);
// Shadow Copies object
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name);
console.log(restaurantCopy.name);
// Merge objects
const restaurantDelivery = {
    address: 'Calle falsa, 123',
    phone: '555 666 777',
    doors: 3,
};
const restaurantmerge = { ...restaurant, ...restaurantDelivery };
console.log(restaurantmerge);

// Rest pattern and Parameters
console.log(
    '------------------------------ Rest pattern and Parameters ------------------------------'
);
// SPREAD because on Right side of =
const arrRest = [1, 2, ...[3, 4]];
// REST, becaus on LEFT side of =
// const [resta, restb, restc] = [1, 2, 3, 4, 5];          // resta = 1; restb = 2; restc = 3
const [restA, restB, ...others] = [1, 2, 3, 4, 5]; // resta = 1; restb = 2; restc = [3, 4, 5]
console.log(restA, restB, others);
// Both sides
const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat, weekDays);
// Parameters
const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);
const arrayParameter = [23, 5, 7];
add(...arrayParameter);
// Edge cases
restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
restaurant.orderPizza('cheese');

// Short circuiting (&& and ||)
console.log(
    '------------------------------ Short circuiting (&& and ||) ------------------------------'
);
// OR Operator
console.log('----- OR -----');
// console.log(3 || 'Jonas'); // Both true, display the first true
// console.log('' || 'Jonas'); // "" is false
// console.log(true || 0); // true is true
// console.log(undefined || null); // both are false
// console.log(undefined || 0 || '' || 'hello' || 23 || null);
// Examples
// restaurant.numGuests = 23;
// restaurant.numGuests = 0;        0 is a false value, so the OR operator don't work if numGuests is 0
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
const guests2 = restaurant.numGuests || 12;
console.log(guests2);
// AND operator
console.log('----- AND -----');
console.log(0 && 'Jonas'); // First false, second true
console.log(3 && 'Jonas'); // Both are true
console.log('' && 'Jonas'); // First false and second true
console.log(true && 0); // First true and second false
console.log(undefined && null); // Both are false
//Examples
if (restaurant.orderPizza) {
    restaurant.orderPizza('Mushrooms', 'Spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach'); // If orderPizza exists(IF), then call the method

// The nullish coalescing operator ( ?? )
console.log(
    '------------------------------ The nullish coalescing operator ( ?? ) ------------------------------'
);
// As we see before in this case the OR presents problems as the 0 is false value
restaurant.numGuests2 = 0;
const guests3 = restaurant.numGuests2 || 10;
console.log(guests3);
// Nullish values
const guestsCorrect = restaurant.numGuests2 ?? 10;
console.log(guestsCorrect); // In this case ?? evaluate correctly the value 0

/*
// Challenge 1
console.log(
    '------------------------------ Challenge 1 ------------------------------'
);
Coding Challenge #1
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data.
Your tasks:
1. Createoneplayerarrayforeachteam(variables'players1'and 'players2')
2. Thefirstplayerinanyplayerarrayisthegoalkeeperandtheothersarefield players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Createanarray'allPlayers'containingallplayersofbothteams(22 players)
4. Duringthegame,BayernMunich(team1)used3substituteplayers.Socreatea new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Basedonthegame.oddsobject,createonevariableforeachodd(called 'team1', 'draw' and 'team2')
6. Writeafunction('printGoals')thatreceivesanarbitrarynumberofplayer names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. Theteamwiththeloweroddismorelikelytowin.Printtotheconsolewhich team is more likely to win, without using an if/else statement or the ternary operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored*/
/*const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};
// Made for me
/*1
const [[players1, players2]] = [game.players, ,];
/*2
const [gk, ...fieldPlayers] = players1;
/*3
const allPlayers = [...players1, ...players2];
/*4*
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
/*5*
const { team1, x: draw, team2 } = game.odds;
/*6*
const printGoals = function (...name) {
    let suma = 0;
    for (let j = 0; j < name.length; j++) {
        for (let i = 0; i < game.scored.length; i++) {
            if (name[j] == game.scored[i]) suma += 1;
        }
        console.log(`${name[j]} has scored ${suma} goals.`);
        suma = 0;
    }
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
/*7*
const winner = (team1 < team2 && game.team1) || (team1 > team2 && game.team2);
console.log(`${winner} is more likely to win`);
// Made for Professor
/*1*
const [players1P, players2P] = game.players;
/*2*
const [gkP, ...fieldPlayersP] = players1P;
/*3*
const allPlayersP = [...players1P, ...players2P];
/*4*
const players1FinalP = [...players1P, 'Thiago', 'Coutinho', 'Perisic'];
/*5*
const {
    odds: { team1P, x: drawP, team2P },
} = game;
/*6*
const printGoalsP = function (...players) {
    console.log(`${players.length} goals were scored.`);
};
printGoalsP('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoalsP('Davies', 'Muller');
printGoalsP(...game.scored);
/*7*
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
*/

// Looping arrays: the FOR-OF loop
console.log(
    '------------------------------ Looping arrays: the FOR-OF loop ------------------------------'
);
const menuFor = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menuFor) {
    //console.log(item);
}
for (const [i, el] of menuFor.entries()) {
    console.log(`${i + 1}: ${el}`);
}
// console.log([...menuFor.entries()]); // "entries()" is an array wich contains the value of the array an this position

// Enhanced object literals
console.log(
    '------------------------------ Enhanced object literals ------------------------------'
);
//3. We can compute names instead of having to write out manually and literally
const weekDays1 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
//1. Object oustide an object
const Horas = {
    [weekDays1[0]]: {
        abierto: 8,
        cerrado: 22,
    },
    [weekDays1[4]]: {
        abierto: 8,
        cerrado: 22,
    },
    [`Dia-${2 + 4}`]: {
        abierto: 10,
        cerrado: 20,
    },
};
const Restaurante = {
    name: 'Restaurante italiano',
    // Before ES6
    //Horas: Horas,
    // After ES6
    Horas,
    //2. Writing methods
    // Before ES6
    order: function (param1, param2) {
        console.log('Order 1');
    },
    // After ES6
    order2(param1, param2) {
        console.log('Order2');
    },
};
console.log(Horas);

// Optional Chaining ( .? )
console.log(
    '------------------------------ Optional Chaining ( .? ) ------------------------------'
);
// If we want to know if the restaurant open on monday, and his hour
//console.log(restaurant.openingHours.mon.open); //.mon = undefined: .mon.open = Error
// If restaurant.openingHours.mon exists
if (restaurant.openingHours.mon) {
    console.log(restaurant.openingHours.mon.open);
}
// If we don't know if exists openingHours in the object: IF restaurant.openingHours exists AND if restaurant.openingHours.mon exists
if (restaurant.openingHours && restaurant.openingHours.mon) {
    console.log(restaurant.openingHours.mon.open);
}
// With Optional chaining
//console.log(restaurant.openingHours.mon?.open);
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
    //console.log(day);
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open at ${open}`);
}
// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// Arrays
const users = [{ name: 'Antonio', email: 'emailfalso@falso.com' }];
console.log(users[0]?.name);

// Looping objects: Object keys, values and entries
console.log(
    '------------------------------ Looping objects: Object keys, values and entries ------------------------------'
);
for (const day of Object.keys(openingHours)) {
    // console.log(day);
}
// Property NAMES
const propierties = Object.keys(openingHours);
let openStr = `We open on ${propierties.length} days: `;
for (const day of propierties) {
    openStr += `${day}, `;
}
console.log(openStr);
// Property VALUES
const values = Object.values(categories);
// console.log(values);
for (const value of Object.values(categories)) {
    //console.log(`Category of ${value} food`);
}
// Property ENTRIES
const entrada = Object.entries(openingHours);
// console.log(entrada);
for (const [key, { open, close }] of entrada) {
    console.log(`On ${key} we open at ${open} and close at ${close}`);
}
/*
// Challenge 2
console.log(
    '------------------------------ Challenge 2 ------------------------------'
);
Let's continue with our football betting app! Keep using the 'game' variable from before.
Your tasks:
1. Loopoverthegame.scoredarrayandprinteachplayernametotheconsole, along with the goal number (Example: "Goal 1: Lewandowski")
2. Usealooptocalculatetheaverageoddandlogittotheconsole(Wealready studied how to calculate averages, you can go check if you don't remember)
3. Printthe3oddstotheconsole,butinaniceformattedway,exactlylikethis:
Odd of victory Bayern Munich: 1.33 Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names 😉
4. Bonus:Createanobjectcalled'scorers'whichcontainsthenamesofthe players who scored as properties, and the number of goals as the value. In this game, it will look like this:
     {
       Gnarby: 1,
       Hummels: 1,
       Lewandowski: 2
}
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};
// Made for me
// 1
for (const scored of game.scored.entries()) {
    console.log(`Goal ${scored[0] + 1}: ${scored[1]}`);
}
// 2
let aver = 0;
for (const average of Object.values(game.odds)) {
    aver += average;
}
console.log(`The average odd is ${(aver / 3).toFixed(2)}`);
// 3
console.log(`Odd of victory ${game.team1}: ${game.odds.team1}`);
console.log(`Odd of draw: ${game.odds.x}`);
console.log(`Odd of victory ${game.team2}: ${game.odds.team2}`);
// 4
let scorers = {};
for (const item of Object.values(game.scored)) {
    if (scorers[item] >= 1) {
        scorers[item] += 1;
        continue;
    }
    scorers[item] = 1;
}
console.log(scorers);
// Made for Profesor
// 1
for (const [i, player] of game.scored.entries()) {
    console.log(`Goal ${i + 1}: ${player}`);
}
// 2
const odds = Object.values(game.odds);
let averageP = 0;
for (const odd of odds) {
    averageP += odd;
}
averageP /= odds.length;
console.log(averageP);
// 3
for (const [team, odd] of Object.entries(game.odds)) {
    const teamStr = team === 'x' ? "draw" : `victory ${game[team]}`;
    console.log(`Odd of ${teamStr} ${odd}`);
}*/

// Sets
console.log(
    '------------------------------ Sets ------------------------------'
);
const ordersSet = new Set([
    'Pasta',
    'pizza',
    'pizza',
    'Risotto',
    'Pasta',
    'Pizza',
]);
console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('pizza');
//ordersSet.clear();
//console.log(ordersSet);
for (const order of ordersSet) {
    // console.log(order);
}
// Example. We want to know which different positions there are in our restaurant
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffSet = new Set(staff);
console.log(staffSet);
//But, we can create an array with the values of the set
const staffSetArray = [...new Set(staff)];
console.log(staffSetArray);
//As we only want the number of different positions, we can simplify it
console.log(
    new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
// Another example. Wich diferent letters there are in a string
console.log(new Set('jonasschmedtann').size);

// Maps: Fundamentals
console.log(
    '------------------------------ Maps: Fundamentals ------------------------------'
);
const restMap = new Map();
restMap.set('name', 'Classico Italiano');
restMap.set(1, 'Firenze, Italy');
restMap.set(2, 'Portugal');
restMap
    .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open')
    .set(false, 'We are closed');
//console.log(restMap.get(true));
const time = 21;
console.log(
    restMap.get(time > restMap.get('open') && time < restMap.get('close'))
);
// console.log(restMap.has('categories'));
// console.log(restMap.size);
restMap.set([5, 6], 'Test');
//console.log(restMap);
const arrMap = [8, 8];
restMap.set(arrMap, 'Test');
console.log(restMap.get(arrMap));
restMap.set(document.querySelector('h1'), 'Heading');
console.log(restMap);
// Iterations
console.log('----- Iterations -----');
const question = new Map([
    ['question', 'What is the best programming language?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct!'],
    [false, 'Try again!'],
]);
// console.log(question);
// Convert object to map
// console.log(Object.entries(openingHours));
const hourMap = new Map(Object.entries(openingHours));
// console.log(hourMap);
console.log(question.get('question'));
for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
// console.log(question.get(answer == question.get('correct')));
// Convert Map to array
const mapToArray = [...question];
// console.log(question.entries());
// console.log(question.keys());
// console.log(question.values());

// Challenge 3
console.log(
    '------------------------------ Challenge 3 ------------------------------'
);
/*Coding Challenge #3
Let's continue with our football betting app! This time, we have a map called 'gameEvents' (see below) with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Createanarray'events'ofthedifferentgameeventsthathappened(no duplicates)
2. Afterthegamehasfinished,iswasfoundthattheyellowcardfromminute64 was unfair. So remove this event from the game events log.
3. Computeandlogthefollowingstringtotheconsole:"Aneventhappened,on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loopover'gameEvents'andlogeachelementtotheconsole,marking whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽   GOAL*/
const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🔶 Yellow card'],
]);
// Made for me
// 1
const events = [...new Set(gameEvents.values())];
// 2
gameEvents.delete(64);
// 3
const averageEvents = `An event happened,on average, every ${
    90 / gameEvents.size
} minutes`;
// 4
for (const [minute, event] of gameEvents) {
    let part = 'FIRST';
    if (minute > 45) part = 'SECOND';
    console.log(`[${part} HALF] ${minute}: ${event}`);
}
// Made for professor
// 1
const eventsP = [...new Set(gameEvents.values())];
// 2
gameEvents.delete(64);
// 3
console.log(
    `An event happened,on average, every ${90 / gameEvents.size} minutes`
);
const timeP = [...gameEvents.keys()].pop();
console.log(
    `An event happened,on average, every ${timeP / gameEvents.size} minutes`
);
// 4
for (const [minute, event] of gameEvents) {
    const half = minute <= 45 ? 'FIRST' : 'SECOND';
    console.log(`[${half} HALF] ${minute}: ${event}`);
}
