'use strict';
// Default parameters
console.log(
    '-------------------- A CLOSER LOOK AT FUNCTIONS --------------------'
);
const bookings = [];
const createBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
) {
    // Default value ES5
    // numPassengers = numPassengers || 1;
    // price = price || 199;
    // Default value ES6+. In (parameter)
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};
// createBooking('LH123');
// createBooking('LH123', 8, 2500);
// createBooking('LH123', 8);
createBooking('LH123', undefined, 500);

// How passing arguments works: value vs reference
console.log(
    '-------------------- How passing arguments works: value vs reference --------------------'
);
const flight = 'LH124';
const jonas = {
    name: 'Jonas Perez',
    passportNum: 12345,
};
const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999'; // Bad practice to change the parameter value
    passenger.name = 'Mr. ' + passenger.name;
    if (passenger.passportNum === 12345) {
        console.log('Check in');
    } else {
        console.log('Wrong passport!');
    }
};
// checkIn(flight, jonas);
// console.log(flight); // Resultado: LH124
// console.log(jonas); // Resultado: {name: "Mr. Jonas Perez", passportNum: 12345} // The name has change
const flightNum = flight;
const person = jonas;
const newPassport = function (person) {
    person.passportNum = Math.trunc(Math.random() * 100000000000);
};
newPassport(jonas);
checkIn(flight, jonas);

// Functions Accepting Callback Functions
console.log(
    '-------------------- First-Class and higher-Order Functions --------------------'
);
// First-order functions
const oneWord = function (str) {
    return str.replaceAll(' ', '').toLowerCase();
};
const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};
// Higher-order function
const transformer = function (str, fn) {
    // console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    // console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// Functions returning functions
console.log(
    '-------------------- Functions returning functions --------------------'
);
const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};
// const greeterHey = greet('Hey');
// greeterHey('Jose');
// greeterHey('Pepito');
greet('Hello')('Jose luis');
// Challenge: the same but in arrow functions. Only to practice
// Made for me
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Hola')('Jorche Lluis');
// Made for professor
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
// greetArr('Hi')('Jonas');

// The call and apply methods
console.log(
    '-------------------- The call and apply methods --------------------'
);
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function(){}
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};
lufthansa.book(239, 'Jose');
// lufthansa.book(635, 'John Smith');
const eurowing = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};
const book = lufthansa.book;
// book(23, 'Pepito'); // Resultado: Error. Because "this keyword NOT point to nothing --> undefined"
// We need to say JS explicity what the "this keyword" should be with: "call", "apply" and "bind"
// CALL Method
book.call(eurowing, 23, 'Sarah');
// book.call(lufthansa, 232, 'Cooper');
const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};
book.call(swiss, 12, 'Murphy');
// APPLY Method
const flightData = [854, 'John Cooper'];
book.apply(lufthansa, flightData);
// book.call(swiss, ...flightData);
// book.apply(lufthansa, [968, 'Pepito']);

// The bind method
console.log('-------------------- The Bind method --------------------');
// book.call(eurowing, 23, 'Sarah');
const bookEW = book.bind(eurowing); // This does NOT call the book function. Instead, it returns a new function
bookEW(125, 'Steven');
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
// Using default parameters in bind method
const bookEW23 = book.bind(eurowing, 23);
bookEW23('Pedrito');
// With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); // Not working because "this keyword" is pointing to ".buy" button
document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // Now works because we force to point to "lufhansa" with bind method
// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.21, 200));
const addTaxIVA = addTax.bind(null, 0.21);
console.log(addTaxIVA(200));
// Challenge
const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};
const addTaxIVA2 = addTaxRate(0.21);
// console.log(addTaxIVA2(200));

// Challenge 1
console.log('-------------------- Challenge 1 --------------------');
/*Coding Challenge #1
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter 'poll' object below.
Your tasks:
1. Createamethodcalled'registerNewAnswer'onthe'poll'object.The method does 2 things:
1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this: What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For example, if the option is 3, increase the value at position 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g. answer 52 wouldn't make sense, right?)
2. Callthismethodwhenevertheuserclicksthe"Answerpoll"button.
3. Createamethod'displayResults'whichdisplaysthepollresults.The
method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Runthe'displayResults'methodattheendofeach 'registerNewAnswer' method call.
5. Bonus:Usethe'displayResults'methodtodisplaythe2arraysinthetest data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?
Test data for bonus:
§ Data1:[5,2,3]
§ Data2:[1,5,3,9,6,1]
Hints: Use many of the tools you learned about in this and the last section*/
// Made for me
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const answer = prompt(
            'What is your favourite programming language? \n' +
                '0: JavaScript \n' +
                '1: Python \n' +
                '2: Rust \n' +
                '3: C++ \n' +
                '(Write option number)'
        );
        if (answer <= 3 && answer >= 0) {
            this.answers[answer]++;
            this.displayResults([answer]);
        } else {
            alert('You choose an incorrect answer!');
        }
    },
    displayResults(...type) {
        for (const type2 of type) {
            if (typeof type2 === typeof []) {
                console.log(this.answers);
            } else {
                console.log(
                    `Poll results are ${this.answers[0]}, ${this.answers[1]}, ${this.answers[2]}, ${this.answers[3]}`
                );
            }
        }
    },
};
document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer.bind(poll));
// Bonus
const Data1 = [5, 2, 3];
const Data2 = [1, 5, 3, 9, 6, 1];
const BonusChallenge1 = function () {
    poll.displayResults(Data1);
    poll.displayResults(...Data1);
    poll.displayResults(Data2);
    poll.displayResults(...Data2);
};
// BonusChallenge1();
// Made for Professor
const pollP = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const answer = Number(
            prompt(
                `${this.question}\n${this.options.join(
                    '\n'
                )}\n(Write option number)`
            )
        );
        //Register the answer
        typeof answer === 'number' &&
            answer < this.answers.length &&
            this.answers[answer]++;
        this.displayResults();
        this.displayResults('string');
    },
    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
        } else if (type === 'string') {
            console.log(`Poll results are ${this.answers.join(' , ')}`);
        }
    },
};
// document
//     .querySelector('.poll')
//     .addEventListener('click', pollP.registerNewAnswer.bind(pollP));
//Bonus
// pollP.displayResults.call({ answers: [5, 2, 3] });
// pollP.displayResults.call({ answers: [5, 2, 3] }, 'string');
// pollP.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// pollP.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

// Immediately invoked function expressions ( IIFE )
console.log(
    '-------------------- Immediately invoked function expressions ( IIFE ) --------------------'
);
const runNotOnce = function () {
    console.log('This function will run again');
};
// runNotOnce();
(function () {
    console.log('This will never run again');
    const isPrivate = 23; // If we want to use a variable that never again will be use. Function Scope: only for this function
})();
// (function (name) {
//     console.log(`This ${name} will never run again`);
// })('FUNCTION');
// (() => console.log('This will ALSO never run again'))();
{
    const isPrivate2 = 25;
    var notPrivate2 = 35;
}
// console.log(notPrivate2);

// Closures
console.log('-------------------- Closures --------------------');
const secureBooking = function () {
    let passengerCount = 0;
    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};
const booker = secureBooking();
booker();
booker();
console.dir(booker);
// Example 1
let f;
const g = function () {
    const a = 10;
    f = function () {
        console.log(a * 2);
    };
};
const h = function () {
    const b = 100;
    f = function () {
        console.log(b * 2);
    };
};
g();
f();
console.dir(f);
//Re-assigning f function
h();
f();
console.dir(f);
// Example 2
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`The are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);
    console.log(`Will start boarding in ${wait} seconds`);
};
const perGroup = 1000; // This variable proves that setTimeout use the scope in boardPassengers, not the global scope. But if we remove the variable inside the function, it is used this variable
// boardPassengers(180, 3);
// Challenge 2
console.log('-------------------- Challenge 2 --------------------');
/*Coding Challenge #2
This is more of a thinking challenge than a coding challenge 🤓 Your tasks:
1. TaketheIIFEbelowandattheendofthefunction,attachaneventlistenerthat changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do not select the h1 element again!
2. Andnowexplaintoyourself(orsomeonearoundyou)whythisworked!Takeall the time you need. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.*/
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    // Made for me
    document.body.addEventListener('click', function () {
        if (header.style.color == 'blue') {
            header.style.color = 'red';
        } else {
            header.style.color = 'blue';
        }
    });
    // Made for profesor
    // document.querySelector('body').addEventListener('click', function () {
    //     header.style.color = 'blue';
    // });
})();
