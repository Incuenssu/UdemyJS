// Let's fix some bad code
const budget = Object.freeze([
    { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
    { value: -45, description: 'Groceries 🥑', user: 'jonas' },
    { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
    { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
    { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
    { value: -20, description: 'Candy 🍭', user: 'matilda' },
    { value: -125, description: 'Toys 🚂', user: 'matilda' },
    { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Immutability
const spendingLimits = Object.freeze({
    jonas: 1500,
    matilda: 100,
});

const getLimit = (limits, user) => spendingLimits?.[user] ?? 0;

// Pure function:
const addExpense = function (
    state,
    limits,
    value,
    description,
    user = 'jonas'
) {
    const cleanUser = user.toLowerCase();
    return value <= getLimit(limits, cleanUser)
        ? [...state, { value: -value, description, user: cleanUser }]
        : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
    newBudget1,
    spendingLimits,
    100,
    'Going to movies 🍿',
    'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses = function (state, limits) {
//     return state.map(entry => {
//         return entry.value < -getLimit(limits, entry.user)
//             ? { ...entry, flag: 'limit' }
//             : entry;
//     });
// };
const checkExpenses = (state, limits) =>
    state.map(entry =>
        entry.value < -getLimit(limits, entry.user)
            ? { ...entry, flag: 'limit' }
            : entry
    );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure Function. Write in the console.log
const logBigExpenses = function (state, bigLimit) {
    const bigExpenses = state
        .filter(entry => entry.value <= -bigLimit)
        // .reduce((str, curr) => `${str} / ${curr.description.slice(-2)}`, '');
        .map(entry => entry.description.slice(-2))
        .join(' / ');
    console.log(bigExpenses);
    // let output = '';
    // for (const entry of budget)
    //     output +=
    //         entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // Slice(-2) because emojis are 2 characters
    // output = output.slice(0, -2); // Remove last '/ '
    // console.log(output);
};
console.log(budget);
logBigExpenses(finalBudget, 100);

// Workhome:
// Add a function for adding the income
// Create functions for calculating the total expenses and incomes, overall budget, how much the expenses are in percentage of the income