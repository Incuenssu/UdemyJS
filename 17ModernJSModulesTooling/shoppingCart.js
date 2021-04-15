// Exporting module
// console.log('Exporting module');
const shippingCost = 10;
const cart = [];
export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};
const totalPrice = 237;
const totalQuantity = 23;
const cantidad = 12;
export { totalPrice, totalQuantity as tq, cantidad, cart };
// Default export
export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
}
