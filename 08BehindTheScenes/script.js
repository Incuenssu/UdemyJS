'use strict';

console.log(
    '------------------------ Scoping examples ------------------------'
);
// Scoping
function calcAge(birthYear) {
    const age = 2021 - birthYear;
    function printAge() {
        let output = `${firstName}, you are ${age}, born in ${birthYear}`;
        console.log('Output variable: ' + output);
        if (birthYear >= 1981 && birthYear <= 1996) {
            var millenial = true;
            const firstName = 'Steven'; // Don't overwrite the variable in global scope. Because we create another variable(call exactly name)
            const str = `Oh, and you're a millenial, ${firstName}`; //JS look up for the variable (global scope), but it exist in current scope.
            console.log('Str variable: ' + str);
            function add(a, b) {
                return a + b;
            }
            output = 'New output'; // Here YES overwrite the variable, so it changes forever
        }
        //console.log(str);   // Error because str is only defined in IF block
        console.log('Millenial variable: ' + millenial); // Not an error because we use VAR(used in ES5 or less), where the block if didn't create his own scope
        //console.log(add(2, 3)); //Only defined in IF block. Which create his own scope. Works if desactive strict mode
        console.log('Output variable: ' + output);
    }
    //console.log(millenial); //But, here not working because printAge creates his own scope.
    printAge();
    return age;
}
const firstName = 'Jose';
calcAge(1990);
//console.log(age); // Error because age is only defined in calcAge. Until the function have return age
//printAge(); // Error because the function is only defined in calcAge function

console.log(
    '------------------------ Hoisting examples ------------------------'
);
//Hoisting

//console.log(me); // Undefined
//console.log(job); // ReferenceError: Cannot access 'job' before initialization
//console.log(year); // ReferenceError: Cannot access 'year' before initialization
var me = 'Jose Luis';
let job = 'farmer';
const year = 1990;

console.log(addDecl(2, 3)); // 5
//console.log(addExpr(2, 3)); // ReferenceError: Cannot access 'addExpr' before initialization. This error is because is a CONST
//console.log(addArrow(2, 3)); //ReferenceError: Cannot access 'addArrow' before initialization. This error is because is a CONST
//console.log(addExpr2(2, 3)); // TypeError: addExpr2 is not a function. Var is undefined and we try to call a undefined.
console.log(addExpr2); // Undefined
//console.log(undefined(2, 3)); // The exact error of addExpr2(2,3)
function addDecl(a, b) {
    return a + b;
}
const addExpr = function (a, b) {
    return a + b;
};
const addArrow = (a, b) => a + b;
var addExpr2 = function (a, b) {
    return a + b;
};
// Example
// The IF is called instead the number of Products are 10, declared later of the IF. This is happen because Hoisting
console.log(numProducts); //Undefined is a false value, same as 0
if (!numProducts) {
    // if the numProducts is 0, call the function
    deleteShoppingCart();
}
var numProducts = 10;
function deleteShoppingCart() {
    console.log('All products deleted!');
}
// Diferences between const, let and var
var x = 1;
let y = 2;
const z = 3;
console.log(x === window.x); // Resultado: true. x is a propierty of window object
console.log(y === window.y); // Resultado: false
console.log(z === window.z); // Resultado: false

console.log(
    '------------------------ This keyword examples ------------------------'
);
// This keyword
console.log(this); // "This keyword" is "Window" object
const calcAgeThis = function (birthYearThis) {
    console.log(2021 - birthYearThis);
    console.log(this); // "undefined" in strict mode. "window" object in not strict mode
};
calcAgeThis(1990);

const calcAgeThisArrow = birthYearThis => {
    console.log(2021 - birthYearThis);
    console.log(this); // "window" object. Because the arrow function has not own "This keyword", it was the parent of the arrow that is window
};
calcAgeThisArrow(1980);

const rojo = {
    year: 1990,
    calcAge: function () {
        console.log(this);
        //console.log(2021 - this.year); // Resultado: 31
    },
};
rojo.calcAge(); // The rojo object. With all of his attributes(year, calcAge)

const azul = {
    year: 2010,
};
azul.calcAge = rojo.calcAge; // Copy the method of rojo to azul
azul.calcAge(); // The "This keyword" now point to azul, not to rojo. "This keyword" always point the object that is calling the method.

const f = rojo.calcAge; // Copy the method to a function called "f"
f(); // undefined. This happen because there is no owner of this "f" function. Same as calcAgeThis()

console.log(
    '------------------------ Regular functions vs Arrow functions examples ------------------------'
);
//Regular functions vs Arrow functions
const amarillo = {
    firstName2: 'Antonio',
    year: 1990,
    greet: () => console.log(`Hey ${this.firstName2}`),
    greet2: function () {
        console.log(`Hey ${this.firstName2}`);
    },
    // Inside a regular function call, "This keyword" must be undefined
    //calcAge: function () {
    //    const isMillenial = function () {
    //        console.log(this); //undefined
    //        console.log(this.year >= 1981 && this.year <= 1996);
    //    };
    //    isMillenial(); // Regular function call
    //},
    calcAgeSelf: function () {
        const self = this; // We can use "self" or "that"
        const isMillenial = function () {
            console.log(self); //undefined
            console.log(
                `Self or that: ${self.year >= 1981 && self.year <= 1996}`
            );
        };
        isMillenial(); // Regular function call
    },
    calcAgeArrow: function () {
        const isMillenial = () => {
            console.log(this);
            console.log(
                `Arrow function: ${this.year >= 1981 && this.year <= 1996}`
            );
        };
        isMillenial(); // Regular function call
    },
};
amarillo.greet(); // "Hey undefined" because (again) Arrow functions haven't "This Keyword". Amarillo is not a scope (global, function or block)
console.log(`Hey ${this.firstName2}`); // Same case than greet(). Amarillo belongs to global scope. THIS = WINDOW
var firstName2 = 'Matilda'; // If we have this variable in global scope. The arrow function can lead to error
amarillo.greet(); // "Hey Matilda". This happen because "this.firstName2" belongs to window object, NOT to amarillo object
amarillo.greet2(); // "Hey Antonio"
//amarillo.calcAge(); // TypeError: Cannot read property 'year' of undefined
amarillo.calcAgeSelf(); // It works. Self = amarillo object; console.log = true
amarillo.calcAgeArrow(); // It works. Self = amarillo object; console.log = true
// Arguments keyword
const addExpr3 = function (a, b) {
    console.log('Arguments keyword:');
    console.log(arguments);
    return a + b;
};
addExpr3(3, 4); // console.log = Array with arguments [3, 4]
// Not illegal(Not error) to give more arguments than parameters
addExpr3(3, 4, 8, 12); // console.log = Array with arguments [3, 4, 8, 12]
var addArrow2 = (a, b) => {
    console.log('Arguments keyword arrow:');
    console.log(arguments); // Not exists in arror functions
    return a + b;
};
//addArrow2(3, 4); // Arguments is not defined

console.log(
    '------------------------ Primitives vs Objects (primitive vs reference types)    ------------------------'
);
//Primitives vs objects (primitive vs reference types)
// Primitive value example:
let age = 30;
let oldAge = age;
age = 31;
console.log(`Age(Memory 001): ${age}`); // Resultado: 31
console.log(`oldAge(Memory 002): ${oldAge}`); // Resultado: 30
// Reference value example:
const me2 = {
    name: 'Jose',
    age: 30,
};
const friend = me2;
friend.age = 27;
console.log('Friend(Memory 003): ', friend); // Resultado: 27
console.log('Me(Memory 003): ', me2); // Resultado: 27
// Practice of Primitives vs Objects
let lastName = 'Perez';
let oldLastName = lastName;
lastName = 'Gonzalez';
console.log(oldLastName);
console.log(lastName);
const jessica = {
    firstName: 'Jessica',
    lastName: 'Perez',
    age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Gonzalez';
console.log('Before marriage: ', jessica.lastName);
console.log('After marriage: ', marriedJessica.lastName);
//marriedJessica = {}; // This not work because we can not change the value to a new memory adress. If a let, this YES work
// To copy a object and modify the new without modify the second
const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Perez',
    age: 27,
    family: ['Alice', 'Bob'],
};
const marriedJessica2 = Object.assign({}, jessica2);
marriedJessica2.lastName = 'Davis';
console.log('After marriage marriedJessica2: ', marriedJessica2.lastName);
console.log('Before marriage Jessica2: ', jessica2.lastName);
marriedJessica2.family.push('Antonio', 'Josefina');
console.log('Family marriedJessica2: ', marriedJessica2.family); // The assign only work in the first level reference value
console.log('Family Jessica2: ', jessica2.family); // Both objects gain the second level array(second level object)
