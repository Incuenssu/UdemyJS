'use strict';
console.log(
    '------------------------- Construction functions and the NEW operator -------------------------'
);
// Construction functions and the NEW operator
const Person = function (firstName, birthYear) {
    // 1. New {empty} is created
    // console.log(this);
    // 2. function is called, this = {empty}
    this.firstName = firstName; // Instance property
    this.birthYear = birthYear; // Instance property
    // 3. {empty} linked to prototype. See later
};
const jonas = new Person('Jonas', 1990);
// 4. function automatically return {}
console.log(jonas);
const matilda = new Person('Matilda', 1997);
const jack = new Person('Jack', 1975);
// Instance of
// console.log(jonas instanceof Person);
// console.log('Jose' instanceof Person);

console.log('------------------------- Prototypes -------------------------');
// Prototypes
console.log('---------- Methods ----------');
Person.prototype.calcAge = function () {
    console.log(2021 - this.birthYear); // The "this keyword" is set to the object that is calling the method
};
console.log(Person.prototype);
jonas.calcAge();
console.log(jonas); //Jonas has not the method calcAge, but it can access an use it
matilda.calcAge();
// console.log(jonas.__proto__); // 3. {empty} linked to prototype
// console.log(jonas.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(Person));
console.log('---------- Propierties ----------');
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species);
console.log(matilda);
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(
    '------------------------- Prototypal Inheritance on Built - in objects    -------------------------'
);
// Prototypal Inheritance on Built - in objects
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
