'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

console.log(
    '------------------------- Our first Ajax call: xmlHttpRequest -------------------------'
);
// Our first Ajax call: xmlHttpRequest. Old School
const getCountryOneData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
    // As soon as the request sent is complete, the listener trigger his "load" function
    request.addEventListener('load', function () {
        //   console.log(this.responseText); // Obtain JSON
        const [data] = JSON.parse(this.responseText); // Transform into an object
        console.log(data);
        const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
              ).toFixed(1)} million people</p>
              <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                  data.currencies[0].code
              }</p>
            </div>
        </article>`;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
};
// getCountryData('Spain');
// getCountryData('colombia');
// getCountryData('Japan');

console.log(
    '------------------------- Wellcome to callback hell -------------------------'
);
// Wellcome to callback hell
// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 seconds passed');
//             setTimeout(() => {
//                 console.log('4 seconds passed');
//                 setTimeout(() => {
//                     console.log('5 seconds passed');
//                 }, 1000);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);
const renderCountry = function (data, className = '') {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
              ).toFixed(1)} million people</p>
              <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                  data.currencies[0].code
              }</p>
            </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1; // Happen when promise is fullfilled and rejected, added to finally method
};
// const getCountryAndNeighbour = function (country) {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();
//     // As soon as the request sent is complete, the listener trigger his "load" function
//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText); // Transform into an object
//         console.log(data);
//         // Render country 1
//         renderCountry(data);
//         // Get neighbour country 2
//         const [neighbour] = data.borders;
//         if (!neighbour) return;
//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open(
//             'GET',
//             `https://restcountries.eu/rest/v2/alpha/${neighbour}`
//         );
//         request2.send();
//         request2.addEventListener('load', function () {
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour');
//         });
//     });
// };
// getCountryAndNeighbour('Spain');

console.log(
    '------------------------- Promises and the fetch API -------------------------'
);
// Promises and the fetch API
const request = fetch('https://restcountries.eu/rest/v2/name/spain');
// console.log(request);

console.log(
    '------------------------- Consuming promises -------------------------'
);
// Consuming promises
// const getCountryData = function (country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then(function (response) {
//             // console.log(response);
//             return response.json();
//         })
//         .then(function (data) {
//             // console.log(data);
//             renderCountry(data[0]);
//         });
// };
// Simplyfied with arrow functions
const getCountryDataPROMISE = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then(response => response.json())
        .then(data => renderCountry(data[0]));
};

console.log(
    '------------------------- Chaining promises -------------------------'
);
// Chaining promises
// const getCountryData = function (country) {
//     // Country 1
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then(response => {
//             // Throwing errors manually
//             if (!response.ok)
//                 throw new Error( // Error wich is catched by "catch()"
//                     `Country "${country}" not found (${response.status})`
//                 );
//             return response.json();
//         })
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];
//             if (!neighbour) return;
//             // Country 2
//             return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         })
//         .then(response => {
//             // Throwing errors manually
//             if (!response.ok)
//                 throw new Error( // Error wich is catched by "catch()"
//                     `Country "${neighbour}" not found (${response.status})`
//                 );
//             return response.json();
//         })
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(err => {
//             console.log(`Error: ${err}`);
//             renderError(`Something went wrong: ${err.message}. Try again!`);
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         });
// };
// getCountryData('Spain');

console.log(
    '------------------------- Handling rejected promises -------------------------'
);
// Handling rejected promises. User lost his internet connection: simulated by clicking a button
// btn.addEventListener('click', function () {
//     getCountryData('Spain');
// });
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1; Happen when promise is fullfilled and rejected, added to finally method
};

console.log(
    '------------------------- Throwing errors manually -------------------------'
);
// Throwing errors manually
// Country doen't exists
// Helper function
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        // Throwing errors manually
        if (!response.ok)
            throw new Error( // Error wich is catched by "catch()"
                `"${errorMsg}" (${response.status})`);
        return response.json();
    });
};
const getCountryData = function (country) {
    // Country 1
    getJSON(
        `https://restcountries.eu/rest/v2/name/${country}`,
        `Country "${country}" not found`
    )
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];
            if (!neighbour) throw new Error('No neighbour found!');
            // Country 2
            return getJSON(
                `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
                `Neighbour "${neighbour}" not found`
            );
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.log(`Error: ${err}`);
            renderError(`Something went wrong: ${err.message}. Try again!`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};
// getCountryData('Australia');

console.log('------------------------- Challenge 1 -------------------------');
// Challenge 1
/*
Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
Your tasks:
PART 1
1. Createafunction'whereAmI'whichtakesasinputsalatitudevalue('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).
2. Do“reversegeocoding”oftheprovidedcoordinates.Reversegeocodingmeans to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating 😉
3. Onceyouhavethedata,takealookatitintheconsoletoseealltheattributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
4. Chaina.catchmethodtotheendofthepromisechainandlogerrorstothe console
5. ThisAPIallowsyoutomakeonly3requestspersecond.Ifyoureloadfast,you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
PART 2
6. Nowit'stimetousethereceiveddatatorenderacountry.Sotaketherelevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Renderthecountryandcatchanyerrors,justlikewehavedoneinthelast lecture (you can even copy this code, no need to type the same code)
Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude) 
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474*/
// Made for me
// 1
const whereAmI = function (lat, lng) {
    // 2
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(response => {
            // 5
            if (!response.ok) throw new Error('A lot of request per second');
            return response.json();
        })
        // 3
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);
            // 6
            // 7
            getCountryData(data.country);
        })
        // 4
        .catch(err => console.log(err));
};
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
// Made for professor
const whereAmIP = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(res => {
            if (!res.ok)
                throw new Error(`Problem with geocoding ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);
            return fetch(
                `https://restcountries.eu/rest/v2/name/${data.country}`
            );
        })
        .then(res => {
            if (!res.ok) throw new Error(`Country not found (${res.status})`);
            return res.json();
        })
        .then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message} 💥`))
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};
// whereAmIP(52.508, 13.381);
// whereAmIP(19.037, 72.873);
// whereAmIP(-33.933, 18.474);

console.log(
    '------------------------- The event loop in practice -------------------------'
);
// The event loop in practice
console.log('Test start');
// Once the code is read, we have an callback queue(setTimeout) and one microtask queue(Promise). The Promise is executed with priority
// setTimeout(() => console.log('0 seconds timer'), 0);
// Promise.resolve('resolved promise 1').then(res => console.log(res)); // Promises have priority over the Callback Queue (settimeout)
// Promise.resolve('Resolved promise 2').then(res => {
//     // Simulating the Promise arrives a bit later. The promise is still in microtask queue
//     for (let i = 0; i < 100000; i++) {}
//     console.log(res);
// });
console.log('Test end');

console.log(
    '------------------------- Building a simple promise -------------------------'
);
// Building a simple promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('Lottery draw is happening:');
//     setTimeout(function () {
//         if (Math.random() > 0.5) {
//             resolve('You win!');
//         } else {
//             reject(new Error('You lost your money'));
//         }
//     }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
// Promisifying setTimeout
const wait = function (seconds) {
    return new Promise(function (resolve) {
        // Imposible to fail the timer ==> no rejection
        setTimeout(resolve, seconds * 1000);
    });
};
// wait(2)
//     .then(() => {
//         console.log('I waited for 2 seconds');
//         return wait(1);
//     })
//     .then(() => console.log('I waited for 1 second'));
// Fixing the callback hell with promisifying
// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//         console.log('2 seconds passed');
//         setTimeout(() => {
//             console.log('3 seconds passed');
//             setTimeout(() => {
//                 console.log('4 seconds passed');
//                 setTimeout(() => {
//                     console.log('5 seconds passed');
//                 }, 1000);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);
// wait(1)
//     .then(() => {
//         console.log('1 second passed');
//         return wait(1);
//     })
//     .then(() => {
//         console.log('2 second passed');
//         return wait(1);
//     })
//     .then(() => {
//         console.log('3 second passed');
//         return wait(1);
//     })
//     .then(() => {
//         console.log('4 second passed');
//         return wait(1);
//     })
//     .then(() => console.log('5 second passed'));
// Creating a fullfilled or rejected promise inmediately
// Promise.resolve('Inmediatelly').then(x => console.log(x));
// Promise.reject('Inmediatelly')
//     .then(x => console.log(x))
//     .catch(y => console.log(`Error: ${y}`));

console.log(
    '------------------------- Promisifyng the geolocation API -------------------------'
);
// Promisifyng the geolocation API
const getPostion = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // );
        // This are the same thing:
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
// getPostion().then(pos => console.log(pos));
const whereAmIGeo = function () {
    getPostion()
        .then(pos => {
            const { latitude: lat, longitude: lng } = pos.coords;
            return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        })
        .then(res => {
            if (!res.ok)
                throw new Error(`Problem with geocoding ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);
            return fetch(
                `https://restcountries.eu/rest/v2/name/${data.country}`
            );
        })
        .then(res => {
            if (!res.ok) throw new Error(`Country not found (${res.status})`);
            return res.json();
        })
        .then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message} 💥`))
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};
// btn.addEventListener('click', whereAmIGeo);

console.log('------------------------- Challenge 2 -------------------------');
// Challenge 2
/*
For this challenge you will actually have to watch the video! Then, build the image loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by yourself. Pretend you're working on your own 😉
PART 1
1. Createafunction'createImage'whichreceives'imgPath'asaninput. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path
2. Whentheimageisdoneloading,appendittotheDOMelementwiththe 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise
3. Ifthispartistootrickyforyou,justwatchthefirstpartofthesolution
PART 2
4. Consumethepromiseusing.thenandalsoaddanerrorhandler
5. Aftertheimagehasloaded,pauseexecutionfor2secondsusingthe'wait'
function we created earlier
6. Afterthe2secondshavepassed,hidethecurrentimage(setdisplayCSS
property to 'none'), and load a second image (Hint: Use the image element returned by the 'createImage' promise to hide the current image. You will need a global variable for that 😉)
7. Afterthesecondimagehasloaded,pauseexecutionfor2secondsagain
8. Afterthe2secondshavepassed,hidethecurrentimage
Test data: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast
*/
const imgContainer = document.querySelector('.images');
const createImageP = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;
        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });
        img.addEventListener('error', function () {
            imgContainer.append(img);
            reject(new Error('Image not found'));
        });
    });
};
let currentImg;
// createImageP('img/img-1.jpg')
//     .then(img => {
//         currentImg = img;
//         console.log('Image 1 loaded');
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         return createImageP('img/img-2.jpg');
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('Image 2 loaded');
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         return createImageP('img/img-3.jpg');
//     })
//     .then(img => {
//         currentImg = img;
//         console.log('Image 3 loaded');
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//     })
//     .catch(err => console.error(err));

console.log(
    '------------------------- Consuming promises with async/await -------------------------'
);
// Consuming promises with async/await
const getPostionAwait = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
const whereAmIAwait = async function () {
    try {
        // Geolocation
        const pos = await getPostionAwait();
        const { latitude: lat, longitude: lng } = pos.coords;
        // Reverse geocoding
        const resGeo = await fetch(
            `https://geocode.xyz/${lat},${lng}?geoit=json`
        );
        if (!resGeo) throw new Error('Problem getting location data');
        const dataGeo = await resGeo.json();
        // console.log(dataGeo);
        // Country data
        const res = await fetch(
            `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
        );
        if (!res) throw new Error('Problem getting country');
        // Same than
        // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res) );
        const data = await res.json();
        renderCountry(data[0]);
    } catch (err) {
        console.error(err);
        renderError(`Something went wrong ${err.message}`);
    }
};

console.log(
    '------------------------- Error handling with try/catch -------------------------'
);
// Error handling with try/catch
try {
    let y = 1;
    const x = 2;
    y = 3;
} catch (err) {
    console.error(`Error: ${err.message}`);
}

console.log(
    '------------------------- Returning values from async functions -------------------------'
);
// Returning values from async functions
const whereAmIReturn = async function () {
    try {
        const pos = await getPostionAwait();
        const { latitude: lat, longitude: lng } = pos.coords;
        const resGeo = await fetch(
            `https://geocode.xyz/${lat},${lng}?geoit=json`
        );
        if (!resGeo) throw new Error('Problem getting location data');
        const dataGeo = await resGeo.json();
        const res = await fetch(
            `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
        );
        if (!res) throw new Error('Problem getting country');
        const data = await res.json();
        renderCountry(data[0]);
        return `Your are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
        console.error(err);
        renderError(`Something went wrong ${err.message}`);
        // Retrowing the error. Reject promise returned from async function
        throw err;
    }
};
console.log('1: will get location');
// const city = whereAmIReturn(); // Not return the string that we want because when JS read this line, trigger the promise and continue with the code
// console.log(city);
// whereAmIReturn()
//     .then(city => console.log(`2: ${city}`))
//     .catch(err => console.error(`2: ${err.message}`)) // Now yes return us the string because then only trigger after the async function
//     .finally(() => console.log('3: Finished getting location'));
// Convert the previous line code into a line code withour "then" and "catch" methods(IIFE: inmediately functions called):
// (async function () {
//     try {
//         const city = await whereAmIReturn();
//         console.log(`2: ${city}`);
//     } catch (err) {
//         console.error(`2: ${err.message}`);
//     }
//     console.log('3: Finished getting location');
// })();

console.log(
    '------------------------- Running promises in parallel -------------------------'
);
// Running promises in parallel
const get3Countries = async function (c1, c2, c3) {
    try {
        const [data1] = await getJSON(
            `https://restcountries.eu/rest/v2/name/${c1}`
        );
        const [data2] = await getJSON(
            `https://restcountries.eu/rest/v2/name/${c2}`
        );
        const [data3] = await getJSON(
            `https://restcountries.eu/rest/v2/name/${c3}`
        );
        console.log([data1.capital, data2.capital, data3.capital]);
        // Parallel running
        const data = await Promise.all([
            getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
        ]);
        console.log(data.map(d => d[0].capital));
    } catch (err) {
        console.error(err);
    }
};
// get3Countries('spain', 'japan', 'france');

console.log(
    '------------------------- Other promise combinators: race, allsettled and any -------------------------'
);
// Other promise combinators: race, allsettled and any
// Promise.race
// (async function () {
//     const res = await Promise.race([
//         getJSON(`https://restcountries.eu/rest/v2/name/japan`),
//         getJSON(`https://restcountries.eu/rest/v2/name/usa`),
//         // getJSON(`https://restcountries.eu/rest/v2/name/canadaassda`), // If one is rejected, all be rejected
//         getJSON(`https://restcountries.eu/rest/v2/name/canada`),
//     ]);
//     console.log(`Winner: ${res[0].capital}`);
// })();
// Example of use Race in promises taking a lot of time: bad 3g
// const timeout = function (seconds) {
//     return new Promise(function (_, reject) {
//         setTimeout(function () {
//             reject(new Error('request took to loong!'));
//         }, seconds * 1000);
//     });
// };
// Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/japan`),
//     getJSON(`https://restcountries.eu/rest/v2/name/usa`),
//     timeout(5),
// ])
//     .then(res => console.log(res[0].capital))
//     .catch(err => console.error(err));
// Promise.allSettled()
// Promise.allSettled([
//     // Just an example of how works
//     Promise.resolve('Success'),
//     Promise.resolve('Success'),
//     Promise.reject('NOT Success'),
//     Promise.resolve('Success'),
// ]) // Then and catch to see the example
//     .then(res => console.log(res))
//     .catch(err => console.error(err));
// Promise.any()
Promise.any([
    // Just an example of how works
    Promise.reject('NOT Success'),
    Promise.resolve('Success 1'),
    Promise.resolve('Success 2'),
    Promise.resolve('Success 3'),
]) // Then and catch to see the example
    .then(res => console.log(res))
    .catch(err => console.error(err));

console.log('------------------------- Challenge 3 -------------------------');
// Challenge 3
/*
Your tasks:
PART 1
1. Writeanasyncfunction'loadNPause'thatrecreatesChallenge#2,thistime using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before)
2. Comparethetwoversions,thinkaboutthebigdifferences,andseewhichone you like more
3. Don'tforgettotesttheerrorhandler,andtosetthenetworkspeedto“Fast3G” in the dev tools Network tab
PART 2
1. Createanasyncfunction'loadAll'thatreceivesanarrayofimagepaths 'imgArr'
2. Use.maptoloopoverthearray,toloadalltheimageswiththe 'createImage' function (call the resulting array 'imgs')
3. Checkoutthe'imgs'arrayintheconsole!Isitlikeyouexpected?
4. Useapromisecombinatorfunctiontoactuallygettheimagesfromthearray😉
5. Addthe'parallel'classtoalltheimages(ithassomeCSSstyles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img- 3.jpg']. To test, turn off the 'loadNPause' function
*/
// Made for me
const loadNPause = async function (imgPath) {
    let img = await createImageP('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';
    img = await createImageP('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
    img = await createImageP('img/img-3.jpg');
    console.log('Image 3 loaded');
    await wait(2);
    img.style.display = 'none';
};
// loadNPause();
// PART 2
const loadAll = async function (imgArr) {
    const imgs = imgArr.map(async function (img) {
        await createImageP(img);
    });
    console.log(imgs); // An array of Promises
};
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// Made for Professor
const loadNPauseP = async function () {
    try {
        // Load image 1
        let img = await createImageP('img/img-1.jpg');
        console.log('Image 1 loaded');
        await wait(2);
        img.style.display = 'none';
        // Load image 2
        img = await createImageP('img/img-2.jpg');
        console.log('Image 2 loaded');
        await wait(2);
        img.style.display = 'none';
    } catch (err) {
        console.error(err);
    }
};
// loadNPauseP();
// PART 2
const loadAllP = async function (imgArr) {
    try {
        const imgs = imgArr.map(async img => await createImageP(img));
        console.log(imgs);
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        // Parallel
        imgsEl.forEach(img => img.classList.add('parallel'));
    } catch (err) {
        console.error(err);
    }
};
loadAllP(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// Code for the button
btn.addEventListener('click', whereAmIAwait);
