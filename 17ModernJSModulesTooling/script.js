console.log(
    '------------------------- Exporting and importing in ES6 modules -------------------------'
);
// Exporting and importing in ES6 modules
// Importing module
// import {
//     addToCart,
//     totalPrice as price, // Change namd in main module
//     tq, // Change named in imported module
//     cantidad,
// } from './shoppingCart.js';
// // import './shoppingCart'; ES modules works without the extension
// addToCart('bread', 5);
// console.log(price, tq, cantidad);
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// Default export
// import add from './shoppingCart.js';
// add('pizza', 2);
// cart in script.js is connected to shoppingCart.js
// console.log(ShoppingCart.cart);

console.log(
    '------------------------- The module pattern -------------------------'
);
// The module pattern
const ShoppingCart2 = (function () {
    const cart = [];
    const shippingCost = 10; // Private. Not returned
    const totalPrice = 237;
    const totalQuantity = 23;
    const addToCart = function (product, quantity) {
        cart.push({ product, quantity });
        console.log(`${quantity} ${product} added to cart`);
    };
    const orderStock = function (product, quantity) {
        console.log(`${quantity} ${product} ordered from supplier`);
    };
    return { addToCart, cart, totalPrice, totalQuantity };
})();
ShoppingCart2.addToCart('apples', 4);
// ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2);

console.log(
    '------------------------- Common JS modules -------------------------'
);
// Common JS modules in NodeJS
// Export
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
// };
// // Import
// const { addToCart } = require('./shoppingCart.js')

console.log(
    '------------------------- Introduction to NPM -------------------------'
);
// Introduction to NPM. Import Lodash-ES
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// Bundling with PARCEL and NPM scripts
import cloneDeep from 'lodash-es';

const state = {
    cart: [
        { product: 'bread', quantity: 5 },
        { product: 'pizza', quantity: 5 },
    ],
    user: { loggedIn: true },
};
// Basic JS cloning object. Both objects point to the same memory. Change one value, change both values
const stateClone = Object.assign({}, state);
// CloneDeep from Lodash. Not point to the same memory, not change both values
const stateCloneDeep = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone); // this change, it is false like state
console.log(stateCloneDeep); // Not change, it is still true

console.log(
    '------------------------- Bundling with PARCEL and NPM scripts -------------------------'
);
// Bundling with PARCEL and NPM scripts
// Hot module replacement
if (module.hot) {
    module.hot.accept();
}

console.log(
    '------------------------- Configuring BABEL and Polyfilling -------------------------'
);
// Configuring BABEL and Polyfilling
class Person {
    #greeting = 'hey';
    constructor(name) {
        (this.name = 'name'), console.log(`${this.#greeting}, ${this.name}`);
    }
}
const jonas = new Person('Jonas');

console.log(ShoppingCart.cart.find(el => el.quantity >= 2));
// The "find method" still in the Parcel compressed file, even though it is a ES6 method. Not converted to ES5
// Polyfilling
// import 'core-js';
// import 'core-js/stable/array/find';
import 'regenerator-runtime/runtime';

console.log(
    "------------------------- Let's fix some bad code: Part 1 -------------------------"
);
// Let's fix some bad code: Part 1
console.log('See clean.js');
