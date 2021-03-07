'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2021-03-01T17:01:17.194Z',
        '2021-03-06T23:36:17.929Z',
        '2021-03-07T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////////////////////////////////////////////////////// Elements
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
///////////////////////////////////////////////////////////////////////////////////////// Functions

// Adding dates to "Banklist" app. Dates in the movements
const formatMovementDate = function (date, locale) {
    // Operations with dates
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) return `today`;
    if (daysPassed === 1) return `yesterday`;
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    // const day = `${date.getDate()}`.padStart(2, '0'); // ".padStart(2, '0')" ==> 1/10 --> 01/10
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    // Internationalizing
    return new Intl.DateTimeFormat(locale).format(date);
};

// Internationalizing Numbers (IntL)
const formatCur = function (value, local, currency) {
    return new Intl.NumberFormat(local, {
        style: 'currency',
        currency: currency,
    }).format(value);
};

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';
    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;
    // Math and rounding. Fixing decimals: tofixed(2)
    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        // Adding dates to "Banklist" app. Dates in the movements
        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date, acc.locale);
        // Internationalizing Numbers (IntL)
        const formattedMovement = formatCur(mov, acc.local, acc.currency);

        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    const formattedMovement = formatCur(acc.balance, acc.local, acc.currency);
    labelBalance.textContent = `${formattedMovement}`;
};

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    const formattedMovement = formatCur(incomes, acc.local, acc.currency);
    labelSumIn.textContent = `${formattedMovement}`;

    const out = Math.abs(
        acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
    );
    labelSumOut.textContent = formatCur(out, acc.local, acc.currency);

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCur(interest, acc.local, acc.currency);
};

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUsernames(accounts);

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

/////////////////////////////////////////////////////////////////////////////////////////////// Event handlers
let currentAccount, timer;

// Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Internationalizing dates (IntL). Experimenting with API
const now = new Date();
const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: '2-digit',
    weekday: 'long',
};
const locale = navigator.language;
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// Implementing a countdown timer
const startLogOutTimer = function () {
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        // In each callback call, print the remaining time to UI
        labelTimer.textContent = `${min}:${sec}`;
        // When time is 0(after timer expired) seconds, stop timer and log out
        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = `Log in to get started`;
            containerApp.style.opacity = 0;
        }
        // Decrease 1 second
        time--;
    };
    // Set the time to 5 minutes
    let time = 300;
    tick();
    // Call the timer every second
    const timer = setInterval(tick, 1000);
    // To reset the timer if we change the user
    return timer;
};

btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );

    if (currentAccount?.pin === +inputLoginPin.value) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;
        containerApp.style.opacity = 100;

        // Adding dates to "Banklist" app. Date in the header.
        const now = new Date();
        // const day = `${now.getDate()}`.padStart(2, '0');
        // const month = `${now.getMonth() + 1}`.padStart(2, '0');
        // const year = now.getFullYear();
        // const hour = `${now.getHours()}`.padStart(2, '0');
        // const minute = `${now.getMinutes()}`.padStart(2, '0');
        // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
        // Internationalizing dates (IntL). Experimenting with API
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        };
        labelDate.textContent = new Intl.DateTimeFormat(
            currentAccount.locale,
            options
        ).format(now);

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
        // Clear the timer if we change users
        if (timer) clearInterval(timer);
        // Call the log out timer
        timer = startLogOutTimer();

        // Update UI
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = +inputTransferAmount.value;
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        // Adding dates to "Banklist" app. Add the date in the transfers
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());
        // Update UI
        updateUI(currentAccount);
        // Reset the timer
        clearInterval(timer);
        timer = startLogOutTimer();
    }
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    // Math and rounding
    const amount = Math.floor(inputLoanAmount.value); // Rounding the value in the UI representation
    if (
        amount > 0 &&
        currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
        // Simulating a delay for aprove the operation
        setTimeout(function () {
            // Add movement
            currentAccount.movements.push(amount);
            // Adding dates to "Banklist" app. Add the date in the loans
            currentAccount.movementsDates.push(new Date().toISOString());
            // Update UI
            updateUI(currentAccount);
            // Reset the timer
            clearInterval(timer);
            timer = startLogOutTimer();
        }, 2500);
    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        +inputClosePin.value === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        console.log(index);
        // .indexOf(23)

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

//////////////////////////////////////////////////////////////////////////////////////////////////// LECTURES

// Converting and checking numbers
console.log(
    '------------------------- Converting and checking numbers -------------------------'
);
// console.log(Number('23'));
// console.log(+'23');
// Parsing
console.log('----- parsing -----');
console.log(Number.parseInt('      30px', 10));
// console.log(Number.parseFloat('      2.5rem      '));
// NaN
console.log('----- NaN -----');
console.log(Number.isNaN('23'));
// console.log(Number.isNaN(+'23a'));
// console.log(Number.isNaN(23 / 0));
// Finite
console.log('----- finite -----');
console.log(Number.isFinite(23 / 0));
// console.log(Number.isFinite(23));
// console.log(Number.isFinite(+'23X'));
// console.log(Number.isFinite(+'23'));
// Integer
console.log('----- integer -----');
console.log(Number.isInteger('23.0'));
// console.log(Number.isInteger(23));
// console.log(Number.isInteger(+'23X'));
// console.log(Number.isInteger(+'23.05'));

// Math and rounding
console.log(
    '------------------------- Math and rounding -------------------------'
);
console.log('----- square root -----');
// console.log(Math.sqrt(25));
console.log(8 ** (1 / 3));
console.log('----- max and min -----');
console.log(Math.max(5, 18, 25, 1, '150'));
// console.log(Math.max(5, 18, 25, 1, '150px'));
console.log(Math.min(5, 18, 25, 1, '150'));
console.log('----- Pi -----');
console.log(Math.PI);
console.log('----- random -----');
// console.log(Math.trunc(Math.random() * 6) + 1);
const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1) + min; // We obtain randon numbers betweeen min and max
// console.log(randomInt(10, 20));
console.log('----- rounding -----');
console.log(Math.round(23.3));
console.log(Math.round(23.9));
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

// console.log(`Positive ceil: ${Math.ceil(35.7)}`);
// console.log(`Positive floor: ${Math.floor(35.7)}`);
// console.log(`Positive trunc: ${Math.trunc(35.7)}`);
// console.log(`Negative ceil: ${Math.ceil(-99.9)}`);
// console.log(`Negative floor: ${Math.floor(-99.9)}`);
// console.log(`Negative trunc: ${Math.trunc(-99.9)}`);

console.log('----- decimals -----');
// console.log((2.7).toFixed(5));
// console.log((2.227).toFixed(2));
console.log(+(2.227).toFixed(2));

// The remainder operator
console.log(
    '------------------------- The remainder operator -------------------------'
);
console.log(21 % 6);
console.log(21 / 6);
// Even or odd number
console.log(21 % 2);
console.log(20 % 2);
const isEven = n => (n % 2 === 0 ? 'Even' : 'NOT even');
console.log(isEven(32));
// We want to coloreate every second row of the movements
labelBalance.addEventListener('click', function () {
    [...document.querySelectorAll('.movements__row')].forEach(function (
        row,
        i
    ) {
        if (i % 2 === 0) row.style.backgroundColor = 'orangered';
        if (i % 3 === 0) row.style.backgroundColor = 'blue';
    });
});

// Working with BigInt
console.log(
    '------------------------- Working with BigInt -------------------------'
);
// Calculate the biggest int can JS represent.
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 - 1); // Correct
console.log(2 ** 53 + 1); // Not correct
console.log(1234254367866554323456765432134356);
console.log(1234254367866554323456765432134356n);
console.log(BigInt(1234254367866554323456765432134356));
// Operations
console.log(100000n + 100000n);
console.log(20n < 50);
console.log(20n == 20);
console.log(20n == '20');
console.log(20n === 20);
// console.log(Math.sqrt(8n)); //Not working
console.log(10n / 3n);

// Creating dates
console.log(
    '------------------------- Creating dates -------------------------'
);
// Form 1
console.log('----- Form 1 -----');
const date1 = new Date();
console.log(date1);
// Form 2
console.log('----- Form 2 -----');
console.log(new Date('Jun 22 1990 12:59:20'));
// console.log(new Date('December 25, 1953'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(account1.movementsDates[0]);
// Form 3
console.log('----- Form 3 -----');
console.log(new Date(2037, 10, 19, 15, 23, 5)); //Year, month(Fanuary is month 0), day, hour, minute, second
// console.log(new Date(2037, 10, 31)); //November only has 30 days ==> 01 december
// Form 4
console.log('----- Form 4 -----');
// console.log(new Date(0)); // Unix time: 0 milliseconds after that initial Unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days until initial Unix time: 3 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
console.log(3 * 24 * 60 * 60 * 1000); // (3 * 24 * 60 * 60 * 1000) is called the timestamp
// Working with dates
console.log('----- Working with dates -----');
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime()); //Timestamp
// console.log(Date.now()); //Timestamp
console.log('----- Changing dates -----');
future.setFullYear(2100);
console.log(future);

// Operations with dates
console.log(
    '------------------------- Operations with dates -------------------------'
);
// We convert to timestamp to realice operations
// console.log(+future);
// Number of days passed between two dates
const calcDaysPassed = (date1, date2) =>
    Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));
const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1);

// Internationalizing Numbers (IntL)
console.log(
    '------------------------- Internationalizing Numbers (IntL) -------------------------'
);
const num = 345654.45;
const numberoptions = {
    style: 'unit',
    unit: 'mile-per-hour',
    useGrouping: false,
};
console.log(
    'US:    ',
    new Intl.NumberFormat('us-GB', numberoptions).format(num)
);
console.log(
    'ES:    ',
    new Intl.NumberFormat('es-ES', numberoptions).format(num)
);
console.log(
    'Syria: ',
    new Intl.NumberFormat('ar-SY', numberoptions).format(num)
);

// Timers: setTimeout and setInterval
console.log(
    '------------------------- Timers: setTimeout and setInterval -------------------------'
);
console.log('----- setTimeout -----');
// setTimeout(() => console.log('Here is your pizza'), 5000);
// The code not stop here, still working: JS is asynchronous and non blocking
// setTimeout(() => console.log('non blocking'), 3000);
// setTimeout(
//     (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//     3000,
//     ...ingredients
// );
// console.log('Waiting...');
// Canceling
const ingredients = ['olvies', 'spinach'];
const pizzaTimer = setTimeout(
    (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
    1000,
    ...ingredients
);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
console.log('----- setinterval -----');
setInterval(function () {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    console.log(`${hour}:${minute}`);
}, 60000);
