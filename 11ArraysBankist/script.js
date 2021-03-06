'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Creating DOM elements // Sorting arrays
const displayMovements = function (acc, sort = false) {
    // Empty the container "movements"
    containerMovements.innerHTML = '';
    // containerMovements.textContent = 0;      // Only use this to read data
    // Sorting modify/mutate the original array, and we don't want it. So, we use "slice" to make a copy
    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;
    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">
                ${i + 1} ${type}
            </div>
            <div class="movements__value">${mov} €</div>
        </div>
        `;
        // Add elements of the array
        containerMovements.insertAdjacentHTML('afterbegin', html);
        // containerMovements.insertAdjacentHTML('beforeend', html); // The order is inverted, each new element is added after the previous one.
    });
};

// Computing usernames (map method)
const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(word => word[0])
            .join('');
    });
};
createUsernames(accounts);
// console.log(accounts); // We are adding a propierty "username" for each account with his own initials

// The Reduce method
const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} €`;
};
// The magic of chaining methods
const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, curr) => acc + curr, 0);
    labelSumIn.textContent = `${incomes} €`;
    const outcomes = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, curr) => acc + curr, 0);
    labelSumOut.textContent = `${Math.abs(outcomes)} €`;
    const interest = acc.movements // Interest in all of the deposits of 1.2%
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => int >= 1) // Interests only in operations >=1
        .reduce((acc, curr) => acc + curr, 0);
    labelSumInterest.textContent = `${interest} €`;
};
// Implementing Login. The find Method
let currentAccount;
btnLogin.addEventListener('click', function (e) {
    // when click this button, the web recharge. We need to stop recharging:
    e.preventDefault();
    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );
    // Check the pin. We put "?."(Optional Chaining) to check if exists. Otherwise, Error occur
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI
        containerApp.style.opacity = 100;
        // Display wellcome message
        labelWelcome.textContent = `Wellcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;
        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
        // Display movements, Display balance, Display summary
        updateUI(currentAccount);
    } else {
        alert('Credentials not recognize!');
        inputLoginPin.value = '';
        inputLoginPin.blur();
    }
});
// Some method
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (
        amount > 0 &&
        currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
        currentAccount.movements.push(amount);
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
});

// Implement transfers
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    // To obtain all the object associated to inputTransferTo:
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        // Display movements, Display balance, Display summary
        updateUI(currentAccount);
        inputTransferAmount.value = inputTransferTo.value = '';
        inputTransferAmount.blur();
        inputTransferTo.blur();
    } else if (amount === 0) {
        alert('Introduce a value');
    } else {
        console.log(amount);
        alert('Credentials not recognize!');
    }
});
const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);
    // Display balance
    calcDisplayBalance(acc);
    // Display summary
    calcDisplaySummary(acc);
};

// The findIndex Method
btnClose.addEventListener('click', function (e) {
    // We are going to remove accounts
    e.preventDefault();
    if (
        currentAccount.username === inputCloseUsername.value &&
        currentAccount?.pin === Number(inputClosePin.value)
    ) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        accounts.splice(index, 1);
        // Hidden UI
        containerApp.style.opacity = 0;
    } else {
        alert('Credentials not recognize!');
    }
    inputClosePin.value = '';
    inputCloseUsername.value = '';
    8;
});
// Sorting arrays
let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// LECTURES
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////

// Simple array methods
console.log('-------------------- Simple array methods --------------------');
let arr = ['a', 'b', 'c', 'd', 'e'];
// Slice method
console.log('----- Slice -----');
console.log(arr.slice(2));
// Splice method
console.log('----- Splice -----');
const arrSlice = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(arrSlice.splice(2, 4));
// console.log(arrSlice);
// Reverse method
console.log('----- Reverse -----');
const arrReverse = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(arrReverse.reverse());
// console.log(arrReverse);
// Concat method
console.log('----- Concat -----');
const arrConcat = arr.concat(arrReverse);
// const arrConcat = [...arr, ...arrReverse];
console.log(arrConcat);
// Join method
console.log('----- Join -----');
console.log(arr.join(' - '));

// Looping arrays: forEach
console.log(
    '-------------------- Looping arrays: forEach --------------------'
);
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements2) {
//     if (movement > 0) {
//         console.log(`You deposited ${movement}`);
//     } else {
//         console.log(`You withdrew ${Math.abs(movement)}`);
//     }
// // }
movements2.forEach(function (movement) {
    if (movement > 0) {
        console.log(`You deposited ${movement}`);
    } else {
        console.log(`You withdrew ${Math.abs(movement)}`);
    }
});
// Iteration 0: function(200)
// Iteration 1: function(450)
// Iteration 4: function(-650)
// movements2.forEach(function (element) {
//     console.log(element);
// });
console.log('----- Destructuring -----');
// for (const [i, movement] of movements2.entries()) {
//     if (movement > 0) {
//         console.log(`Movement ${i + 1}: You deposited ${movement}`);
//     } else {
//         console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//     }
// }
movements2.forEach(function (movement, i, array) {
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    }
});
console.log('----- Maps -----');
const currencies2 = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);
console.log(
    currencies2.forEach(function (value, key) {
        console.log(`${key}: ${value}`);
    })
);
console.log('----- Sets -----');
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
console.log(
    currenciesUnique.forEach(function (value, key, map) {
        console.log(`${key}: ${value}`);
    })
);

// Challenge 1
console.log('-------------------- Challenge 1 --------------------');
/*Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
1. Juliafoundoutthattheownersofthefirstandthelasttwodogsactuallyhave cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. CreateanarraywithbothJulia's(corrected)andKate'sdata
3. Foreachremainingdog,logtotheconsolewhetherit'sanadult("Dognumber1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy   ")
4. Runthefunctionforbothtestdatasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far*/
// Made for me
const dogsJulia1 = [3, 5, 2, 12, 7];
const dogsKate1 = [4, 1, 15, 8, 3];
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];
const checkDogs = function (dog1, dog2) {
    const dogsJuliaCopy = [...dog1.slice(1, dog1.length - 2), ...dog2];
    dogsJuliaCopy.forEach(function (dog, i) {
        if (dog >= 3) {
            console.log(
                `Dog number ${i + 1} is an adult, and is ${dog} years old`
            );
        } else {
            console.log(`Dog number ${i + 1} is still a puppy 🐶`);
        }
    });
};
// checkDogs(dogsJulia1, dogsKate1);
// checkDogs(dogsJulia2, dogsKate2);
// Made for professor
const checkDogsP = function (dogsJulia, dogsKate) {
    const dogsJuliaCorrected = dogsJulia.slice();
    dogsJuliaCorrected.splice(0, 1);
    dogsJuliaCorrected.splice(-2);
    const dogs = dogsJuliaCorrected.concat(dogsKate);
    dogs.forEach(function (dog, i) {
        if (dog >= 3) {
            console.log(
                `Dog number ${i + 1} is an adult, and is ${dog} years old`
            );
        } else {
            console.log(`Dog number ${i + 1} is still a puppy 🐶`);
        }
    });
};
// checkDogsP([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogsP([9, 16, 6, 8, 3], [[10, 5, 6, 1, 4]);

// The map method
console.log('-------------------- The map method --------------------');
const eurToUSD = 1.2; // Euro to dollar
// const movementsUSD = movements.map(function (mov) {
//     return mov * eurToUSD;
//     // return 23; // An array with the same number of values when all of them are 23
// });
const movementsUSDArrow = movements.map(mov => mov * eurToUSD); // If the function is one line is better using arrow functions
// console.log(movements);
// console.log(movementsUSD);
console.log(movementsUSDArrow);
// let movementsUSD2 = [];
// for (const mov of movements) {
//     movementsUSD2.push(mov * eurToUSD);
// }
// console.log(movementsUSD2);
const movementsDescriptions = movements.map(
    (mov, i) =>
        `Movement ${i + 1}: You ${mov > 0 ? 'deposit' : 'withdrew'} ${Math.abs(
            mov
        )}`
);
// console.log(movementsDescriptions);

// The Filter method
console.log('-------------------- The Filter method --------------------');
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);
let depositsFor = [];
// for (const mov of movements) {
//     if (mov > 0) depositsFor.push(mov);
// }
// console.log(depositsFor);
const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// The Reduce method
console.log('-------------------- The Reduce method --------------------');
// console.log(movements);
// const balance = movements.reduce(function (acc, curr, i, arr) {
//     console.log(`Iteration ${i}: ${acc} +${curr}`);
//     return acc + curr;
// }, 0);
const balance = movements.reduce((acc, curr, i) => {
    console.log(`Iteration ${i}: Acumulator(${acc}) and current(${curr})`);
    return acc + curr;
}, 0);
let balanceFor = 0;
for (const mov of movements) {
    balanceFor += mov;
}
console.log(`Reduce method: ${balance}; For method: ${balanceFor}.`);
// Maximum and minimum value
const max = movements.reduce(
    (acc, mov) => (acc > mov ? acc : mov),
    movements[0]
);
const min = movements.reduce((acc, curr) => (acc > curr ? curr : acc));
console.log(`Maximum value: ${max}`);
console.log(`Minimum value: ${min}`);

// Challenge 2
console.log('-------------------- Challenge 2 --------------------');
/*oding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculatethedogageinhumanyearsusingthefollowingformula:ifthedogis <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
2. Excludealldogsthatarelessthan18humanyearsold(whichisthesameas keeping dogs that are at least 18 years old)
3. Calculatetheaveragehumanageofalladultdogs(youshouldalreadyknow from other challenges how we calculate averages 😉)
4. Runthefunctionforbothtestdatasets
Test data:
§ Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4] */
// Made for me
const calcAverageHumanAge = function (ages) {
    // 1
    let humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
    // 2
    humanAge = humanAge.filter(curr => curr >= 18);
    // 3
    humanAge = humanAge.reduce((acc, cur) => (acc += cur), 0) / humanAge.length;
    console.log(`Average of dogs: ${Math.round(humanAge)}`);
};
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// Made for professor
const calcAverageHumanAgeP = function (ages) {
    // 1
    const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
    // 2
    const adults = humanAges.filter(age => age >= 18);
    // 3
    const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
    const average2 = adults.reduce(
        (acc, age, i, arr) => acc + age / arr.length,
        0
    );
    return average2;
};
const avg1 = calcAverageHumanAgeP([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAgeP([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// The magic of chaining methods
console.log(
    '-------------------- The magic of chaining methods --------------------'
);
// Pipeline
const totalDepositsUSD = movements
    .filter(mov => mov > 0)
    .map(mov => mov * eurToUSD)
    // If we need to debugg we can use the console and the parameter array
    // .filter(mov => mov < 0)
    // .map((mov, i, arr) => {
    //     console.log(arr); // Here we can see the bug: negative values
    //     return mov * eurToUSD;
    // })
    .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// Challenge 3
console.log('-------------------- Challenge 3 --------------------');
/*Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!
Test data:
§ Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4] */
// Made for me
const calcAverageHumanAgeC3 = ages =>
    ages
        .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
        .filter(curr => curr >= 18)
        .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
console.log(
    `Average of dogs: ${Math.round(
        calcAverageHumanAgeC3([5, 2, 4, 1, 15, 8, 3])
    )}`
);
// console.log(
//     `Average of dogs: ${Math.round(
//         calcAverageHumanAgeC3([16, 6, 10, 5, 6, 1, 4])
//     )}`
// );
// Made for Professor
const calcAverageHumanAgePC3 = ages =>
    ages
        .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
        .filter(age => age >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// const avg1C3 = calcAverageHumanAgePC3([5, 2, 4, 1, 15, 8, 3]);
// const avg2C3 = calcAverageHumanAgePC3([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1C3, avg2C3);

// The find Method
console.log('-------------------- The find Method --------------------');
const firstWithdrawal = movements.find(mov => mov < 0);
// const firstWithdrawal = movements.find((mov, i, arr) => {
//     console.log(`MOV: ${mov} -- INDEX: ${i} -- ARR: ${arr}`);
//     return mov < 0;
// });
console.log(firstWithdrawal);
// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// The findIndex Method
console.log('-------------------- The findIndex Method --------------------');
const firstWithdrawalIndex = movements.findIndex(mov => mov < 0);
console.log(firstWithdrawalIndex);

// Some and Every method
console.log('-------------------- Some and Every Method --------------------');
// Some method
console.log(movements.includes(-130));
console.log(movements.some(mov => mov > 2000));
// Every method
console.log(movements.every(mov => mov < 5000));
console.log(account4.movements.every(mov => mov > 0));

// Flat and FlatMap Method
console.log(
    '-------------------- Flat and FlatMap Method --------------------'
);
const arrFlat = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrFlat.flat());
const arrFlatDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrFlatDeep.flat());
console.log(arrFlatDeep.flat(5));
// ALL movements in the bank
const allMovements = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
console.log(allMovements);
const allMovementsFM = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
console.log(allMovementsFM);

// Sorting arrays
console.log('-------------------- Sorting arrays --------------------');
const owners = ['Jonas', 'Sarah', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);
// IF return < 0 ===> a, b
// IF return > 0 ===> b, a
console.log(
    movements.sort((a, b) => {
        if (a > b) return 1;
        if (b > a) return -1;
    })
);
console.log(movements.sort((a, b) => a - b));
console.log(movements.sort((a, b) => b - a));

// More ways of creating and filling arrays
console.log(
    '-------------------- More ways of creating and filling arrays --------------------'
);
const arrayfilling = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// Method 1: empty + fill()
const x = new Array(7);
console.log(x);
// console.log(x.fill(5));
console.log(x.fill(1, 3, 5));
console.log(arrayfilling.fill(30, 3, 6));
// Method 2
// console.log(Array.from({ length: 7 }, () => 1));
console.log(Array.from({ length: 7 }, (_, i) => i + 1));
console.log(Array.from({ length: 20 }, () => Math.trunc(Math.random() * 100)));
console.log(
    Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6) + 1)
);
// QuerySelectorAll
labelBalance.addEventListener('click', function () {
    const movementsUI = Array.from(
        document.querySelectorAll('.movements__value'),
        el => Number(el.textContent.replace(' €', ''))
    );
    console.log(movementsUI);
    // Another form
    const movementsUI2 = [
        ...document.querySelectorAll('.movements__value').map(),
    ];
    console.log(movementsUI2);
});

// Array methods practice
console.log('-------------------- Array methods practice --------------------');
// Exercise 1
const bankDepositSum = accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
console.log(bankDepositSum);
// Exercise 2
// const numDeposits1000 = accounts
//     .flatMap(acc => acc.movements)
//     .filter(mov => mov >= 1000).length;
const numDeposits1000 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, curr) => (curr >= 1000 ? ++acc : acc), 0);
// Method ++ before and after the variable
console.log(numDeposits1000);
let a = 10;
// console.log(a++);
// console.log(a);
console.log(++a);
// Exercise 3
const { deposits23, withdrawals23 } = accounts
    .flatMap(acc => acc.movements)
    .reduce(
        (acc, curr) => {
            // curr > 0 ? (acc.deposits += curr) : (acc.withdrawals += curr);
            acc[curr > 0 ? 'deposits23' : 'withdrawals23'] += curr;
            return acc;
        },
        { deposits23: 0, withdrawals23: 0 }
    );
console.log(deposits23, withdrawals23);
// Exercise 4
// this is a nice title ==> This Is a Nice Title
const convertTitleCase = function (title) {
    const capitalize = str => str[0].toUpperCase() + str.slice(1);
    const exceptions = [
        'a',
        'an',
        'and',
        'the',
        'but',
        'or',
        'on',
        'in',
        'with',
    ];
    const titleCase = title
        .toLowerCase()
        .split(' ')
        .map(word => (exceptions.includes(word) ? word : capitalize(word)))
        .join(' ');
    return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG nice title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
// Challenge 4
console.log('-------------------- Challenge 4 --------------------');
/*Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
Your tasks:
1. Loopoverthe'dogs'arraycontainingdogobjects,andforeachdog,calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. FindSarah'sdogandlogtotheconsolewhetherit'seatingtoomuchortoo little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Createanarraycontainingallownersofdogswhoeattoomuch ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Logastringtotheconsoleforeacharraycreatedin3.,likethis:"Matildaand Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Logtotheconsolewhetherthereisanydogeatingexactlytheamountoffood that is recommended (just true or false)
6. Logtotheconsolewhetherthereisanydogeatinganokayamountoffood (just true or false)
7. Createanarraycontainingthedogsthatareeatinganokayamountoffood(try to reuse the condition used in 6.)
8. Createashallowcopyofthe'dogs'arrayandsortitbyrecommendedfood portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)
Hints:
§ Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.*/
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];
// Made for me
// I wouldn't solve the exercise like the professor.
// Made for professor
// 1
dogs.forEach(dog => (dog.recomendedFood = Math.trunc(dog.weight ** 0.75 * 28)));
// 2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
    `Sarah's dog is eating too ${
        dogSarah.curFood > dogSarah.recomendedFood ? 'much' : 'little'
    }`
);
// 3
const ownersEatTooMuch = dogs
    .filter(dog => dog.recomendedFood < dog.curFood)
    .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
    .filter(dog => dog.recomendedFood > dog.curFood)
    .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);
// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
// 5
console.log(dogs.some(dog => dog.curFood === dog.recomendedFood));
// 6
const checkEatingOk = dog =>
    dog.curFood > dog.recomendedFood * 0.9 &&
    dog.curFood < dog.recomendedFood * 1.1;
console.log(dogs.some(checkEatingOk));
// 7
console.log(dogs.filter(checkEatingOk));
// 8
const dogsSorted = dogs
    .slice()
    .sort((a, b) => a.recomendedFood - b.recomendedFood);
console.log(dogsSorted);
